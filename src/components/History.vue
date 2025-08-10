<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()
const {historyobject} = storeToRefs(store)
</script>
<template>
  <div class="bg-cyan-200 rounded-[20px] p-3 h-[450px] w-[300px] overflow-scroll">
    <div>
      <div v-for="eachkey in Object.keys(historyobject)">
        {{ eachkey }}
        <div v-for="eachItem in historyobject[eachkey]">
           <div>
            <span v-for="eachChar in eachItem[0]" class="text-[25px]">{{ eachChar }}</span>
          </div>
          <div class="text-[20px]">= {{ eachItem[1] }}</div>
        </div> 
        <div class="w-[100%] bg-black h-[2px] mt-[6px] mb-[6px]"></div>       
      </div>
      
    </div>
  </div>
</template>
