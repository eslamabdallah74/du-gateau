<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-slider">
        <div class="hero-slide">
          <div class="hero-content">
            <h1 class="script-text">Up To 20%</h1>
            <h2 class="script-text">For All Products</h2>
            <router-link to="/menu" class="shop-now-button">Shop Now</router-link>
          </div>
          <img src="https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Featured Cake" class="hero-image" />
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="features-section">
        <div class="feature">
          <div class="feature-icon">
            <font-awesome-icon icon="birthday-cake" />
          </div>
          <h3>Product Details</h3>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <font-awesome-icon icon="truck" />
          </div>
          <h3>Fast Delivery</h3>
        </div>
        <div class="feature">
          <div class="feature-icon">
            <font-awesome-icon icon="concierge-bell" />
          </div>
          <h3>Services</h3>
        </div>
      </div>
      
      <CategorySection 
        title="Our Bestsellers"
        :products="bestsellerProducts"
        view-all-link="/menu"
      />
      
      <PromoSection
        title="Special Offer"
        subtitle="Discover our handcrafted desserts made with premium ingredients"
        button-text="Order Now"
        button-link="/menu"
        background-image="https://images.pexels.com/photos/1291712/pexels-photo-1291712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      
      <CategorySection 
        title="Featured Products"
        :products="featuredProducts"
        view-all-link="/menu"
      />
      
      <TestimonialSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CategorySection from '@/components/CategorySection.vue';
import PromoSection from '@/components/PromoSection.vue';
import TestimonialSection from '@/components/TestimonialSection.vue';
import { getFeaturedProducts, getBestsellerProducts } from '@/data/products';

const featuredProducts = ref(getFeaturedProducts());
const bestsellerProducts = ref(getBestsellerProducts());
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.home-page {
  .hero-section {
    margin-bottom: $spacing-xl;
    
    .hero-slider {
      position: relative;
      
      .hero-slide {
        height: 400px;
        background-color: $primary-light;
        border-radius: $border-radius-lg;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $spacing-xl;
        
        @media (max-width: $breakpoint-md) {
          height: 300px;
          padding: $spacing-lg;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        
        .hero-content {
          z-index: 2;
          max-width: 500px;
          
          h1 {
            font-size: 3rem;
            color: $white;
            margin-bottom: $spacing-sm;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            
            @media (max-width: $breakpoint-md) {
              font-size: 2.5rem;
            }
          }
          
          h2 {
            font-size: 2.5rem;
            color: $white;
            margin-bottom: $spacing-lg;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            
            @media (max-width: $breakpoint-md) {
              font-size: 2rem;
              margin-bottom: $spacing-md;
            }
          }
          
          .shop-now-button {
            background-color: $white;
            color: $primary-dark;
            padding: $spacing-sm $spacing-lg;
            border-radius: $border-radius-sm;
            font-weight: 600;
            transition: background-color $transition-normal, transform $transition-normal;
            display: inline-block;
            
            &:hover {
              background-color: rgba(255, 255, 255, 0.9);
              transform: translateY(-2px);
            }
          }
        }
        
        .hero-image {
          height: 80%;
          width: auto;
          object-fit: contain;
          z-index: 1;
          transform: rotate(-5deg);
          filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
          
          @media (max-width: $breakpoint-md) {
            display: none;
          }
        }
      }
    }
  }
  
  .features-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: $spacing-xl;
    background-color: $secondary;
    border-radius: $border-radius-md;
    padding: $spacing-lg;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: $spacing-lg;
    }
    
    .feature {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      .feature-icon {
        font-size: 2.5rem;
        color: $primary;
        margin-bottom: $spacing-md;
        width: 80px;
        height: 80px;
        background-color: rgba($primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform $transition-normal;
        
        &:hover {
          transform: scale(1.1);
        }
      }
      
      h3 {
        font-family: $font-family-script;
        font-size: 1.5rem;
        color: $primary-dark;
      }
    }
  }
}
</style>