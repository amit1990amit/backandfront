// import { Product } from "../models/types";
// import { fetchData, mapHandles } from "../models/dataHandler";


// export const getAllProductsData = async (): Promise<Product[]> => {
//   let products: Product[] = [];


//   try {
//     products = await fetchData(mapHandles.products.allProducts);
//   } catch (error) {
//     throw new Error("Failed to load products data");
//   }

//   return products;
// };
// src/services/productsService.ts


import { ProductModel, IProduct } from '../models/product';
import { Types } from 'mongoose';

/**
 * Return **all** products as plain JS objects (no Mongoose wrappers).
 */
export const getAllProducts = () =>
  ProductModel.find().lean<IProduct[]>();

/**
 * Fetch a single product by its Mongo _id.
 */
export const getProductById = (id: string) =>
  ProductModel.findById(new Types.ObjectId(id)).lean<IProduct | null>();

/**
 * Create a new product document.
 */
export const createProduct = (data: Omit<IProduct, '_id'>) =>
  ProductModel.create(data);

/**
 * Update an existing product (partial patch).
 * Returns the updated doc (lean) or `null` if not found.
 */
export const updateProduct = (
  id: string,
  patch: Partial<Omit<IProduct, '_id'>>
) =>
  ProductModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    { $set: patch },
    { new: true, lean: true }
  );

/**
 * Delete a product by id.
 * Resolves to the deleted document (lean) or `null` if it wasn’t there.
 */
export const deleteProduct = (id: string) =>
  ProductModel.findByIdAndDelete(new Types.ObjectId(id)).lean<IProduct | null>();
