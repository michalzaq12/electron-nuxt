import test from 'ava'
import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue';


let wrapper;

test.beforeEach(() => {
    wrapper = shallowMount(Index, {
        computed: {
            __resources: function () { return __resources; }
        }
    });
})

test('Should read external file from resources directory', (t) => {
    const text = wrapper.find('#external-resource').text();
    t.true(text.includes('EXTERNAL_FILE_CONTENT'));
})

test('Should resolve __resources global variable in HTML', t => {
    const imgHTML = wrapper.find('#absolute-path-with-resources-const').html();
    t.false(imgHTML.includes('undefined'));
})