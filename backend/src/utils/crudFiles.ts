import path from "path";
import { promises as fs } from "fs";

export async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    console.log(`File content from ${filePath}:`, data); // Debug output
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error);
    throw error; // Re-throw the error after logging it
  }
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T
): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData, { encoding: "utf-8" });
}

export const PRODUCTS_FILE_PATH = path.join(__dirname, "data", "products.json");
