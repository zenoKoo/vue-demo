import {
    RECORD_ADDRESS,
    ADD_CART,
    REDUCE_CART,
    INIT_BUYCART,
    CLEAR_CART,
    RECORD_SHOPDETAIL,
    RECORD_USERINFO,
    GET_USERINFO,
    CONFIRM_REMARK,
    CONFIRM_INVOICE,
    CHOOSE_SEARCH_ADDRESS,
    SAVE_GEOHASH,
    CONFIRM_ADDRESS,
    CHOOSE_ADDRESS,
    NEED_VALIDATION,
    SAVE_CART_ID_SIG,
    SAVE_ORDER_PARAM,
    CHANGE_ORDER_PARAM,
    ORDER_SUCCESS,
    SAVE_SHOPID,
    SAVE_ORDER,
    OUT_LOGIN,
    RETSET_NAME,
    SAVE_AVANDER,
    SAVE_ADDRESS,
    SAVE_ADDDETAIL,
    SAVE_QUESTION,
    ADD_ADDRESS,
    BUY_CART,
} from './mutation-types.js'

import {
    setStore,
    getStore,
} from '../config/mUtils'

export default {
    //记录当前经度和纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }){
        state.latitude = latitude
        state.longitude = longitude
    },
    //保存geohash
    [SAVE_GEOHASH](state,geohash){
        state.geohash = geohash
    },
    //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        };
        if (!state.login) {
            return
        }
        if (!info.message) {
            state.userInfo = {...info};
            let validity = 30;
            let now = new Date();
            now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
            document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
            document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
        } else {
            state.userInfo = null;
        }
    },
    [RECORD_SHOPDETAIL](state, detail) {
        state.shopDetail = detail;
    },
    // 加入购物车
    [ADD_CART](state, {
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock
    }){
        let cart = state.cartList
        if(cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]){
            cart[shopid][category_id][item_id][food_id]['num']++
        } else if(cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id]){
            cart[shopid][category_id][item_id][food_id] = {};
            cart[shopid][category_id][item_id][food_id]['num'] = 1;
            cart[shopid][category_id][item_id][food_id]['id'] = food_id;
            cart[shopid][category_id][item_id][food_id]['name'] = name;
            cart[shopid][category_id][item_id][food_id]['price'] = price;
            cart[shopid][category_id][item_id][food_id]['specs'] = specs;
            cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopid][category_id][item_id][food_id]['stock'] = stock;
        } else if (cart[shopid] && cart[shopid][category_id]) {
            cart[shopid][category_id][item_id] = {};
            cart[shopid][category_id][item_id][food_id] = {};
            cart[shopid][category_id][item_id][food_id]['num'] = 1;
            cart[shopid][category_id][item_id][food_id]['id'] = food_id;
            cart[shopid][category_id][item_id][food_id]['name'] = name;
            cart[shopid][category_id][item_id][food_id]['price'] = price;
            cart[shopid][category_id][item_id][food_id]['specs'] = specs;
            cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopid][category_id][item_id][food_id]['stock'] = stock;
        } else if (cart[shopid]) {
            cart[shopid][category_id] = {};
            cart[shopid][category_id][item_id] = {};
            cart[shopid][category_id][item_id][food_id] = {};
            cart[shopid][category_id][item_id][food_id]['num'] = 1;
            cart[shopid][category_id][item_id][food_id]['id'] = food_id;
            cart[shopid][category_id][item_id][food_id]['name'] = name;
            cart[shopid][category_id][item_id][food_id]['price'] = price;
            cart[shopid][category_id][item_id][food_id]['specs'] = specs;
            cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopid][category_id][item_id][food_id]['stock'] = stock;
        } else {
            cart[shopid] = {};
            cart[shopid][category_id] = {};
            cart[shopid][category_id][item_id] = {};
            cart[shopid][category_id][item_id][food_id] = {};
            cart[shopid][category_id][item_id][food_id]['num'] = 1;
            cart[shopid][category_id][item_id][food_id]['id'] = food_id;
            cart[shopid][category_id][item_id][food_id]['name'] = name;
            cart[shopid][category_id][item_id][food_id]['price'] = price;
            cart[shopid][category_id][item_id][food_id]['specs'] = specs;
            cart[shopid][category_id][item_id][food_id]['packing_fee'] = packing_fee;
            cart[shopid][category_id][item_id][food_id]['sku_id'] = sku_id;
            cart[shopid][category_id][item_id][food_id]['stock'] = stock;
        }
        state.cartList = {...cart}
        setStore('buyCart', state.cartList)
    },
    // 移出购物车
    [REDUCE_CART](state, {
        shopid,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs
    }){
        let cart = state.cartList
        if(cart[shopid] && cart[shopid][category_id] && cart[shopid][category_id][item_id] && cart[shopid][category_id][item_id][food_id]){
            if(cart[shopid][category_id][item_id][food_id]['num'] > 0){
                cart[shopid][category_id][item_id][food_id]['num']--
                state.cartList = {...cart}
                setStore('buyCart', state.cartList)
            }else{
                cart[shopid][category_id][item_id][food_id] = ''
            }
        }
    },
    //网页初始化时从本地缓存获取购物车数据
    [INIT_BUYCART](state) {
        let initCart = getStore('buyCart')
        if(initCart){
            state.cartList = JSON.parse(initCart)
        }
    },
    //清空当前商品的购物车信息
    [CLEAR_CART](state, shopid) {
        state.cartList[shopid] = ''
        state.cartList = {...state.cartList}
        setStore('buyCart', state.cartList)
    },
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info
        state.login = true
        let validity = 30
        let now = new Date()
        now.setTime(now.getTime() + validity*24*3600*1000)
        document.cookie = "USERID" + info.user_id + ";expires=" + now.toGMTString()
        document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString()
    }
}
