<template>
    <div class="nav-box">
        <p class="nav-list">
            <a href="javascript:;" class="nav-item" @click="go('/')">
                <i :style="{backgroundImage: 'url('+(home? require('../../common/images/info/shop-1.png'):require('../../common/images/info/shop.png'))+')'}"></i>
            </a>
            <a href="javascript:;" class="nav-item" @click="go('/my')">
                <i :style="{backgroundImage: 'url('+(my? require('../../common/images/info/center-1.png'):require('../../common/images/info/center.png'))+')'}"></i>
            </a>
        </p>
    </div>
</template>
<script type="text/javascript">
    import { mapState } from 'vuex'
    export default {
        computed: mapState({
            home: state => state.info.home,
            my: state => state.info.my
        }),
        methods: {
            go(path){
                this.$router.push(path)
            }
        }
    }
</script>
<style lang='less'>
    .nav-box{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #f0f0f0;
        .nav-list{
            width:100%;
            display: flex;
            z-index:10;
            .nav-item{
                flex:1;
                color: #fff;
                height:40px;
                text-align:center;
                display:block;
                font-family: cursive;
                text-decoration:none;
                i{
                    width: 90px;
                    height: 100%;
                    display: block;
                    background-repeat: no-repeat;
                    background-size: 120%;
                    margin: 0 auto;
                    background-position-y: center;
                    background-position-x: center;
                    position: relative;
                    top: -3px;
                }
            }
        }
    }
</style>