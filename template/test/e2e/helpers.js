

export async function waitForNUXT(app) {
    if(app === undefined) throw new Error('App parameter is undefined');
    await app.client.waitUntilWindowLoaded();
    await app.client.waitUntil(async () => {
        //https://webdriver.io/docs/api/browser/execute.html
        const result = await app.client.execute(() => !!window.$nuxt);
        return result.value;
    }, 5000);
}

export async function navigateInApp(app, url) {
    if(app === undefined) throw new Error('App parameter is undefined');
    await app.client.execute(url => {
        window.$nuxt.$router.push(url);
    }, url);


    const ERROR_TEXT_SELECTOR = '.__nuxt-error-page > .error > .title';
    try {
        const errorText = await app.client.element(ERROR_TEXT_SELECTOR).getText();
        return Promise.reject(new Error(`${errorText}. (url: '${url}')`));
    }catch (e) {}
}



export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}