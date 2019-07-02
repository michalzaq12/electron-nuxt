import test from 'ava';

import {beforeEach, afterEachAlways} from "../helpers";


test.beforeEach(beforeEach);
test.afterEach.always(afterEachAlways);


const RED_HEX = '#ff0000';

test('sass', async t => {
    const app = t.context.app;
    const ELEMENT_SELECTOR = '.sass__text--red';

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/sass');
        await app.client.waitForExist(ELEMENT_SELECTOR);
        const colorProperty = await app.client.getCssProperty(ELEMENT_SELECTOR, 'color');
        t.is(colorProperty.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})

test('less', async t => {
    const app = t.context.app;
    const ELEMENT_SELECTOR = '.less__text--red';

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/less');
        await app.client.waitForExist(ELEMENT_SELECTOR);
        const colorProperty = await app.client.getCssProperty(ELEMENT_SELECTOR, 'color');
        t.is(colorProperty.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})

test('stylus', async t => {
    const app = t.context.app;
    const ELEMENT_SELECTOR = '.stylus__text--red';

    try{
        await app.client.nuxt.ready();
        await app.client.nuxt.navigate('/test/loader/stylus');
        await app.client.waitForExist(ELEMENT_SELECTOR);
        const colorProperty = await app.client.getCssProperty(ELEMENT_SELECTOR, 'color');
        t.is(colorProperty.parsed.hex, RED_HEX);
    }catch (e) {
        t.fail(e.message);
    }
})