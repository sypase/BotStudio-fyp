import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    botId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    taskType: {
      type: String,
      enum: ["webScraping", "botCreation"],
      required: true,
    },
    scheduleTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "failed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
