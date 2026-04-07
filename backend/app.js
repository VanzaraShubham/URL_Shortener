import express from "express";
import dotenv from "dotenv";
import connectedDB from "./src/config/db.js";
import urlRoutes from "./src/routes/url.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import URL from "./src/models/url.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectedDB();

app.use("/auth", authRoutes);
app.use("/url", urlRoutes);

// REDIRECT
app.get("/:shortId", async (req, res) => {
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );

    if (!entry) return res.status(404).json({ error: "Link not found or expired" });

    let finalRedirect = entry.redirectURL;
    if (!/^https?:\/\//i.test(finalRedirect)) {
      finalRedirect = "https://" + finalRedirect;
    }

    res.redirect(finalRedirect);
  } catch (error) {
    res.status(500).json({ error: "System error during redirection" });
  }
});

app.listen(3000, () => console.log("Server running 🚀"));