<template>
    <!-- <div class="file-regitry-viewer">
        <h4>{{ this.registryObject.titulo }}</h4>
        <p><span>Número de registro: </span>{{ this.registryObject.numero }}</p>
        <p><span>Nombre de registro: </span>{{ this.registryObject.nombre }}</p>
        <p><span>Autor/es: </span>{{ this.registryObject.autor }}</p>
        <p><span>Descripción: </span>{{ this.registryObject.autor }}</p>
        <p><span>Datación: </span>{{ this.registryObject.autor }}</p>
        <p><span>Fecha de registro: </span>{{ this.registryObject.autor }}</p>
    </div>-->
    <div>
    <!-- <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button> -->
    
      <b-sidebar id="sidebar-1" :title="registryObject.numero" shadow>
        <div class="px-3 py-2">
          <p>rg: {{ this.registryObject.id }}</p>
          <template v-if="typeof registryObject.miniatura !== 'undefined'">
            <b-img :src="require('@/assets/img/' + this.registryObject.miniatura)" fluid thumbnail></b-img>
          </template>
          <h4>{{ this.registryObject.titulo }}</h4>
          <p><span class="title-file-viewer">Número de registro: </span><span>{{ this.registryObject.id }}</span></p>
        </div>
      </b-sidebar>
  </div>
</template>

<script>

export default {
    props: {
      registryObject: {
        type: Object,
        required: true
      }
  },
}
</script>

<style scoped>
    .file-regitry-viewer {
        width: 250px;
        position: absolute;
        top: 150px;
        right: 0px;
        background: #FFF;
        z-index: 9999;
        text-align: left;
        padding: 20px;
        border: 1px solid #000;
    }
    .title-file-viewer {
        font-weight: bold;
    }
    .img-thumbnail {
      padding: 0px;
    }
</style>