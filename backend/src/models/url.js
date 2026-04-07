import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitHistory: [
      {
        timestamp: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("URL", urlSchema);