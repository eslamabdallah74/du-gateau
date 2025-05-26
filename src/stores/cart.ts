import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product, CartItem } from '@/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });
  
  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return sum + (price * item.quantity);
    }, 0);
  });
  
  function addToCart(product: Product, quantity: number = 1) {
    const existingItem = items.value.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
  }
  
  function removeFromCart(productId: number) {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
  }
  
  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      // Remove item if quantity is 0
      if (quantity <= 0) {
        removeFromCart(productId);
      }
    }
  }
  
  function clearCart() {
    items.value = [];
  }
  
  return {
    items,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
});