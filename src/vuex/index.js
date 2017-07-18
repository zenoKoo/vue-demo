import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import ele from './ele.js'
import info from './info.js'
import cnode from './cnode.js'
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        ele,
        info,
        cnode
    },
    strict: debug,
    middlewares: debug ? [] : []
})