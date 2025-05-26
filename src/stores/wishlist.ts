import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '@/types';

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<Product[]>([]);
  
  const itemCount = computed(() => {
    return items.value.length;
  });
  
  function addToWishlist(product: Product) {
    const exists = items.value.some(item => item.id === product.id);
    if (!exists) {
      items.value.push(product);
    }
  }
  
  function removeFromWishlist(productId: number) {
    items.value = items.value.filter(item => item.id !== productId);
  }
  
  function isInWishlist(productId: number) {
    return items.value.some(item => item.id === productId);
  }
  
  function clearWishlist() {
    items.value = [];
  }
  
  return {
    items,
    itemCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  };
});