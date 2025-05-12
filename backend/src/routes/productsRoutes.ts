import express from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
} from "../controllers/productController";

const productsRoutes = express.Router();
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);
productsRoutes.post("/create", addProduct);
productsRoutes.put("/update", updateProduct);
productsRoutes.delete("/delete/:id", deleteProductById);


export default productsRoutes;
