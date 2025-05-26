<template>
  <TheHeader />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<style lang="scss">
@use './assets/styles/main' as *;

main {
  min-height: calc(100vh - 300px);
}
</style>