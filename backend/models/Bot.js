import mongoose from "mongoose";

const BotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    csvFile: {
      type: String,
      required: true,
    },
    aiModel: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    fineTuned: {
      type: Boolean,
      default: false,
    },
    webScrapingEnabled: {
      type: Boolean,
      default: false,
    },
    schedulingEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Bot = mongoose.model("Bot", BotSchema);

export default Bot;
