<template>
  <div class="testimonial-section">
    <h2 class="section-title script-text">What Our Customers Say</h2>
    <div class="testimonials">
      <div class="testimonial" v-for="testimonial in testimonials" :key="testimonial.id">
        <div class="testimonial-content">
          <div class="quote">"</div>
          <p>{{ testimonial.text }}</p>
          <div class="rating">
            <font-awesome-icon icon="star" v-for="i in 5" :key="i" :class="{ 'filled': i <= testimonial.rating }" />
          </div>
        </div>
        <div class="testimonial-author">
          <img :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar" />
          <div class="author-info">
            <h4>{{ testimonial.name }}</h4>
            <p>{{ testimonial.location }}</p>
          </div>
        </div>
      </div>
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
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    color: $primary-dark;
    margin-bottom: $spacing-xl;
  }
  
  .testimonials {
    display: flex;
    gap: $spacing-lg;
    
    @media (max-width: $breakpoint-md) {
      flex-direction: column;
    }
  }
  
  .testimonial {
    flex: 1;
    background-color: $white;
    border-radius: $border-radius-md;
    overflow: hidden;
    box-shadow: $shadow-sm;
    transition: transform $transition-normal, box-shadow $transition-normal;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-md;
    }
    
    .testimonial-content {
      padding: $spacing-lg;
      position: relative;
      
      .quote {
        position: absolute;
        top: $spacing-sm;
        left: $spacing-sm;
        font-size: 3rem;
        font-family: $font-family-script;
        color: $primary-light;
        opacity: 0.3;
        line-height: 1;
      }
      
      p {
        position: relative;
        z-index: 1;
        font-style: italic;
        margin-bottom: $spacing-md;
      }
      
      .rating {
        color: #ccc;
        
        .filled {
          color: #ffc107;
        }
      }
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      padding: $spacing-md;
      background-color: $secondary;
      
      .author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: $spacing-md;
      }
      
      .author-info {
        h4 {
          margin: 0;
          margin-bottom: $spacing-xs;
          font-weight: 600;
        }
        
        p {
          margin: 0;
          font-size: 0.9rem;
          color: $text-light;
        }
      }
    }
  }
}
</style>