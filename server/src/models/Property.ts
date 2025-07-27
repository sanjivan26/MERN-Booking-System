import { Schema, model, Document } from "mongoose";

export interface IProperty extends Document {
  name: string;
  location: string;
  pricePerNight: number;
  description: string;
}

const PropertySchema = new Schema<IProperty>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default model<IProperty>("Property", PropertySchema);
