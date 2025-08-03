<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()
</script>
<template>
  <div class="bg-white rounded-[20px] p-3 h-[680px] w-[425px] overflow-scroll">
    <div class="flex justify-end mb-[10px]">
      <RouterLink to="/">
        <font-awesome-icon icon="fa-solid fa-house" />
      </RouterLink>
    </div>
    <div>
      <div v-for="eachItem in store.historyobject">
        <div>
          <span v-for="eachChar in eachItem[0]" class="text-[25px]">{{ eachChar }}</span>
        </div>
        <div class="text-[20px]">= {{ eachItem[1] }}</div>
        <div class="w-[100%] bg-black h-[2px] mt-[6px] mb-[6px]"></div>
      </div>
    </div>
  </div>
</template>
