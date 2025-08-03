<script setup lang="ts">
import { computed, reactive, ref, watchEffect, watch } from 'vue'
import { RouterLink } from 'vue-router'
const togglecont = ref<Boolean>(false)
const displayZeroequal = ref<Boolean>(false)

const props = defineProps<{ displayList: (string | number)[]; showZero: Boolean }>()

const calculateTerms = (arr: (number | string)[]): number => {
  let total: number = 0
  arr.forEach((eachNum) => {
    if (arr.includes('.')) {
      if (eachNum === '.') {
        const dindex: number = arr.indexOf(eachNum)
        total = calculateTerms(arr.slice(0, dindex)) + 0.1 * calculateTerms(arr.slice(dindex + 1))
      }
      return total
    }
    if (typeof eachNum == 'number') {
      total = total * 10 + eachNum
    }
  })

  return total
}

const calculateFinalSum = computed<(number | string)[]>(() => {
  let firstTerm: number = 0
  let prevIndex: number = 0
  let indexa: number = 0
  const finalsum: (string | number)[] = []
  const copyDisplayList: (string | number)[] = [...props.displayList]
  const charList: string[] = copyDisplayList.filter((eachItems) => typeof eachItems === 'string')
  if (charList.length >= 1) {
    if (typeof copyDisplayList[copyDisplayList.length - 1] === 'string') {
      charList.forEach((eachChar) => {
        if (eachChar !== '.') {
          indexa = copyDisplayList.indexOf(eachChar)
          firstTerm = calculateTerms(props.displayList.slice(prevIndex, indexa))
          // console.log(firstTerm)
          copyDisplayList[indexa] = 'C'
          finalsum.push(firstTerm)
          finalsum.push(eachChar)
          prevIndex = indexa
        }
      })
    } else {
      charList.forEach((eachChar) => {
        if (eachChar !== '.') {
          indexa = copyDisplayList.indexOf(eachChar)
          firstTerm = calculateTerms(props.displayList.slice(prevIndex, indexa))
          // console.log(firstTerm)
          copyDisplayList[indexa] = 'C'
          finalsum.push(firstTerm)
          finalsum.push(eachChar)
          prevIndex = indexa
        }
      })
      const secondTerm = calculateTerms(props.displayList.slice(indexa))
      finalsum.push(secondTerm)
    }
  }

  // console.log(finalsum)
  return finalsum
})

const calculateTotal = computed<number>(() => {
  let arr2: (string | number)[] = [...calculateFinalSum.value]
  let count = 0
  let char_count = 0
  if (arr2.length > 2) {
    if (typeof arr2[arr2.length - 1] === 'string') {
      arr2[arr2.length - 1] = 8
      // console.log(arr2)
      arr2.forEach((eachItem: string | number, index: number) => {
        if (typeof eachItem === 'string') {
          const left = arr2[index - 1]
          const right = arr2[index + 1]
          if (typeof left === 'number' && typeof right === 'number') {
            if (count === 0 && char_count === 0) {
              if (eachItem === 'x') {
                count = left * right
              } else if (eachItem === '+') {
                count = left + right
              } else if (eachItem === '-') {
                count = left - right
              }
            } else {
              char_count = 1
              if (eachItem === 'x') {
                count = count * right
              } else if (eachItem === '+') {
                count = count + right
              } else if (eachItem === '-') {
                count = count - right
              }
            }
          }
          // console.log(count);
        }
      })
    } else {
      arr2.forEach((eachItem, index) => {
        if (typeof eachItem === 'string') {
          const left = arr2[index - 1]
          const right = arr2[index + 1]
          if (typeof left === 'number' && typeof right === 'number') {
            if (count === 0 && char_count === 0) {
              if (eachItem === 'x') {
                count = left * right
              } else if (eachItem === '+') {
                count = left + right
              } else if (eachItem === '-') {
                count = left - right
              }
            } else {
              char_count = 1
              if (eachItem === 'x') {
                count = count * right
              } else if (eachItem === '+') {
                count = count + right
              } else if (eachItem === '-') {
                count = count - right
              }
            }
          }
        }
      })
    }
  }

  return count
})
type obj = {
  totalSum: number
}
// let totalSum = calculateTotal.value
// const totalSumobj = reactive<obj>({
//   totalSum: calculateTotal.value,
// })
// watchEffect(() => {
//   totalSumobj.totalSum = calculateTotal.value // Keep it in sync!
//   // console.log(totalSumobj)
// })
// defineExpose(totalSumobj)
const toogle = (): void => {
  togglecont.value = !togglecont.value
}

const totalSum = ref<number>(0)
const totalFinalsumList = ref<(number | string)[]>([])
watchEffect(() => {
  if (props.displayList.length == 0 && props.showZero) {
    displayZeroequal.value = true
    // console.log(calculateFinalSum.value)
  } else {
    displayZeroequal.value = false
  }
  totalSum.value = calculateTotal.value
  totalFinalsumList.value = calculateFinalSum.value
})

defineExpose({ totalSum, totalFinalsumList })
</script>

<template>
  <div
    class="h-[147px] rounded-[20px] w-[400px] mb-2 border-solid bg-red-200 p-2 flex flex-col justify-between"
  >
    <div class="flex flex-col items-end mb-2 relative">
      <div class="border-black border-solid border rounded-sm active:bg-white" @click="toogle">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </div>
      <RouterLink to="/history">
        <div v-show="togglecont" class="bg-white w-[100px] rounded-md">
          <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
          history
        </div>
      </RouterLink>
    </div>
    <div class="h-[72px]">
      <div class="flex overflow-hidden justify-end relative top-[0px]">
        <p v-for="eachItem in props.displayList" v-if="!displayZeroequal" class="text-[28px]">
          {{ eachItem }}
        </p>
        <p v-else class="text-[28px]">0</p>
      </div>
      <div class="flex justify-end" v-if="calculateFinalSum.length > 2">
        <span class="ml-auto block text-[20px]">{{ calculateTotal }}</span>
      </div>
    </div>
  </div>
</template>
