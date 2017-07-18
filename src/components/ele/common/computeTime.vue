<template>
    <div class="page">
        <span class="rem_time" @click="gotoPay" style="{color:orange;border: 1px solid orange;}">{{remaining}}</span>
        <alertTip v-if="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alertTip>
    </div>
</template>
<script type="text/javascript">
    import alertTip from './alertTip'
    export default {
        data(){
            return {
                countNum: 900,
                showAlert: false,
                alertText: null
            }
        },
        mounted(){
            this.countNum -= this.numTime
            this.remainingTime()
        },
        props: ['time'],
        components: {
            alertTie
        },
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            remainingTime(){
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.countNum--
                    if(this.countNum == 0){
                        clearInterval(this.timer)
                        this.showAlert = true
                        this.alertText = '支付超时'
                    }
                },1000)
            },
            gotoPay(){
                this.showAlert = true
                this.alertText = '请前往 饿了么官方 APP 支付'
            }
        },
        computed: {
            remainingTime: function(){
                let minute = parseInt(this.countNum/60),
                    second = parseInt(this.countNum%60)
                if(minute < 10){
                    minute = '0' + minute
                }
                if(second < 10){
                    second = '0' + second
                }
                return '去支付（还剩' + minute + '分' + second + '秒）'
            },
            numTime: function(){
                if(this.time.indexOf('分钟') > 0){
                    return parseInt(this.time)*60
                }else{
                    return parseInt(this.time)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../style/mixin';
    .page{
        display: inline-block;
        .rem_time{
            @include sc(.55rem, #orange);
            padding: .1rem .2rem;
            border-radius: .15rem;
        }
    }
</style>