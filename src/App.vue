<template>
  <div>
    <!-- <Display></Display>
    <Increment></Increment> -->
    <Teacher></Teacher>
    <Student></Student>
    <h1 class="logo"><router-link to="/content">Go to view-a</router-link></h1>
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
//import Display from './components/Display.vue'
//import Increment from './components/Increment.vue'
//import store from './vuex/note' 
import Teacher from './components/Teacher.vue'
import Student from './components/Student.vue'
import store from './vuex/group' 
//console.log(store)
export default {
  components: {
    //Display,
    //Increment
    Teacher,
    Student
  },
  store // 在根组件加入 store，让它的子组件和 store 连接
}
</script>

<style lang="scss">
  @import "./style/style";
</style>
