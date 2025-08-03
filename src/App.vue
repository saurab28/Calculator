<script setup lang="ts">
import Calculator from './components/Calculator.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen bg-black flex justify-center items-center">
    <RouterView />
  </div>
</template>
