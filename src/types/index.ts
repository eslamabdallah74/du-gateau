export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  bestseller?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}