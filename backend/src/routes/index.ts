import { Router } from "express";
import productsRoutes from './productsRoutes'


const router = Router();

router.use("/products", productsRoutes);

export default router;
