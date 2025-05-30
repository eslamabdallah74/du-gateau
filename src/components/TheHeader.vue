<template>
  <header class="header" ref="headerRef" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <div class="logo-container">
          <router-link to="/" class="logo">
            <img src="@/assets/logo.png" alt="Du Gâteau" />
          </router-link>
        </div>

        <nav class="navigation">
          <ul class="nav-links">
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/about">ABOUT</router-link></li>
            <li><router-link to="/menu">MENU</router-link></li>
            <li><router-link to="/contact">CONTACT</router-link></li>
          </ul>
          <button class="order-now-button">ORDER NOW</button>
        </nav>

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

      <div v-if="showSearch" class="search-bar">
        <input type="text" placeholder="Search for products..." v-model="searchQuery" @keyup.enter="search" />
        <button @click="search">
          <span class="icon">🔍</span>
        </button>
      </div>

      <div v-if="showUserDropdown" class="user-dropdown">
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

.header {
  background-color: $white;
  box-shadow: $shadow-sm;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease;
  will-change: transform, box-shadow;
  
  .container {
    position: relative;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-md 0;
    transition: padding 0.3s ease;
    will-change: padding;
  }
  
  .logo-container {
    width: 120px;
    transition: width 0.3s ease;
    will-change: width;
    
    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: flex-direction 0.3s ease, align-items 0.3s ease;
      
      img {
        width: 100%;
        height: auto;
        object-fit: contain;
        transition: width 0.3s ease;
        will-change: width;
      }
      
      .logo-text {
        color: $primary;
        font-size: 1.5rem;
        margin-top: $spacing-xs;
        transition: font-size 0.3s ease, margin 0.3s ease;
        will-change: font-size, margin-top, margin-left;
      }
    }
  }
  
  .header-actions {
    display: flex;
    gap: $spacing-md;
    
    .icon-button {
      background: none;
      border: none;
      color: $primary;
      font-size: 1.2rem;
      cursor: pointer;
      position: relative;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      
      .icon {
        font-size: 1.4rem;
      }
      
      &:hover {
        color: $primary-dark;
        background-color: rgba($primary-light, 0.3);
      }
      
      .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: $primary-dark;
        color: $white;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  
  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    
    .nav-links {
      display: flex;
      list-style-type: none;
      gap: $spacing-xl;
      
      li {
        a {
          font-family: $font-family-base;
          font-size: 1rem;
          font-weight: 500;
          color: $text;
          transition: color $transition-normal;
          letter-spacing: 1px;
          
          &:hover, &.router-link-active {
            color: $primary-dark;
          }
        }
      }
    }
    
    .order-now-button {
      background-color: $primary-dark;
      color: $white;
      border: none;
      padding: $spacing-xs $spacing-md;
      border-radius: $border-radius-sm;
      cursor: pointer;
      transition: background-color $transition-normal;
      margin-left: $spacing-lg;
      
      &:hover {
        background-color: darken-color($primary-dark, 10);
      }
    }
  }
  
  // Scrolled state styles
  &.scrolled {
    box-shadow: $shadow-md;
    
    .header-content {
      padding: $spacing-sm 0;
    }
    
    .logo-container {
      width: 80px;
      
      .logo {
        flex-direction: row;
        align-items: center;
        
        img {
          width: 40px;
        }
        
        .logo-text {
          font-size: 1.2rem;
          margin-top: 0;
          margin-left: $spacing-xs;
        }
      }
    }
  }
  
  .search-bar {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $white;
    padding: $spacing-md;
    box-shadow: $shadow-md;
    display: flex;
    z-index: 10;
    
    input {
      flex: 1;
      border: 1px solid $primary-light;
      border-radius: $border-radius-sm;
      padding: $spacing-sm;
      margin-right: $spacing-sm;
      outline: none;
      
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
      
      .icon {
        font-size: 1.2rem;
      }
      
      &:hover {
        background-color: darken-color($primary, 10);
      }
    }
  }
  
  .user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 200px;
    background-color: $white;
    padding: $spacing-md;
    box-shadow: $shadow-md;
    z-index: 10;
    border-radius: $border-radius-sm;
    
    p {
      margin-bottom: $spacing-md;
      font-weight: 600;
    }
    
    ul {
      list-style-type: none;
      
      li {
        margin-bottom: $spacing-sm;
        
        button {
          background: none;
          border: none;
          color: $text;
          cursor: pointer;
          width: 100%;
          text-align: left;
          padding: $spacing-xs 0;
          
          &:hover {
            color: $primary;
          }
        }
      }
    }
    
    .button {
      display: block;
      width: 100%;
      margin-bottom: $spacing-sm;
      text-align: center;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .header {
    .navigation {
      .nav-links {
        gap: $spacing-md;
        
        li {
          a {
            font-size: 1rem;
          }
        }
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .header {
    .header-content {
      flex-direction: column;
      gap: $spacing-md;
    }
    
    .navigation {
      flex-direction: column;
      gap: $spacing-md;
      
      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>