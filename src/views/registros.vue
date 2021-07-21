<template>
    <div>
        <div>registro</div>
        <canvas id="registryCanvas"></canvas>
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
