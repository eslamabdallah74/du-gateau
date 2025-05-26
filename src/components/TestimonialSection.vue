<template>
  <div class="testimonial-section">
    <!-- Animated background elements -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
    
    <!-- Enhanced title with animated underline -->
    <div class="title-container">
      <h2 class="section-title script-text">What Our Customers Say</h2>
      <div class="title-underline"></div>
    </div>
    
    <!-- Testimonials grid with staggered animations -->
    <div class="testimonials-container">
      <div class="testimonials">
        <div 
          class="testimonial" 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <!-- Floating quote mark -->
          <div class="quote-float">"</div>
          
          <!-- Testimonial content with glassmorphism effect -->
          <div class="testimonial-content">
            <div class="content-inner">
              <p class="testimonial-text">{{ testimonial.text }}</p>
              
              <!-- Enhanced star rating with animation -->
              <div class="rating-container">
                <div class="rating">
                  <font-awesome-icon 
                    icon="star" 
                    v-for="i in 5" 
                    :key="i" 
                    :class="{ 'filled': i <= testimonial.rating }"
                    :style="{ animationDelay: `${(index * 0.2) + (i * 0.1)}s` }"
                    class="star"
                  />
                </div>
                <span class="rating-text">{{ testimonial.rating }}/5</span>
              </div>
            </div>
          </div>
          
          <!-- Enhanced author section -->
          <div class="testimonial-author">
            <div class="author-avatar-container">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar" />
              <div class="avatar-ring"></div>
            </div>
            <div class="author-info">
              <h4 class="author-name">{{ testimonial.name }}</h4>
              <p class="author-location">{{ testimonial.location }}</p>
            </div>
            <div class="testimonial-accent"></div>
          </div>
          
          <!-- Hover glow effect -->
          <div class="hover-glow"></div>
        </div>
      </div>
    </div>
    
    <!-- Floating particles -->
    <div class="particles">
      <div class="particle" v-for="i in 12" :key="i" :style="{ 
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 3 + 's',
        animationDuration: (3 + Math.random() * 2) + 's'
      }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    location: 'Paris, France',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'The cakes from Du Gâteau are absolutely divine! Every bite is filled with so much flavor and love. My wedding cake was perfect!',
    rating: 5
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'New York, USA',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'I ordered cupcakes for my daughter\'s birthday and they were a hit! Beautiful, delicious, and delivered right on time.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emma Thompson',
    location: 'London, UK',
    avatar: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'The macarons here are the best I\'ve had outside of Paris. Perfectly crisp shell with a soft center and amazing flavors!',
    rating: 4
  }
];
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.testimonial-section {
  padding: $spacing-xxl 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba($primary-light, 0.02) 0%, rgba($secondary, 0.05) 100%);
  
  // Animated background decorations
  .bg-decoration {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    
    .floating-shape {
      position: absolute;
      background: linear-gradient(45deg, rgba($primary-light, 0.1), rgba($secondary, 0.1));
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
      
      &.shape-1 {
        width: 100px;
        height: 100px;
        top: 10%;
        left: 10%;
        animation-delay: 0s;
      }
      
      &.shape-2 {
        width: 150px;
        height: 150px;
        top: 70%;
        right: 10%;
        animation-delay: -2s;
      }
      
      &.shape-3 {
        width: 80px;
        height: 80px;
        top: 30%;
        right: 30%;
        animation-delay: -4s;
      }
    }
  }
  
  // Enhanced title section
  .title-container {
    text-align: center;
    margin-bottom: $spacing-xxl;
    position: relative;
    z-index: 2;
    
    .section-title {
      font-size: clamp(2rem, 5vw, 2.5rem);
      color: $primary-dark;
      margin-bottom: $spacing-md;
      text-shadow: 0 2px 4px rgba($primary-dark, 0.1);
      animation: titleSlideIn 1s ease-out;
    }
    
    .title-underline {
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, $primary-light, $secondary, $primary-light);
      margin: 0 auto;
      border-radius: 2px;
      animation: underlineGrow 1.5s ease-out 0.5s forwards;
    }
  }
  
  .testimonials-container {
    position: relative;
    z-index: 2;
  }
  
  .testimonials {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: $spacing-xl;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    
    @media (max-width: $breakpoint-md) {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
    }
  }
  
  .testimonial {
    position: relative;
    background: rgba($white, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 
      0 10px 40px rgba($primary-dark, 0.1),
      0 1px 3px rgba($primary-dark, 0.05);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    transform: translateY(30px);
    animation: slideInUp 0.8s ease-out forwards;
    border: 1px solid rgba($primary-light, 0.2);
    
    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 
        0 25px 60px rgba($primary-dark, 0.15),
        0 5px 20px rgba($primary-light, 0.1);
      
      .hover-glow {
        opacity: 1;
      }
      
      .author-avatar {
        transform: scale(1.1);
      }
      
      .avatar-ring {
        transform: scale(1.2);
        opacity: 0.8;
      }
      
      .quote-float {
        transform: scale(1.1) rotate(5deg);
        color: $primary-light;
      }
      
      .testimonial-accent {
        width: 100%;
      }
    }
    
    // Floating quote mark
    .quote-float {
      position: absolute;
      top: -10px;
      right: $spacing-lg;
      font-size: 4rem;
      font-family: $font-family-script;
      color: rgba($primary-light, 0.3);
      line-height: 1;
      z-index: 3;
      transition: all 0.3s ease;
      transform-origin: center;
    }
    
    // Enhanced content section
    .testimonial-content {
      padding: $spacing-xl $spacing-lg $spacing-lg;
      position: relative;
      
      .content-inner {
        position: relative;
        z-index: 2;
      }
      
      .testimonial-text {
        font-style: italic;
        margin-bottom: $spacing-lg;
        line-height: 1.7;
        font-size: 1.05rem;
        color: rgba($primary-dark, 0.9);
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          left: -$spacing-md;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, $primary-light, $secondary);
          border-radius: 2px;
          opacity: 0.5;
        }
      }
      
      .rating-container {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
        
        .rating {
          display: flex;
          gap: 2px;
          
          .star {
            color: #e0e0e0;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            animation: starPop 0.6s ease-out both;
            
            &.filled {
              color: #ffc107;
              filter: drop-shadow(0 0 3px rgba(#ffc107, 0.4));
            }
            
            &:hover {
              transform: scale(1.2);
            }
          }
        }
        
        .rating-text {
          font-weight: 600;
          color: $primary-dark;
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
    }
    
    // Enhanced author section
    .testimonial-author {
      display: flex;
      align-items: center;
      padding: $spacing-lg;
      background: linear-gradient(135deg, $secondary 0%, rgba($secondary, 0.8) 100%);
      position: relative;
      
      .author-avatar-container {
        position: relative;
        margin-right: $spacing-md;
        
        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba($white, 0.8);
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .avatar-ring {
          position: absolute;
          top: -5px;
          left: -5px;
          width: 70px;
          height: 70px;
          border: 2px solid $primary-light;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
          animation: pulse 2s ease-in-out infinite;
        }
      }
      
      .author-info {
        flex: 1;
        
        .author-name {
          margin: 0 0 $spacing-xs 0;
          font-weight: 600;
          color: $primary-dark;
          font-size: 1.1rem;
        }
        
        .author-location {
          margin: 0;
          font-size: 0.9rem;
          color: rgba($primary-dark, 0.7);
          display: flex;
          align-items: center;
          
          &::before {
            content: '📍';
            margin-right: $spacing-xs;
          }
        }
      }
      
      .testimonial-accent {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        width: 0;
        background: linear-gradient(90deg, $primary-light, $secondary);
        transition: width 0.4s ease;
      }
    }
    
    // Hover glow effect
    .hover-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba($primary-light, 0.1), transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
  }
  
  // Floating particles
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba($primary-light, 0.6);
      border-radius: 50%;
      animation: particleFloat 3s ease-in-out infinite;
    }
  }
}

// Animations
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes titleSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes underlineGrow {
  from { width: 0; }
  to { width: 100px; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes starPop {
  0% { transform: scale(0); }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.6; }
}

@keyframes particleFloat {
  0% { 
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% { 
    opacity: 1;
  }
  90% { 
    opacity: 1;
  }
  100% { 
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

// Responsive enhancements
@media (max-width: $breakpoint-md) {
  .testimonial-section {
    .testimonials {
      padding: 0 $spacing-md;
    }
    
    .testimonial {
      .quote-float {
        font-size: 3rem;
        top: -5px;
        right: $spacing-md;
      }
      
      .testimonial-content {
        padding: $spacing-lg $spacing-md $spacing-md;
      }
      
      .testimonial-author {
        padding: $spacing-md;
        
        .author-avatar-container .author-avatar {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}

// High-performance mode for reduced motion
@media (prefers-reduced-motion: reduce) {
  .testimonial,
  .floating-shape,
  .particle,
  .avatar-ring {
    animation: none !important;
  }
  
  .testimonial {
    opacity: 1;
    transform: none;
  }
}
</style>
