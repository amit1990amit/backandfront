export interface Product {
  _id: string;
  name: string;
  price: number;
  price_per_weight?: string;
  category_id: string;
  image_url: string;
  stock_quantity: number;
  discount_id?: string;
  tags: string[];
}





