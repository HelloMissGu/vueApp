<template>
  <div class="login">
   <textarea name="" id="" cols="30" rows="10">nhao</textarea>
   <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../static/sass/login.scss';
</style>

