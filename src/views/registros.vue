<template>
    <div>
        <div>registro</div>
        <div>
            ordenar
        </div>
        <div class="registry-collection-visor">
            <!-- <canvas id="registryCanvas"></canvas> -->
            <registryGrid></registryGrid>
        </div>
    </div>
</template>

<script>
//import {initCollectionRegistry} from '../utils/registro-collection';
import registryGrid from '../components/registry-grid.vue';

export default {
    name: 'Registro',
    /*methods: {
        initCollectionRegistry
    },*/
    components: {
        registryGrid
    },
    mounted: function() {
        //initCollectionRegistry(document.getElementById('registryCanvas'));
    }
}
</script>

<style scoped>
    .registry-collection-visor {
        overflow: hidden;
        width: 100%;
    }
</style>