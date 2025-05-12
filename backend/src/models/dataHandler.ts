import { v4 as uuidv4 } from 'uuid'
import {
  readJsonFile,
  writeJsonFile,
  PRODUCTS_FILE_PATH,
} from "../utils/crudFiles";
import {
  getCollection,
  productsCollection,
} from "../utils/mongoSetup";

import { Document } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

export async function fetchData<T extends Document>({
  collectionName,
  filePath,
}: {
  collectionName?: string;
  filePath?: string;
}): Promise<T[]> {
  let data: T[] = [];
  const isUseMongoDB = process.env.USE_MONGODB === "true";
  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    const collection = await getCollection<T>(collectionName);
    data = (await collection.find({}).toArray()) as T[];
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }
    data = await readJsonFile<T[]>(filePath);
  }
  return data;
}

export async function addItem<T extends Document>({
  collectionName,
  filePath,
  item,
}: {
  collectionName?: string;
  filePath?: string;
  item: T;
}): Promise<any> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    // const collection = await getCollection<T>(collectionName);
    // const response = await collection.insertOne(item as any);
    // return { ...item, _id: response.insertedId };
    return { ok: false, id: -1 };
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

export async function deleteItem<T extends Document>({
  collectionName,
  filePath,
  itemId,
}: {
  collectionName?: string;
  filePath?: string;
  itemId: string;
}): Promise<boolean> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    // const collection = await getCollection<T>(collectionName);
    // const result = await collection.deleteOne({ _id: new ObjectId(itemId) });
    // return result.deletedCount === 1;
    return true;
  } else {
    if (!filePath) {
      throw new Error("File path must be provided when not using MongoDB.");
    }

    let items = await readJsonFile<T[]>(filePath);
    items = items.filter((item) => item._id !== itemId);
    try {
      const removeOpertion = await writeJsonFile(filePath, items);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export async function updateItem<T extends Document>({
  collectionName,
  filePath,
  updateData,
}: {
  collectionName?: string;
  filePath?: string;
  updateData: Partial<T> & { _id: string };
}): Promise<boolean> {
  const isUseMongoDB = process.env.USE_MONGODB === "true";

  if (isUseMongoDB) {
    if (!collectionName) {
      throw new Error(
        "MongoDB collection name must be provided when using MongoDB."
      );
    }
    const collection = await getCollection<T>(collectionName);
    // const result = await collection.updateOne(
    //   { _id: new ObjectId(updateData._id.toString()) },
    //   { $set: updateData }
    // );
    // return result.modifiedCount === 1;

    return false;
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

export const mapHandles = {
  products: {
    allProducts: {
      collectionName: productsCollection,
      filePath: PRODUCTS_FILE_PATH,
    },
  },
};
