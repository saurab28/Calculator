import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const historyobject :any = ref<any>( JSON.parse(localStorage.getItem("history")) as ((string | number)[] | number)[] ?? {})
  function pushHistory(obj: any) {
    const date = new Date() 
    const stdate = date.toDateString()
    if (`${stdate} `in historyobject.value){
        historyobject.value[`${stdate} `]=[...historyobject.value[`${stdate} `] , obj];
    } else {
        historyobject.value[`${stdate} `] = [obj]
    }
    

    localStorage.setItem("history",JSON.stringify(historyobject.value))
    
  }

  return { pushHistory, historyobject }
})
