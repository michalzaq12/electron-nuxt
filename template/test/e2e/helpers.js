

export async function waitForNUXT(app) {
    if(app === undefined) throw new Error('App parameter is undefined');
    await app.client.waitUntilWindowLoaded();
    await app.client.waitUntil(async () => {
        //https://webdriver.io/docs/api/browser/execute.html
        const result = await app.client.execute(() => !!window.$nuxt);
        return result.value;
    }, 5000);
}


export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}