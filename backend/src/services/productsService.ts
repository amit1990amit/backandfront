import { Product } from "../models/types";
import { fetchData, mapHandles } from "../models/dataHandler";


export const getAllProductsData = async (): Promise<Product[]> => {
  let products: Product[] = [];


  try {
    products = await fetchData(mapHandles.products.allProducts);
  } catch (error) {
    throw new Error("Failed to load products data");
  }

  return products;
};
