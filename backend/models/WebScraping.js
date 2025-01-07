import mongoose from "mongoose";

const WebScrapingSchema = new mongoose.Schema(
  {
    botId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scraped", "failed"],
      default: "scraped",
    },
  },
  { timestamps: true }
);

const WebScraping = mongoose.model("WebScraping", WebScrapingSchema);

export default WebScraping;
