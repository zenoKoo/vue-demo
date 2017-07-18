<template>
    <div class="article-detail">
        <div class="body" v-show="!isLoading">
            <div class="article-title">
                <h1><span class="flag" v-show="infos.top || infos.good">{{infos.top?'置顶':'精华'}}</span>{{infos.title}}</h1>
                <div class="desc">
                    <p>发布于{{$util.formatDate(infos.create_at)}} 作者<a href="javascript:;" @click="changeRoute('/user?name='+(infos.author && infos.author.loginname))">{{(infos.author && infos.author.loginname)}}</a>{{infos.visit_count}} 次浏览 来自 {{types[infos.tab]}}</p>
                </div>
            </div>
            <div class="md" v-html="infos.content"></div>
            <div class="reply">
                <div class="other">
                    <div class="collect" @click="collect">
                        <i :style="isCollected?icons.collected:icons.collectedNo"></i>收藏文章
                    </div>
                    <div class="total-reply">{{infos.reply_count}} 回复</div>
                </div>
                <div class="reply-input">
                    <input type="text" placeholder="请输入回复内容" v-model.trim="replyContent">
                    <button @click="reply('')">回复</button>
                </div>
                <div v-for="(item, index) in replies" class="reply-item">
                    <div class="reply-author">
                        <div class="reply-avatar">
                            <img :src="item.author.avatar_url">
                            <div class="reply-desc">
                                <a href="javascript:;" @click="changeRoute('/user?name='+(infos.author && infos.author.loginname))">{{(infos.author && infos.author.loginname)}}</a>
                                <span class="reply-at" @click="currentIndex = index">回复</span>
                                <i class="icon-reply-at" @click="ups(index, item.id, item)" :style="(item.ups.indexOf(userInfo.id)>0)?icons.upsYes:icons.upsNo"></i>
                                <span class="ups-count">{{item.ups.length}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="reply-content" v-html="item.content"></div>
                    <transition name="slide-top">
                        <div class="reply-one" v-show="currentIndex==index">
                            <input type="text" v-model.trim="replyOneContent" :placeholder="'@'+item.author.loginname">
                            <button @click="reply(item.id, item.author.loginname)">回复</button>
                            <button @click="currentIndex==null;replyContent=''">取消</button>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div class="back">
            <i class="icon-back" :style="icons.back" @click.stop.prevent="$router.go(-1)"></i>
        </div>
    </div>
</template>
<script type="text/javascript">
import {
    mapState
} from 'vuex'
export default {
    data() {
            return {
                id: this.$route.params.id,
                infos: {},
                types: {
                    share: '分享',
                    ask: '问答',
                    job: '招聘'
                },
                oImgs: [],
                isCollected: false,
                replyContent: '',
                replyOneContent: '',
                isReplyOne: false,
                isUps: false,
                flag: true,
                up: 0,
                currentIndex: null,
                currentUps: null,
                replies: [],
                icons: {
                    collected: {
                        background: 'url(' + require('../../../common/icons/icon-collect-yes.svg') + ') no-repeat 0 3px',
                        backgroundSize: 'contain'
                    },
                    collectedNo: {
                        background: 'url(' + require('../../../common/icons/icon-collect-no.svg') + ') no-repeat 0 3px',
                        backgroundSize: 'contain'
                    },
                    upsYes: {
                        background: 'url(' + require('../../../common/icons/icon-ups-yes.svg') + ') no-repeat',
                        backgroundSize: 'contain'
                    },
                    upsNo: {
                        background: 'url(' + require('../../../common/icons/icon-ups-no.svg') + ') no-repeat',
                        backgroundSize: 'contain'
                    },
                    back: {
                        background: 'url(' + require('../../../common/icons/icon-back-blue.svg') + ') no-repeat',
                        backgroundSize: 'contain'
                    }
                }
            }
        },
        created() {
            this.$store.commit('viewArcticle', true)
            this.$store.commit('showInfo', false)
            this.$store.commit('showAsideMenu', false)
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.id}`)
                .then(res => {
                    this.infos = res.data.data
                    this.replies = this.infos.replies.reverse()
                    this.$store.commit('viewArcticle', false)
                })
                .then(() => {
                    if (document.querySelector('.md')) {
                        this.oImgs = document.querySelector('.md').querySelectorAll('img')
                        for (let img of this.oImgs) {
                            img.onclick = () => location.href = img.src
                        }
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        },
        computed: {
            ...mapState({
                isLoading: state => state.cnode.isLoading,
                ak: state => state.cnode.ak,
                collectTopics: state => state.cnode.collectTopics,
                userInfo: state => state.cnode.userInfo
            })
        },
        mounted() {
            if (!this.ak) {
                return
            }
            this.$http.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`)
                .then(res => {
                    let collectTopics = res.data.data
                    this.$store.commit('updateCollect', collectTopics)
                    collectTopics.forEach(item => {
                        item.id === this.id ? this.isCollected = true : ''
                    })
                })
                .catch(res => {
                    console.log(res)
                })
        },
        methods: {
            collect() {
                if (!this.ak) {
                    this.$store.commit('showLogin', true)
                    return
                }
                if (!this.isCollected) {
                    this.$http.post(`https://cnodejs.org/api/v1/topic_collect/collect`, {
                        accesstoken: this.ak,
                        topic_id: this.id
                    }).then(res => {
                        if (res.data.success) {
                            this.isCollected = !this.isCollected
                        }
                    })
                } else {
                    this.$http.post(`https://cnodejs.org/api/v1/topic_collect/de_collect`, {
                        accesstoken: this.ak,
                        topic_id: this.id
                    }).then(res => {
                        if (res.data.success) {
                            this.isCollected = !this.isCollected
                        }
                    })
                }
            },
            reply(id, name) {
                if (!this.ak) {
                    this.$store.commit('showLogin', true)
                    return
                } else if (!id) {
                    this.$http.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
                        accesstoken: this.ak,
                        content: this.replyContent
                    }).then(() => {
                        this.$http.get(`https://cnodejs.org/api/v1/topic//${this.id}`)
                            .then(res => {
                                this.infos = res.data.data
                                this.replies = this.infos.replies.reverse()
                                this.replyContent = ''
                            })
                            .catch(res => {
                                console.log(res)
                            })
                    }).catch(res => {
                        console.log(res)
                    })
                } else {
                    this.$http.post(`https://cnodejs.org/api/v1/topic/${this.id}/replies`, {
                        accesstoken: this.ak,
                        content: '@' + name + '' + this.replyContent,
                        reply_id: id
                    }).then(() => {
                        this.$http.get(`https://cnodejs.org/api/v1/topic//${this.id}`)
                            .then(res => {
                                this.infos = res.data.data
                                this.replies = this.infos.replies.reverse()
                                this.currentIndex = null
                                this.replyContent = ''
                            })
                            .catch(res => {
                                console.log(res)
                            })
                    }).catch(res => {
                        console.log(res)
                    })
                }
            },
            ups(index, upsId, item) {
                if (!this.ak) {
                    this.$store.commit('showLogin', true)
                    return
                }
                if (item.author.loginname === this.userInfo.loginname) {
                    alert('不能自己给自己点赞哦！')
                    return
                }
                this.$http.post(`https://cnodejs.org/api/v1/reply/${upsId}/ups`, {
                    accesstoken: this.ak
                }).then(res => {
                    if (res.data.success) {
                        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.id}`)
                            .then(re => {
                                this.infos = re.data.data
                                this.replies = this.infos.replies.reverse()
                            })
                    }
                })
            },
            changeRoute(path) {
                this.$router.push(path)
            }
        }
}
</script>
<style lang="scss" scoped>
.article-detail {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 8px 5px 0 5px;
    background-color: rgba(0, 0, 0, .07);
    overflow-x: hidden;
    overflow-y: auto;
    .body {
        background-color: white;
        height: 100%;
        border-radius: 4px;
        .article-title {
            width: 100%;
            padding-left: 5px;
            padding-top: 3px;
            padding-bottom: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            h1 {
                font-size: 1.2rem;
                .flag {
                    background-color: #80bd01;
                    padding: 2px 5px;
                    font-size: 80%;
                    color: white;
                    border-radius: 5px;
                    margin-right: 5px;
                }
            }
            .desc {
                padding-top: 3px;
                p {
                    font-size: 80%;
                    color: gray;
                }
            }
        }
        .md {
            width: 100%;
            overflow: hidden;
        }
        .reply {
            .other {
                margin-top: 20px;
                margin-bottom: 10px;
                // border-bottom: 1px solid rgba(0, 0, 0, .05);
                padding-left: 10px;
                display: flex;
                justify-content: space-between;
                i {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 3px;
                }
                .collected {}
                .collected-no {}
            }
            .reply-input {
                width: 100%;
                height: 50px;
                background-color: white;
                margin-bottom: 10px;
                padding-left: 10px;
                padding-top: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                input {
                    width: 80%;
                    height: 40px;
                    font-size: 1.3rem;
                    border-bottom: 1px solid rgba(0, 0, 0, .2);
                    margin-right: 10px;
                    padding-left: 5px;
                    padding-right: 5px;
                }
                input:focus {
                    border-bottom: 1px solid #2196f3;
                }
                button {
                    font-size: 1.3rem;
                    padding: 3px 5px;
                    background-color: #2196f3;
                    color: white;
                    border-radius: 3px;
                }
            }
            .total-reply {
                text-align: center;
                width: 100px;
                background-color: #B2DFDB;
                border-radius: 3px;
                // padding-left: 10px;
                margin-bottom: 6px;
            }
            .reply-item {
                .reply-author {
                    background-color: white;
                    border-bottom: 1px solid rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    padding-left: 10px;
                    .reply-avatar {
                        display: flex;
                        width: 100%;
                        height: 50px;
                        align-items: center;
                        img {
                            width: 30px;
                            height: 30px;
                            border-radius: 3px;
                        }
                        .reply-desc {
                            position: relative;
                            flex: 1;
                            padding-left: 10px;
                            .reply-at {
                                position: absolute;
                                right: 60px;
                            }
                            .icon-reply-at {
                                position: absolute;
                                right: 35px;
                                top: -2px;
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                            }
                            .ups-yes {}
                            .ups-no {}
                            span.ups-count {
                                position: absolute;
                                right: 20px;
                            }
                        }
                    }
                }
                .reply-one {
                    width: 100%;
                    height: 30px;
                    // background-color: red;
                    margin-bottom: 20px;
                    padding-top: 2px;
                    input {
                        width: 65%;
                        height: 100%;
                        background: none;
                        border-bottom: 1px solid rgba(0, 0, 0, .1);
                        font-size: 1.3rem;
                        color: gray;
                    }
                    input:focus {
                        border-bottom: 1px solid #00bcd4;
                        color: black;
                    }
                    button {
                        font-size: 1.2rem;
                        vertical-align: bottom;
                        padding: 2px 5px;
                        border-radius: 2px;
                    }
                    button:nth-of-type(1) {
                        background-color: #2196f3;
                        color: white;
                    }
                    button:nth-of-type(2) {
                        background-color: white;
                        color: gray;
                    }
                }
            }
        }
    }
    .back {
        position: fixed;
        top: 60%;
        left: -8px;
        width: 50px;
        height: 50px;
        i.icon-back {
            display: inline-block;
            width: 100%;
            height: 100%;
            opacity: .5;
            cursor: pointer;
        }
    }
}

@media screen and (min-width: 760px) {
    .article-detail {
        padding-left: 3%;
        padding-right: 3%;
        .article-title {
            text-align: center;
        }
    }
}
</style>
