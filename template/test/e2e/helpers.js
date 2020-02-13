import { Application } from 'spectron'

export async function beforeEach (t) {
  const app = t.context.app = new Application({
    path: process.env.APPLICATION_PATH,
    startTimeout: 50 * 1000,
    quitTimeout: 10 * 1000,
    waitTimeout: 10 * 1000,
    //https://github.com/puppeteer/puppeteer/blob/v1.0.0/docs/troubleshooting.md#tips
    chromeDriverArgs: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-extensions'],
    env: {
      SPECTRON: true,
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      ELECTRON_DISABLE_SECURITY_WARNINGS: true
    }
  })

  await app.start()
  addExtraCommands(app.client)
  addNuxtCommands(app.client)
  return app
}

export async function afterEachAlways (t) {
  const app = t.context.app

  if (app && app.isRunning()) {
    await Promise.race([app.stop(), sleep(9000)])
    // Prevention of RuntimeError: Couldn't connect to selenium server on app.stop()
  }
}

function addNuxtCommands (client) {
  async function ready () {
    await this.waitUntilWindowLoaded()
    await this.waitUntil(async () => {
      const result = await this.execute(() => !!window.$nuxt)
      return result.value
    }, 5000)
  }

  async function navigate (url) {
    await this.execute(url => {
      window.$nuxt.$router.push(url)
    }, url)

    const ERROR_TEXT_SELECTOR = '.__nuxt-error-page > .error > .title'
    try {
      const errorText = await this.element(ERROR_TEXT_SELECTOR).getText()
      return Promise.reject(new Error(`Nuxt: ${errorText} (url: '${url}').`))
    } catch (e) {
      // if the element doesnt exist, do not throw any errors
    }
  }

  const clientPrototype = Object.getPrototypeOf(client)
  Object.defineProperty(clientPrototype, 'nuxt', {
    get () {
      return {
        ready: ready.bind(client),
        navigate: navigate.bind(client)
      }
    }
  })
}

function addExtraCommands (client) {
  // http://v4.webdriver.io/api/utility/addCommand.html
  client.addCommand('hasNotError', async function (throwError = true) {
    const rendererLogs = await this.getRenderProcessLogs()
    const rendererErrors = rendererLogs.filter(log => log.level === 'ERROR')

    if (rendererErrors.length === 0) return true
    if (throwError) return Promise.reject(new Error(rendererErrors[0].message))
    return false
  })
}

export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
