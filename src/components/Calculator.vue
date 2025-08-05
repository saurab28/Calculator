<script setup lang="ts">
import { ref, useTemplateRef, Ref, watch, KeepAlive, onBeforeUnmount, onBeforeMount } from 'vue'
import Display from './Display.vue'
import { useCounterStore } from '../stores/counter'
const displayList = ref<(number | string)[]>([])
const showZero = ref<Boolean>(false)
const counterstore = useCounterStore()

const pushStyle = (eachDigit: number): void => {
  //   console.log(eachDigit)
  displayList.value.push(eachDigit)
  // displayList.value = [...displayList.value, eachDigit]
  showZero.value = true
}

const pushCross = (): void => {
  if (
    displayList.value.length > 0 &&
    typeof displayList.value[displayList.value.length - 1] == 'number'
  ) {
    // displayList.value.push('x')
    displayList.value = [...displayList.value, 'x']
  }
}

const pushAdd = (): void => {
  if (
    displayList.value.length > 0 &&
    typeof displayList.value[displayList.value.length - 1] == 'number'
  ) {
    // displayList.value.push('+')
    displayList.value = [...displayList.value, '+']
  }
}

const pushSub = (): void => {
  if (
    displayList.value.length > 0 &&
    typeof displayList.value[displayList.value.length - 1] == 'number'
  ) {
    // displayList.value.push('-')
    displayList.value = [...displayList.value, '-']
  }
}

const pushPoint = (): void => {
  let lastIndex: number = displayList.value.lastIndexOf('.')
  if (lastIndex === -1) {
    if (
      displayList.value.length == 0 ||
      typeof displayList.value[displayList.value.length - 1] === 'string'
    ) {
      // displayList.value.push(0)
      // displayList.value.push('.')
      displayList.value = [...displayList.value, 0, '.']
    } else {
      // displayList.value.push('.')
      displayList.value = [...displayList.value, '.']
    }
  } else {
    if (
      displayList.value.slice(lastIndex).includes('+') ||
      displayList.value.slice(lastIndex).includes('-') ||
      displayList.value.slice(lastIndex).includes('x')
    ) {
      if (typeof displayList.value[displayList.value.length - 1] === 'string') {
        // displayList.value.push(0)
        // displayList.value.push('.')
        displayList.value = [...displayList.value, 0, '.']
      } else {
        // displayList.value.push('.')
        displayList.value = [...displayList.value, '.']
      }
    }
  }
}

const deleteItems = (): void => {
  // displayList.value.pop()
  displayList.value = [...displayList.value.slice(0, -1)]
}

type obj = {
  totalSum: number
  totalFinalsumList: any
}

// watch(
//   [displayZeroequal, displayList],
//   () => {
//     if (displayList.value.length > 2) {
//       if (displayZeroequal.value) {
//         console.log('triggered')

//         displayList.value = [...displayList.value.slice(1)]
//       }
//     }

//     // console.log(JSON.stringify(displayList.value))
//     // localStorage.setItem('displayList', JSON.stringify(displayList.value))
//     // console.log('hello')
//   },
//   { once: true },
// )

const Dref: Ref<obj> = useTemplateRef('equalto')

const isequalto = (): void => {
  // displayList.value = [Dref.value.totalSum]
  if (Dref.value.totalSum !== 0) {
    // displayZeroequal.value = true
    displayList.value = [Dref.value.totalSum]
    // showZero.value = false
  } else {
    displayList.value = []
  }
  showZero.value = true
  counterstore.pushHistory([Dref.value.totalFinalsumList, Dref.value.totalSum])
}

const allclear = (): void => {
  displayList.value = []
  showZero.value = false
}

onBeforeUnmount(() => {
  sessionStorage.setItem('displayList', JSON.stringify(displayList.value))
})

onBeforeMount(() => {
  displayList.value =
    (JSON.parse(sessionStorage.getItem('displayList')) as (string | number)[]) || []
})
</script>

<template>
  <div class="bg-white p-3 flex flex-col rounded-[20px]">
    <div>
      <!-- <KeepAlive>
        <Display :displayList="displayList" ref="equalto" />
      </KeepAlive> -->
      <Display :displayList="displayList" :showZero="showZero" ref="equalto" />
    </div>
    <div>
      <div class="flex w-[400px] justify-evenly">
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="allclear"
        >
          AC
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 text-center active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click=""
        >
          ( )
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click=""
        >
          %
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click=""
        >
          /
        </div>
      </div>
      <div class="flex w-[400px] justify-evenly mb-3 mt-2">
        <div
          v-for="eachDigit in [7, 8, 9]"
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushStyle(eachDigit)"
        >
          {{ eachDigit }}
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushCross"
        >
          X
        </div>
      </div>
      <div class="flex w-[400px] justify-evenly mb-3">
        <div
          v-for="eachDigit in [4, 5, 6]"
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushStyle(eachDigit)"
        >
          {{ eachDigit }}
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushSub"
        >
          -
        </div>
      </div>
      <div class="flex w-[400px] justify-evenly">
        <div
          v-for="eachDigit in [1, 2, 3]"
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushStyle(eachDigit)"
        >
          {{ eachDigit }}
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushAdd"
        >
          +
        </div>
      </div>
      <div class="flex w-[400px] justify-evenly">
        <div
          v-for="eachDigit in [0]"
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushStyle(eachDigit)"
        >
          {{ eachDigit }}
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 text-center active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="pushPoint"
        >
          .
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="deleteItems"
        >
          <font-awesome-icon icon="fa-solid fa-delete-left" />
        </div>
        <div
          class="border-solid border-[2px] rounded-[50px] border-black text-[40px] flex justify-center items-center size-[85px] m-1 active:bg-slate-300 active:rounded-[25px] active:border-[1px]"
          @click="isequalto"
        >
          =
        </div>
      </div>
    </div>
  </div>
</template>
<style>
div {
  user-select: none;
  outline: none;
}
</style>
