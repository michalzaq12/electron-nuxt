import test from 'ava';
import {Application} from "spectron";
import {waitForNUXT, sleep, navigateInApp} from "../helpers";


test.beforeEach(async t => {
    t.context.app = new Application({
        path: process.env.APPLICATION_PATH,
        startTimeout: 10000,
        waitTimeout: 10000,
        quitTimeout: 10000,
        chromeDriverArgs: ["--disable-extensions"],
        env: {
            SPECTRON: true,
            ELECTRON_ENABLE_LOGGING: true,
            ELECTRON_ENABLE_STACK_DUMPING: true,
            ELECTRON_DISABLE_SECURITY_WARNINGS: true
        },
    });

    await t.context.app.start();
});

test.afterEach.always(async t => {
    const app = t.context.app;

    if (app && app.isRunning()) {
        await Promise.race([app.stop(), sleep(9000)]);
        //Prevention of RuntimeError: Couldn't connect to selenium server on app.stop()
    }
});


test('launch', async t => {
    const app = t.context.app;
    await app.client.waitUntilWindowLoaded();

    const win = app.browserWindow;
    // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    t.is(await app.client.getWindowCount(), 1);
    t.false(await win.isMinimized());

    const {width, height} = await win.getBounds();
    t.true(width > 0);
    t.true(height > 0);
});

test('should initialize nuxt app', async t => {
    const app = t.context.app;
    try{
        await waitForNUXT(app);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})

test('should load file content from resources directory', async t => {
    const app = t.context.app;
    await waitForNUXT(app);

    try{
        await app.client.waitUntilTextExists('#external-resource', 'EXTERNAL_FILE_CONTENT', 5000);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }

});


test('built app should not throw any error', async t => {
    const app = t.context.app;
    await waitForNUXT(app);
    const rendererLogs = await app.client.getRenderProcessLogs();

    const rendererErrors = rendererLogs.filter(log => log.level === 'ERROR');
    if(rendererErrors.length > 0) rendererErrors.forEach(log => t.log(log.message));

    t.is(rendererErrors.length, 0);
})


test('vuetify components should work', async t => {
    const app = t.context.app;
    await waitForNUXT(app);

    try{
        await navigateInApp(app, '/test/css-framework/vuetify');
        await app.client.waitUntilTextExists('.v-btn__content', 'BUTTON');
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})


test('buefy components should work', async t => {
    const app = t.context.app;
    await waitForNUXT(app);

    try{
        await navigateInApp(app, '/test/css-framework/buefy');
        await app.client.waitUntilTextExists('.button > span', 'BUTTON');
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})