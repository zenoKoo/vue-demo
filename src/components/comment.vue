<template>
    <div>
        <spinner v-if="transition"></spinner>
        <div v-else>
            <header class="largeCom-header-title">
                <div class="largeCom-back" @click="backLastPage">
                    <div></div>
                </div>
                <div class="largeCom-title">长评--{{commentsMsg.subject.title}}</div>
                <div class="largeCom-back"></div>
            </header>
            <section class="largeCom-wrap">
                <div v-for="(item,index) in commentsMsg.reviews" class="largeCom-content">
                    <h3>标题：{{item.title}}</h3>
                    <div class="largeCom-content-header">
                        <img :src="item.author.avatar" :alt="item.author.alt" class="comment-user-img">
                        <span>{{item.author.name}}</span>
                        <star :score="item.rating.value*2" class="largeCom-star"></star>
                        <span>{{item.created_at}}</span>
                    </div>
                    <div @click="showContent(index)" v-if="commentsMsg.reviews[index].summaryShow">{{item.summary}}</div>
                    <div @click="showSummary(index)" v-else>{{item.content}}</div>
                    <footer>{{item.useful_count}}赞同{{item.useless_count}}反对</footer>
                </div>
            </section>
        </div>
    </div>
</template>
<script type="text/javascript">
import spinner from './spinner/spinner.vue'
import star from './star/star.vue'
export default {
    data() {
            return {
                transition: true,
                commentsMsg: {
                    reviews: [{
                        rating: {
                            max: '',
                            value: 0
                        },
                        author: {
                            name: '',
                            avatar: '',
                            alt: '',
                            signature: '',
                            id: ''
                        },
                        contentShow: false,
                        summaryShow: true,
                        created_at: '',
                        title: '',
                        updated_at: '',
                        share_url: '',
                        summary: '',
                        content: '',
                        useless_count: '',
                        useful_count: ''
                    }],
                    total: '',
                    subject: {
                        title: ''
                    }
                }
            }
        },
        components: {
            spinner,
            star
        },
        mounted() {
            const url = '/movie/subject/' + this.$route.params.id + '/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=&udid='
            this.$http.get(url).then(response => {
                this.transition = false
                for(let key in response.body){
                    if(key =='reviews'){
                        for(let i=0;i<response.body[key].length;i++){
                            response.body[key][i].summaryShow = true
                            response.body[key][i].contentShow = false
                        }
                    }
                }
                this.commentsMsg = response.body
            }).catch(response => {
                console.log(response)
            })
        },
        methods: {
            showContent: function(ind) {
                this.commentsMsg.reviews[ind].summaryShow = false
            },
            showSummary: function(ind) {
                console.log(this.commentsMsg.reviews[ind])
                this.commentsMsg.reviews[ind].summaryShow = true
                console.log(this.commentsMsg.reviews[ind])
            },
            backLastPage: function() {
                window.history.go(-1)
            }
        }
}
</script>
<style>
.largeCom-header-title {
    display: flex;
    height: 50px;
    width: 100%;
    background-color: #e54847;
    padding: 6px;
    box-sizing: border-box;
}

.largeCom-back {
    width: 50px;
    position: relative;
    cursor: pointer;
}

.largeCom-back > div {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 13px;
    width: 13px;
    border: 2px solid #fff;
    border-width: 0 0 2px 2px;
    transform: rotate(45deg);
}

.largeCom-title {
    flex: 1;
    color: #fff;
    text-align: center;
    line-height: 2;
    font-size: 20px;
    overflow: hidden;
}

.largeCom-wrap {
    padding: 10px;
}

.largeCom-content {
    margin-bottom: 10px;
}

.largeCom-content h3 {
    font-size: 16px;
}

.largeCom-content .comment-user-img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 5px;
}

.largeCom-content-header {
    display: flex;
}

.largeCom-content-header span {
    align-self: center;
}

.largeCom-content-header-rating {
    flex: 1;
    margin-left: 10px;
}

.largeCom-content footer {
    text-align: right;
}

.largeCom-star {
    display: inline-block;
    line-height: 48px;
    margin: 0 5px;
}
.star-item{
    margin: 0 4px 0 0;
}
</style>
