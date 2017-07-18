import Vuex from 'vuex'
import movie from './movie.js'
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        movie
    },
    strict: debug,
    middlewares: debug ? [] : []
})
