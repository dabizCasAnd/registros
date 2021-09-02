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
                    <b-nav-item @click="zoomInGrid()">: Ampliar</b-nav-item>
                    <b-nav-item @click="zoomOutGrid()">: Reducir</b-nav-item>
                    <b-nav-item @click="shuffleGrid()">: Reordenar</b-nav-item>
                </b-nav>
            </div>
        </div>
        <b-collapse id="collapse-categories" :visible="!normalView">
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>VIDA COTIDIANA</b-nav-item>
                    <b-nav-item @click="currentCategoryShow1 = 0">Memoria</b-nav-item>
                    <b-nav-item @click="currentCategoryShow1 = 1">Corporalidades</b-nav-item>
                    <b-nav-item @click="currentCategoryShow1 = 2">Tiempo</b-nav-item>
                    <b-nav-item @click="currentCategoryShow1 = 3">Identidad</b-nav-item>
                    <b-nav-item @click="currentCategoryShow1 = 4">Vinculos</b-nav-item>
                </b-nav>
            </div>
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>CONTENIDO</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 0">Ficciones</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 1">Información</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 2">Documentos</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 3">Anécdotas</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 4">Contexto</b-nav-item>
                    <b-nav-item @click="currentCategoryShow2 = 5">Referencias</b-nav-item>
                </b-nav>
            </div>
            <div class="sub-menu-categorys">
                <b-nav>
                    <b-nav-item disabled>POSICIONAMIENTO</b-nav-item>
                    <b-nav-item active>Dentro</b-nav-item>
                    <b-nav-item>Fuera</b-nav-item>
                    <b-nav-item>En el margen</b-nav-item>
                    <b-nav-item>No está</b-nav-item>
                </b-nav>
            </div>
        </b-collapse>
        <div class="registry-collection-visor">
            <!-- <canvas id="registryCanvas"></canvas> -->
            <registryGrid ref="registryGrid" :collectionJson="myJson" :currentCategory1="currentCategoryShow1"></registryGrid>
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
            currentCategoryShow1: null,
            currentCategoryShow2: null,
            normalView: true
        }
    },
    methods: {
        showRegistryView() {
            this.currentCategoryShow1 = null;
            this.currentCategoryShow2 = null;
            this.normalView = true;
        },
        shuffleGrid() {
            this.$refs.registryGrid.shuffleCollection();
        },
        zoomInGrid() {
            this.$refs.registryGrid.zoomInGrid();
        },
        zoomOutGrid() {
            this.$refs.registryGrid.zoomOutGrid();
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