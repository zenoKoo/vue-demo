<template>
    <div>
        <div class="v-header">
            <div class="v-header-logo">
                <div>
                    <img src="../../common/images/common/logo.png">
                </div>
                <div class="v-load-title">
                    <h3>精彩电影</h3>
                    <div>查影讯，上精彩电影就够了！</div>
                </div>
            </div>
            <div class="v-header-input" @click="search">
                <input type="text" class="v-inp" placeholder="请输入电影名" v-model.trim="query">
            </div>
        </div>
        <div class="v-nav-bar">
            <router-link to="/inTheaters" class="v-nav">正在热映</router-link>
            <router-link to="/comingSoon" class="v-nav">即将上映</router-link>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {
                query: ''
            }
        },
        methods: {
            search() {
                this.$router.push('/searchPage')
            }
        }
}
</script>
<style type="text/css">
.v-header {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    height: 60px;
    padding: 10px 20px;
    box-sizing: border-box;
}

.v-header-logo {
    flex: 1;
}

.v-header-logo > div {
    display: inline-block;
}

.v-header-logo > div:first-child img {
    height: 42px;
    width: 42px;
}

.v-header-logo > div:last-child {
    vertical-align: top;
}

.v-header-input {
    width: 100px;
    line-height: 100%;
}

.v-load-title h3 {
    font-size: 17px;
    font-weight: 700;
    color: #333;
}

.v-load-title div {
    font-size: 12px;
    color: #999;
}
.v-nav-bar {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    background-color: #df2d2d;
  }
  .v-nav {
    flex: 1;
    text-align: center;
    text-decoration: none;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    color: #F9FAFC;
  }
  .v-inp {
    width: 100%;
    height: 40px;
    border-style: none;
    border-radius: 15px;
    padding-left: 10px;
  }
</style>
