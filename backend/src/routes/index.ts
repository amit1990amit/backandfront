import { Router } from "express";
import productsRoutes from './productsRoutes'
import productsAssignmentRoutes from './productsAssignmentRoutes'
import productsChargesRoutes from './productsCharges'


const router = Router();

router.use("/products", productsRoutes);
router.use("/productsAssignment", productsAssignmentRoutes);
router.use("/productsCharge", productsChargesRoutes);

export default router;
