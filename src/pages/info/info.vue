<template>
    <div>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <FooterBar></FooterBar>
    </div>
</template>
<script>
    import FooterBar from '../../components/info/footer'
    export default {
        data(){
            return {

            }
        },
        components: {
            FooterBar
        }
    }

</script>
<style lang='less'>
    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
    .router-fade-enter, .router-fade-leave-active {
        opacity: 0;
    }
    #app{
        width:100%;
        height:100%;
      }
      ::-webkit-scrollbar{width:1px;}
      .br{
        height: 2px;
        background-color: #f7f7f7;
        border-top:1px solid #e5e5e5;
      } 
</style>