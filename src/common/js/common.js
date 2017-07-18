import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueAsync from 'vue-async-data'
Vue.use(VueAsync)

import api from '../../config/api'
Vue.prototype.$api = api

import util from './util'
Vue.prototype.$util = util

import 'babel-polyfill'


export {
    Vue,
    VueRouter
}