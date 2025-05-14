import express from "express";
import {
  getAllProductsAssignments,
} from "../controllers/assignmentController";

const productsAssignmentRoutes = express.Router();
productsAssignmentRoutes.get("/", getAllProductsAssignments);


export default productsAssignmentRoutes;
