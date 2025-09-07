// models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // Service name
    description: { type: String, required: true },  // Short description
    price: { type: Number, required: true },        // Price in your currency
    duration: { type: String },                     // e.g., "2 days"
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
