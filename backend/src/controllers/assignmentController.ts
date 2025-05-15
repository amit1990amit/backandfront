import { Request, Response } from "express";
import { getAllProductsAssignmentData } from "../services/assigmnentService";

export const getAllProductsAssignments = async (req: Request, res: Response) => {
  try {
    const products: any[] = await getAllProductsAssignmentData();
    const assignmentMap = productsAssignments.reduce((map, { id, reservation_uuid, name }) => {
      if (!map[reservation_uuid]) {
        map[reservation_uuid] = [];
      }
      map[reservation_uuid].push({ id, name });
      return map;
    }, {})
    const chargesMap = productsCharges.reduce((acc, el) => {
      acc[el.special_product_assignment_id] = el
      return acc
    }, {})
    const result = summarizeReservations(assignmentMap, chargesMap)
    if (products && products.length > 0) {
      res.json(products);
    } else {
      throw new Error("No products found");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// export const getProductById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const products: Product[] = await getAllProductsData();
//   const product = products.find((product) => product._id.toString() === id);

//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).send("Product not found");
//   }
// };





