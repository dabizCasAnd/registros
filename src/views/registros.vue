<template>
    <div>
        <div class="registry-collection-subNav">
            <div>
                <b-nav>
                    <b-nav-item v-b-toggle.collapse-categories>Vista por categorías</b-nav-item>
                    <b-nav-item @click="showRegistryView()" active>Vista por registros</b-nav-item>
                </b-nav>
            </div>
            <div>
                <b-nav>
                    <b-nav-item>: Ampliar</b-nav-item>
                    <b-nav-item>: Reducir</b-nav-item>
                    <b-nav-item>: Reordenar</b-nav-item>
                </b-nav>
            </div>
        </div>
        <b-collapse id="collapse-categories" :visible="!normalView">
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>VIDA COTIDIANA</b-nav-item>
                    <b-nav-item @click="currentCategoryShow = 0">Memoria</b-nav-item>
                    <b-nav-item @click="currentCategoryShow = 1">Corporalidades</b-nav-item>
                    <b-nav-item @click="currentCategoryShow = 2">Tiempo</b-nav-item>
                    <b-nav-item @click="currentCategoryShow = 3">Identidad</b-nav-item>
                    <b-nav-item @click="currentCategoryShow = 4">Vinculos</b-nav-item>
                </b-nav>
            </div>
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>CONTENIDO</b-nav-item>
                    <b-nav-item active>Active</b-nav-item>
                    <b-nav-item>Link</b-nav-item>
                    <b-nav-item>Another Link</b-nav-item>
                    <b-nav-item>Disabled</b-nav-item>
                </b-nav>
            </div>
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>POSICIONAMIENTO</b-nav-item>
                    <b-nav-item active>Active</b-nav-item>
                    <b-nav-item>Link</b-nav-item>
                    <b-nav-item>Another Link</b-nav-item>
                    <b-nav-item>Disabled</b-nav-item>
                </b-nav>
            </div>
        </b-collapse>
        <div class="registry-collection-visor">
            <!-- <canvas id="registryCanvas"></canvas> -->
            <registryGrid :collectionJson="myJson" :currentCategory="currentCategoryShow"></registryGrid>
        </div>
    </div>
</template>

<script>
//import {initCollectionRegistry} from '../utils/registro-collection';
import json from '../data/index';
import registryGrid from '../components/registry-grid.vue';

export default {
    name: 'Registro',
    /*methods: {
        initCollectionRegistry
    },*/
    components: {
        registryGrid
    },
    data(){
        return{
            myJson: json,
            currentCategoryShow: null,
            normalView: true
        }
    },
    methods: {
        showRegistryView() {
            this.currentCategoryShow = null;
            this.normalView = true;
        }
    },
    mounted: function() {
        this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
            if(collapseId == 'collapse-categories') {
                this.normalView = !isJustShown;
            }
        });
        //initCollectionRegistry(document.getElementById('registryCanvas'));
    }
}
</script>

<style scoped>
    .registry-collection-subNav {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .registry-collection-visor {
        overflow: hidden;
        width: 100%;
        margin-top: 40px;
    }
    .sub-menu-categorys {
        border-bottom: 1px solid #000;
    }
</style>