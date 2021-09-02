<template>
  <div id="app">
    <!-- <mainMenu></mainMenu> -->
    <div class="container">
      <!-- <router-view></router-view> -->
      <div>logo</div>
      <registros></registros>
      <retablos></retablos>
    </div>
  </div>
</template>

<script>
//import json from './data/index';
//import registryGrid from './components/registry-grid.vue';
//import mainMenu from './components/menu.vue'
import registros from './views/registros.vue';
import retablos from './components/retablos.vue';

export default {
  name: 'App',
  components: {
    registros,
    retablos
    //mainMenu
  },
  /*data(){
    return{
        myJson: json
    }
  },*/
  mounted: function() {
    
  }
}
</script>

<!-- <style scoped>
  .sub-menu-registry-view li {
    display: inline-block;
    margin-right: 40px;
  }
</style> -->
<style lang="css">
  #sidebar-right {
    background-color: rgb(228,211,56) !important;
    width: 60%;
  }
</style>