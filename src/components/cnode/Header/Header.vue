<template>
    <div class="header">
        <div class="title">
            <i class="icon-menu" @click.stop.prevent="showAsideMenu" :style="icon.menu"></i>
            <h1>CNode社区</h1>
            <i :style="icon.msg" class="icon-msg" v-show="ak" @click.stop.prevent="showMsg"></i>
            <span class="msg-count" v-show="ak">{{msgCount}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                msgCount: 0,
                icon: {
                    menu:{
                        left: '20px',
                        top: '25px',
                        background: 'url('+require('../../../common/icons/icon-menu.svg')+') no-repeat',
                        backgroundSize: 'contain',
                    },
                    msg:{
                        right: '30px',
                        top: '23px',
                        background: 'url('+require('../../../common/icons/icon-msg.svg')+') no-repeat',
                        backgroundSize: 'contain',
                    }
                }
            }
        },
        methods: {
            showAsideMenu(){
                this.$store.commit('showAsideMenu', true)
            },
            showMsg(){
                this.$store.commit('showMsg', true)
            }
        },
        computed: {
            ak(){
                return this.$store.state.cnode.ak
            }
        },
        created(){
          /*var k = [1,1,1,2,4,4,5,6,7,7,7,7,8,8,8,8,8,8,8,8];
          var k1 = [];
          var j = 0;
          debugger
          outer:
          for(var i=0;i<k.length;i++){
            if(k1.length==0){
              k1.push([k[i]]);
            }else{
              inter:
              for(var t=j;t<k1.length;t++){
                if(k[i]==k1[t][0]){
                  k1[t].push(k[i]);
                  break inter;
                }else{
                  k1.push([k[i]])
                  j++;
                  break inter;
                } 
              }
            }
          }
          console.log(k1)*/
            if(!this.ak){
                return ;
            }
            this.$http.get('https://cnodejs.org/api/v1/message/count?accesstoken='+ this.ak)
                .then(res => {
                    if(res.data.success){
                        this.msgCount = tes.data.data
                    }
                })
                .catch(res => {
                    console.log(res)
                })
        }
    }
</script>
<style lang="scss" scoped>
  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 70px;
    background-color: #2196F3;
    color: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 10px rgba(0, 0, 0, .2);
    i {
      position: absolute;
      z-index: 1;
      display: inline-block;
      flex: 1;
      width: 25px;
      height: 25px;
    }
    span.msg-count {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      width: 20px;
      height: 20px;
      right: 15px;
      top: 18px;
      text-align: center;
      background-color: #ff4081;
      border-radius: 10px;
      font-size: 80%;
    }
    h1 {
      flex: 5;
      letter-spacing: 2px;
      transition: .3s ease-in-out;
    }
    h1:hover {
      transform: rotate(8deg);
      transition: .3s ease-in-out;
    }
  }
</style>
