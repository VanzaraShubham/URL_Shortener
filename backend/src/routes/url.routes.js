import express from "express";
import {
  getUserUrls,
  handleAnalytics,
  handleNewShortURL,
} from "../controllers/url.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, handleNewShortURL);
router.get("/analytics/:shortId", handleAnalytics);
router.get("/myurls", authMiddleware, getUserUrls);

export default router;