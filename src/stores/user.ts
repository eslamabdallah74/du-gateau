import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  
  function login(email: string, _password: string) {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful login
    user.value = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email,
      isLoggedIn: true
    };
    
    return Promise.resolve(user.value);
  }
  
  function logout() {
    user.value = null;
    return Promise.resolve();
  }
  
  function register(firstName: string, lastName: string, email: string, _password: string) {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful registration
    user.value = {
      id: '1',
      firstName,
      lastName,
      email,
      isLoggedIn: true
    };
    
    return Promise.resolve(user.value);
  }
  
  return {
    user,
    login,
    logout,
    register
  };
});