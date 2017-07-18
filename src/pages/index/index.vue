<style type="text/css">
    .view-fade-enter-active {
        transition: all .6s ease;
    }

    .view-fade-leave-active {
        transition: all .1s ease;
    }

    .view-fade-enter,
    .view-fade-leave-active {
        overflow: hidden;
        opacity: 0;
    }

    .view-fade-enter {
        margin-left: 100%;
    }

    .view-fade-leave-active {
        margin-left: -100%;
    }
    @import '../../common/css/reset.css';
    #app {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: auto;
        font-family: 'FontAwesome', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #E5E9F2;
        color: #2c3e50;
      }
      @media (min-width: 768px){
            body{
            width: 360px;
            height: auto;
            overflow: hidden;
            margin: 20px auto;
          }
          #app{
            position:static;
          }
      }
</style>
<template>
    <div id="app">
        <transition>
            <!-- <keep-alive>
                <router-view class="view">
                </router-view>
            <keep-alive> -->
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
<script type="text/javascript">
    export default {
        created() {
            this.$router.push('/')
        }
    }
</script>
