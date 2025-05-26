<template>
  <div class="menu-page">
    <div class="container">
      <h1 class="script-text">Our Menu</h1>
      
      <div class="category-tabs">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="category-tab"
          :class="{ 'active': activeCategory === category.slug }"
          @click="setActiveCategory(category.slug)"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { products, categories } from '@/data/products';

const activeCategory = ref('cupcakes'); // Default category

const setActiveCategory = (category: string) => {
  activeCategory.value = category;
};

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products;
  }
  return products.filter(product => product.category === activeCategory.value);
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.menu-page {
  padding: $spacing-xl 0;
  
  h1 {
    font-size: 3rem;
    color: $primary-dark;
    text-align: center;
    margin-bottom: $spacing-xl;
  }
  
  .category-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
    
    .category-tab {
      background-color: $secondary;
      color: $text;
      border: none;
      padding: $spacing-sm $spacing-lg;
      border-radius: $border-radius-md;
      cursor: pointer;
      transition: all $transition-normal;
      font-weight: 500;
      
      &:hover {
        background-color: $primary-light;
        color: $white;
      }
      
      &.active {
        background-color: $primary;
        color: $white;
      }
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-lg;
    
    @media (max-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: $breakpoint-sm) {
      grid-template-columns: 1fr;
    }
  }
}
</style>