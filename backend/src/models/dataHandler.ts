import { v4 as uuidv4 } from 'uuid'
import {
  readJsonFile,
  writeJsonFile,
  // PRODUCTS_FILE_PATH,
} from "../utils/crudFiles";
// import {
//   getCollection,
//   productsCollection,
// } from "../utils/mongoSetup";

// import { Document } from "mongodb";

// import dotenv from "dotenv";
// dotenv.config();

// export async function fetchData<T extends Document>({
//   collectionName,
//   filePath,
// }: {
//   collectionName?: string;
//   filePath?: string;
// }): Promise<T[]> {
//   let data: T[] = [];
//   const isUseMongoDB = process.env.USE_MONGODB === "true";
//   if (isUseMongoDB) {
//     if (!collectionName) {
//       throw new Error(
//         "MongoDB collection name must be provided when using MongoDB."
//       );
//     }
//     const collection = await getCollection<T>(collectionName);
//     data = (await collection.find({}).toArray()) as T[];
//   } else {
//     if (!filePath) {
//       throw new Error("File path must be provided when not using MongoDB.");
//     }
//     data = await readJsonFile<T[]>(filePath);
//   }
//   return data;
// }


// export const mapHandles = {
//   products: {
//     allProducts: {
//       collectionName: productsCollection,
//       filePath: PRODUCTS_FILE_PATH,
//     },
//   },
// };

// src/dataHandler.ts   <-- adjust path to your folder layout
import { ProductModel, IProduct } from '../models/product';  // <- add IProduct

import { Types } from 'mongoose';

// READ ------------------------------------------------------
export async function fetchData() {
  return ProductModel.find().lean();
}

export async function addItem<T extends Document>({
  filePath,
  item,
}: {
  filePath?: string;
  item: T;
}): Promise<any> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    const doc = await ProductModel.create(item);
    return {
      ok: true,
      id: doc.id,
      item: doc.toObject(),
    }
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }
    const items = await readJsonFile<T[]>(filePath);
    const newItem = { ...item, _id: uuidv4() };
    items.push(newItem as T);
    await writeJsonFile(filePath, items);
    return { ok: true, id: newItem._id, item: newItem }


  }
}


export async function updateItem<T extends { _id: string }>({
  filePath,
  updateData,
}: {
  filePath?: string;
  updateData: Partial<T> & { _id: string };
}): Promise<boolean> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";
  if (isUseMongoDB) {
    const result = await ProductModel.updateOne(
      { _id: new Types.ObjectId(updateData._id) },
      { $set: updateData }
    );
    return result.modifiedCount === 1;
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }
    const items = await readJsonFile<T[]>(filePath);
    const itemIndex = items.findIndex((item) => item._id === updateData._id);
    if (itemIndex !== -1) {
      const { _id, ...updateFields } = updateData;
      items[itemIndex] = { ...items[itemIndex], ...updateFields };
      await writeJsonFile(filePath, items);
      return true;
    }
    return false;
  }
}


export async function deleteItem<T extends { _id: string }>({
  filePath,
  itemId,
}: {
  filePath?: string;
  itemId: string;
}): Promise<boolean> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    const result = await ProductModel.deleteOne({
      _id: new Types.ObjectId(itemId),
    });
    return result.deletedCount === 1;
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }

    let items = await readJsonFile<T[]>(filePath);
    items = items.filter((item) => item._id !== itemId);
    try {
      await writeJsonFile(filePath, items);
      return true;
    } catch (error) {
      return false;
    }
  }
}

