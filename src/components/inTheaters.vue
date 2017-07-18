<template>
    <div class="in-theathers">
        <vHeader></vHeader>
        <spinner v-if="transition"></spinner>
        <div v-else class="in-theaters-area">
            <div class="in-movies-wrap">
                <div class="in-movies-show" v-for="(item, index) in in_theaters_data_body_subjects" @click="showMoreMsg(item.id)">
                    <div class="in-movies-show-child">
                        <div class="posters">
                            <img :src="item.images.small" :alt="item.alt">
                        </div>
                        <div class="movieMsg">
                            <h2>{{item.title}}</h2>
                            <star :score="item.rating.average"></star>
                            <p>{{item.rating.average}}分</p>
                            <p>导演：{{item.directors[0].name}}</p>
                            <p>主演：{{item.casts[0].name}}, {{item.casts[1].name}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import vHeader from './header/header'
    import spinner from './spinner/spinner'
    import star from './star/star'
    export default {
        name: 'hello',
        data(){
            return {
                transition: true,
                in_theaters_data: {},
                in_theaters_data_body: {},
                in_theaters_data_body_subjects: []
            }
        },
        components:{
            vHeader,
            spinner,
            star
        },
        mounted(){
            //return ;
            this.$http.get('movie/in_theaters?city=深圳').then(response=>{
                this.transition = false
                this.in_theaters_data = response
                this.in_theaters_data_body = response.body
                this.in_theaters_data_body_subjects = response.body.subjects
            }).catch(response =>{
                console.log(response)
            })
        },
        methods: {
            showMoreMsg(id){
                //this.$router.push({path:'/movie/'+id,query: {name: 'jack'}})
                this.$router.push('/movie/'+id)
            }
        }
    }
</script>
<style type="text/css" scoped>
    h1{
        text-align: center;
    }
    .in-movies-wrap{
        text-decoration: none;
        font-size: 0;
    }
    .in-movies-show{
        background: #f8f8f8;
        padding: 10px 20px;
        box-sizing: border-box;
        cursor: pointer;
        font-size: 0;
    }
    .in-movies-show-child{
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        border-bottom: 1px solid #d6d6d6;
    }
    .in-movies-show p{
        font-size: 14px;
        color: #666;
    }
    .movieMsg{
        flex: 1;
        padding-left: 20px;
        vertical-algin: top;
    }
    .movieMsg h2{
        font-size: 20px;
        font-weight: 500px;
        margin-bottom: 10px;
    }
</style>