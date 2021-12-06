<template>
  <div>
    <span id="external-resource">\{{ externalContent }}</span>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
export default {
  name: 'BasicTest',
  data () {
    return {
      externalContent: ''
    }
  },
  mounted () {
    this.externalContent = fs.readFileSync(path.join(process.resourcesPath, 'external-file.txt'))
  }
}
</script>
