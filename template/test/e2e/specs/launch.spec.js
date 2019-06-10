import test from 'ava';
import {Application} from "spectron";
import electronPath from "electron";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test.beforeEach(async t => {
    //t.timeout(10000);
    t.context.app = new Application({
        // Your electron path can be any binary
        // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
        // But for the sake of the example we fetch it from our node_modules.
        path: electronPath,
        args: ['dist/main/index.js'],
        startTimeout: 10000,
        waitTimeout: 10000,
        chromeDriverArgs: ["--disable-extensions"],
        env: {
            SPECTRON: true,
            ELECTRON_ENABLE_LOGGING: true,
            ELECTRON_ENABLE_STACK_DUMPING: true
        },
    });

    await t.context.app.start();
    await sleep(1000);
});

test.afterEach.always(async t => {
    //t.timeout(10000);
    await t.context.app.stop();
});



test('launch', async t => {
    const app = t.context.app;
    await sleep(1000);
    await app.client.waitUntilWindowLoaded();
    //
    // const win = app.browserWindow;
    // // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    // //t.is(await app.client.getWindowCount(), 1);
    // t.false(await win.isMinimized());
    // t.true(await win.isVisible());
    //
    // const {width, height} = await win.getBounds();
    // t.true(width > 0);
    // t.true(height > 0);

    await app.client.waitUntilTextExists('span', 'HOME22', 20000);

});