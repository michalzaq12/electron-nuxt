<template>
  <div>
    <span id="external-resource">\{{ externalContent }}</span>
    <img id="absolute-path-with-resources-const" :src="`file:///${__resources}/electron-nuxt.png`">
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
export default {
  data () {
    return {
      externalContent: ''
    }
  },
  mounted () {
    this.externalContent = fs.readFileSync(path.join(__resources, 'external-file.txt'))
  }
}
</script>
