// import { promises as fs } from "fs";
// import path from "path";
// import {
//   getAllProducts,
//  } from "./getMockData";

// export const initData = async () => {
//   const dataDir = path.join(__dirname, "data");
//   await fs.mkdir(dataDir, { recursive: true });

//   const productsFilePath = path.join(dataDir, "products.json");
//   // Check if files exist and create them if they do not
//   const filesToCheck = [ productsFilePath];
//   const checkFilesPromises = filesToCheck.map(async (filePath) => {
//     try {
//       await fs.access(filePath);
//       console.log(`data for ${filePath} already exists.`);
//     } catch {
//       if (filePath.includes("products")) {
//         const products = await getAllProducts();
//         await fs.writeFile(filePath, JSON.stringify(products, null, 2));
//       }
//       console.log(`Created ${filePath}`);
//     }
//   });

//   await Promise.allSettled(checkFilesPromises);
// };

// initData().catch(console.error);


import fs from 'fs/promises';
import path from 'path';

/**
 * Folder that keeps the JSON “database”.
 * Change `data` if you store it elsewhere.
 */
const DATA_DIR  = path.resolve(__dirname, '../../data');
const PRODUCTS  = path.join(DATA_DIR, 'products.json');
// add other collections (users.json, orders.json …) if you have them

/**
 * Creates the folder and blank JSON files if they don’t exist.
 * No-ops when we’ve already migrated to Mongo.
 */
export async function initData(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  // Helper that ensures a file exists and contains at least []
  const touch = async (file: string) => {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, '[]', 'utf8');
    }
  };

  await Promise.all([touch(PRODUCTS)]);
}
