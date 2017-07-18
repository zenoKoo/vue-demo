<template>
    <div class="star">
        <img v-for="itemClass in itemClasses" :src="itemClass" class="star-item">
    </div>
</template>
<script type="text/javascript">
    const [LENGTH, CLS_ON, CLS_HALF, CLS_OFF] = [5, require('../../common/images/common/star36_on@2x.png'), require('../../common/images/common/star36_half@2x.png'), require('../../common/images/common/star36_off@2x.png')]
    export default {
        props: {
            score: {
                type: Number
            }
        },
        computed: {
            itemClasses(){
                let result = []
                let score = Math.floor(this.score)/2
                let starOn = Math.floor(score) 
                let starHalf = (score - starOn) === 0?0:1
                for(let i=0;i<starOn;i++){
                    result.push(CLS_ON)
                }
                if(starHalf === 1){
                    result.push(CLS_HALF)
                }
                while(result.length<LENGTH){
                    result.push(CLS_OFF)
                }
                return result
            }
        }
    }

</script>
<style type="text/css">
    .star-item{
        display: inline-block;
        height: 10px;
        width: 10px;
        margin: 0 4px 4px 0;
    }
</style>