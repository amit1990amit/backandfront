import React, { useState, useEffect } from "react";
import { Product } from "../utils/types";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getProducts, createProduct } from '../store/productsSlice';
import ProductList from '../components/products/ProductList'
import { Button } from '@mui/material';
import ProductDialog from '../components/products/ProductDialog'

const ProductsPage = () => {
  const dispatch = useAppDispatch()
  const { productsList, status } = useAppSelector(({ products }) => products);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleCreateProduct = async (product: Omit<Product, '_id'>) => {
    await dispatch(createProduct(product)).unwrap();
  };

  useEffect(() => {
    if (status === 'idle' && productsList.length === 0) {
      dispatch(getProducts());
    }
  }, [status, productsList]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Display the loader when data is being fetched
  }

  if (status === 'failed') {
    return <div>Error: Failed to fetch products. Please try again later.</div>;
  }

  return (
    <div >
      <h1>Products Page</h1>
      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          Create Product
      </Button>

      {productsList.length ? (
        <ProductList products={productsList}/>
      ) : (
        <div>No products found</div>
      )}

      <ProductDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default ProductsPage;
