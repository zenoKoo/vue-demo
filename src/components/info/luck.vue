<template>
    <div class="content">
        <div class="title">今日运气</div>
        <div class="content-item">冲刹：{{data.chongsha}}</div>
        <div class="content-item">运势：{{data.jrhh}}</div>
        <div class="content-item">宜：{{data.yi}}</div>
        <div class="content-item">星座：{{data.xingzuo}}</div>
        <div class="content-item">日：{{data.zhiri}}</div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data () {
            return {
               apiUrl:"http://route.showapi.com/856-1",
               showapi_sign:"1688d17e4c41492daaef9e12d36dcd0d",
               showapi_appid:"35517",
               data:'',
            }
        },
        mounted(){
            let _this = this
            this.$http.post(this.apiUrl,{showapi_sign:this.showapi_sign,
                showapi_appid:this.showapi_appid},{emulateJSON: true})
            .then(res => {
                _this.data = res.body.showapi_res_body
            })
            .catch(res => {
                console.log(res)
            })
        },
        created(){
            this.$store.dispatch("inOther")
        }
    }
</script>
<style lang='less'>
    .content{
            margin: 0;
            padding:40px 0;
            position: relative;
            font-size:14px;
            .title{
                text-align:center;
                 position: fixed;
                 top:0;
                 width:100%;
                color: #fff;
                font-size: 16px;
                background:#00a6c6;
                text-align: center;
                line-height: 40px;
                font-family: cursive;
            }
            .content-item{
                padding:10px 0;
                margin:0 10px;
                border-bottom:1px solid #cdcdcd
            }
    }
</style>