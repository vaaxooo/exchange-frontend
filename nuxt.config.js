export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Exchange currency group',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/theme2.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/style2.css' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['moment'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios", ['@nuxtjs/dotenv', { systemvars: true }],
        "@nuxtjs/auth-next", "@nuxtjs/toast",
    ],


    toast: {
        position: 'bottom-center',
        duration: 5000
    },

    axios: {
        baseURL: process.env.API,
    },

    auth: {
        redirect: {
            login: '/auth/login',
            home: '/',
            logout: '/',
            callback: '/auth/login',
        },
        localStorage: false,
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    required: true,
                    type: 'Bearer',
                    maxAge: 3600
                },
                user: {
                    property: 'user',
                    autoFetch: false
                },
                endpoints: {
                    login: { url: '/auth/login', method: 'post' },
                    refresh: { url: '/auth/refresh', method: 'post' },
                    logout: false,
                    user: { url: '/auth/me', method: 'post' }
                }
            }
        },
        preserveState: true,
        watchLoggedIn: true
    },

    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}