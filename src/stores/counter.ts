import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const historyobject = ref<((string | number)[] | number)[]>([])
  function pushHistory(obj: any) {
    historyobject.value = [...historyobject.value, obj]
  }

  return { pushHistory, historyobject }
})
