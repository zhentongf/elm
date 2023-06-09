import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const shops = r => require.ensure([], () => r(require('../page/shops/shops')), 'shops')
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const notFound = r => require.ensure([], () => r(require('../page/notFound/404')), 'notFound')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const echarts = r => require.ensure([], () => r(require('../page/echarts/echarts')), 'echarts')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        // 当前选择城市页
        {
            path: '/city/:cityid',
            component: city
        },
        // 所有商铺列表页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true }
        },
        //特色商铺列表页
        {
            path: '/shops',
            component: shops
        },
        //搜索页
        {
            path: '/search/:geohash',
            component: search
        },
        //登录注册页
        {
            path: '/login',
            component: login
        },
        // 404
        {
            path: '/404',
            component: notFound
        },
        // 订单列表页
        {
            path: '/order',
            component: order,
            children: []
        },
        // 个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                // 个人信息详情页
                path: 'info',
                component: info,
            },]
        },
        // 实验echarts
        {
            path: '/echarts',
            component: echarts
        },



        // 跳转404
        {
            path: '*',
            component: notFound
        },
    ]
}]