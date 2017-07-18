<template>
    <div class='content'>
        <div class='title'>搞笑图片</div>
        <div class='content-img' v-for='item in data'>
            <div class='img-title'>{{item.content}}</div>
            <img v-bind:src='item.url' />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                apiUrl: "http://v.juhe.cn/joke/randJoke.php",
                key: "12175aade3931810fcd18dd2c0cf9474",
                data: ''
            }
        },
        mounted() {
            let _this = this;
            this.$http.jsonp(this.apiUrl, {
                    params: {
                        key: this.key,
                        type: 'pic'
                    }
                }, {
                    emulateJSON: true
                })
                .then(res => {
                    _this.data = JSON.parse(res.bodyText).result;
                }).catch(res => {
                    console.log(res)
                })
        },
        created() {
            this.$store.commit('mutationOhter')
        }
    }
</script>
<style lang='less'>
.content-img {
    padding: 10px 10px;
    border-bottom: 1px solid #cdcdcd;
    text-align: center;
    .img-title {
        text-align: left;
        line-height: 30px;
    }
    img {
        width: 250px;
        height: auto;
    }
}
</style>
