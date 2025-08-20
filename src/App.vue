<script setup lang="ts">
import Calculator from './components/Calculator.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen bg-white flex justify-center items-center">
    <RouterView class="w-[80vw] md:w-auto"/>
  </div>
</template>
