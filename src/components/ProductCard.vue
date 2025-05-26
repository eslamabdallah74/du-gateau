<template>
  <div class="product-card" @mouseenter="hovered = true" @mouseleave="hovered = false">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
      <div v-if="product.discount" class="discount-badge">
        {{ product.discount }}% OFF
      </div>
      <div class="product-actions" :class="{ 'show': hovered }">
        <button @click.stop="addToCart" class="action-button">
          <span class="icon">🛒</span>
        </button>
        <button @click.stop="toggleWishlist" class="action-button" :class="{ 'active': isInWishlist }">
          <span class="icon">❤️</span>
        </button>
        <button @click.stop="viewDetails" class="action-button">
          <span class="icon">👁️</span>
        </button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name script-text">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-price">
        <span v-if="product.discount" class="original-price">${{ product.price.toFixed(2) }}</span>
        <span class="current-price">${{ discountedPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';

const props = defineProps<{
  product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const hovered = ref(false);

const isInWishlist = computed(() => {
  return wishlistStore.isInWishlist(props.product.id);
});

const discountedPrice = computed(() => {
  if (props.product.discount) {
    return (props.product.price * (1 - props.product.discount / 100)).toFixed(2);
  }
  return props.product.price.toFixed(2);
});

const addToCart = () => {
  cartStore.addToCart(props.product);
};

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(props.product.id);
  } else {
    wishlistStore.addToWishlist(props.product);
  }
};

const viewDetails = () => {
  router.push(`/product/${props.product.id}`);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.product-card {
  background-color: $white;
  border-radius: $border-radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;
  transition: transform $transition-normal, box-shadow $transition-normal;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-md;
  }
  
  .product-image {
    position: relative;
    overflow: hidden;
    height: 200px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform $transition-slow;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    .discount-badge {
      position: absolute;
      top: $spacing-sm;
      left: $spacing-sm;
      background-color: $primary-dark;
      color: $white;
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-sm;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .product-actions {
      position: absolute;
      bottom: $spacing-sm;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      gap: $spacing-sm;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity $transition-normal, transform $transition-normal;
      
      &.show {
        opacity: 1;
        transform: translateY(0);
      }
      
      .action-button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: $white;
        color: $primary;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color $transition-normal, color $transition-normal;
        border: none;
        padding: 0;
        
        .icon {
          font-size: 1.2rem;
          line-height: 1;
        }
        
        &:hover, &.active {
          background-color: $primary;
          color: $white;
        }
      }
    }
  }
  
  .product-info {
    padding: $spacing-md;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .product-name {
      font-size: 1.3rem;
      margin-bottom: $spacing-xs;
      color: $primary-dark;
    }
    
    .product-description {
      font-size: 0.9rem;
      color: $text-light;
      margin-bottom: $spacing-sm;
      flex: 1;
    }
    
    .product-price {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      
      .original-price {
        color: $text-light;
        text-decoration: line-through;
        font-size: 0.9rem;
      }
      
      .current-price {
        font-weight: 600;
        font-size: 1.1rem;
        color: $primary-dark;
      }
    }
  }
}
</style>