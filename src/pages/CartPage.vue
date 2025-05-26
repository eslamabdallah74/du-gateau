<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="script-text">Your Cart</h1>
      
      <div v-if="cartStore.items.length > 0" class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
            <div class="item-image">
              <img :src="item.product.image" :alt="item.product.name" />
            </div>
            
            <div class="item-details">
              <h3 class="script-text">{{ item.product.name }}</h3>
              <p class="item-price">
                <span v-if="item.product.discount" class="original-price">
                  ${{ item.product.price.toFixed(2) }}
                </span>
                <span class="current-price">
                  ${{ getDiscountedPrice(item.product).toFixed(2) }}
                </span>
              </p>
            </div>
            
            <div class="item-quantity">
              <button @click="decreaseQuantity(item.product.id)" class="quantity-button">
                <mdi-icon name="minus" />
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.product.id)" class="quantity-button">
                <mdi-icon name="plus" />
              </button>
            </div>
            
            <div class="item-total">
              ${{ (getDiscountedPrice(item.product) * item.quantity).toFixed(2) }}
            </div>
            
            <button @click="removeItem(item.product.id)" class="remove-button">
              <mdi-icon name="close" />
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h2>Order Summary</h2>
          
          <div class="summary-item">
            <span>Subtotal</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>
          
          <div class="summary-item">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          
          <div class="summary-item">
            <span>Tax</span>
            <span>${{ (cartStore.total * 0.1).toFixed(2) }}</span>
          </div>
          
          <div class="summary-total">
            <span>Total</span>
            <span>${{ (cartStore.total + 5 + cartStore.total * 0.1).toFixed(2) }}</span>
          </div>
          
          <div class="promo-code">
            <input type="text" placeholder="Promo Code" v-model="promoCode" />
            <button @click="applyPromoCode">Apply</button>
          </div>
          
          <button @click="checkout" class="checkout-button">
            Proceed to Checkout
          </button>
          
          <div class="continue-shopping">
            <router-link to="/menu">
              <mdi-icon name="arrow-left" />
              Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-cart">
        <mdi-icon name="cart" class="empty-cart-icon" size="48" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <router-link to="/menu" class="shopping-button">Start Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types';

const cartStore = useCartStore();
const promoCode = ref('');

const getDiscountedPrice = (product: Product): number => {
  if (product.discount) {
    return product.price * (1 - product.discount / 100);
  }
  return product.price;
};

const increaseQuantity = (productId: number) => {
  const item = cartStore.items.find(item => item.product.id === productId);
  if (item) {
    cartStore.updateQuantity(productId, item.quantity + 1);
  }
};

const decreaseQuantity = (productId: number) => {
  const item = cartStore.items.find(item => item.product.id === productId);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(productId, item.quantity - 1);
  }
};

const removeItem = (productId: number) => {
  if (confirm('Are you sure you want to remove this item from your cart?')) {
    cartStore.removeFromCart(productId);
  }
};

const applyPromoCode = () => {
  if (promoCode.value.trim() === '') {
    alert('Please enter a promo code');
    return;
  }
  
  // This would normally check against valid promo codes in a database
  if (promoCode.value.toUpperCase() === 'WELCOME10') {
    alert('Promo code applied! 10% discount added to your order.');
  } else {
    alert('Invalid promo code');
  }
  
  promoCode.value = '';
};

const checkout = () => {
  // In a real application, this would navigate to a checkout page or process
  alert('Proceeding to checkout. This would normally redirect to a payment page.');
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.cart-page {
  padding: $spacing-xl 0;
  
  h1 {
    font-size: 3rem;
    color: $primary-dark;
    text-align: center;
    margin-bottom: $spacing-xl;
  }
  
  .cart-content {
    display: flex;
    gap: $spacing-xl;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
    
    .cart-items {
      flex: 2;
      
      .cart-item {
        display: flex;
        align-items: center;
        background-color: $white;
        padding: $spacing-md;
        border-radius: $border-radius-md;
        margin-bottom: $spacing-md;
        box-shadow: $shadow-sm;
        
        @media (max-width: $breakpoint-sm) {
          flex-wrap: wrap;
        }
        
        .item-image {
          width: 80px;
          height: 80px;
          border-radius: $border-radius-sm;
          overflow: hidden;
          margin-right: $spacing-md;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        
        .item-details {
          flex: 1;
          
          h3 {
            font-size: 1.3rem;
            color: $primary-dark;
            margin-bottom: $spacing-xs;
          }
          
          .item-price {
            .original-price {
              color: $text-light;
              text-decoration: line-through;
              margin-right: $spacing-xs;
            }
            
            .current-price {
              font-weight: 600;
            }
          }
        }
        
        .item-quantity {
          display: flex;
          align-items: center;
          margin: 0 $spacing-lg;
          
          .quantity-button {
            width: 30px;
            height: 30px;
            background-color: $secondary;
            border: none;
            border-radius: $border-radius-sm;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            
            &:hover {
              background-color: $primary-light;
              color: $white;
            }
          }
          
          .quantity {
            width: 40px;
            text-align: center;
            font-weight: 600;
          }
        }
        
        .item-total {
          font-weight: 600;
          min-width: 80px;
          text-align: right;
        }
        
        .remove-button {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: $secondary;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: $spacing-md;
          cursor: pointer;
          
          &:hover {
            background-color: #ff6b6b;
            color: $white;
          }
        }
      }
    }
    
    .cart-summary {
      flex: 1;
      background-color: $white;
      padding: $spacing-lg;
      border-radius: $border-radius-md;
      box-shadow: $shadow-sm;
      align-self: flex-start;
      
      h2 {
        font-size: 1.5rem;
        color: $primary-dark;
        margin-bottom: $spacing-lg;
      }
      
      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: $spacing-md;
        color: $text-light;
      }
      
      .summary-total {
        display: flex;
        justify-content: space-between;
        margin: $spacing-md 0;
        padding-top: $spacing-md;
        border-top: 1px solid $secondary;
        font-weight: 600;
        font-size: 1.2rem;
      }
      
      .promo-code {
        display: flex;
        margin-bottom: $spacing-lg;
        
        input {
          flex: 1;
          padding: $spacing-sm;
          border: 1px solid $secondary;
          border-radius: $border-radius-sm 0 0 $border-radius-sm;
          
          &:focus {
            outline: none;
            border-color: $primary;
          }
        }
        
        button {
          background-color: $primary;
          color: $white;
          border: none;
          padding: $spacing-sm $spacing-md;
          border-radius: 0 $border-radius-sm $border-radius-sm 0;
          cursor: pointer;
          
          &:hover {
            background-color: $primary-dark;
          }
        }
      }
      
      .checkout-button {
        width: 100%;
        background-color: $primary;
        color: $white;
        border: none;
        padding: $spacing-md;
        border-radius: $border-radius-sm;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: $spacing-md;
        
        &:hover {
          background-color: $primary-dark;
        }
      }
      
      .continue-shopping {
        text-align: center;
        
        a {
          color: $primary;
          display: inline-flex;
          align-items: center;
          gap: $spacing-xs;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  
  .empty-cart {
    text-align: center;
    padding: $spacing-xxl 0;
    
    .empty-cart-icon {
      font-size: 4rem;
      color: $primary-light;
      margin-bottom: $spacing-lg;
    }
    
    h2 {
      font-size: 2rem;
      color: $primary-dark;
      margin-bottom: $spacing-md;
    }
    
    p {
      color: $text-light;
      margin-bottom: $spacing-lg;
    }
    
    .shopping-button {
      display: inline-block;
      background-color: $primary;
      color: $white;
      padding: $spacing-sm $spacing-lg;
      border-radius: $border-radius-sm;
      font-weight: 600;
      
      &:hover {
        background-color: $primary-dark;
      }
    }
  }
}
</style>