<template>
  <div id="app">
    <ul class="sub-menu-registry-view">
      <li>vista por categorias</li>
      <li>vista por registros</li>
      <li>ampliar</li>
      <li>reducir</li>
      <li>reordenar</li>
    </ul>
    <registryGrid :collectionJson="myJson"></registryGrid>
  </div>
</template>

<script>
import json from './data/index';
import registryGrid from './components/registry-grid.vue';

export default {
  name: 'App',
  components: {
    registryGrid
  },
  data(){
    return{
        myJson: json
    }
  },
  mounted: function() {
    console.log(this.myJson)
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