<template>
    <div class="loading_container">
        <div class="load_img" :style="background"></div>
        <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <ellipse rx="26" ry="10" cx="26" cy="10" style="fill:#ddd;stoke:none;"/>
        </svg>  
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                positionY: 0,
                timer: null,
                backgroundImg: 'url('+require('../../../common/images/ele/icon_loading.png') + ')  no-repeat 0 0'
            }
        },
        computed: {
            background(){
                    return {
                        background:this.backgroundImg,
                        backgroundPositionY: -(this.positionY%7)*2.5+'rem',
                        backgroundSize: '2.5rem auto'
                    }
                }
        },
        mounted(){
            this.timer = setInterval(() => {
                this.positionY++
            },600)
        },
        beforeDestory(){
            clearInterval(this.timer)
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../style/mixin';
    @keyframe load{
        0% {transform: transformY(0px);}
        50% {transform: transformY(-50px);}
        100% {transform: transformY(0px);}
    }
    @keyframe ellipse{
        0% {transform: scale(1);}
        50% {transform: scale(0.3);}
        100% {transform: scale(1);}
    }
    .loading_container{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @include wh(2.5rem, 2.5rem);
    }
    .load_img{
        @include wh(100%, 100%);
        transform: translateY(0px);
        animation: load .6s infinite ease-in-out;
        position: relative;
        z-index: 11;
    }
    .load_ellipse{
        position: absolute;
        @include wh(2.4rem, 2rem);
        top: 2.2rem;
        left: 0.11rem;
        z-index: 10;
        animation: ellipse .6s infinite ease-in-out;
    }
</style>