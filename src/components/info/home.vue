<template>
    <div class="home">
        <div class="home-title">Box</div>
        <banner></banner>
        <navBox></navBox>
        <news></news>
    </div>
</template>
<script type="text/javascript">
    import banner from './banner'
    import navBox from './navBox'
    import news from './news'
    export default{
        components: {
            banner,
            navBox,
            news
        }
    }
</script>
<style lang='less'>
     .home{
        width: 100%;
        height: auto;
        margin-bottom: 40px;
        .home-title{
          height:30px;
          background:#00a6c6;
          color:#fff;
          line-height:30px;
          text-indent:10px;
          font-size:14px;  
        }
    }
</style>