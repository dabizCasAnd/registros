<template>
  <div id="app">
    <!-- <mainMenu></mainMenu> -->
    <div class="container">
      <!-- <router-view></router-view> -->
      <registros></registros>
    </div>
  </div>
</template>

<script>
//import json from './data/index';
//import registryGrid from './components/registry-grid.vue';
//import mainMenu from './components/menu.vue'
import registros from './views/registros.vue';

export default {
  name: 'App',
  components: {
    registros
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

<style scoped>
  .sub-menu-registry-view li {
    display: inline-block;
    margin-right: 40px;
  }
    /*.registry-collection-visor {
        overflow: hidden;
        width: 100%;
    }*/
</style>