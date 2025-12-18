// routes/takeoffRoutes.js
const express = require("express");
const router = express.Router();

const MasterBOQ = require("../models/MasterBOQ");
const BOQProject = require("../models/BOQProject");
const TakeoffResult = require("../models/TakeoffResult");

router.post("/store", async (req, res) => {
  try {
    const { project_name, room_name, region_id, area_m2 } = req.body;

    // ensure project exists
    let doc = await TakeoffResult.findOne({ project_name });

    if (!doc) {
      doc = new TakeoffResult({
        project_name,
        results: [],
      });
    }

    // find match or create new
    const idx = doc.results.findIndex((r) => r.region_id === region_id);

    if (idx >= 0) {
      doc.results[idx].measured_area_m2 = area_m2;
    } else {
      doc.results.push({
        region_id,
        room_name,
        measured_area_m2: area_m2,
      });
    }

    await doc.save();

    return res.json({
      status: "success",
      saved: true,
      project_name,
      region_id,
      area_m2,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to store takeoff result" });
  }
});

module.exports = router;
