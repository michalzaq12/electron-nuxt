<template>
  <div>
    <div class="messge">{{ message }}</div>
    <div class="sum">{{ c }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { sum } from './module'
export default Vue.extend({
  data () {
    const message: string = 'This is a message'
    const c = sum(1, 2)
    return {
      message,
      c
    }
  }
})
</script>
