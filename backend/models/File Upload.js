import mongoose from "mongoose";

const FileUploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["uploaded", "failed"],
      default: "uploaded",
    },
  },
  { timestamps: true }
);

const FileUpload = mongoose.model("FileUpload", FileUploadSchema);

export default FileUpload;
