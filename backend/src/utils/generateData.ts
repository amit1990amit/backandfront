import { promises as fs } from "fs";
import path from "path";
import {
  getAllProducts,
 } from "./getMockData";

export const initData = async () => {
  const dataDir = path.join(__dirname, "data");
  await fs.mkdir(dataDir, { recursive: true });

  const productsFilePath = path.join(dataDir, "products.json");
  // Check if files exist and create them if they do not
  const filesToCheck = [ productsFilePath];
  const checkFilesPromises = filesToCheck.map(async (filePath) => {
    try {
      await fs.access(filePath);
      console.log(`data for ${filePath} already exists.`);
    } catch {
      if (filePath.includes("products")) {
        const products = await getAllProducts();
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      }
      console.log(`Created ${filePath}`);
    }
  });

  await Promise.allSettled(checkFilesPromises);
};

initData().catch(console.error);
