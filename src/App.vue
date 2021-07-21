<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted: function() {
    console.log('carga los resgistros')
  }
}
</script>