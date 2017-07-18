<template>
    <div class="come-soon">
        <vHeader></vHeader>
        <spinner v-if="transition"></spinner>
        <div v-else class="co-theaters-area">
            <div class="co-movies-wrap">
                <div class="co-movies-show" v-for="(item, index) in coming_soon_data_body_subjects" @click="showMoreMsg(item.id)">
                    <div class="co-movies-show-child">
                        <div class="co-posters">
                            <img :src="item.images.small" :alt="item.alt">
                        </div>
                        <div class="co-movieMsg">
                            <h2>{{item.title}}</h2>
                            <p>导演：{{item.directors[0].name}}</p>
                            <p>主演：{{item.casts[0].name}}, {{item.casts[1].name}}</p>
                            <p>类型：{{item.genres.join(', ')}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import spinner from './spinner/spinner'
    import vHeader from './header/header'
    export default {
        name: 'coming_soon',
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
            spinner
        },
        mounted(){
            //return ;
            this.$http.get('movie/coming_soon?city=深圳').then(response=>{
                this.transition = false
                this.coming_soon_data = response
                this.coming_soon_data_body = response.body
                this.coming_soon_data_body_subjects = response.body.subjects
            }).catch(response =>{
                console.log(response)
            })
        },
        methods: {
            showMoreMsg(id){
                this.$router.push('/movie/'+id)
            }
        }
    }
</script>
<style scoped>
    .co-movies-wrap{
        text-decoration: none;
        font-size: 0;
    }
    .co-movies-show{
        background: #f8f8f8;
        cursor: pointer;
        font-size:0;
        padding: 10px 20px;
    }
    .co-movies-show-child{
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        border-bottom: 1px solid #d6d6d6;
    }
    .co-movieMsg {
        flex: 1;
        padding-left: 20px;
        vertical-align: top;
      }
      .co-movieMsg h2 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .co-movies-show p {
        font-size: 14px;
        color: #666;
      }
</style>