// FileViewer.jsx
import React, { useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";
import { useNavigate } from "react-router-dom";
 
// -------------------------------------------------------------
// SCALE LOGIC (Only addition you requested)
// -------------------------------------------------------------
function parseScaleString(scaleStr) {
  try {
    if (!scaleStr.includes(":")) return null;
 
    const [a, b] = scaleStr.split(":").map(Number);
    if (!a || !b) return null;
 
    // 1 mm on paper = (b / 1000) meters in reality
    return [
      [1.0, "mm"],
      [b / 1000, "m"],
    ];
  } catch {
    return null;
  }
}
 
 
 
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
  const navigate = useNavigate();
 
  // Convert normalized polygon -> PDF coordinates
  const mapNormalizedToPdfPoints = async (pageNumber, pts) => {
    const inst = instanceRef.current;
    if (!inst) return [];
    const doc = inst.Core.documentViewer.getDocument();
    const pageInfo = doc.getPageInfo(pageNumber);
    const pageW = pageInfo.width;
    const pageH = pageInfo.height;
 
    return pts.map(([nx, ny]) => ({
      x: nx * pageW,
      y: (1 - ny) * pageH,
    }));
  };
 
  async function drawPolygon(pageNum, polygon) {
    if (!polygon || polygon.length < 3) return;
    const inst = instanceRef.current;
    const Core = inst.Core;
    const annotManager = Core.annotationManager;
 
    const pdfPts = await mapNormalizedToPdfPoints(pageNum, polygon);
 
    const PolygonAnnotation = Core.Annotations.PolygonAnnotation;
    const annot = new PolygonAnnotation({
      PageNumber: pageNum,
      StrokeColor: new Core.Annotations.Color(255, 0, 0),
      FillColor: new Core.Annotations.Color(255, 0, 0),
      Opacity: 0.18,
      StrokeThickness: 1.5,
      points: pdfPts,
    });
 
    annotManager.addAnnotation(annot);
    annotManager.redrawAnnotation(annot);
  }
 
  useEffect(() => {
    if (!initialDoc) return;
 
    (async () => {
      try {
        const pdfFileName = initialDoc.split("/").pop();
        const blob = await fetch(initialDoc).then((r) => r.blob());
        const form = new FormData();
        form.append("file", blob, pdfFileName);
        form.append("scale", scale);
        form.append("dpi", "300");
 
        const res = await fetch(`${python}/ml-analyze-areas/`, {
          method: "POST",
          body: form,
        });
        const out = await res.json();
        console.log("ML Response:", out);
      } catch (err) {
        console.warn("ML analyze failed on load:", err);
      }
    })();
  }, [initialDoc]);
 
  // --------------------------------------------------------------------
  // WEBVIEWER INIT + SCALE INJECTION (ONLY CHANGE HERE)
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!viewerRef.current) return;
 
    WebViewer(
      {
        path: "/lib",
        initialDoc,
        fullAPI: true,
        enableMeasurement: true,
        licenseKey:
                  "demo:1761123365955:6037f7980300000000c02284b2ab837864896375330574920f025b561c",
      },
      viewerRef.current
    ).then((instance) => {
      instanceRef.current = instance;
      const Core = instance.Core;
      const docViewer = Core.documentViewer;
 
      // -------------------------------------------------------------
      // 🔥 Apply Scale to Distance / Area / Perimeter Tools
      // -------------------------------------------------------------
      const scaleArray = parseScaleString(scale);
      if (scaleArray) {
        const tools = [
          "AnnotationCreateDistanceMeasurement",
          "AnnotationCreatePerimeterMeasurement",
          "AnnotationCreateAreaMeasurement",
        ];
 
        for (const t of tools) {
          const tool = docViewer.getTool(t);
          if (!tool?.setStyles) continue;
 
          tool.setStyles({
            Scale: scaleArray,
            Precision: 0.001,
          });
 
          tool.defaults = tool.defaults || {};
          tool.defaults.Scale = scaleArray;
          tool.defaults.Precision = 0.001;
        }
 
        console.log("🔥 Measurement scale applied:", scaleArray);
      }
 
      // -------------------------------------------------------------
      // BELOW THIS LINE = UNTOUCHED ORIGINAL LOGIC
      // -------------------------------------------------------------
 
      const domToPdfPoint = (pageNum, viewerX, viewerY) => {
        const dm = docViewer.getDisplayModeManager().getDisplayMode();
        const pageMatrix = dm.getMatrix(pageNum);
        const inv = pageMatrix.inverse();
        const pt = new Core.Math.Point(viewerX, viewerY);
        const pdfPt = inv.transformPoint(pt);
        return { x: pdfPt.x, y: pdfPt.y };
      };
 
      docViewer.addEventListener("mouseLeftDown", async (e) => {
        const pageNum = docViewer.getCurrentPage();
        const doc = docViewer.getDocument();
 
        const scrollView = docViewer.getScrollViewElement();
        const rect = scrollView.getBoundingClientRect();
        const viewerX = e.clientX - rect.left;
        const viewerY = e.clientY - rect.top;
 
        let pdfPt;
        try {
          pdfPt = domToPdfPoint(pageNum, viewerX, viewerY);
        } catch (err) {
          const fallback = doc.getPDFCoordinates(pageNum, viewerX, viewerY);
          pdfPt = fallback || { x: viewerX, y: viewerY };
        }
 
        if (!pdfPt) return;
 
        const pdfFileName = initialDoc.split("/").pop();
        const DOUBLE_MS = 280;
 
        if (clickTimer.current) {
          clearTimeout(clickTimer.current);
          clickTimer.current = null;
 
          try {
            const matchRes = await fetch(`${python}/match-click/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                x: pdfPt.x,
                y: pdfPt.y,
                pageNum,
                pdfPath: pdfFileName,
              }),
            });
            const match = await matchRes.json();
            console.log("double-click match:", match);
 
            if (match?.status === "success" && match?.region?.polygon) {
              await drawPolygon(pageNum, match.region.polygon);
            }
 
            const areaRes = await fetch(`${python}/analyze_area`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                x: pdfPt.x,
                y: pdfPt.y,
                pageNum,
                pdfPath: pdfFileName,
              }),
            });
            const areaJson = await areaRes.json();
            console.log("double-click area:", areaJson);
 
            const region_id = match?.region?.region_id || match?.region?.uuid;
            const area_m2 = areaJson?.area;
            const room_name =
              match?.region?.label || match?.region?.room_name || "Unknown";
            const project_name =
              localStorage.getItem("current_project") || "DefaultProject";
 
            if (area_m2 && region_id) {
              await fetch(`${import.meta.env.VITE_API_URL}/api/takeoff/store`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  project_name,
                  room_name,
                  region_id,
                  area_m2,
                }),
              });
              console.log("Takeoff stored successfully");
            }
          } catch (err) {
            console.error("Double-click error:", err);
          }
 
          return;
        }
 
        clickTimer.current = setTimeout(async () => {
          clickTimer.current = null;
 
          try {
            const matchRes = await fetch(`${python}/match-click/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                x: pdfPt.x,
                y: pdfPt.y,
                pageNum,
                pdfPath: pdfFileName,
              }),
            });
            const match = await matchRes.json();
            console.log("single-click match:", match);
 
            if (match?.status === "success" && match?.region?.polygon) {
              await drawPolygon(pageNum, match.region.polygon);
            }
          } catch (err) {
            console.error("Single-click error:", err);
          }
        }, DOUBLE_MS);
      });
 
      if (onReady) onReady(instance);
    });
 
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, [initialDoc, onReady, python, scale]);
 
  return (
    <div style={{ ...style, position: "relative" }}>
   
   <div
  style={{
    padding: "12px 16px",
    background: "#f4f6f8",
    borderRadius: "12px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  }}
>
  <button
    onClick={() => navigate("/view-pdf", { state: { pdf: initialDoc } })}
    style={{
      background: "#0052cc",
      color: "white",
      padding: "8px 16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: 500,
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      transition: "0.2s ease",
    }}
    onMouseOver={(e) => (e.target.style.background = "#0747a6")}
    onMouseOut={(e) => (e.target.style.background = "#0052cc")}
  >
    Single Click Analyses
  </button>
</div>
 
      <div ref={viewerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
 
export default FileViewer;
 
 