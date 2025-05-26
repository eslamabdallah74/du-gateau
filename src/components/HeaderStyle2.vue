<template>
  <header class="header-style-2" ref="headerRef" :class="{ 'scrolled': isScrolled, 'mobile-menu-open': mobileMenuOpen }">
    <div class="header-top">
      <div class="container">
        <div class="header-content">
          <div class="logo-container">
            <router-link to="/" class="logo">
              <img src="@/assets/logo.png" alt="Du Gâteau" />
            </router-link>
          </div>
          
          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
          
          <div class="header-actions">
            <button class="icon-button" @click="toggleUserDropdown">
              <span class="icon">👤</span>
            </button>
            <button class="icon-button" @click="toggleSearchBar">
              <span class="icon">🔍</span>
            </button>
            <button class="icon-button" @click="openCart">
              <span class="icon">🛒</span>
              <span v-if="cartStore.itemCount > 0" class="badge">{{ cartStore.itemCount }}</span>
            </button>
            <button class="icon-button" @click="openWishlist">
              <span class="icon">❤️</span>
              <span v-if="wishlistStore.itemCount > 0" class="badge">{{ wishlistStore.itemCount }}</span>
            </button>
            <button class="icon-button" @click="toggleSettings">
              <span class="icon">⚙️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="header-bottom">
      <div class="container">
        <nav class="navigation">
          <ul class="nav-links">
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/about">ABOUT</router-link></li>
            <li><router-link to="/menu">MENU</router-link></li>
            <li><router-link to="/contact">CONTACT</router-link></li>
          </ul>
          <button class="order-now-button">ORDER NOW</button>
        </nav>
      </div>
    </div>

    <div v-if="showSearch" class="search-bar">
      <div class="container">
        <input type="text" placeholder="Search for products..." v-model="searchQuery" @keyup.enter="search" />
        <button @click="search">
          <span class="icon">🔍</span>
        </button>
      </div>
    </div>
    
    <div v-if="showUserDropdown" class="user-dropdown">
      <div class="container">
        <div v-if="userStore.user">
          <p>Hello, {{ userStore.user.firstName }}</p>
          <ul>
            <li><button @click="navigateTo('/profile')">My Profile</button></li>
            <li><button @click="navigateTo('/orders')">My Orders</button></li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </div>
        <div v-else>
          <router-link to="/login" class="button">Login</router-link>
          <router-link to="/register" class="button secondary">Register</router-link>
        </div>
      </div>
    </div>
  </header>

  <div ref="intersectSection" style="height: 1px"></div>
  <div :style="{ height: headerHeight + 'px' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const userStore = useUserStore()

const showSearch = ref(false)
const showUserDropdown = ref(false)
const searchQuery = ref('')
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const headerRef = ref<HTMLElement | null>(null)
const intersectSection = ref<HTMLElement | null>(null)
const headerHeight = ref(0)

const updateHeaderHeight = () => {
  if (headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight
  }
}

onMounted(() => {
  updateHeaderHeight()
  window.addEventListener('resize', updateHeaderHeight)

  const observer = new IntersectionObserver(
    ([entry]) => {
      isScrolled.value = !entry.isIntersecting
    },
    { root: null, threshold: 0 }
  )

  if (intersectSection.value) observer.observe(intersectSection.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight)
})

const toggleSearchBar = () => {
  showSearch.value = !showSearch.value
  if (showUserDropdown.value) showUserDropdown.value = false
}

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value
  if (showSearch.value) showSearch.value = false
}

const toggleSettings = () => {}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
    showSearch.value = false
    searchQuery.value = ''
  }
}

const openCart = () => {
  router.push('/cart')
}

const openWishlist = () => {
  router.push('/wishlist')
}

const navigateTo = (path: string) => {
  router.push(path)
  showUserDropdown.value = false
}

const logout = () => {
  userStore.logout()
  showUserDropdown.value = false
  router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/functions' as *;

.header-style-2 {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: transform 0.3s ease;
  will-change: transform;
  background-color: #fdf1f1; /* Light cream background for the entire header */
  padding: $spacing-md 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-md;
  }
  
  .header-top {
    background-color: transparent;
    padding: $spacing-md 0;
    transition: padding 0.3s ease;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo-container {
      width: 120px;
      transition: width 0.3s ease;
      
      @media (max-width: $breakpoint-sm) {
        width: 80px;
      }
      
      .logo {
        display: block;
        
        img {
          width: 100%;
          height: auto;
          transition: width 0.3s ease;
        }
      }
    }
    
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 21px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 10;
      
      @media (max-width: $breakpoint-md) {
        display: flex;
        order: 3;
      }
      
      .bar {
        width: 100%;
        height: 3px;
        background-color: $primary-dark;
        border-radius: 10px;
        transition: all 0.3s ease;
      }
      
      .mobile-menu-open & {
        .bar:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }
        
        .bar:nth-child(2) {
          opacity: 0;
        }
        
        .bar:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }
      }
    }
    
    .header-actions {
      display: flex;
      gap: $spacing-sm;
      background-color: #e5959e; /* Pink background for the action buttons */
      padding: $spacing-xs $spacing-sm;
      border-radius: $border-radius-lg;
      
      @media (max-width: $breakpoint-md) {
        order: 2;
      }
      
      @media (max-width: $breakpoint-sm) {
        padding: $spacing-xs;
        gap: $spacing-xs;
      }
      
      .icon-button {
        background: none;
        border: none;
        color: $white;
        cursor: pointer;
        position: relative;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        
        @media (max-width: $breakpoint-sm) {
          width: 24px;
          height: 24px;
          padding: 0.3rem;
        }
        
        .icon {
          font-size: 1.2rem;
          
          @media (max-width: $breakpoint-sm) {
            font-size: 1rem;
          }
        }
        
        &:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: $white;
          color: $primary-dark;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          
          @media (max-width: $breakpoint-sm) {
            width: 16px;
            height: 16px;
            font-size: 0.6rem;
          }
        }
      }
    }
  }
  
  .header-bottom {
    background-color: #f3bec3; /* Exact pink color from the image */
    padding: $spacing-md 0;
    border-radius: $border-radius-lg;
    margin: 0 $spacing-md;
    transition: padding 0.3s ease, background-color 0.3s ease;
    
    .navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      @media (max-width: $breakpoint-md) {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .nav-links {
        display: flex;
        list-style-type: none;
        gap: $spacing-xxl;
        margin: 0;
        padding: 0;
        
        @media (max-width: $breakpoint-md) {
          flex-direction: column;
          width: 100%;
          gap: $spacing-md;
          margin-bottom: $spacing-md;
        }
        
        li {
          @media (max-width: $breakpoint-md) {
            width: 100%;
            text-align: center;
            padding: $spacing-sm 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          a {
            font-family: $font-family-script;
            font-size: 1.5rem;
            color: #333;
            transition: color $transition-normal;
            letter-spacing: 1px;
            text-decoration: none;
            
            @media (max-width: $breakpoint-md) {
              display: block;
              width: 100%;
            }
            
            &:hover, &.router-link-active {
              color: $primary-dark;
            }
          }
        }
      }
      
      .order-now-button {
        background-color: #d87a84; /* Darker pink for the button */
        color: $white;
        border: none;
        padding: $spacing-xs $spacing-lg;
        border-radius: $border-radius-md;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: background-color $transition-normal;
        
        @media (max-width: $breakpoint-md) {
          width: 100%;
          margin-top: $spacing-md;
          padding: $spacing-sm $spacing-md;
        }
        
        &:hover {
          background-color: darken-color($primary-dark, 10);
        }
      }
    }
    
    @media (max-width: $breakpoint-md) {
      display: none;
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      border-radius: 0;
      overflow-y: auto;
      z-index: 99;
      padding: $spacing-lg;
      
      .mobile-menu-open & {
        display: block;
      }
    }
  }
  
  .search-bar {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $white;
    padding: $spacing-md 0;
    box-shadow: $shadow-md;
    z-index: 10;
    
    @media (max-width: $breakpoint-md) {
      position: fixed;
      top: 70px;
    }
    
    .container {
      display: flex;
      
      @media (max-width: $breakpoint-sm) {
        flex-direction: column;
      }
      
      input {
        flex: 1;
        border: 1px solid $primary-light;
        border-radius: $border-radius-sm;
        padding: $spacing-sm;
        margin-right: $spacing-sm;
        outline: none;
        
        @media (max-width: $breakpoint-sm) {
          margin-right: 0;
          margin-bottom: $spacing-sm;
        }
        
        &:focus {
          border-color: $primary;
        }
      }
      
      button {
        background-color: $primary;
        color: $white;
        border: none;
        border-radius: $border-radius-sm;
        padding: $spacing-sm $spacing-md;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        
        @media (max-width: $breakpoint-sm) {
          width: 100%;
        }
        
        .icon {
          font-size: 1.2rem;
        }
        
        &:hover {
          background-color: darken-color($primary, 10);
        }
      }
    }
  }
  
  .user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: $white;
    box-shadow: $shadow-md;
    border-radius: $border-radius-md;
    z-index: 10;
    width: 250px;
    overflow: hidden;
    
    @media (max-width: $breakpoint-md) {
      position: fixed;
      top: 70px;
      width: 100%;
      border-radius: 0;
    }
    
    .container {
      padding: $spacing-md;
      
      p {
        margin-top: 0;
        margin-bottom: $spacing-md;
        font-weight: 600;
        color: $primary-dark;
      }
      
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        
        li {
          margin-bottom: $spacing-sm;
          
          button {
            background: none;
            border: none;
            color: $primary-dark;
            cursor: pointer;
            padding: 0;
            text-align: left;
            width: 100%;
            transition: color $transition-normal;
            
            &:hover {
              color: $primary;
            }
          }
        }
      }
      
      .button {
        display: inline-block;
        padding: $spacing-sm $spacing-md;
        background-color: $primary;
        color: $white;
        border-radius: $border-radius-sm;
        text-decoration: none;
        margin-right: $spacing-sm;
        transition: background-color $transition-normal;
        
        @media (max-width: $breakpoint-sm) {
          display: block;
          text-align: center;
          margin-right: 0;
          margin-bottom: $spacing-sm;
        }
        
        &:hover {
          background-color: darken-color($primary, 10);
        }
        
        &.secondary {
          background-color: $text-light;
          
          &:hover {
            background-color: darken-color($text-light, 10);
          }
        }
      }
    }
  }
  
  // Scrolled state styles
  &.scrolled {
    padding: $spacing-xs 0;
    background-color: $white;
    box-shadow: $shadow-md;
    
    .header-top {
      padding: $spacing-xs 0;
      
      .logo-container {
        width: 80px;
        
        @media (max-width: $breakpoint-sm) {
          width: 60px;
        }
      }
    }
    
    .header-bottom {
      background-color: transparent;
      padding: $spacing-xs 0;
      
      @media (max-width: $breakpoint-md) {
        top: 60px;
      }
      
      .navigation {
        .nav-links {
          li {
            a {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
}
</style>
