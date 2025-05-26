<template>
  <div class="wishlist-page">
    <div class="container">
      <h1 class="script-text">Your Wishlist</h1>
      
      <div v-if="wishlistStore.items.length > 0" class="wishlist-content">
        <div class="wishlist-items">
          <div v-for="product in wishlistStore.items" :key="product.id" class="wishlist-item">
            <div class="item-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            
            <div class="item-details">
              <h3 class="script-text">{{ product.name }}</h3>
              <p class="item-description">{{ product.description }}</p>
              <p class="item-price">
                <span v-if="product.discount" class="original-price">
                  ${{ product.price.toFixed(2) }}
                </span>
                <span class="current-price">
                  ${{ getDiscountedPrice(product).toFixed(2) }}
                </span>
              </p>
            </div>
            
            <div class="item-actions">
              <button @click="addToCart(product)" class="action-button primary">
                <span class="icon">🛒</span> Add to Cart
              </button>
              <button @click="removeFromWishlist(product.id)" class="action-button secondary">
                <span class="icon">🗑️</span> Remove
              </button>
            </div>
          </div>
        </div>
        
        <div class="wishlist-summary">
          <h2>Wishlist Summary</h2>
          <p>You have {{ wishlistStore.itemCount }} items in your wishlist.</p>
          <button @click="clearWishlist" class="clear-button">
            Clear Wishlist
          </button>
          
          <div class="continue-shopping">
            <router-link to="/menu">
              <span class="icon">🛍️</span> Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-wishlist">
        <span class="icon empty-wishlist-icon">❤️</span>
        <h2>Your wishlist is empty</h2>
        <p>Add items to your wishlist to save them for later.</p>
        <router-link to="/menu" class="shopping-button">Start Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '../stores/wishlist';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const getDiscountedPrice = (product: Product): number => {
  if (product.discount) {
    return product.price * (1 - product.discount / 100);
  }
  return product.price;
};

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
};

const removeFromWishlist = (productId: number) => {
  if (confirm('Are you sure you want to remove this item from your wishlist?')) {
    wishlistStore.removeFromWishlist(productId);
  }
};

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    wishlistStore.clearWishlist();
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.wishlist-page {
  padding: $spacing-xl 0;
  
  h1 {
    font-size: 3rem;
    color: $primary-dark;
    text-align: center;
    margin-bottom: $spacing-xl;
  }
  
  .wishlist-content {
    display: flex;
    gap: $spacing-xl;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
    
    .wishlist-items {
      flex: 2;
      
      .wishlist-item {
        display: flex;
        background-color: $white;
        padding: $spacing-md;
        border-radius: $border-radius-md;
        margin-bottom: $spacing-md;
        box-shadow: $shadow-sm;
        
        @media (max-width: $breakpoint-sm) {
          flex-direction: column;
        }
        
        .item-image {
          width: 120px;
          height: 120px;
          border-radius: $border-radius-sm;
          overflow: hidden;
          margin-right: $spacing-md;
          
          @media (max-width: $breakpoint-sm) {
            width: 100%;
            height: 200px;
            margin-right: 0;
            margin-bottom: $spacing-md;
          }
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .item-details {
          flex: 1;
          padding-right: $spacing-md;
          
          h3 {
            font-size: 1.5rem;
            color: $primary-dark;
            margin-bottom: $spacing-xs;
          }
          
          .item-description {
            color: $text-light;
            margin-bottom: $spacing-sm;
          }
          
          .item-price {
            .original-price {
              text-decoration: line-through;
              color: $text-light;
              margin-right: $spacing-sm;
            }
            
            .current-price {
              font-weight: 600;
              color: $primary-dark;
              font-size: 1.2rem;
            }
          }
        }
        
        .item-actions {
          display: flex;
          flex-direction: column;
          gap: $spacing-sm;
          justify-content: center;
          
          @media (max-width: $breakpoint-sm) {
            flex-direction: row;
            margin-top: $spacing-md;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: $spacing-xs;
            padding: $spacing-sm $spacing-md;
            border: none;
            border-radius: $border-radius-sm;
            cursor: pointer;
            font-weight: 500;
            transition: background-color $transition-normal;
            
            .icon {
              font-size: 1.2rem;
            }
            
            &.primary {
              background-color: $primary;
              color: $white;
              
              &:hover {
                background-color: darken-color($primary, 10);
              }
            }
            
            &.secondary {
              background-color: $background;
              color: $text;
              
              &:hover {
                background-color: darken-color($background, 5);
              }
            }
          }
        }
      }
    }
    
    .wishlist-summary {
      flex: 1;
      background-color: $white;
      padding: $spacing-lg;
      border-radius: $border-radius-md;
      box-shadow: $shadow-sm;
      height: fit-content;
      
      h2 {
        font-size: 1.5rem;
        color: $primary-dark;
        margin-bottom: $spacing-md;
      }
      
      p {
        margin-bottom: $spacing-md;
      }
      
      .clear-button {
        width: 100%;
        padding: $spacing-sm;
        background-color: $background;
        color: $text;
        border: none;
        border-radius: $border-radius-sm;
        cursor: pointer;
        margin-bottom: $spacing-lg;
        transition: background-color $transition-normal;
        
        &:hover {
          background-color: darken-color($background, 5);
        }
      }
      
      .continue-shopping {
        text-align: center;
        
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: $spacing-xs;
          color: $primary;
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
          
          .icon {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
  
  .empty-wishlist {
    text-align: center;
    padding: $spacing-xxl 0;
    
    .empty-wishlist-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: $spacing-md;
    }
    
    h2 {
      font-size: 2rem;
      color: $primary-dark;
      margin-bottom: $spacing-sm;
    }
    
    p {
      font-size: 1.1rem;
      color: $text-light;
      margin-bottom: $spacing-lg;
    }
    
    .shopping-button {
      display: inline-block;
      background-color: $primary;
      color: $white;
      padding: $spacing-sm $spacing-xl;
      border-radius: $border-radius-sm;
      font-weight: 500;
      transition: background-color $transition-normal;
      
      &:hover {
        background-color: darken-color($primary, 10);
      }
    }
  }
}
</style>
