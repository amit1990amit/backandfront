import { MongoClient, Collection, Document } from "mongodb";
const mongoose = require("mongoose");

const dbName = "testDB";
const url = 'mongodb://localhost:27017'

const productsCollection = "products";
const productsAssignmentsCollection = "assignments"
const productsChargesCollection = 'charges'

export async function getCollection<T extends Document>(
  collectionName: string
): Promise<Collection<T>> {
  const client = await MongoClient.connect(url, {});
  const db = client.db(dbName);
  return db.collection<T>(collectionName);
}

export const startMongo = async () => {
  mongoose
  .connect(`${url}/${dbName}`, {})
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err: any) => console.error("Could not connect to MongoDB...", err));
};

export { productsCollection, productsAssignmentsCollection, productsChargesCollection };