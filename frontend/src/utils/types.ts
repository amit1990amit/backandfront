export interface Product {
  _id: string;
  name: string;
  price: number;
  price_per_weight?: string; // Optional field
  category_id: string;
  image_url: string;
  stock_quantity: number;
  discount_id?: string; // Optional field
  tags: string[];
}

