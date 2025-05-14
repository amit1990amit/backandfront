import { fetchData, mapHandles } from "../models/dataHandler";

export const getAllProductsAssignmentData = async (): Promise<any[]> => {
  let productsAssignments: any[] = [];


  try {
    productsAssignments = await fetchData(mapHandles.productsAssignments.allProductsAssignments);
  } catch (error) {
    throw new Error("Failed to load products data");
  }

  return productsAssignments;
};