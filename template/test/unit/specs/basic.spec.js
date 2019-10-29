import test from 'ava'
import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/test/basic.vue'

// // available wrapper methods/properties: https://vue-test-utils.vuejs.org/api/wrapper
let wrapper

test.beforeEach(() => {
  // available mount options: https://vue-test-utils.vuejs.org/api/options.html
  wrapper = shallowMount(Index, {
    mocks: {
      __resources: 'XXX'
    }
  })
})

test('Should read external file from resources directory', t => {
  const text = wrapper.find('#external-resource').text()
  t.true(text.includes('EXTERNAL_FILE_CONTENT'))
})

test('Should resolve __resources global variable in HTML', t => {
  const imgHTML = wrapper.find('#absolute-path-with-resources-const')
  t.false(imgHTML.attributes().src.includes('undefined'))
})
