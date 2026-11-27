// Shared timing for every product, plus the product context the scenes read from.
// Product copy, colours, images and footage live in src/products/<name>.ts.
import { createContext, useContext } from 'react';
import { cenanga } from './products/cenanga';
import { putik } from './products/putik';
import { Product } from './products/types';

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Cut points: the original ad's cuts (30 fps frame numbers 95, 177, 263, 454,
// 533, 604, 669, 714, 866, 946, 1079, end 1153) scaled by 17 / 38.43 s.
export const CUTS = [0, 42, 78, 116, 201, 236, 267, 296, 316, 383, 418, 477, 510];
export const DURATION = CUTS[CUTS.length - 1];

export const PRODUCTS: Product[] = [cenanga, putik];

export const ProductContext = createContext<Product>(cenanga);
export const useProduct = () => useContext(ProductContext);
