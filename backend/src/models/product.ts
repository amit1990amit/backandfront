import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  price_per_weight?: string;
  category_id: string;
  image_url: string;
  stock_quantity: number;
  discount_id?: string;
  tags: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    price_per_weight: String,
    category_id: { type: String, required: true },
    image_url: String,
    stock_quantity: { type: Number, default: 0 },
    discount_id: String,
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>(
  'Product',
  productSchema
);
