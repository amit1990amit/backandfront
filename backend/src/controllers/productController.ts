import { Request, Response } from "express";
import { Product } from "../models/types";
import { getAllProductsData } from "../services/productsService";
import { addItem, mapHandles, updateItem, deleteItem, } from '../models/dataHandler'


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await getAllProductsData();
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

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products: Product[] = await getAllProductsData();
  const product = products.find((product) => product._id.toString() === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products: Product[] = await getAllProductsData();
  const product = await products.find((product) => product._id.toString() === id);
  if (product) {
    deleteItem({
      ...mapHandles.products.allProducts,
      itemId: product?._id,
    })
      .then((response) => {
        if (response) {
          return res.status(200).send({ message: "Product deleted", ok: true });
        }
      })
      .catch(() => {
        return res.status(404).send({ message: "Product not found", ok: false });
      });
  } else {
    res.status(500).send("Server error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const updateData = req?.body;
  if (!updateData && !updateData._id) {
    return res
      .status(400)
      .send({ message: "Update data is missing", ok: false });
  }

  updateItem({
    ...mapHandles.products.allProducts,
    updateData,
  })
    .then((response) => {
      if (response) {
        res
          .status(200)
          .send({ message: "Product updated successfully", ok: true });
      } else {
        res.status(404).send({ message: "Product not found", ok: false });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Server error", ok: false });
    });
};

export const addProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  if (!productData) {
    return res.status(400).send({ message: "Data is missing", ok: false });
  }

  addItem({
    ...mapHandles.products.allProducts,
    item: productData,
  })
    .then((response) => {
      if (response.ok) {
        return res.status(200).json({ message: "Product created", ok: true, product: { ...productData, _id: response.id } });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: "Server error", ok: false });
    });
};

