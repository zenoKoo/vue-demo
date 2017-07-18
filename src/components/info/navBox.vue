<template>
    <div class="box cl-fix">
        <a v-for="listitem in list" href="javascript:;" class="item" @click="go('/'+listitem.path)">
            <i :class="listitem.className" :style="{backgroundImage:listitem.backgroundImage}"></i>{{listitem.title}}
        </a>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return {
                list: [
                    {
                        className: 'luck',
                        title: '运势',
                        path: 'luck',
                        backgroundImage: 'url('+require('../../common/images/info/luck.jpg')+')'
                    },
                    {
                        className: 'joke-img',
                        title: '笑一笑',
                        path: 'joke',
                        backgroundImage: 'url('+require('../../common/images/info/joke.jpg')+')'
                    },
                    {
                        className: 'today',
                        title: '今天',
                        path: 'today',
                        backgroundImage: 'url('+require('../../common/images/info/today.jpg')+')'
                    },
                    {
                        className: 'eg',
                        title: '英文励志',
                        path: 'eg',
                        backgroundImage: 'url('+require('../../common/images/info/eg.jpg')+')'
                    },
                    {
                        className: 'ip',
                        title: '获得ip',
                        path: 'ip',
                        backgroundImage: 'url('+require('../../common/images/info/ip.jpg')+')'
                    },
                    {
                        className: 'cn-eg',
                        title: '翻译',
                        path: 'cn-eg',
                        backgroundImage: 'url('+require('../../common/images/info/cn-eg.jpg')+')'
                    },
                    {
                        className: 'other',
                        title: '敬请期待',
                        path: '',
                        backgroundImage: 'url('+require('../../common/images/info/other.jpg')+')'
                    },
                    {
                        className: 'other',
                        title: '敬请期待',
                        path: '',
                        backgroundImage: 'url('+require('../../common/images/info/other.jpg')+')'
                    }
                ]
            }
        },
        methods: {
            go(path){
                this.$router.push(path)
            }
        }
    }
</script>
<style lang='less'>
    .box{
        width:100%;
        margin:10px 0;
        .item{
            width:25%;
            float:left;
            height:60px;
            text-align:center;
            color:#00a6c6;
            text-decoration: none;
            font-size:12px;
            i{
                width:35px;
                height:35px;
                border-radius:50%;
                display:block;
                margin:5px auto;
                background-size:100%;
            }
        }
    }
</style>