<template>

    <!--<img alt="Vue logo" src="./assets/logo.png">-->


    <div class="block" style="width: 100%;height: 50%">

     <!--<span class="demonstration">自定义初始值</span>-->
      <h1>内存管理</h1>
          <router-link to="/dynamicAllocation"
          >分区管理</router-link
          >
          ################
          <router-link to="/pageRequest"
          >调页管理</router-link
          >
      <router-view></router-view>

    </div>

</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.block{

}
</style>
