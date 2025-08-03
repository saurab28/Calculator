import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const historyobject = ref([])
  function pushHistory(obj: any) {
    historyobject.value.push(obj)
  }

  return { pushHistory, historyobject }
})
