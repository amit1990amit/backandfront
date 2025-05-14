import { fetchData, mapHandles } from "../models/dataHandler";

export const getAllProductsChargesData = async (): Promise<any[]> => {
  let productsCharges: any[] = [];

  try {
    productsCharges = await fetchData(mapHandles.productsCharges.allProductsCharges);
  } catch (error) {
    throw new Error("Failed to load products data");
  }

  return productsCharges;
};