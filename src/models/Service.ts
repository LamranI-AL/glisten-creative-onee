import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  service: { type: String },
  creatAt: { type: Date },
});

export default mongoose.models.services ||
  mongoose.model("services", ServiceSchema);
