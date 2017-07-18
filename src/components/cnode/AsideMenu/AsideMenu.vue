<template>
    <transition name="slide-left">
        <div v-show="isShowAsideMenu" class="aside-menu">
            <div class="menu">
                <div class="user">
                    <div class="user-avatar">
                        <img @click="showLogin" :src="userInfo.avatar_url || 'http://omratag7g.bkt.clouddn.com/icon-unlogin.svg'">
                    </div>
                    <div class="username">
                        {{userInfo.success?userInfo.loginane:'点击头像登录'}}
                    </div>
                </div>
                <div class="infos block">
                    <div class="msg block" @click="showMsg">
                        <i class="icon-msg" :style="icons.msg"></i>我的消息
                    </div>
                    <div class="block new" @click="showNewArticle">
                        <i class="icon-new" :style="icons.new"></i>发布话题
                    </div>
                    <div class="info block" @click="showInfo">
                        <i class="icon-info" :style="icons.info"></i>个人中心
                    </div>
                    <div class="about block" @click="showAbout">
                        <i class="icon-about" :style="icons.about"></i>关于
                    </div>
                    <div class="cnode" :style="icons.cnode"></div>
                </div>
            </div>
            <div class="mask" @click.stop.prevent="showAsideMenu"></div>
        </div>
    </transition>
</template>
<script type="text/javascript">
    import { mapState } from 'vuex'
    export default {
        data(){
            return {
                icons: {
                    cnode: {
                        background: 'url('+require('../../../common/icons/icon-cnode.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    msg: {
                        background: 'url('+require('../../../common/icons/icon-msg-blue.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    collect: {
                        background: 'url('+require('../../../common/icons/icon-collect.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    new: {
                        background: 'url('+require('../../../common/icons/icon-new.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    info: {
                        background: 'url('+require('../../../common/icons/icon-info.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    about: {
                        background: 'url('+require('../../../common/icons/icon-about.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                isShowAsideMenu: state => state.cnode.isShowAsideMenu,
                userInfo: state => state.cnode.userInfo
            })
        },
        methods: {
            showAsideMenu(){
                this.$store.commit('showAsideMenu', false)
            },
            showLogin(){
                this.$store.commit('showLogin', true)
            },
            showInfo(){
                this.$store.commit('showInfo',true)
                this.$router.push('/')
            },
            showMsg(){
                this.$store.commit('showMsg', true)
                this.$router.push('/')
            },
            showNewArticle(){
                this.$store.commit('showNewArticle', true)
            },
            showAbout(){
                this.$store.commit('showAbout', true)
            }
        }
    }
</script>
<style lang="scss" scoped>
  .aside-menu {
    position: absolute;
    display: flex;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;

    .menu {
      display: flex;
      flex-direction: column;
      width: 220px;
      background-color: white;
      box-shadow: 0 0 12px gray;
      .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 200px;
        background-color: #2196F3;
        color: white;
        .user-avatar {
          img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
            cursor: pointer;
          }
        }

        .username {
          font-size: 1.2rem;
        }
      }

      .infos {

        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .block {
          width: 100%;
          height: 50px;
          display: flex;
          padding-left: 50px;
          align-items: center;
          cursor: pointer;
        }

        .block + .block {
          border-top: 1px solid rgba(0, 0, 0, .05);
        }
        i {
          display: inline-block;
          width: 22px;
          height: 22px;
          background-repeat: no-repeat;
          margin-right: 8px;
        }
        .cnode {
          margin-top: 150px;
          flex: 1;
          width: 50%;
          background-color: red;
          opacity: .1;
        }
      }
    }

    .mask {
      flex: 1;
    }
  }
</style>
