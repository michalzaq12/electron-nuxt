import test from 'ava';

import {beforeEach, afterEachAlways, sleep} from "../helpers";


test.beforeEach(beforeEach);
test.afterEach.always(afterEachAlways);


{{#if_eq cssFramework 'vuetify'}}
test('vuetify should render button component', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/css-framework/vuetify');
        await app.client.waitUntilTextExists('.v-btn__content', 'BUTTON', 10000);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})
{{/if_eq}}

{{#if_eq cssFramework 'buefy'}}
test('buefy should render button component', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/css-framework/buefy');
        await app.client.waitUntilTextExists('.button > span', 'BUTTON', 10000);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})
{{/if_eq}}

{{#if_eq cssFramework 'element'}}
test('Element should render button component', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/css-framework/element');
        await app.client.waitUntilTextExists('.el-button > span', 'BUTTON', 10000);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})
{{/if_eq}}