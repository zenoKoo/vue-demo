<template>
    <div>
        <div class='my-hide' :style={background:background}>
            <div class='my-logo'>
                <img :src="logo">
            </div>
            <span class='my-name'>{{user}}</span>
        </div>
        <div class='my-detail'>
            github：<a href='https://github.com/193Eric'>https://github.com/193Eric</a><br><br>
            email：373986529@qq.com<br><br>
            qq：373986529<br><br>
            blog：<a href='http://blog.csdn.net/qq_24073885'>http://blog.csdn.net/qq_24073885</a>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
        logo: require('../../common/images/info/logo.jpg'),
        user: 'come from internet',
        background: 'url('+require('../../common/images/info/bg1.png')+') no-repeat'
    }
  },
  created(){
     this.$store.dispatch("inMy")
  }
}
</script>
<style lang='less'>
    .my-hide{
        width:100%;
        height:180px;
        background-size:cover;
        position:relative;
        .my-logo{
            width:80px;
            height:80px;
            border-radius:50%;
            position:absolute;
            top:60px;
            left:0;
            right:0;
            margin:0 auto;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .my-name{
            position:absolute;
            bottom:10px;
            color:#fff;
            left:0;
            right:0;
            margin:0 auto;
            display:block;
            text-align:center;
        }
    }
    .my-detail{
            margin:10px 10px;
            font-size: 12px;
        }
</style>