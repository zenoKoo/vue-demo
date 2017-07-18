<template>
    <div class="content">
        <div class="tab">
            <div @click="changeTab('all')" class="all type" :class="{isBorder: tab==='all'}">
                <a href="javascript:;" @click="changeRoute('/')">首页</a>
            </div>
            <div @click="changeTab('good')" class="good type" :class="{isBorder: tab==='good'}">
                <a href="javascript:;" @click="changeRoute('/')">精华</a>
            </div>
            <div @click="changeTab('share')" class="share type" :class="{isBorder: tab==='share'}">
                <a href="javascript:;" @click="changeRoute('/')">分享</a>
            </div>
            <div @click="changeTab('ask')" class="ask type" :class="{isBorder: tab==='ask'}">
                <a href="javascript:;" @click="changeRoute('/')">问答</a>
            </div>
            <div @click="changeTab('job')" class="job type" :class="{isBorder: tab==='job'}">
                <a href="javascript:;" @click="changeRoute('/')">招聘</a>
            </div>
        </div>
        <div class="article" ref="article" @scroll="scroll($event)">
            <div class="loading">
                <i class="icon-loading" v-show="isLoading" :style="icon.loading"></i>
            </div>
            <router-view></router-view>
        </div>
        <transition name="slide-fade">
            <div class="top" v-show="isShowTop">
                <i class="icon-top" @click.stop.prevent="toTop" :style="icon.top"></i>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
import {
    mapState
} from 'vuex'
export default {
    data() {
            return {
                page: 1,
                over: false, //是否已经没有内容
                isShowTop: false,
                icon: {
                    loading: {
                        background: 'url('+require('../../../common/icons/icon-loading.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    },
                    top: {
                        background: 'url('+require('../../../common/icons/icon-top.svg')+') no-repeat',
                        backgroundSize: 'contain'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                tab: state => state.cnode.tab,
                isLoading: state => state.cnode.isLoading,
                articleList: state => state.cnode.articleList
            })
        },
        methods: {
            changeTab(type, page = 1) {
                this.$store.commit('changeTab', {
                    type,
                    articleList: [],
                    isLoading: true
                })
                this.$http.get(`https://cnodejs.org/api/v1/topics?page=${page}&tab=${type}`)
                    .then(res => {
                        let articleList = res.data.data
                        let isLoading = false
                        this.$store.commit('changeTab', {
                            type,
                            articleList,
                            isLoading
                        })
                    })
                    .catch(res => {
                        console.log(res)
                    })
            },
            scroll(event) {
                if (event.target.clientHeight > event.target.scrollTop) {
                    this.isShowTop = false
                } else {
                    this.isShowTop = true
                }
                if (this.$route.path !== '/') {
                    return;
                } else if (!this.over) {
                    let flag = event.target.clientHeight + event.target.scrollTop === event.target.scrollHeight
                    if (flag) {
                        this.$store.commit('changeMore', true)
                        this.page++
                            this.$http.get(`https://cnodejs.org/api/v1/topics?page=${this.page}&tab=${this.tab}`)
                            .then(res => {
                                let articleList = res.data.data
                                if (!articleList.length) {
                                    this.over = true
                                    this.$store.commit('changeMore', false)
                                    return
                                }
                                this.$store.commit('changeTab', {
                                    articleList: this.articleList.concat(articleList),
                                    isLoading: false
                                })
                                this.$store.commit('changeMore', false)
                            })
                            .catch(res => {
                                console.log(res)
                            })
                    }
                }
            },
            toTop() {
                if (this.$refs.article.scrollTop <= 0) {
                    return
                }
                let time = setInterval(() => {
                    if (this.$refs.article.scrollTop <= 0) {
                        clearInterval(time)
                    }
                    this.$refs.article.scrollTop -= 200
                }, 1)
            },
            changeRoute(path) {
                this.$router.push(path)
            }
        }
}
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    position: relative;
    .tab {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        background-color: #2196F3;
        font-size: 110%;
        letter-spacing: 2px;
        a {
            color: white;
        }
        a::after {
            bottom: -1px;
            background-color: white;
        }
        .type {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            position: relative;
            z-index: 1;
        }
        .isBorder {
            border-bottom: 2px solid #ff4081;
            font-weight: bold;
            font-size: 120%;
        }
    }
    .article {
        flex: 1;
        position: relative;
        width: 100%;
        overflow: auto;
        transition: 1s linear;
        .loading {
            display: flex;
            justify-content: center;
            .icon-loading {
                display: inline-block;
                position: absolute;
                text-align: center;
                width: 40px;
                height: 40px;
                animation: loading .4s linear infinite;
            }
        }
    }
    .top {
        position: fixed;
        z-index: 1;
        bottom: 10px;
        right: 15px;
        width: 45px;
        height: 45px;
        .icon-top {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    @media screen and (min-width: 760px) {
        .top {
            bottom: 10px;
            right: 60px;
            width: 55px;
            height: 55px;
        }
    }
}
</style>
