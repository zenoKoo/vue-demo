<template>
    <header id="head_top">
        <slot name="logo"></slot>
        <slot name="search"></slot>
        <section class="head_goback"  v-if="goBack" @click="back">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#fff;stroke-width:2"/> 
            </svg>
        </section>
        <div @click="headerRightRouter()" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:href="http://www.w3.org/1999/xlink" xlink:href="#user"/></use>
            </svg>
            <span v-else class="login_span">登录|注册</span>
        </div>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>
<script type="text/javascript">
    import {mapState, mapActions} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        mounted(){
            //this.getUserInfo()
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState({
                userInfo: state => state.ele.userInfo
            })
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
            headerRightRouter(){
                this.$router.push(this.userInfo? '/profile':'/login')
            },
            back(){
                this.$router.push('/home') 
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../style/mixin';
    #head_top{
        background-color: $blue;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        @include wh(100%, 1.95rem);
    }
    .head_goback{
        left: 0.4rem;
        @include wh(0.6rem, 0.8rem);
        line-height: 2.2rem;
        margin-left: .4rem;
    }
    .head_login{
        right: 0.55rem;
        @include sc(0.65rem, #fff);
        @include ct;
        .login_span{
            color: #fff;
        }
        .user_avatar{
            fill: #fff;
            @include wh(.8rem, .8rem);
        }
    }
    .title_head{
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            font-weight: bold;
        }
    }
</style>
