module.exports = {
    title: 'Electron-nuxt',
    description: 'An Electron & Nuxt.js / Vue.js quick start boilerplate',
    //https://v1.vuepress.vuejs.org/guide/assets.html#base-url
    base: '/electron-nuxt/',
    themeConfig: {
        repo: 'michalzaq12/electron-nuxt',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: 'Help us improve this page!',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting_started/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Electron', link: 'https://www.electronjs.org/docs'},
          { text: 'Nuxt', link: 'https://nuxtjs.org/guide'}
        ]
    },
    plugins: [
      '@vuepress/last-updated',
      '@vuepress/back-to-top',
      [
        '@vuepress/google-analytics',
        {
          'ga': 'UA-166633477-1'
        }
      ]
    ],
}
