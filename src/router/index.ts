import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import AboutPage from '../pages/AboutPage.vue';
import MenuPage from '../pages/MenuPage.vue';
import ContactPage from '../pages/ContactPage.vue';
import ProductDetailPage from '../pages/ProductDetailPage.vue';
import CartPage from '../pages/CartPage.vue';
import WishlistPage from '../pages/WishlistPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Du Gâteau - Artisan Bakery' }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: { title: 'About Us - Du Gâteau' }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage,
    meta: { title: 'Our Menu - Du Gâteau' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: { title: 'Contact Us - Du Gâteau' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage,
    meta: { title: 'Product Details - Du Gâteau' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
    meta: { title: 'Your Cart - Du Gâteau' }
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistPage,
    meta: { title: 'Your Wishlist - Du Gâteau' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title as string || 'Du Gâteau';
  next();
});

export default router;