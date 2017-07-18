<template>
    <div id="app">
        <VHeader></VHeader>
        <VContent></VContent>
        <AsideMenu></AsideMenu>
        <transition name="show">
            <Login v-if="isShowLogin"></Login>
        </transition>
        <transition name="show">
            <Info v-if="isShowInfo"></Info>
        </transition>
        <transition name="show">
            <Msg v-if="isShowMsg"></Msg>
        </transition>
        <transition name="show">
            <NewArticle v-if="isShowNewArticle"></NewArticle>
        </transition>
        <transition name="show">
            <About v-if="isShowAbout"></About>
        </transition>
    </div>
</template>
<script>
import VHeader from '../../components/cnode/Header/Header.vue'
import VContent from '../../components/cnode/Content/Content.vue'
import AsideMenu from '../../components/cnode/AsideMenu/AsideMenu.vue'
import Login from '../../components/cnode/Login/Login.vue'
import Info from '../../components/cnode/Info/Info.vue'
import Msg from '../../components/cnode/Msg/Msg.vue';
/*import NewArticle from './components/NewArticle/NewArticle.vue';*/
import About from '../../components/cnode/About/About.vue';

export default {
    components: {
        VHeader,
        VContent,
        AsideMenu,
        Login,
        Info,
        Msg,
         /*NewArticle,*/
        About
    },
    computed: {
        isShowLogin() {
            return this.$store.state.cnode.isShowLogin;
        },
        isShowInfo() {
            return this.$store.state.cnode.isShowInfo;
        },
        isShowMsg() {
            return this.$store.state.cnode.isShowMsg;
        },
        isShowNewArticle() {
            return this.$store.state.cnode.isShowNewArticle;
        },
        isShowAbout() {
            return this.$store.state.cnode.isShowAbout;
        }
    },
    beforeCreate() {
        //console.log("%c Powered by Zhaohui - microzz.com","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;");
    }
}
</script>
<style lang="scss">
@import "../../style/cnode.scss";
.show-enter-active {
    transition: all .3s ease;
}

.show-leave-active {
    transition: all .2s ease-in;
}

.show-enter,
.show-leave-active {
    transform: translateX(200px);
    opacity: 0;
}

#app {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
