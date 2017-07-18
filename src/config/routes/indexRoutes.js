// 引入子路由
import Frame from '../subroute.vue'
// 引用模板
import inTheaters from '../../components/inTheaters.vue'
import comingSoon from '../../components/comingSoon.vue'
import moviesMsg from '../../components/moviesMsg.vue'
import searchPage from '../../components/searchPage.vue'
import searchResult from '../../components/searchResult.vue'
import comment from '../../components/comment.vue'
import smallComment from '../../components/smallComment.vue'
import starMsg from '../../components/starMsg.vue'
// 配置路由
export default [{
    path: '/',
    component: inTheaters
}, {
    path: '/inTheaters',
    redirect: '/'
}, {
    path: '/comingSoon',
    component: comingSoon
}, {
    path: '/movie/:id',
    component: moviesMsg
}, {
    path: '/searchPage',
    component: searchPage
}, {
    path: '/searchResult',
    component: searchResult
}, {
    path: '/comment/:id',
    component: comment
}, {
    path: '/starMsg/:id',
    component: starMsg
},{path: '/smallComment/:id',
    component: smallComment
} ]
