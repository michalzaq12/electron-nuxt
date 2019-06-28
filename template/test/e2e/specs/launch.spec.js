import test from 'ava';
import {Application} from "spectron";
import path from 'path';
import {productName} from '../../../builder-config';
import { BUILD_DIR } from '../../../.electron-nuxt/config';
import fs from 'fs';
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const myApp = path.join(__dirname, '..', '..', '..', 'build', 'win-unpacked', 'My browser.exe');

let extension = '';
let unpackedDir = ''

let os = process.platform;
if (os === "darwin") {
    unpackedDir = 'mac';
} else if (os === "win32" || os === "win64") {
    unpackedDir = 'win-unpacked';
    extension = '.exe';
} else if (os === "linux") {
    unpackedDir = 'linux-unpacked';
}

const applicationPath = path.join(BUILD_DIR, `${unpackedDir}/${productName}${extension}`);
if (!fs.existsSync(applicationPath)) {
    throw new Error(`Application with path: '${applicationPath}' doesn't exist. 
        First build your app ('npm run build') or set proper path to unpacked binary.`)
}

test.before(async t => {
    t.context.app = new Application({
        path: applicationPath,
        startTimeout: 10000,
        waitTimeout: 10000,
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

test.after.always(async t => {
    const app = t.context.app;

    if (app && app.isRunning()) {
        await app.stop();
    }
});

async function waitForNuxt(app) {
    if(app === undefined) throw new Error('App parameter is undefined');
    await app.client.waitUntilWindowLoaded();
    await app.client.waitUntil(async () => {
        const result = await app.client.execute(() => !!window.$nuxt);
        return result.value;
    }, 5000);
}



test('launch', async t => {
    const app = t.context.app;
    await app.client.waitUntilWindowLoaded();

    const win = app.browserWindow;
    // Please note that getWindowCount() will return 2 if `dev tools` are opened.
    t.is(await app.client.getWindowCount(), 1);
    t.false(await win.isMinimized());
    t.true(await win.isVisible());

    const {width, height} = await win.getBounds();
    t.true(width > 0);
    t.true(height > 0);
});

test('should initialize nuxt app', async t => {
    const app = t.context.app;
    try{
        await waitForNuxt(app);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }
})

test('should load file content from resources directory', async t => {
    const app = t.context.app;
    await waitForNuxt(app);

    try{
        await app.client.waitUntilTextExists('#external-resource', 'EXTERNAL_FILE_CONTENT', 5000);
        t.pass();
    }catch (e) {
        t.fail(e.message);
    }

});


test('built app should not throw any error', async t => {
    const app = t.context.app;
    await waitForNuxt(app);
    const rendererLogs = await app.client.getRenderProcessLogs();

    const rendererErrors = rendererLogs.filter(log => log.level === 'ERROR');
    if(rendererErrors.length > 0) rendererErrors.forEach(log => t.log(log.message));

    t.is(rendererErrors.length, 0);
})