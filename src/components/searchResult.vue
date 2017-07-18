<template>
    <div class="result">
        <vHeader></vHeader>
        <spinner v-if="transition"></spinner>
        <div v-else>
            <h1 class="title">'{{val}}'的搜索结果，共{{search_result.total}}条信息</h1>
            <div class="res-theaters-area">
                <div class="res-movies-show" v-for="(item, index) in search_result.subjects" @click="search(item.id)">
                    <div class="res-movies-show-child">
                        <div>
                            <img :src="item.images.small" :alt="item.alt">
                        </div>
                        <div class="res-movieMsg">
                            <h2>{{item.title}}</h2>
                            <star :score="item.rating.average"></star>
                            <p>{{item.rating.average}}分({{item.collect_count}}评价)</p>
                            <p>{{item.year}}年</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import vHeader from './header/header.vue'
import spinner from './spinner/spinner.vue'
import star from './star/star.vue'
export default {
    data() {
            return {
                transition: true,
                val: '',
                search_result: {
                    total: '',
                    subjects: [{
                        rating: {
                            max: '',
                            average: 0
                        },
                        genres: [],
                        title: '',
                        year: '',
                        images: {
                            small: '',
                            medium: '',
                            large: ''
                        },
                        directors: [{
                            name: ''
                        }],
                        casts: [{
                            name: '',
                            id: ''
                        }],
                        collect_count: '',
                        alt: '',
                        id: ''
                    }]
                }
            }
        },
        created() {
            this.showMoreMsg()
        },
        components: {
            spinner,
            vHeader,
            star
        },
        methods: {
            showMoreMsg() {
                this.val = this.$route.query.name
                const searchUrl = '/movie/search?q=' + this.val
                this.$http.get(searchUrl).then(response => {
                    this.transition = false
                    this.search_result = response.body
                }).catch(response => {
                    console.log(response)
                })
            },
            search(str) {
                const path = '/movie/' + str
                this.$router.push(path)
            }
        }
}
</script>
<style type="text/css">
.res-theaters-area {
    font-size: 0;
}

.res-movies-wrap {
    text-decoration: none;
    font-size: 0;
}

.res-movies-show {
    padding: 10px 20px;
    background: #f8f8f8;
    cursor: pointer;
    font-size: 0;
}

.res-movies-show-child {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #d6d6d6;
}

.res-movieMsg {
    flex: 1;
    padding-left: 20px;
    vertical-align: top;
}

.res-movieMsg h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
}

.res-movies-show p {
    font-size: 14px;
    line-height: 2;
    color: #666;
}

.title {
    font-size: 20px;
    font-weight: 700;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #f2fbfb;
}
</style>
