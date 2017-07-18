<template>
    <div class="article-list">
        <transition-group name="slide-top">
            <div class="item" v-for="(item, index) in articleList" :key="item.last_reply_at+index">
                <div class="avatar">
                    <img :src="item.author.avatar_url">
                </div>
                <div class="title">
                    <p>
                        <span class="flag" :class="{special: item.top || item.good}">
                            {{(item.top?'置顶':'')||(item.good?'精华':'')||types[item.tab]}}
                        </span>
                        <a href="javascript:;" @click="changeRoute('/article/'+item.id)">{{item.title}}</a>
                    </p>
                    <p class="view">
                        <span class="viewed">{{item.reply_count}}</span>/{{item.visit_count}}
                        <span class="date">{{$util.formatDate(item.last_reply_at)}}</span>
                    </p>
                </div>
            </div>
        </transition-group>
        <div class="more">
            <i v-show="isMore" class="icon-more" :style="icon.more"></i>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { mapState } from 'vuex'
    import { util } from '../../../common/js/util.js'
    export default {
        data(){
            return {
                types: {
                    ask: '问答',
                    job: '招聘',
                    share: '分享'
                },
                icon: {
                    more: {
                        background: 'url('+require('../../../common/icons/icon-loading.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                tab: state => state.cnode.tab,
                articleList: state => state.cnode.articleList,
                isMore: state => state.cnode.isMore
            })
        },
        created(){
            this.$store.commit('changeTab', {isLoading: true})
            this.$http.get('https://cnodejs.org/api/v1/topics')
                .then(res => {
                    let articleList = res.data.data
                    this.$store.commit('changeTab',{articleList, isLoading: false})
                })
        },
        methods: {
            changeRoute(path){
                this.$router.push(path)
            }
        }
    }
</script>
<style lang="scss" scoped>
  .article-list {
    position: relative;
    z-index: 1;

    .item {
      width: 100%;
      height: 70px;
      display: flex;
      padding-right: 5px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .avatar {
        width: 52px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
      }

      .title {
        width: 100%;

        flex: 4;
        background-color: white;
        padding-top: 15px;
        padding-left: 5px;
        font-size: 13px;
        overflow: hidden;
        p {
          width: 98%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .flag {
          background-color: #e5e5e5;
          padding: 2px 5px;
          font-size: 80%;
          color: #9c9c9c;
          border-radius: 5px;
          margin-right: 3px;
        }
        .special {
          background-color: #80bd01;
          color: white;
        }
        .view {
          position: relative;

          font-size: 70%;
          color: gray;
          padding-top: 10px;
          padding-left: 45px;
          span.viewed {
            color: #9e83cc;
          }
          span.date {
            position: absolute;
            right: 10px;
          }
        }

      }

      .title:hover {
        background-color: #F5F5F5;
      }

      @media screen and (min-width: 760px) {
        .title {
          padding-left: 3%;
          .flag {
            margin-right: 15px;
          }
          .view {
            padding-left: 55px;
          }
        }
      }
    }

    @media screen and (min-width: 760px) {
      .item {
        margin: auto;
        width: 70%;
      }
    }
    .more {
      text-align: center;
      .icon-more {
        display: inline-block;
        width: 40px;
        height: 40px;
        animation: loading .4s linear infinite;
      }
    }
  }

</style>
