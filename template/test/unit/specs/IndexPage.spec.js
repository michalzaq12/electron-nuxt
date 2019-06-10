import test from 'ava'
import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue';


let wrapper;

test.beforeEach(() => {
    wrapper = shallowMount(Index);
})

test('Index Page', (t) => {
    const text = wrapper.find('div').text();
    t.true(text.includes('asd'));
})