<template>
  <div class="product-detail-page">
    <div class="container" v-if="product">
      <div class="product-content">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <div v-if="product.discount" class="discount-badge">
            {{ product.discount }}% OFF
          </div>
        </div>
        
        <div class="product-info">
          <h1 class="product-name script-text">{{ product.name }}</h1>
          <p class="product-description">{{ product.description }}</p>
          
          <div class="product-price">
            <span v-if="product.discount" class="original-price">${{ product.price.toFixed(2) }}</span>
            <span class="current-price">${{ discountedPrice }}</span>
          </div>
          
          <div class="product-actions">
            <div class="quantity-selector">
              <button @click="decreaseQuantity" class="quantity-button" :disabled="quantity <= 1">
                <font-awesome-icon icon="minus" />
              </button>
              <span class="quantity">{{ quantity }}</span>
              <button @click="increaseQuantity" class="quantity-button">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
            
            <button @click="addToCart" class="add-to-cart-button">
              <font-awesome-icon icon="shopping-cart" />
              Add to Cart
            </button>
            
            <button @click="toggleWishlist" class="wishlist-button" :class="{ 'active': isInWishlist }">
              <font-awesome-icon :icon="isInWishlist ? 'heart' : ['far', 'heart']" />
            </button>
          </div>
          
          <div class="product-details">
            <div class="detail-section">
              <h3>Ingredients</h3>
              <p>Premium flour, organic eggs, high-quality chocolate, pure vanilla extract, fresh cream, sugar, butter, and a touch of love.</p>
            </div>
            
            <div class="detail-section">
              <h3>Allergen Information</h3>
              <p>Contains: Wheat, Eggs, Dairy, Soy. May contain traces of nuts.</p>
            </div>
            
            <div class="detail-section">
              <h3>Storage Instructions</h3>
              <p>Best enjoyed fresh. Store in refrigerator and consume within 3 days.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="related-products">
        <h2 class="script-text">You May Also Like</h2>
        <div class="products-grid">
          <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="product-item">
            <ProductCard :product="relatedProduct" />
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="product-not-found">
      <h2>Product not found</h2>
      <router-link to="/menu" class="back-button">Back to Menu</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { getProductById, products } from '@/data/products';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import type { Product } from '@/types';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = ref<Product | undefined>(undefined);
const quantity = ref(1);
const relatedProducts = ref<Product[]>([]);

onMounted(() => {
  const productId = parseInt(route.params.id as string);
  product.value = getProductById(productId);
  
  if (product.value) {
    // Get related products from the same category
    relatedProducts.value = products
      .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
      .slice(0, 4);
  } else {
    router.push('/menu');
  }
});

const discountedPrice = computed(() => {
  if (product.value?.discount) {
    return (product.value.price * (1 - product.value.discount / 100)).toFixed(2);
  }
  return product.value?.price.toFixed(2) || '0.00';
});

const isInWishlist = computed(() => {
  if (!product.value) return false;
  return wishlistStore.isInWishlist(product.value.id);
});

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value, quantity.value);
    alert(`${quantity.value} ${product.value.name}(s) added to cart!`);
  }
};

const toggleWishlist = () => {
  if (!product.value) return;
  
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(product.value.id);
  } else {
    wishlistStore.addToWishlist(product.value);
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.product-detail-page {
  padding: $spacing-xl 0;
  
  .product-content {
    display: flex;
    gap: $spacing-xl;
    margin-bottom: $spacing-xxl;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
    
    .product-image-container {
      flex: 1;
      position: relative;
      border-radius: $border-radius-md;
      overflow: hidden;
      box-shadow: $shadow-md;
      
      .product-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      
      .discount-badge {
        position: absolute;
        top: $spacing-md;
        left: $spacing-md;
        background-color: $primary-dark;
        color: $white;
        padding: $spacing-xs $spacing-sm;
        border-radius: $border-radius-sm;
        font-weight: 600;
      }
    }
    
    .product-info {
      flex: 1;
      
      .product-name {
        font-size: 2.5rem;
        color: $primary-dark;
        margin-bottom: $spacing-md;
      }
      
      .product-description {
        font-size: 1.1rem;
        margin-bottom: $spacing-lg;
        color: $text-light;
      }
      
      .product-price {
        display: flex;
        align-items: center;
        gap: $spacing-md;
        margin-bottom: $spacing-lg;
        
        .original-price {
          font-size: 1.2rem;
          color: $text-light;
          text-decoration: line-through;
        }
        
        .current-price {
          font-size: 2rem;
          font-weight: 600;
          color: $primary-dark;
        }
      }
      
      .product-actions {
        display: flex;
        gap: $spacing-md;
        margin-bottom: $spacing-xl;
        
        .quantity-selector {
          display: flex;
          align-items: center;
          background-color: $secondary;
          border-radius: $border-radius-sm;
          overflow: hidden;
          
          .quantity-button {
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            color: $primary-dark;
            font-size: 1rem;
            cursor: pointer;
            
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
          
          .quantity {
            width: 40px;
            text-align: center;
            font-weight: 600;
          }
        }
        
        .add-to-cart-button {
          flex: 1;
          background-color: $primary;
          color: $white;
          border: none;
          border-radius: $border-radius-sm;
          padding: 0 $spacing-lg;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: $spacing-sm;
          transition: background-color $transition-normal;
          
          &:hover {
            background-color: $primary-dark;
          }
        }
        
        .wishlist-button {
          width: 40px;
          height: 40px;
          border-radius: $border-radius-sm;
          background-color: $secondary;
          border: none;
          color: $text-light;
          cursor: pointer;
          transition: background-color $transition-normal, color $transition-normal;
          
          &:hover, &.active {
            background-color: $primary-light;
            color: $white;
          }
        }
      }
      
      .product-details {
        .detail-section {
          margin-bottom: $spacing-lg;
          
          h3 {
            font-size: 1.2rem;
            margin-bottom: $spacing-sm;
            color: $primary-dark;
          }
          
          p {
            color: $text-light;
            line-height: 1.6;
          }
        }
      }
    }
  }
  
  .related-products {
    h2 {
      font-size: 2rem;
      color: $primary-dark;
      text-align: center;
      margin-bottom: $spacing-xl;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: $spacing-lg;
      
      @media (max-width: $breakpoint-lg) {
        grid-template-columns: repeat(3, 1fr);
      }
      
      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      @media (max-width: $breakpoint-sm) {
        grid-template-columns: 1fr;
      }
    }
  }
  
  .product-not-found {
    text-align: center;
    padding: $spacing-xxl 0;
    
    h2 {
      font-size: 2rem;
      color: $primary-dark;
      margin-bottom: $spacing-lg;
    }
    
    .back-button {
      display: inline-block;
      background-color: $primary;
      color: $white;
      padding: $spacing-sm $spacing-lg;
      border-radius: $border-radius-sm;
      font-weight: 600;
      transition: background-color $transition-normal;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
  }
}
</style>