import { Request, Response } from "express";
import { getAllProductsChargesData } from "../services/chargesService";

export const getAllProductsCharges = async (req: Request, res: Response) => {
  try {
    const charges: any[] = await getAllProductsChargesData();
    if (charges && charges.length > 0) {
      res.json(charges);
    } else {
      throw new Error("No charges found");
    }
  } catch (error) {
    console.error("Failed to fetch charges:", error);
    res.status(500).json({ message: "Failed to fetch charges" });
  }
};






