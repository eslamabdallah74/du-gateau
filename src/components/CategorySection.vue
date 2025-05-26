<template>
  <div class="category-section">
    <h2 class="section-title script-text">{{ title }}</h2>
    <div class="category-grid">
      <div v-for="product in products" :key="product.id" class="category-item">
        <ProductCard :product="product" />
      </div>
    </div>
    <div class="view-all">
      <router-link :to="viewAllLink" class="view-all-button">View All</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types';

defineProps<{
  title: string;
  products: Product[];
  viewAllLink: string;
}>();
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.category-section {
  padding: $spacing-xl 0;
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    color: $primary-dark;
    margin-bottom: $spacing-xl;
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-md;
    
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
  
  .view-all {
    text-align: center;
    margin-top: $spacing-xl;
    
    .view-all-button {
      display: inline-block;
      background-color: $primary;
      color: $white;
      padding: $spacing-sm $spacing-lg;
      border-radius: $border-radius-sm;
      font-weight: 500;
      transition: background-color $transition-normal, transform $transition-normal;
      
      &:hover {
        background-color: $primary-dark;
        transform: translateY(-2px);
      }
    }
  }
}
</style>