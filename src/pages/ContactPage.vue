<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="script-text">Contact Us</h1>
      
      <div class="contact-content">
        <div class="contact-form-container">
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="form.firstName" 
                placeholder="Your name" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="lastName">Family Name</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="form.lastName" 
                placeholder="Family name" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                placeholder="Email account" 
                required
              />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <div class="phone-input">
                <select v-model="form.countryCode">
                  <option value="+1">+1 (USA)</option>
                  <option value="+33">+33 (France)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+61">+61 (Australia)</option>
                </select>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="Phone number" 
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            
            <button type="submit" class="submit-button">Order Now</button>
          </form>
        </div>
        
        <div class="contact-info">
          <h2>Visit Our Bakery</h2>
          <div class="info-section">
            <div class="info-icon">
              <font-awesome-icon icon="map-marker-alt" />
            </div>
            <div class="info-content">
              <h3>Address</h3>
              <p>123 Pastry Lane, Sweetville</p>
              <p>Paris, France 75001</p>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-icon">
              <font-awesome-icon icon="clock" />
            </div>
            <div class="info-content">
              <h3>Opening Hours</h3>
              <p>Monday - Friday: 7:00 AM - 8:00 PM</p>
              <p>Saturday - Sunday: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-icon">
              <font-awesome-icon icon="phone" />
            </div>
            <div class="info-content">
              <h3>Contact</h3>
              <p>Phone: +33 1 23 45 67 89</p>
              <p>Email: info@dugateau.com</p>
            </div>
          </div>
          
          <div class="map-container">
            <img src="https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Map location" class="map-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  countryCode: '+33',
  phone: '',
  message: ''
});

const submitForm = () => {
  // In a real application, this would send the form data to a server
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  form.firstName = '';
  form.lastName = '';
  form.email = '';
  form.countryCode = '+33';
  form.phone = '';
  form.message = '';
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.contact-page {
  padding: $spacing-xl 0;
  
  h1 {
    font-size: 3rem;
    color: $primary-dark;
    text-align: center;
    margin-bottom: $spacing-xl;
  }
  
  .contact-content {
    display: flex;
    gap: $spacing-xl;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
    
    .contact-form-container {
      flex: 1;
      
      .contact-form {
        background-color: $white;
        padding: $spacing-lg;
        border-radius: $border-radius-md;
        box-shadow: $shadow-sm;
        
        .form-group {
          margin-bottom: $spacing-md;
          
          label {
            display: block;
            margin-bottom: $spacing-xs;
            font-weight: 600;
          }
          
          input, textarea, select {
            width: 100%;
            padding: $spacing-sm;
            border: 1px solid $secondary;
            border-radius: $border-radius-sm;
            font-family: $font-family-base;
            
            &:focus {
              border-color: $primary;
              outline: none;
            }
          }
          
          .phone-input {
            display: flex;
            
            select {
              width: 120px;
              margin-right: $spacing-sm;
            }
          }
        }
        
        .submit-button {
          width: 100%;
          background-color: $primary;
          color: $white;
          border: none;
          padding: $spacing-md;
          border-radius: $border-radius-sm;
          font-weight: 600;
          cursor: pointer;
          transition: background-color $transition-normal;
          
          &:hover {
            background-color: $primary-dark;
          }
        }
      }
    }
    
    .contact-info {
      flex: 1;
      
      h2 {
        font-size: 1.8rem;
        color: $primary-dark;
        margin-bottom: $spacing-lg;
      }
      
      .info-section {
        display: flex;
        margin-bottom: $spacing-lg;
        
        .info-icon {
          font-size: 1.5rem;
          color: $primary;
          margin-right: $spacing-md;
          width: 40px;
          height: 40px;
          background-color: rgba($primary, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .info-content {
          h3 {
            font-size: 1.2rem;
            margin-bottom: $spacing-xs;
          }
          
          p {
            margin-bottom: $spacing-xs;
            color: $text-light;
          }
        }
      }
      
      .map-container {
        border-radius: $border-radius-md;
        overflow: hidden;
        height: 250px;
        
        .map-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>