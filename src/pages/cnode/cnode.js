import {Vue, VueRouter} from '../../common/js/common.js'
import routes from '../../config/routes/cnode'
import store from '../../vuex/index.js'
import {routerMode} from '../../config/env'
import fastClick from 'fastclick'
import App from './cnode.vue'
if('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', () => {
        fastClick.attach(document.body)
    }, false)
}

const router = new VueRouter({
    routes,
    mode: routerMode
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')