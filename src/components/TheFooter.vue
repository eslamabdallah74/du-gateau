<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>ABOUT</h3>
          <ul>
            <li><router-link to="/about">Our Story</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section logo-section">
          <div class="footer-logo">
            <img src="@/assets/logo.png" alt="Du Gâteau" />
            <h2 class="script-text">Du Gâteau</h2>
          </div>
          <div class="social-links">
            <a href="#" class="social-link"><span class="icon">📘</span></a>
            <a href="#" class="social-link"><span class="icon">🐦</span></a>
            <a href="#" class="social-link"><span class="icon">📷</span></a>
          </div>
          <p class="footer-contact">Working hours from 9 AM to 9 PM, Monday to Sunday</p>
        </div>
        
        <div class="footer-section subscribe-section">
          <h3>Subscribe To</h3>
          <p>Don't Miss Out Our Latest Updates</p>
          <div class="subscribe-form">
            <input type="email" placeholder="Email" v-model="email" />
            <button @click="subscribe" class="subscribe-button">Submit</button>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 - All Rights are reserved</p>
        <div class="payment-methods">
          <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="Visa" />
          <img src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png" alt="MasterCard" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');

const subscribe = () => {
  if (email.value && validateEmail(email.value)) {
    alert('Thank you for subscribing!');
    email.value = '';
  } else {
    alert('Please enter a valid email address');
  }
};

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.footer {
  background: linear-gradient(to right, $primary, $primary-light, $primary, $primary-light, $primary);
  padding: $spacing-xl 0;
  color: $white;
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: $spacing-xl;
    }
  }
  
  .footer-section {
    flex: 1;
    
    h3 {
      font-family: $font-family-accent;
      margin-bottom: $spacing-md;
      color: $white;
    }
    
    ul {
      list-style-type: none;
      
      li {
        margin-bottom: $spacing-sm;
        
        a {
          color: rgba(255, 255, 255, 0.8);
          transition: color $transition-normal;
          
          &:hover {
            color: $white;
            text-decoration: underline;
          }
        }
      }
    }
  }
  
  .logo-section {
    text-align: center;
    
    .footer-logo {
      margin-bottom: $spacing-md;
      
      img {
        width: 80px;
        height: auto;
        margin-bottom: $spacing-sm;
      }
      
      h2 {
        font-size: 2rem;
        margin-bottom: $spacing-xs;
        color: $white;
      }
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: $spacing-md;
      margin-bottom: $spacing-md;
      
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        color: $white;
        transition: background-color $transition-normal;
        
        .icon {
          font-size: 1.2rem;
          line-height: 1;
        }
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    
    .footer-contact {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
  
  .subscribe-section {
    p {
      margin-bottom: $spacing-md;
      opacity: 0.8;
    }
    
    .subscribe-form {
      display: flex;
      flex-direction: column;
      
      input {
        padding: $spacing-sm;
        border: none;
        margin-bottom: $spacing-sm;
        border-radius: $border-radius-sm;
      }
      
      .subscribe-button {
        background-color: $white;
        color: $primary;
        border: none;
        padding: $spacing-sm;
        border-radius: $border-radius-sm;
        cursor: pointer;
        transition: background-color $transition-normal;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.9);
        }
      }
    }
  }
  
  .footer-bottom {
    margin-top: $spacing-xl;
    padding-top: $spacing-md;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
      gap: $spacing-md;
    }
    
    p {
      opacity: 0.8;
      font-size: 0.9rem;
    }
    
    .payment-methods {
      display: flex;
      gap: $spacing-md;
      
      img {
        height: 30px;
        width: auto;
        filter: brightness(0) invert(1);
        opacity: 0.8;
      }
    }
  }
}
</style>