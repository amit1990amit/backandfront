import express from "express";
import {
  getAllProductsCharges,
} from "../controllers/chargesController";

const productsChargesRoutes = express.Router();
productsChargesRoutes.get("/", getAllProductsCharges);


export default productsChargesRoutes;
