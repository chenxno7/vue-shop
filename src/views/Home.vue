<template>
  <div class="home">
    <h2>home</h2>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return {

    }
  },
  beforeCreate(){
    if(!(localStorage.getItem('token')||sessionStorage.getItem('token'))){
      this.$router.push('/login')
    }
  }
}
</script>
