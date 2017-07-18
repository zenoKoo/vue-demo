import App from '../../pages/info/info.vue'

const home = r => require.ensure([], () => r(require('../../components/info/home')), 'home')
const Ip = r => require.ensure([], () => r(require('../../components/info/ip')), 'ip')
const Eg = r => require.ensure([], () => r(require('../../components/info/eg')), 'eg')
const Luck = r => require.ensure([], () => r(require('../../components/info/luck')), 'luck')
const Today = r => require.ensure([], () => r(require('../../components/info/today')), 'today')
const Joke = r => require.ensure([], () => r(require('../../components/info/joke')), 'joke')
const CnEg = r => require.ensure([], () => r(require('../../components/info/cn-eg')), 'cn-eg')
const My = r => require.ensure([], () => r(require('../../components/info/my')), 'my')

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
        {
            path: '/ip',
            component: Ip
        },
        {
            path: '/eg',
            component: Eg
        },
        {
            path: '/luck',
            component: Luck
        },
        {
            path: '/today',
            component: Today
        },
        {
            path: '/joke',
            component: Joke
        },
        {
            path: '/cn-eg',
            component: CnEg
        },
        {
            path: '/my',
            component: My
        }
        //确认订单页
        // {
        //     path: '/confirmOrder',
        //     component: confirmOrder,
        //     children: [{
        //         path: 'remark', //订单备注
        //         component: remark,
        //     }, {
        //         path: 'invoice', //发票抬头
        //         component: invoice,
        //     }, {
        //         path: 'payment', //付款页面
        //         component: payment,
        //     }, {
        //         path: 'userValidation', //用户验证
        //         component: userValidation,
        //     }, {
        //         path: 'chooseAddress', //选择地址
        //         component: chooseAddress,
        //         children: [{
        //             path: 'addAddress', //添加地址
        //             component: addAddress,
        //             children: [{
        //                 path: 'searchAddress', //搜索地址
        //                 component: searchAddress,
        //             }]
        //         }, ]
        //     }, ]
        // }
    ]
}]