/*jshint esversion: 6 */

import path from 'path'
import fs from 'fs'

module.exports = {
    head: {
        title: 'Vortex web',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Web part of service',
            },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
            },
        ],
    },
    loading: { color: '#3B8070' },
    css: [
        '~assets/css/global.css',
        '~assets/less/transitions.less',
        '~assets/less/scrollbars.less',
    ],
    styleResources: {
        less: [
            '~/assets/less/colors.less',
            '~/assets/less/dark-colors.less',
            '~/assets/less/variables.less',
        ],
    },
    // cache: true,
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/style-resources',
        'semantic-ui-vue/nuxt',
        'cookie-universal-nuxt',
        'nuxt-vuex-router-sync',
        'nuxt-i18n',
        '@nuxtjs/axios',
        ['@nuxtjs/pwa', {}],
        [
            '@nuxtjs/sitemap',
            {
                hostname: 'https://vortexchain.ru',
                gzip: true,
            },
        ],
        [
            'nuxt-izitoast',
            {
                position: 'bottomLeft',
                transitionIn: 'bounceInRight',
                transitionOut: 'fadeOutRight',
            },
        ],
        [
            '@nuxtjs/firebase',
            {
                // Required:
                config: {
                    development: {
                        apiKey: 'AIzaSyBtf8H9U6pzjsLMJLNs1p86e_95B4ASYH4',
                        authDomain: 'vortex-4b6db.firebaseapp.com',
                        databaseURL: 'https://vortex-4b6db.firebaseio.com',
                        projectId: 'vortex-4b6db',
                        storageBucket: '',
                        messagingSenderId: '951093526823',
                        appId: '1:951093526823:web:691535202ea0b370',
                    },
                    production: {
                        apiKey: 'AIzaSyBtf8H9U6pzjsLMJLNs1p86e_95B4ASYH4',
                        authDomain: 'vortex-4b6db.firebaseapp.com',
                        databaseURL: 'https://vortex-4b6db.firebaseio.com',
                        projectId: 'vortex-4b6db',
                        storageBucket: '',
                        messagingSenderId: '951093526823',
                        appId: '1:951093526823:web:691535202ea0b370',
                    },
                },
                services: {
                    auth: true,
                    messaging: true,
                },
                // The following options are optional:
                useOnly: ['auth', 'messaging'],
                // useOnly: ['auth','firestore','functions','storage','realtimeDb', 'messaging', 'performance'],
                // customEnv: false,
                // functionsLocation: 'us-central1',
            },
        ],
        [
            'nuxt-mq',
            {
                defaultBreakpoint: 'xl',
                breakpoints: {
                    xs: 640,
                    sm: 768,
                    md: 1024,
                    lg: 1280,
                    xl: Infinity,
                },
            },
        ],
        ['nuxt-purgecss', {}],
        ['@nuxtjs/robots', {}],
    ],
    axios: {
        https: true,
        baseURL: 'http://vortexchain.ru',
    },
    i18n: {
        locales: [
            {
                code: 'en',
                iso: 'en-US',
                file: 'en-US.js',
                name: 'English',
                flag: 'us',
            },
            {
                code: 'ru',
                iso: 'ru-RU',
                file: 'ru-RU.js',
                name: 'Русский',
                flag: 'ru',
            },
            {
                code: 'fr',
                iso: 'fr-FR',
                file: 'fr-FR.js',
                name: 'Français',
                flag: 'fr',
            },
        ],
        seo: true,
        defaultLocale: 'en',
        lazy: true,
        langDir: 'langs/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n',
            alwaysRedirect: false,
        },
    },
    plugins: [
        { src: '~/plugins/push-component.js' },
        { src: '~/plugins/auth-handler.js', mode: 'client' },
        { src: '~/plugins/notifications.js', mode: 'client' },
        { src: '~/plugins/vue-particles', mode: 'client' },
        { src: '~/plugins/nuxt-client-init', mode: 'client' },
        { src: '~/plugins/vue-tilt', mode: 'client' },
        { src: '~/plugins/ripple-effect', mode: 'client' },
        { src: '~/plugins/xterm', mode: 'client' },
        { src: '~/plugins/axios' },
        // { src: '~/plugins/dynamic-modal' },
    ],
    build: {
        babel: {
            presets({ isServer }) {
                return [
                    [
                        require.resolve('@nuxt/babel-preset-app'),
                        // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
                        {
                            buildTarget: isServer ? 'server' : 'client',
                            corejs: { version: 3 },
                        },
                    ],
                ]
            },
        },
        extend(config, { isDev, isClient }) {
            if (isDev) {
                config.devtool = isClient ? 'source-map' : 'inline-source-map'
            }
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                })
            }
        },
    },
    server: {
        port: 3000, // default: 3000
        host: 'localhost', // default: localhost,
        timing: false,
    },
}
