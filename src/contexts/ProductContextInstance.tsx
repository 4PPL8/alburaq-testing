// src/contexts/ProductContextInstance.tsx
import { createContext } from 'react';
import { ProductContextType } from './ProductContextType';

// Create the context with the type
export const ProductContext = createContext<ProductContextType | undefined>(undefined);