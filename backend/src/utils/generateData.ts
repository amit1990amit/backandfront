import { promises as fs } from "fs";
import path from "path";
import {
  getAllProducts,
  getProductAssignment,
  getProductCharges
 } from "./getMockData";

export const initData = async () => {
  const dataDir = path.join(__dirname, "data");
  
  await fs.mkdir(dataDir, { recursive: true });

  const productsAssignmentFilePath = path.join(dataDir, "product_assignment.json");
  const productsFilePath = path.join(dataDir, "products.json");
  const productsChargesFilePath = path.join(dataDir, "product_charges.json");
  // Check if files exist and create them if they do not
  const filesToCheck = [ productsFilePath, productsAssignmentFilePath];
  const checkFilesPromises = filesToCheck.map(async (filePath) => {
    try {
      await fs.access(filePath);
      console.log(`data for ${filePath} already exists.`);
    } catch {
      if (filePath.includes("productssss")) {
        const products = await getAllProducts();
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
      }
      else if (filePath.includes("assignment")) {
        const productsAssignment = await getProductAssignment();
        await fs.writeFile(filePath, JSON.stringify(productsAssignment, null, 2));
      }
      else if (filePath.includes("charges")) {
        const productsCharge = await getProductCharges();
        await fs.writeFile(filePath, JSON.stringify(productsCharge, null, 2));
      }
      console.log(`Created ${filePath}`);
    }
  });

  await Promise.allSettled(checkFilesPromises);
};

initData().catch(console.error);
