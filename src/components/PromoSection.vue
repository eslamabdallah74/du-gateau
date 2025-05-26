<template>
  <div class="promo-section" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="promo-content">
      <h2 class="promo-title script-text">{{ title }}</h2>
      <p class="promo-subtitle">{{ subtitle }}</p>
      <router-link :to="buttonLink" class="promo-button">{{ buttonText }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}>();
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.promo-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: $border-radius-md;
  overflow: hidden;
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $spacing-lg 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba($primary, 0.7), rgba($primary-light, 0.7));
    z-index: 1;
  }
  
  .promo-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: $spacing-md;
    max-width: 500px;
    
    .promo-title {
      font-size: 2.5rem;
      color: $white;
      margin-bottom: $spacing-md;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    }
    
    .promo-subtitle {
      font-size: 1.2rem;
      color: $white;
      margin-bottom: $spacing-lg;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
    
    .promo-button {
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
}

@media (max-width: $breakpoint-md) {
  .promo-section {
    height: 250px;
    
    .promo-content {
      .promo-title {
        font-size: 2rem;
      }
      
      .promo-subtitle {
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .promo-section {
    height: 200px;
    
    .promo-content {
      .promo-title {
        font-size: 1.8rem;
      }
    }
  }
}
</style>