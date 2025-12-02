// FileViewer.jsx (updated - uses documentViewer 'click' event and safe mapping + stable double-click)

import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

export const FileViewer = ({
  initialDoc,
  onReady,
  scale = "1:100",
  style = { height: "100%", width: "100%" },
  python = import.meta.env.VITE_PYTHON_API_URL || "http://localhost:8000",
}) => {
  const viewerRef = useRef(null);
  const instanceRef = useRef(null);
  const clickTimer = useRef(null);

  // Convert normalized polygon -> PDF coordinates
  // NOTE: ML normalizes relative to rendered image; we map normalized -> PDF (page) coords
  const mapNormalizedToPdfPoints = async (pageNumber, pts) => {
    const inst = instanceRef.current;
    if (!inst) return [];
    const docViewer = inst.Core.documentViewer;
    const doc = docViewer.getDocument();
    // pageInfo.width/height are page coordinates (PDF space)
    const pageInfo = doc.getPageInfo(pageNumber);

    return pts.map(([nx, ny]) => ({
      x: nx * pageInfo.width,
      // ML normalized Y is from top, PDF coord origin is bottom-left -> convert using (1 - ny) * pageHeight
      y: (1 - ny) * pageInfo.height,
    }));
  };

  // Draw Polygon (PDF coordinates)
  async function drawPolygon(pageNum, polygon) {
    if (!polygon || polygon.length < 3) return;

    const inst = instanceRef.current;
    const Core = inst.Core;
    const annotManager = Core.annotationManager;

    const pdfPts = await mapNormalizedToPdfPoints(pageNum, polygon);

    const PolygonAnnotation = Core.Annotations.PolygonAnnotation;
    const annot = new PolygonAnnotation({
      PageNumber: pageNum,
      points: pdfPts,
      StrokeColor: new Core.Annotations.Color(255, 0, 0),
      FillColor: new Core.Annotations.Color(255, 0, 0),
      Opacity: 0.2,
      StrokeThickness: 2,
    });

    annotManager.addAnnotation(annot);
    annotManager.redrawAnnotation(annot);
  }

  // Safe conversion from click event -> { page, pdfPt }
  const getPdfPointSafe = (instance, e) => {
    if (!instance || !e) return null;
    const { Core } = instance;
    const docViewer = Core.documentViewer;
    const displayMode = docViewer.getDisplayModeManager().getDisplayMode();
    const scrollElement = docViewer.getScrollViewElement();
    const rect = scrollElement.getBoundingClientRect();

    // Convert client coordinates -> window coords inside viewer content (account scroll)
    const windowX = e.clientX - rect.left + (scrollElement.scrollLeft || 0);
    const windowY = e.clientY - rect.top + (scrollElement.scrollTop || 0);

    // find page number under that window coord
    const pages = displayMode.getSelectedPages({ x: windowX, y: windowY }, { x: windowX, y: windowY });
    const page = (pages && pages.first) ? pages.first : docViewer.getCurrentPage();

    // window -> page coordinates
    const pageCoords = displayMode.windowToPage({ x: windowX, y: windowY }, page);

    // page -> PDF coordinates
    const doc = docViewer.getDocument();
    const pdfPt = doc.getPDFCoordinates(page, pageCoords.x, pageCoords.y);

    return { page, pdfPt };
  };

  // single click handler (called after timeout)
  const handleSingleClick = async (instance, e) => {
    const p = getPdfPointSafe(instance, e);
    if (!p) return;
    const { page, pdfPt } = p;
    const pdfName = (initialDoc || "").split("/").pop();

    try {
      const match = await fetch(`${python}/match-click/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: pdfPt.x,
          y: pdfPt.y,
          pageNum: page,
          pdfPath: pdfName,
        }),
      }).then((r) => r.json());

      if (match.status === "success" && match.region?.polygon) {
        drawPolygon(page, match.region.polygon);
      }
    } catch (err) {
      console.error("single-click error", err);
    }
  };

  // double click handler (called if a second click happens quickly)
  const handleDoubleClick = async (instance, e) => {
    const p = getPdfPointSafe(instance, e);
    if (!p) return;
    const { page, pdfPt } = p;
    const pdfName = (initialDoc || "").split("/").pop();

    try {
      const match = await fetch(`${python}/match-click/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: pdfPt.x,
          y: pdfPt.y,
          pageNum: page,
          pdfPath: pdfName,
        }),
      }).then((r) => r.json());

      if (match.status === "success" && match.region?.polygon) {
        drawPolygon(page, match.region.polygon);
      }

      // analyze area as well (double-click semantic)
      const area = await fetch(`${python}/analyze_area`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: pdfPt.x,
          y: pdfPt.y,
          pageNum: page,
          pdfPath: pdfName,
        }),
      }).then((r) => r.json());

      console.log("double-click area:", area);
      // you can show area popup here if desired
    } catch (err) {
      console.error("double-click error", err);
    }
  };

  // click dispatcher with timeout for double-click detection
  const handleClick = (instance, e) => {
    // guard
    if (!e || typeof e.clientX !== "number") return;

    if (clickTimer.current) {
      // second click within timeout -> double click
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      handleDoubleClick(instance, e);
      return;
    }

    // first click -> set single-click timer
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      handleSingleClick(instance, e);
    }, 240); // 200-260 ms typical
  };

  // Run ML on load
  useEffect(() => {
    if (!initialDoc) return;
    (async () => {
      try {
        const name = initialDoc.split("/").pop();
        const blob = await fetch(initialDoc).then((r) => r.blob());

        const form = new FormData();
        form.append("file", blob, name);
        form.append("scale", scale);
        form.append("dpi", "300");

        const res = await fetch(`${python}/ml-analyze-areas/`, {
          method: "POST",
          body: form,
        });

        console.log("ML result:", await res.json());
      } catch (err) {
        console.error("ML error:", err);
      }
    })();
  }, [initialDoc]);

  // Init viewer
  useEffect(() => {
    if (!viewerRef.current) return;

    WebViewer(
      {
        path: "/lib",
        initialDoc,
        fullAPI: true,
        enableMeasurement: true,
        measurement: { scale, unit: "m" },
      },
      viewerRef.current
    ).then((instance) => {
      instanceRef.current = instance;
      const { Core } = instance;
      const docViewer = Core.documentViewer;

      // Use higher level 'click' event to avoid internal mouse-move stubs
      docViewer.addEventListener("click", (e) => {
        try {
          handleClick(instance, e);
        } catch (err) {
          console.error("click handler err", err);
        }
      });

      if (onReady) onReady(instance);
    });

    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, [initialDoc]);

  return (
    <div style={{ ...style }}>
      <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default FileViewer;
