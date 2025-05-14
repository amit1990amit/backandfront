import { Product } from "../models/types";
const fetch = require("node-fetch");
import dotenv from "dotenv";
dotenv.config();

const baseUrl =
  process.env.JSONPLACEHOLDER_URL || "https://jsonplaceholder.typicode.com/";



export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${baseUrl}products`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const products = await response.json();
    const formattedProducts = products.map(({ id, ...rest }: any) => ({
      ...rest,
      _id: id,
    }));

    return formattedProducts;
  } catch (err) {
    console.error("getAllProducts", err);
    return [];
  }
};

export const getProductAssignment = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${baseUrl}product_assignment`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const productsAssignment = await response.json();
    return productsAssignment;
  } catch (err) {
    console.error("getProductAssignment", err);
    return [];
  }
}

export const getProductCharges = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${baseUrl}product_charges`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const productsCharge = await response.json();
    return productsCharge;
  } catch (err) {
    console.error("getProductCharges", err);
    return [];
  }
}


