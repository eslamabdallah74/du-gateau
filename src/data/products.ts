import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Vanilla Cupcake',
    description: 'Delicate vanilla cupcake with creamy frosting and sprinkles',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cupcakes',
    featured: true
  },
  {
    id: 2,
    name: 'Cream & Caramel Cupcake',
    description: 'Rich caramel cupcake with cream cheese frosting',
    price: 5.29,
    image: 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cupcakes'
  },
  {
    id: 3,
    name: 'Red Velvet Cupcake',
    description: 'Classic red velvet cupcake with cream cheese frosting',
    price: 5.49,
    image: 'https://images.pexels.com/photos/913136/pexels-photo-913136.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cupcakes',
    bestseller: true
  },
  {
    id: 4,
    name: 'Chocolate Cupcake',
    description: 'Decadent chocolate cupcake with chocolate ganache',
    price: 5.49,
    image: 'https://images.pexels.com/photos/1998634/pexels-photo-1998634.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cupcakes'
  },
  {
    id: 5,
    name: 'Cup Cake',
    description: 'Our signature vanilla cupcake with buttercream frosting',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1179002/pexels-photo-1179002.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cupcakes',
    featured: true,
    discount: 20
  },
  {
    id: 6,
    name: 'White Gâteau',
    description: 'Light vanilla cake with layers of whipped cream and berries',
    price: 26.99,
    image: 'https://images.pexels.com/photos/4686833/pexels-photo-4686833.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cakes'
  },
  {
    id: 7,
    name: 'Layer Petit Gâteau',
    description: 'Individual serving of layered cake with cream filling',
    price: 7.49,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cakes'
  },
  {
    id: 8,
    name: 'Vanilla Tart',
    description: 'Buttery tart shell filled with vanilla custard and fresh fruits',
    price: 6.99,
    image: 'https://images.pexels.com/photos/2144200/pexels-photo-2144200.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'tarts'
  },
  {
    id: 9,
    name: 'Noisette Triple Gâteau',
    description: 'Three-layer hazelnut cake with chocolate ganache',
    price: 28.99,
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cakes',
    bestseller: true
  },
  {
    id: 10,
    name: 'Gâteau',
    description: 'Classic chocolate cake with layers of chocolate cream',
    price: 24.99,
    image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'cakes',
    featured: true
  },
  {
    id: 11,
    name: 'Croissant',
    description: 'Buttery, flaky French pastry',
    price: 3.49,
    image: 'https://images.pexels.com/photos/867452/pexels-photo-867452.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'pastries'
  },
  {
    id: 12,
    name: 'Chocolate Macaron',
    description: 'Delicate almond meringue cookies with chocolate ganache filling',
    price: 2.99,
    image: 'https://images.pexels.com/photos/239578/pexels-photo-239578.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'macarons',
    bestseller: true
  }
];

export const categories = [
  { id: '1', name: 'Cupcakes', slug: 'cupcakes' },
  { id: '2', name: 'Cakes', slug: 'cakes' },
  { id: '3', name: 'Tarts', slug: 'tarts' },
  { id: '4', name: 'Pastries', slug: 'pastries' },
  { id: '5', name: 'Macarons', slug: 'macarons' }
];

export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => product.category === categorySlug);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = () => {
  return products.filter(product => product.bestseller);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};