import {Vue, VueRouter} from '../../common/js/common.js'
import Index from './index.vue'
import routes from '../../config/routes/indexRoutes'
import store from '../../vuex/index.js'
const router = new VueRouter({
    routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Index)
})
//router.push('movie/1291583')