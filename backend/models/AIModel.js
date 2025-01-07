import mongoose from "mongoose";

const AIModelSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    modelType: {
      type: String,
      required: true,
    },
    modelPath: {
      type: String,
      required: true,
    },
    isFineTuned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const AIModel = mongoose.model("AIModel", AIModelSchema);

export default AIModel;
