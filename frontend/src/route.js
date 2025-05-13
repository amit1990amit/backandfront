import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import HomePage from './pages/HomePage'

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate replace to="/products" />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};
