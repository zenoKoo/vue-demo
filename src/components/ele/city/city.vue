<template>
    <div class="city_container">
        <head-top :head-title="cityname" go-back='true'>
            <div @click="gohome('/home')" slot="changecity" class="change_city">切换城市</div>
        </head-top>
        <form class="city_form" v-on:submit.prevent>
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputValue'>
            </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
            </div>
        </form>
        <header v-if="historytitle" class="pois_search_history">搜索历史</header>
        <ul class="getpois_ul">
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>
<script type="text/javascript">
    import headTop from '../header/header'
    import {currentcity, searchplace} from '../../../service/getData'
    import {getStore, setStore} from '../../../config/mUtils'
    export default {
        data(){
            return {
                inputValue: '',
                cityid: '',
                cityname: '',
                placelist: [],
                placeHistory: [],
                historytitle: true,
                placeNone: false
            }
        },
        mounted(){
            this.cityid = this.$route.params.cityid
            currentcity(this.cityid).then(res => {
                this.cityname = res.name
            })
            if(getStore('placeHistory')){
                this.placelist = JSON.parse(getStore('placeHistory'))
            }
        },
        components: {
            headTop
        },
        methods: {
            postpois(){
                if(this.inputValue){
                    searchplace(this.cityid, this.inputValue).then(res => {
                        this.historytitle = false
                        this.placelist = res
                        this.placeNone = !res.length 
                    })
                }
            },
            nextpage(index, geohash){
                let history = getStore('placeHistory')
                let choosePlace = this.placelist[index]
                if(history){
                    let checkrepeat = false
                    this.placeHistory = JSON.parse(history)
                    this.placeHistory.forEach(item => {
                        if(item.geohash == geohash){
                            checkrepeat = true
                        }
                    })
                    if(!checkrepeat){
                        this.placeHistory.push(choosePlace)
                    }
                }else{
                    this.placeHistory.push(choosePlace)
                }
                setStore('placeHistory', this.placeHistory)
                this.$router.push('/msite?query='+geohash)
            },
            gohome(path){
                this.$router.push(path)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../style/mixin';
    .city_container{
        padding-top: 2.35rem;
    }
    .change_city{
        right: 0.4rem;
        @include sc(0.6rem, #fff);
        @include ct;
    }
    .city_form{
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: 0.4rem;
        div{
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input_style{
                border-radius: 0.1rem;
                margin-bottom: 0.4rem;
                @include wh(100%, 1.4rem);
            }
            .city_input{
                border: 1px solid $bc;
                padding: 0 0.3rem;
                @include sc(0.65rem, #333);
            }
            .city_submit{
                background-color: $blue;
                @include sc(0.65rem, #fff);
            }
        }
    }
    .pois_search_history{
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: 0.5rem;
        @include font(0.475rem, 0.8rem);
    }
    .getpois_ul{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid $bc;
            .pois_name{
                margin: 0 auto 0.35rem;
                width: 90%;
               @include sc(0.65rem, #333);
            }
            .pois_address{
                width: 90%;
                margin: 0 auto 0.55rem;
                @include sc(0.45rem, #999);
            }
        }
    }
    .search_none_place{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
    }
</style>
