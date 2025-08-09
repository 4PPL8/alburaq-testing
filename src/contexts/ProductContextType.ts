// src/contexts/ProductContextType.ts
import { Product } from '../types/Product';

export interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  categories: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  clearProductsData: () => void;
  forceInitialProductsToSupabase: () => Promise<boolean>;
}

export default ProductContextType;