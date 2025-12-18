// import { useEffect, useRef } from "react";
// import "pdfjs-dist/web/pdf_viewer.css";
// import { useLocation } from "react-router-dom";
 
// import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
 
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
 
// const PdfPage = () => {
//   const location = useLocation();
//   const pdfPath = location.state?.pdf || "/sample.pdf";
//   const pdfFileName = pdfPath.split("/").pop();
 
//   const pdfCanvasRef = useRef(null);
//   const overlayCanvasRef = useRef(null);
 
 
 
//   let clickTimeout = null;
 
//   useEffect(() => {
//     const loadPDF = async () => {
//       try {
//         const pdf = await pdfjsLib.getDocument(pdfPath).promise;
//         const page = await pdf.getPage(1);
 
//         const viewport = page.getViewport({ scale: 1.4 });
 
//         const pdfCanvas = pdfCanvasRef.current;
//         const pdfCtx = pdfCanvas.getContext("2d");
 
//         pdfCanvas.width = viewport.width;
//         pdfCanvas.height = viewport.height;
 
//         const overlayCanvas = overlayCanvasRef.current;
//         overlayCanvas.width = viewport.width;
//         overlayCanvas.height = viewport.height;
 
//         await page.render({
//           canvasContext: pdfCtx,
//           viewport
//         }).promise;
 
//       } catch (err) {
//         console.error("PDF Load Error:", err);
//       }
//     };
 
//     loadPDF();
//   }, [pdfPath]);
 
 
// const drawPolygon = (x, y) => {
 
 
//    const ctx = overlayCanvasRef.current.getContext("2d");
 
//   ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
 
//   ctx.strokeStyle = "red";
//   ctx.lineWidth = 2;
//   ctx.fillStyle = "rgba(255,0,0,0.2)";
 
//   const numPoints = Math.floor(Math.random() * 5) + 3;
 
//   ctx.beginPath();
 
//   for (let i = 0; i < numPoints; i++) {
//     const angle = ((Math.PI * 2) / numPoints) * i + Math.random() * 0.5;
 
//     const radius = Math.random() * 70 + 80;
 
//     const px = x + radius * Math.cos(angle);
//     const py = y + radius * Math.sin(angle);
 
//     if (i === 0) ctx.moveTo(px, py);
//     else ctx.lineTo(px, py);
//   }
 
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
 
// };
 
 
//   const handleClickEvent = (e, type) => {
 
//     // using model
 
//     // const rect = pdfCanvasRef.current.getBoundingClientRect();
//     // const x = e.clientX - rect.left;
//     // const y = e.clientY - rect.top;
 
//     // console.log(`${type} → Coords:`, x, y);
 
//     // drawPolygon(x, y); // draw highlight on UI
 
//     // const endpoint =
//     //   type === "single"
//     //     ? "http://localhost:8000/match-click/"
//     //     : "http://localhost:8000/analyze_area/";
 
//     // const payload = { x, y, pageNum: 1, pdfPath: pdfFileName };
 
//     // fetch(endpoint, {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify(payload),
//     // })
//     //   .then((res) => res.json())
//     //   .then((res) => console.log(`${type} response:`, res))
//     //   .catch((err) => console.error(`${type} error:`, err));
 
 
 
// // on the point
 
 
//     const canvas = overlayCanvasRef.current;
//   const rect = canvas.getBoundingClientRect();
 
//   const scaleX = canvas.width / rect.width;
//   const scaleY = canvas.height / rect.height;
 
//   const x = (e.clientX - rect.left) * scaleX;
//   const y = (e.clientY - rect.top) * scaleY;
 
//   drawPolygon(x, y);
 
//   };
 
//   const handleClick = (e) => {
//     if (clickTimeout) clearTimeout(clickTimeout);
 
//     clickTimeout = setTimeout(() => {
//       handleClickEvent(e, "single");
//     }, 250);
//   };
 
//   const handleDoubleClick = (e) => {
//     if (clickTimeout) clearTimeout(clickTimeout);
//     handleClickEvent(e, "double");
//   };
 
//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
     
//       {/* PDF Canvas */}
//       <canvas
//         ref={pdfCanvasRef}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           display: "block"
//         }}
//       />
 
//       {/* Overlay Drawing Canvas */}
//       <canvas
//         ref={overlayCanvasRef}
//         onClick={handleClick}
//         onDoubleClick={handleDoubleClick}
//         style={{
//           width: "100vw",
//           height: "100vh",
//           cursor: "crosshair",
//           position: "absolute",
//           top: 0,
//           left: 0
//         }}
//       />
 
//     </div>
//   );
// };
 
// export default PdfPage;




// // match ccnsdcnsdncsdn new code//




 
// import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "pdfjs-dist/web/pdf_viewer.css";

// import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// // ================= CONFIG =================
// const PYTHON_API = "http://localhost:8000";
// const SCALE_STRING = "1:100";
// const DPI = 300;

// // ---------- STATIC POLYGONS (TEST DATA) ----------
// const STATIC_POLYGONS = [
//   {
//     id: "room_101",
//     roomType: "bedroom",
//     polygon: [
//       [0.12, 0.18],
//       [0.42, 0.18],
//       [0.42, 0.42],
//       [0.12, 0.42]
//     ]
//   },
//   {
//     id: "room_102",
//     roomType: "kitchen",
//     polygon: [
//       [0.45, 0.20],
//       [0.70, 0.20],
//       [0.70, 0.45],
//       [0.45, 0.45]
//     ]
//   }
// ];

// // ---------- ROOM COLORS ----------
// const ROOM_COLORS = {
//   bedroom: "rgba(0,128,255,0.35)",
//   kitchen: "rgba(255,165,0,0.35)",
//   default: "rgba(255,0,0,0.25)"
// };
// // ==========================================

// const PdfPage = () => {
//   const location = useLocation();
//   const pdfPath = location.state?.pdf || "/sample.pdf";
//   const pdfFileName = pdfPath.split("/").pop();

//   const pdfCanvasRef = useRef(null);
//   const overlayCanvasRef = useRef(null);

//   const pdfRef = useRef(null);

//   const [zoom, setZoom] = useState(1.4);
//   const [pageNum] = useState(1);

//   // Dynamic polygons (from backend)
//   const dynamicPolygonRef = useRef(null);

//   // Active highlight
//   const [activeId, setActiveId] = useState(null);

//   let clickTimeout = null;

//   // ================= PDF LOAD =================
//   useEffect(() => {
//     const load = async () => {
//       const pdf = await pdfjsLib.getDocument(pdfPath).promise;
//       pdfRef.current = pdf;
//       await renderPage(pageNum, zoom);
//     };
//     load();
//   }, [pdfPath, zoom]);

//   const renderPage = async (pageNumber, scale) => {
//     const page = await pdfRef.current.getPage(pageNumber);
//     const viewport = page.getViewport({ scale });

//     const pdfCanvas = pdfCanvasRef.current;
//     const overlayCanvas = overlayCanvasRef.current;
//     if (!pdfCanvas || !overlayCanvas) return;

//     pdfCanvas.width = viewport.width;
//     pdfCanvas.height = viewport.height;

//     overlayCanvas.width = viewport.width;
//     overlayCanvas.height = viewport.height;

//     await page.render({
//       canvasContext: pdfCanvas.getContext("2d"),
//       viewport
//     }).promise;

//     redrawAll();
//   };

//   // ================= COORD HELPERS =================
//   const getCanvasPoint = (e) => {
//     const canvas = overlayCanvasRef.current;
//     const rect = canvas.getBoundingClientRect();

//     return {
//       x: (e.clientX - rect.left) * (canvas.width / rect.width),
//       y: (e.clientY - rect.top) * (canvas.height / rect.height)
//     };
//   };

//   const normalizedToCanvas = (polygon) => {
//     const canvas = overlayCanvasRef.current;
//     return polygon.map(([nx, ny]) => ({
//       x: nx * canvas.width,
//       y: (1 - ny) * canvas.height
//     }));
//   };

//   // ================= GEOMETRY =================
//   const pointInPolygon = (pt, poly) => {
//     let inside = false;
//     for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
//       const xi = poly[i].x, yi = poly[i].y;
//       const xj = poly[j].x, yj = poly[j].y;

//       const intersect =
//         yi > pt.y !== yj > pt.y &&
//         pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi) + xi;
//       if (intersect) inside = !inside;
//     }
//     return inside;
//   };

//   // ================= DRAWING =================
//   const drawPolygon = (pts, color, label) => {
//     const ctx = overlayCanvasRef.current.getContext("2d");
//     ctx.beginPath();
//     pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
//     ctx.closePath();

//     ctx.fillStyle = color;
//     ctx.strokeStyle = "black";
//     ctx.lineWidth = 1.5;
//     ctx.fill();
//     ctx.stroke();

//     if (label) {
//       const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
//       const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
//       ctx.fillStyle = "#000";
//       ctx.font = "12px sans-serif";
//       ctx.fillText(label, cx - 10, cy);
//     }
//   };

//   const redrawAll = () => {
//     const canvas = overlayCanvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // STATIC
//     STATIC_POLYGONS.forEach((p) => {
//       const pts = normalizedToCanvas(p.polygon);
//       drawPolygon(
//         pts,
//         ROOM_COLORS[p.roomType] || ROOM_COLORS.default,
//         p.roomType
//       );
//     });

//     // DYNAMIC (priority)
//     if (dynamicPolygonRef.current) {
//       const pts = normalizedToCanvas(dynamicPolygonRef.current.polygon);
//       drawPolygon(pts, "rgba(0,255,0,0.45)", dynamicPolygonRef.current.roomType);
//     }
//   };

//   // ================= CLICK =================
//   const handleClickEvent = async (e, type) => {
//     const pt = getCanvasPoint(e);

//     const res = await fetch(
//       `${PYTHON_API}/${type === "double" ? "analyze_area" : "match-click"}/`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           x: pt.x,
//           y: pt.y,
//           pageNum,
//           pdfPath: pdfFileName,
//           scale: SCALE_STRING,
//           dpi: DPI
//         })
//       }
//     );

//     const data = await res.json();

//     // -------- DYNAMIC FIRST --------
//     if (data?.region?.polygon) {
//       dynamicPolygonRef.current = data.region;
//       redrawAll();
//       return;
//     }

//     // -------- FALLBACK TO STATIC --------
//     for (const poly of STATIC_POLYGONS) {
//       const canvasPoly = normalizedToCanvas(poly.polygon);
//       if (pointInPolygon(pt, canvasPoly)) {
//         setActiveId(poly.id);
//         break;
//       }
//     }
//   };

//   const handleClick = (e) => {
//     if (clickTimeout) clearTimeout(clickTimeout);
//     clickTimeout = setTimeout(() => handleClickEvent(e, "single"), 250);
//   };

//   const handleDoubleClick = (e) => {
//     if (clickTimeout) clearTimeout(clickTimeout);
//     handleClickEvent(e, "double");
//   };

//   // ================= UI =================
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <div style={{ padding: 8, background: "#fff" }}>
//         <button onClick={() => setZoom(z => z + 0.2)}>＋</button>
//         <button onClick={() => setZoom(z => Math.max(0.6, z - 0.2))}>－</button>
//         <span style={{ marginLeft: 12 }}>Scale: {SCALE_STRING}</span>
//       </div>

//       <div style={{ position: "relative" }}>
//         <canvas ref={pdfCanvasRef} />
//         <canvas
//           ref={overlayCanvasRef}
//           style={{ position: "absolute", top: 0, left: 0, cursor: "crosshair" }}
//           onClick={handleClick}
//           onDoubleClick={handleDoubleClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default PdfPage;

// /ultranew

// import { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import "pdfjs-dist/web/pdf_viewer.css";

// import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// // ================= CONFIG =================
// const PYTHON_API = "http://localhost:8000";
// const SCALE_STRING = "1:100";
// const DPI = 300;

// // Image size used by backend / ML
// const IMAGE_WIDTH = 2480;
// const IMAGE_HEIGHT = 3509;

// // ---------- STATIC POLYGONS (NORMALIZED 0–1) ----------
// const STATIC_POLYGONS = [
//   {
//     id: "room_101",
//     roomType: "bedroom",
//     polygon: [
//       [0.12, 0.18],
//       [0.42, 0.18],
//       [0.42, 0.42],
//       [0.12, 0.42]
//     ]
//   },
//   {
//     id: "room_102",
//     roomType: "kitchen",
//     polygon: [
//       [0.45, 0.20],
//       [0.70, 0.20],
//       [0.70, 0.45],
//       [0.45, 0.45]
//     ]
//   }
// ];

// // ---------- COLORS ----------
// const ROOM_COLORS = {
//   bedroom: "rgba(0,128,255,0.35)",
//   kitchen: "rgba(255,165,0,0.35)",
//   dynamic: "rgba(0,255,0,0.45)",
//   default: "rgba(255,0,0,0.25)"
// };

// const PdfPage = () => {
//   const location = useLocation();
//   const pdfPath = location.state?.pdf || "/sample.pdf";
//   const pdfFileName = pdfPath.split("/").pop();

//   const pdfCanvasRef = useRef(null);
//   const overlayCanvasRef = useRef(null);
//   const pdfRef = useRef(null);

//   const [zoom, setZoom] = useState(1.4);
//   const [pageNum] = useState(1);

//   const dynamicPolygonRef = useRef(null);
//   const clickTimerRef = useRef(null);

//   // ================= LOAD PDF =================
//   useEffect(() => {
//     (async () => {
//       const pdf = await pdfjsLib.getDocument(pdfPath).promise;
//       pdfRef.current = pdf;
//       await renderPage(pageNum, zoom);
//     })();
//   }, [pdfPath, zoom]);

//   const renderPage = async (pageNumber, scale) => {
//     const page = await pdfRef.current.getPage(pageNumber);
//     const viewport = page.getViewport({ scale });

//     const pdfCanvas = pdfCanvasRef.current;
//     const overlayCanvas = overlayCanvasRef.current;
//     if (!pdfCanvas || !overlayCanvas) return;

//     pdfCanvas.width = viewport.width;
//     pdfCanvas.height = viewport.height;
//     overlayCanvas.width = viewport.width;
//     overlayCanvas.height = viewport.height;

//     await page.render({
//       canvasContext: pdfCanvas.getContext("2d"),
//       viewport
//     }).promise;

//     redrawAll();
//   };

//   // ================= COORD HELPERS =================
//   const getCanvasPoint = (e) => {
//     const canvas = overlayCanvasRef.current;
//     if (!canvas) return null;

//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: (e.clientX - rect.left) * (canvas.width / rect.width),
//       y: (e.clientY - rect.top) * (canvas.height / rect.height)
//     };
//   };

//   const canvasToImagePoint = (pt) => {
//     const canvas = overlayCanvasRef.current;
//     return {
//       x: (pt.x / canvas.width) * IMAGE_WIDTH,
//       y: (pt.y / canvas.height) * IMAGE_HEIGHT
//     };
//   };

//   const normalizedToCanvas = (polygon) => {
//     const canvas = overlayCanvasRef.current;
//     return polygon.map(([nx, ny]) => ({
//       x: nx * canvas.width,
//       y: ny * canvas.height
//     }));
//   };

//   // ================= GEOMETRY =================
//   const dist2 = (a, b) => {
//     const dx = a.x - b.x;
//     const dy = a.y - b.y;
//     return dx * dx + dy * dy;
//   };

//   const pointToSegmentDistance = (p, v, w) => {
//     const l2 = dist2(v, w);
//     if (l2 === 0) return Math.sqrt(dist2(p, v));

//     let t =
//       ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
//     t = Math.max(0, Math.min(1, t));

//     return Math.sqrt(
//       dist2(p, {
//         x: v.x + t * (w.x - v.x),
//         y: v.y + t * (w.y - v.y)
//       })
//     );
//   };

//   const distanceToPolygon = (pt, polygon) => {
//     let min = Infinity;
//     for (let i = 0; i < polygon.length - 1; i++) {
//       min = Math.min(
//         min,
//         pointToSegmentDistance(pt, polygon[i], polygon[i + 1])
//       );
//     }
//     return min;
//   };

//   // ================= DRAW =================
//   const drawPolygon = (pts, color, label) => {
//     const canvas = overlayCanvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.beginPath();
//     pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
//     ctx.closePath();

//     ctx.fillStyle = color;
//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 1.2;
//     ctx.fill();
//     ctx.stroke();

//     if (label) {
//       const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
//       const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
//       ctx.fillStyle = "#000";
//       ctx.font = "12px sans-serif";
//       ctx.fillText(label, cx - 10, cy);
//     }
//   };

//   const redrawAll = () => {
//     const canvas = overlayCanvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Static
//     STATIC_POLYGONS.forEach((p) => {
//       drawPolygon(
//         normalizedToCanvas(p.polygon),
//         ROOM_COLORS[p.roomType] || ROOM_COLORS.default,
//         p.roomType
//       );
//     });

//     // Dynamic
//     if (dynamicPolygonRef.current) {
//       drawPolygon(
//         normalizedToCanvas(dynamicPolygonRef.current.polygon),
//         ROOM_COLORS.dynamic,
//         dynamicPolygonRef.current.roomType
//       );
//     }
//   };

//   // ================= CLICK =================
//   const handleClickEvent = async (e, mode) => {
//     const canvasPt = getCanvasPoint(e);
//     if (!canvasPt) return;

//     const imagePt = canvasToImagePoint(canvasPt);

//     // ---------- BACKEND ----------
//     const res = await fetch(
//       `${PYTHON_API}/${mode === "double" ? "analyze_area" : "match-click"}/`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           x: imagePt.x,
//           y: imagePt.y,
//           pageNum,
//           pdfPath: pdfFileName,
//           scale: SCALE_STRING,
//           dpi: DPI
//         })
//       }
//     );

//     const data = await res.json();

//     if (data?.region?.polygon) {
//       dynamicPolygonRef.current = data.region;
//       redrawAll();
//       return;
//     }

//     // ---------- STATIC FALLBACK (NEAREST) ----------
//     let nearest = null;
//     let min = Infinity;

//     STATIC_POLYGONS.forEach((p) => {
//       const imgPoly = p.polygon.map(([nx, ny]) => ({
//         x: nx * IMAGE_WIDTH,
//         y: ny * IMAGE_HEIGHT
//       }));
//       const d = distanceToPolygon(imagePt, imgPoly);
//       if (d < min) {
//         min = d;
//         nearest = p;
//       }
//     });

//     if (nearest && min < 100) {
//       console.log("STATIC MATCH:", nearest);
//     }
//   };

//   const handleClick = (e) => {
//     clearTimeout(clickTimerRef.current);
//     clickTimerRef.current = setTimeout(() => handleClickEvent(e, "single"), 250);
//   };

//   const handleDoubleClick = (e) => {
//     clearTimeout(clickTimerRef.current);
//     handleClickEvent(e, "double");
//   };

//   // ================= UI =================
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <div style={{ padding: 8, background: "#fff" }}>
//         <button onClick={() => setZoom((z) => z + 0.2)}>＋</button>
//         <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}>－</button>
//         <span style={{ marginLeft: 12 }}>Scale: {SCALE_STRING}</span>
//       </div>

//       <div style={{ position: "relative" }}>
//         <canvas ref={pdfCanvasRef} />
//         <canvas
//           ref={overlayCanvasRef}
//           style={{ position: "absolute", inset: 0, cursor: "crosshair" }}
//           onClick={handleClick}
//           onDoubleClick={handleDoubleClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default PdfPage;

 

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "pdfjs-dist/web/pdf_viewer.css";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PYTHON_API = "http://localhost:8000";
const SCALE_STRING = "1:100";
const DPI = 300;

const IMG_W = 2480;
const IMG_H = 3509;

const STATIC_POLYGONS = [
  {
    id: "guest_house",
    name: "Guest House",
    polygon_px: [
      [891, 1148],
      [941, 1168],
      [1031, 1161],
      [1081, 1148],
      [1051, 1118],
      [1046, 1083],
      [1026, 1078],
      [1006, 1048],
      [976, 1053],
      [936, 1053],
      [891, 1053],
      [886, 1118],
      [891, 1148]
    ]
  }
];

const HIGHLIGHT_COLOR = "rgba(255,0,0,0.30)";
const ACTIVE_COLOR = "rgba(0,128,255,0.45)";

const PdfPage = () => {
  const location = useLocation();
  const pdfPath = location.state?.pdf || "/sample.pdf";

  const pdfCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);

  const [zoom] = useState(1.4);
  const [activeRegion, setActiveRegion] = useState(null);

  let clickTimeout = null;

  useEffect(() => {
    const loadPDF = async () => {
      const pdf = await pdfjsLib.getDocument(pdfPath).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: zoom });

      const pdfCanvas = pdfCanvasRef.current;
      const overlayCanvas = overlayCanvasRef.current;

      pdfCanvas.width = viewport.width;
      pdfCanvas.height = viewport.height;

      overlayCanvas.width = viewport.width;
      overlayCanvas.height = viewport.height;

      await page.render({
        canvasContext: pdfCanvas.getContext("2d"),
        viewport
      }).promise;

      redraw();
    };

    loadPDF();
  }, [pdfPath, zoom]);

  const getCanvasPoint = (e) => {
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const imageToCanvas = (polygonPx) => {
    const canvas = overlayCanvasRef.current;
    const sx = canvas.width / IMG_W;
    const sy = canvas.height / IMG_H;

    return polygonPx.map(([x, y]) => ({
      x: x * sx,
      y: y * sy
    }));
  };

  const distance = (a, b) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const distanceToPolygon = (pt, poly) =>
    Math.min(...poly.map(p => distance(pt, p)));

  const drawPolygon = (pts, color, label) => {
    const ctx = overlayCanvasRef.current.getContext("2d");

    ctx.beginPath();
    pts.forEach((p, i) =>
      i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
    );
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    if (label) {
      const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      ctx.fillStyle = "#000";
      ctx.font = "14px sans-serif";
      ctx.fillText(label, cx - 30, cy);
    }
  };

  const redraw = () => {
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    STATIC_POLYGONS.forEach((r) => {
      const pts = imageToCanvas(r.polygon_px);
      drawPolygon(
        pts,
        activeRegion?.id === r.id ? ACTIVE_COLOR : HIGHLIGHT_COLOR,
        r.name
      );
    });
  };

  const handleClickEvent = (e) => {
    const clickPt = getCanvasPoint(e);

    let nearest = null;
    let minDist = Infinity;

    STATIC_POLYGONS.forEach((r) => {
      const pts = imageToCanvas(r.polygon_px);
      const d = distanceToPolygon(clickPt, pts);

      if (d < minDist) {
        minDist = d;
        nearest = r;
      }
    });

    if (nearest && minDist < 25) {
      setActiveRegion(nearest);
      redraw();
      console.log("Matched:", nearest.name);
    }
  };

  const handleClick = (e) => {
    if (clickTimeout) clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => handleClickEvent(e), 250);
  };

  const handleDoubleClick = (e) => {
    if (clickTimeout) clearTimeout(clickTimeout);
    handleClickEvent(e);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <canvas
        ref={pdfCanvasRef}
        style={{ width: "100vw", height: "100vh"}}
      />

      <canvas
        ref={overlayCanvasRef}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          cursor: "crosshair"
        }}
      />

      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "#fff",
        padding: 6,
        fontWeight: "bold"
      }}>
        Scale: {SCALE_STRING}
      </div>
    </div>
  );
};

export default PdfPage;
