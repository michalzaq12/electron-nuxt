<template>
  <div class="messge">
    {{ message }}
  </div>
  <div class="sum">
    {{ c }}
  </div>
</template>

<script lang="ts">
  import {sum} from './module';
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      const message: string = 'This is a message'
      const c = sum(1,2)
      return {
        message,
        c
      }
    }
  })
</script>
