<template>
  <div>
    <div class="title">
      Information
    </div>
    <div class="items">
      <div class="item">
        <div class="name">
          Nuxt.js:
        </div>
        <div class="value">
          \{{ nuxt }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Vue.js:
        </div>
        <div class="value">
          \{{ vue }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Electron:
        </div>
        <div class="value">
          \{{ electron }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Node:
        </div>
        <div class="value">
          \{{ node }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Chrome:
        </div>
        <div class="value">
          \{{ chrome }}
        </div>
      </div>
      <div class="item">
        <div class="name">
          Platform:
        </div>
        <div class="value">
          \{{ platform }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chrome: process.versions.chrome,
      electron: process.versions.electron,
      node: process.versions.node,
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      nuxt: require('nuxt/package.json').version
    }
  }
}
</script>

<style scoped>
    .title {
        color: #364758;
        font-size: 1.5em;
        letter-spacing: .25px;
        margin-top: 10px;
    }
    .items {
        margin-top: 8px;
    }
    .item {
        display: flex;
        margin-bottom: 6px;
    }
    .item .name {
        color: #6a6a6a;
        margin-right: 6px;
    }

    .item .value {
        color: #364758;
        font-weight: bold;
    }
</style>
