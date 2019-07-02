import test from 'ava';

import {beforeEach, afterEachAlways} from "../helpers";


test.beforeEach(beforeEach);
test.afterEach.always(afterEachAlways);


const RED_HEX = '#ff0000';

test('sass loader', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/sass');
        const propObject = await app.client.getCssProperty('.__loader__sass', 'color');
        t.is(propObject.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})

test('less loader', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/less');
        const propObject = await app.client.getCssProperty('.__loader__less', 'color');
        t.is(propObject.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})

test('stylus loader', async t => {
    const app = t.context.app;

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/stylus');
        const propObject = await app.client.getCssProperty('.__loader__stylus', 'color');
        t.is(propObject.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})