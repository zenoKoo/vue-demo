import { baseUrl } from './env'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
    type = type.toUpperCase()
    url = baseUrl + url
    if(window.fetch && method == 'fetch'){
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
            cache: "force-cache"
        }
        if(type == 'POST'){
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }else{
            let dataStr = ''
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if(dataStr != ''){
                url += '?' + dataStr.substr(0, dataStr.lastIndexOf('&'))
            }
        }
        try{
            var response = await fetch(url, requestConfig);
            var responseJson = await response.json();
        }catch(e){
            throw new Error(e)
        }
        return responseJson
    }else{
        var app = new Vue()
        var response = await app.$http({url, method: type,params: data,credientials: true,headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
        return response.body
    }
}