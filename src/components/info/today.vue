<template>
    <div class="content">
        <div class="title">历史上的今天</div>
        <div class="content-item" v-for="item in data">
            {{item.title}}<img v-if="item.img" class="item-img" :src="item.img">
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            apiUrl: "http://route.showapi.com/119-42",
            showapi_sign: "1688d17e4c41492daaef9e12d36dcd0d",
            showapi_appid: "35517",
             data: ''
        }
    },
    mounted() {
        let _this = this;
        this.$http.post(this.apiUrl, {
            showapi_appid: this.showapi_appid,
            showapi_sign: this.showapi_sign
        },{
            emulateJSON: true
         })
        .then(res => {
            _this.data = res.body.showapi_res_body.list
        }).catch(res => {
            console.log(res)
        })
    },
    created() {
        this.$store.dispatch("inOther")
    }
}
</script>
<style lang='less'>
    .item-img{
        width:100%;
        height:150px;
        margin:0 auto;
    }
    .content-item{
        line-height:30px;
    }
</style>