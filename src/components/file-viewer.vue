<template>
    <div class="file-regitry-viewer">
        <h4>{{ this.registryObject.titulo }}</h4>
        <p><span>Número de registro: </span>{{ this.registryObject.numero }}</p>
        <p><span>Nombre de registro: </span>{{ this.registryObject.nombre }}</p>
        <p><span>Autor/es: </span>{{ this.registryObject.autor }}</p>
        <p><span>Descripción: </span>{{ this.registryObject.autor }}</p>
        <p><span>Datación: </span>{{ this.registryObject.autor }}</p>
        <p><span>Fecha de registro: </span>{{ this.registryObject.autor }}</p>
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
</style>