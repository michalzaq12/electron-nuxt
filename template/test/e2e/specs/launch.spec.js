import test from 'ava'

import { beforeEach, afterEachAlways } from '../helpers'

test.beforeEach(beforeEach)
test.afterEach.always(afterEachAlways)

test('electron should show browser window on startup', async t => {
  const app = t.context.app
  await app.client.waitUntilWindowLoaded()

  const win = app.browserWindow
  // Please note that getWindowCount() will return 2 if `dev tools` are opened.
  t.is(await app.client.getWindowCount(), 1)
  t.false(await win.isMinimized())

  const { width, height } = await win.getBounds()
  t.true(width > 0)
  t.true(height > 0)
})

test('browser window should initialize nuxt', async t => {
  const app = t.context.app

  try {
    await app.client.nuxt.ready()
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})

test('\'fs\' module should load file content from __resources directory', async t => {
  const app = t.context.app

  try {
    await app.client.nuxt.ready()
    await app.client.nuxt.navigate('/test/basic')
    await app.client.hasNotError()
    await app.client.waitUntilTextExists('#external-resource', 'EXTERNAL_FILE_CONTENT', 5000)
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})

test('built app should not throw any error', async t => {
  const app = t.context.app

  try {
    await app.client.nuxt.ready()
    await app.client.hasNotError()
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})
