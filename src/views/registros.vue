<template>
    <div>
        <div>registro</div>
        <div class="registry-collection-visor">
            <canvas id="registryCanvas"></canvas>
        </div>
    </div>
</template>

<script>
import {initCollectionRegistry} from '../utils/registro-collection';

export default {
    name: 'Registro',
    methods: {
        initCollectionRegistry
    },
    mounted: function() {
        initCollectionRegistry(document.getElementById('registryCanvas'));
        //collectionRegistry.init();
        //collectionRegistry.init(document.getElementById('registryCanvas'));*/
    }
}
</script>

<style scoped>
    .registry-collection-visor {
        overflow: hidden;
        width: 100%;
    }
</style>