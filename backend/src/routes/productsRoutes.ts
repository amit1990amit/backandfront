// import express from "express";
// import {
//   getAllProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProductById,
// } from "../controllers/productController";

// const productsRoutes = express.Router();
// productsRoutes.get("/", getAllProducts);
// productsRoutes.get("/:id", getProductById);
// productsRoutes.post("/create", addProduct);
// productsRoutes.put("/update", updateProduct);
// productsRoutes.delete("/delete/:id", deleteProductById);


// export default productsRoutes;

// src/routes/productsRouter.ts
import { Router } from 'express';
import {
  listProducts,
  getProduct,
  addProduct,
  patchProduct,
  removeProduct,
} from '../controllers/productController';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.patch('/:id', patchProduct);
router.delete('/:id', removeProduct);

export default router;

