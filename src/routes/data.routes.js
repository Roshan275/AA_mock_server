import express from "express";
import {
  ingestRawData,
  getLatestSnapshot
} from "../controllers/data.controller.js";

const router = express.Router();

router.post("/", ingestRawData);
router.get("/latest", getLatestSnapshot);

export default router;
