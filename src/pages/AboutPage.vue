<template>
  <div class="about-page">
    <div class="container">
      <div class="about-hero">
        <img src="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="About Du Gâteau" class="about-hero-image" />
      </div>
      
      <div class="about-content">
        <h1 class="script-text">About Us</h1>
        <p class="about-description">
          We offer a special selection of handmade desserts and premium chocolates, crafted with care and high-quality ingredients.
          Whether you're celebrating or just craving something sweet, we're here to bring joy to every bite.
        </p>
        
        <div class="about-sections">
          <div class="about-section">
            <div class="section-icon">
              <font-awesome-icon icon="history" />
            </div>
            <div class="section-content">
              <h2>Our Story</h2>
              <p>
                Founded in 2015 by Chef Marie Laurent, Du Gâteau began as a small pastry shop in the heart of Paris. 
                With a passion for creating extraordinary desserts and a commitment to using only the finest ingredients, 
                Marie's little shop quickly gained recognition for its exceptional quality and artistic presentation.
              </p>
              <p>
                Today, Du Gâteau has grown into a beloved destination for dessert enthusiasts, 
                while still maintaining the same dedication to quality and craftsmanship that has been our foundation since the beginning.
              </p>
            </div>
          </div>
          
          <div class="about-section">
            <div class="section-icon">
              <font-awesome-icon icon="star" />
            </div>
            <div class="section-content">
              <h2>Our Philosophy</h2>
              <p>
                At Du Gâteau, we believe that desserts should be more than just sweet treats – they should be experiences that bring joy and create memories.
                Every creation that leaves our kitchen is made with attention to detail, respect for traditional techniques, and a touch of innovation.
              </p>
              <p>
                We source our ingredients carefully, working with local farmers and sustainable suppliers whenever possible, 
                to ensure that every component of our desserts meets our high standards of quality and ethics.
              </p>
            </div>
          </div>
          
          <div class="about-section">
            <div class="section-icon">
              <font-awesome-icon icon="users" />
            </div>
            <div class="section-content">
              <h2>Our Team</h2>
              <p>
                Behind every delicious creation is our talented team of passionate pastry chefs, led by Chef Marie Laurent. 
                Each member brings unique skills and creativity to our kitchen, contributing to the diverse and exciting menu we offer.
              </p>
              <p>
                Our team undergoes regular training and participates in international competitions to continuously expand their knowledge 
                and refine their techniques, ensuring that Du Gâteau remains at the forefront of pastry innovation.
              </p>
            </div>
          </div>
        </div>
        
        <div class="cta-section">
          <h2 class="script-text">Ready to Taste the Difference?</h2>
          <p>Visit our shop or order online to experience our handcrafted desserts for yourself.</p>
          <div class="cta-buttons">
            <router-link to="/menu" class="cta-button primary">Explore Our Menu</router-link>
            <router-link to="/contact" class="cta-button secondary">Contact Us</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.about-page {
  padding: $spacing-xl 0;
  
  .about-hero {
    margin-bottom: $spacing-xl;
    border-radius: $border-radius-lg;
    overflow: hidden;
    height: 300px;
    
    .about-hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .about-content {
    h1 {
      font-size: 3rem;
      color: $primary-dark;
      text-align: center;
      margin-bottom: $spacing-lg;
    }
    
    .about-description {
      font-size: 1.2rem;
      text-align: center;
      max-width: 800px;
      margin: 0 auto $spacing-xxl auto;
      line-height: 1.6;
      font-style: italic;
    }
    
    .about-sections {
      display: flex;
      flex-direction: column;
      gap: $spacing-xl;
      margin-bottom: $spacing-xxl;
    }
    
    .about-section {
      display: flex;
      gap: $spacing-lg;
      
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .section-icon {
        font-size: 2rem;
        color: $primary;
        width: 80px;
        height: 80px;
        min-width: 80px;
        background-color: rgba($primary, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .section-content {
        h2 {
          font-size: 1.8rem;
          color: $primary-dark;
          margin-bottom: $spacing-md;
        }
        
        p {
          margin-bottom: $spacing-md;
          line-height: 1.6;
        }
      }
    }
    
    .cta-section {
      background-color: $secondary;
      padding: $spacing-xl;
      border-radius: $border-radius-lg;
      text-align: center;
      
      h2 {
        font-size: 2.5rem;
        color: $primary-dark;
        margin-bottom: $spacing-md;
      }
      
      p {
        font-size: 1.1rem;
        margin-bottom: $spacing-lg;
      }
      
      .cta-buttons {
        display: flex;
        justify-content: center;
        gap: $spacing-md;
        
        @media (max-width: $breakpoint-sm) {
          flex-direction: column;
          align-items: center;
        }
        
        .cta-button {
          padding: $spacing-sm $spacing-lg;
          border-radius: $border-radius-sm;
          font-weight: 600;
          transition: background-color $transition-normal, transform $transition-normal;
          
          &:hover {
            transform: translateY(-2px);
          }
          
          &.primary {
            background-color: $primary;
            color: $white;
            
            &:hover {
              background-color: $primary-dark;
            }
          }
          
          &.secondary {
            background-color: $white;
            color: $primary;
            border: 1px solid $primary;
            
            &:hover {
              background-color: rgba($primary, 0.1);
            }
          }
        }
      }
    }
  }
}
</style>