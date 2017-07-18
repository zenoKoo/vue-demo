<template>
    <div class="nav-banner">
        <img :src="banner">
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                banner: require('../../common/images/info/banner1.jpg')
            }
        }
    }
</script>
<style lang='less'>
    .nav-banner{
        height: 150px;
        width: 100%;
        img{
            height: 100%;
            width: 100%;
        }
    }
</style>