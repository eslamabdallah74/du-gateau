<template>
  <div class="container">
    <!-- Animated background elements -->
    <div class="features-bg">
      <div class="bg-orb orb-1"></div>
      <div class="bg-orb orb-2"></div>
      <div class="bg-orb orb-3"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="features-section">
      <div 
        class="feature" 
        v-for="(feature, index) in features" 
        :key="feature.id"
        :style="{ animationDelay: `${index * 0.2}s` }"
        @mouseenter="handleHover(index)"
        @mouseleave="handleLeave(index)"
      >
        <!-- Ripple effect container -->
        <div class="ripple-container">
          <div class="ripple" :class="{ active: hoveredIndex === index }"></div>
          <div class="ripple ripple-2" :class="{ active: hoveredIndex === index }"></div>
        </div>

        <!-- Enhanced icon with multiple layers -->
        <div class="feature-icon-container">
          <div class="icon-backdrop"></div>
          <div class="icon-ring"></div>
          <div class="feature-icon">
            <font-awesome-icon :icon="feature.icon" />
            <div class="icon-glow"></div>
          </div>
          <div class="floating-particles">
            <div 
              class="particle" 
              v-for="i in 6" 
              :key="i"
              :style="{ 
                '--delay': Math.random() * 2 + 's',
                '--duration': (2 + Math.random()) + 's'
              }"
            ></div>
          </div>
        </div>

        <!-- Enhanced title with animated underline -->
        <div class="feature-content">
          <h3 class="feature-title">
            {{ feature.title }}
            <div class="title-underline"></div>
          </h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>

        <!-- Hover overlay effects -->
        <div class="hover-overlay"></div>
        <div class="corner-accent corner-tl"></div>
        <div class="corner-accent corner-br"></div>
        
        <!-- Pulse border -->
        <div class="pulse-border"></div>
      </div>
    </div>

    <!-- Floating elements -->
    <div class="floating-elements">
      <div class="float-shape shape-1">✨</div>
      <div class="float-shape shape-2">🎂</div>
      <div class="float-shape shape-3">🚚</div>
      <div class="float-shape shape-4">🔔</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hoveredIndex = ref(-1);

const features = [
  {
    id: 1,
    icon: 'birthday-cake',
    title: 'Product Details',
    description: 'Discover our exquisite collection of handcrafted cakes and pastries'
  },
  {
    id: 2,
    icon: 'truck',
    title: 'Fast Delivery',
    description: 'Lightning-fast delivery to bring sweetness right to your doorstep'
  },
  {
    id: 3,
    icon: 'concierge-bell',
    title: 'Services',
    description: 'Premium customer service and personalized cake consultation'
  }
];

const handleHover = (index: number) => {
  hoveredIndex.value = index;
};

const handleLeave = (_index: number) => {
  hoveredIndex.value = -1;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.container {
  position: relative;
  padding: $spacing-xxl 0;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba($primary-light, 0.03) 0%, 
    rgba($secondary, 0.05) 50%, 
    rgba($primary-light, 0.02) 100%
  );
  min-height: 400px;
}

// Animated background
.features-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  
  .bg-orb {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary-light, 0.1), transparent 70%);
    animation: orbFloat 8s ease-in-out infinite;
    
    &.orb-1 {
      width: 200px;
      height: 200px;
      top: -50px;
      left: -50px;
      animation-delay: 0s;
    }
    
    &.orb-2 {
      width: 150px;
      height: 150px;
      bottom: -30px;
      right: -30px;
      animation-delay: -3s;
    }
    
    &.orb-3 {
      width: 100px;
      height: 100px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: -6s;
    }
  }
  
  .bg-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba($primary-light, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba($primary-light, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridShift 20s linear infinite;
  }
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: $spacing-xl;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
  position: relative;
  z-index: 2;
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-lg;
    padding: 0 $spacing-md;
  }
}

.feature {
  position: relative;
  background: rgba($white, 0.95);
  backdrop-filter: blur(15px);
  border-radius: 24px;
  padding: $spacing-xl;
  text-align: center;
  border: 2px solid rgba($primary-light, 0.2);
  box-shadow: 
    0 20px 40px rgba($primary-dark, 0.08),
    0 8px 16px rgba($primary-light, 0.05),
    inset 0 1px 0 rgba($white, 0.8);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  animation: featureSlideIn 0.8s ease-out forwards;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-15px) scale(1.05);
    box-shadow: 
      0 40px 80px rgba($primary-dark, 0.15),
      0 20px 40px rgba($primary-light, 0.1),
      inset 0 1px 0 rgba($white, 0.9);
    border-color: rgba($primary-light, 0.4);
    
    .feature-icon-container {
      .feature-icon {
        transform: scale(1.2) rotateY(360deg);
        
        .icon-glow {
          opacity: 1;
          transform: scale(1.5);
        }
      }
      
      .icon-ring {
        transform: scale(1.3) rotate(180deg);
        opacity: 0.8;
      }
      
      .icon-backdrop {
        transform: scale(1.4);
        opacity: 0.3;
      }
    }
    
    .feature-title .title-underline {
      width: 100%;
    }
    
    .pulse-border {
      opacity: 1;
      animation: pulseBorder 1.5s ease-in-out infinite;
    }
    
    .corner-accent {
      opacity: 1;
      
      &.corner-tl {
        transform: translate(0, 0);
      }
      
      &.corner-br {
        transform: translate(0, 0);
      }
    }
    
    .floating-particles .particle {
      animation-play-state: running;
    }
  }
  
  // Ripple effects
  .ripple-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    pointer-events: none;
    
    .ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba($primary-light, 0.3), transparent 70%);
      transition: all 0.6s ease-out;
      
      &.active {
        width: 300px;
        height: 300px;
      }
      
      &.ripple-2 {
        transition-delay: 0.2s;
        background: radial-gradient(circle, rgba($secondary, 0.2), transparent 70%);
      }
    }
  }
  
  // Enhanced icon container
  .feature-icon-container {
    position: relative;
    margin-bottom: $spacing-lg;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    
    .icon-backdrop {
      position: absolute;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba($primary-light, 0.15), rgba($secondary, 0.1));
      border-radius: 50%;
      transition: all 0.5s ease;
      z-index: 1;
    }
    
    .icon-ring {
      position: absolute;
      width: 90px;
      height: 90px;
      border: 3px solid rgba($primary-light, 0.4);
      border-radius: 50%;
      border-left-color: transparent;
      border-bottom-color: transparent;
      transition: all 0.8s ease;
      z-index: 2;
      opacity: 0.6;
    }
    
    .feature-icon {
      position: relative;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, $primary-light, lighten($primary-light, 10%));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: $white;
      box-shadow: 
        0 10px 25px rgba($primary-light, 0.3),
        inset 0 1px 0 rgba($white, 0.2);
      transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: 3;
      
      .icon-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba($primary-light, 0.6), transparent 70%);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.4s ease;
        z-index: -1;
      }
    }
    
    .floating-particles {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      pointer-events: none;
      
      .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: $primary-light;
        border-radius: 50%;
        opacity: 0.7;
        animation: particleOrbit 3s linear infinite;
        animation-play-state: paused;
        animation-delay: var(--delay);
        animation-duration: var(--duration);
        
        &:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
        &:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); }
        &:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }
        &:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); }
        &:nth-child(5) { top: 15%; right: 15%; }
        &:nth-child(6) { bottom: 15%; left: 15%; }
      }
    }
  }
  
  // Enhanced content
  .feature-content {
    position: relative;
    z-index: 4;
  }
  
  .feature-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: $primary-dark;
    margin-bottom: $spacing-md;
    position: relative;
    display: inline-block;
    
    .title-underline {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-light, $secondary);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
  }
  
  .feature-description {
    color: rgba($primary-dark, 0.8);
    line-height: 1.6;
    font-size: 0.95rem;
    margin: 0;
    opacity: 0.9;
  }
  
  // Hover overlay
  .hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba($primary-light, 0.05) 0%, 
      rgba($secondary, 0.03) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 24px;
    pointer-events: none;
  }
  
  &:hover .hover-overlay {
    opacity: 1;
  }
  
  // Corner accents
  .corner-accent {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity: 0;
    transition: all 0.4s ease;
    
    &.corner-tl {
      top: 15px;
      left: 15px;
      border-top: 3px solid $primary-light;
      border-left: 3px solid $primary-light;
      transform: translate(-10px, -10px);
    }
    
    &.corner-br {
      bottom: 15px;
      right: 15px;
      border-bottom: 3px solid $secondary;
      border-right: 3px solid $secondary;
      transform: translate(10px, 10px);
    }
  }
  
  // Pulse border
  .pulse-border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid transparent;
    border-radius: 26px;
    opacity: 0;
    pointer-events: none;
  }
}

// Floating elements
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  
  .float-shape {
    position: absolute;
    font-size: 1.5rem;
    opacity: 0.3;
    animation: floatDrift 6s ease-in-out infinite;
    
    &.shape-1 {
      top: 20%;
      left: 5%;
      animation-delay: 0s;
    }
    
    &.shape-2 {
      top: 10%;
      right: 15%;
      animation-delay: -2s;
    }
    
    &.shape-3 {
      bottom: 30%;
      left: 10%;
      animation-delay: -4s;
    }
    
    &.shape-4 {
      bottom: 15%;
      right: 5%;
      animation-delay: -1s;
    }
  }
}

// Animations
@keyframes featureSlideIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes gridShift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes particleOrbit {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}

@keyframes pulseBorder {
  0%, 100% {
    border-color: rgba($primary-light, 0.6);
    box-shadow: 0 0 0 0 rgba($primary-light, 0.4);
  }
  50% {
    border-color: rgba($secondary, 0.8);
    box-shadow: 0 0 0 8px rgba($primary-light, 0);
  }
}

@keyframes floatDrift {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

// Responsive design
@media (max-width: $breakpoint-md) {
  .feature {
    padding: $spacing-lg;
    
    .feature-icon-container {
      height: 100px;
      margin-bottom: $spacing-md;
      
      .feature-icon {
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
      }
      
      .icon-backdrop {
        width: 70px;
        height: 70px;
      }
      
      .icon-ring {
        width: 80px;
        height: 80px;
      }
    }
    
    .feature-title {
      font-size: 1.2rem;
    }
    
    .feature-description {
      font-size: 0.9rem;
    }
  }
}

// Accessibility
@media (prefers-reduced-motion: reduce) {
  .feature,
  .bg-orb,
  .floating-particles .particle,
  .float-shape {
    animation: none !important;
  }
  
  .feature {
    opacity: 1;
    transform: none;
  }
}
</style>