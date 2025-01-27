import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
