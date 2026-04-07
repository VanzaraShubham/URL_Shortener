import { nanoid } from "nanoid";
import URL from "../models/url.js";

// CREATE SHORT URL (USER BASED)
export const handleNewShortURL = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "URL required" });

    const shortId = nanoid(7);

    const newUrl = await URL.create({
      shortId,
      redirectURL: url,
      userId: req.user.id,
      visitHistory: [],
    });

    res.status(201).json({
      shortURL: `http://localhost:3000/${shortId}`,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create URL" });
  }
};

// GET USER HISTORY 🔥
export const getUserUrls = async (req, res) => {
  try {
    const urls = await URL.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};

// ANALYTICS
export const handleAnalytics = async (req, res) => {
  const { shortId } = req.params;

  const result = await URL.findOne({ shortId });

  if (!result) return res.status(404).json({ error: "URL not found" });

  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};