<template>
    <div class="content">
        <div class="title">获取当前ip地址</div>
        <div class="ip-content">
            地区：{{data.en_name}}&nbsp{{data.city}}<br><br>
            互联网服务提供商：{{data.isp}}<br><br>
            <span class="show-ip">ip地址：{{data.ip}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { mapActions } from 'vuex'
    export default{
        data(){
            return {
                data: {
                    en_name: 'zhbz',
                    city: '深圳',
                    isp: '提供商',
                    ip: '192.168.0.33'
                }
            }
        },
        methods: {
            ...mapActions({
                inOther: 'inOther'
            })
        },
        mounted(){
            this.inOther()
        }
    }
</script>
<style lang='less'>
    .ip-content{
        margin:20px;
    }
    .show-ip{
        color:#F7BA2A
    }
</style>