<template>
<div>
    <fileViewer :registryObject='currentRegistry'></fileViewer>
    <div id="app-registry-collection" :style="{ minWidth: size + 'px', minHeight: size + 'px' }">
        <div
        id="grid-container"
        @wheel="handleWheel"
        :style="{ minWidth: size + 'px', minHeight: size + 'px' }"
        >
        <!-- @click.stop -->
        <div
            v-for="component in componentsCollection"
            :key="component.id"
            class="canvas-element"
            @click="showComponentInfo"
            v-b-toggle.sidebar-1
            :id="'component_' + component.id"
            :style="{
            height: component.height + 'px',
            width: component.width + 'px',
            zIndex: component.zIndex,
            left: component.x + 'px',
            top: component.y + 'px'
            }">
            <div style="color: black;">
              <template v-if="currentCategory1 !== null && +component.category1 == currentCategory1">
                <div class="icon-category">
                  <img class="registry-icon" :src="require('@/assets/img/icons/iconos-52.svg')" alt="" title="">
                </div>
                <img class="registry-icon category-visible" :src="require('@/assets/img/' + component.miniatura)" alt="" title="">
              </template>
              
              <template v-else>
                <img class="registry-icon" :src="require('@/assets/img/' + component.miniatura)" alt="" title="" loading="lazy">
              </template>
            </div>
        </div>
        </div>
    </div>
    <svg>
      <filter id="blue-wash">
        <feColorMatrix type="matrix" values="0.2 0.2 0.2 0 0   0.3 0.3 0.3 0 0  1 1 1 0 0  0 0 0 1 0"/>
      </filter>
    </svg>
</div>
</template>

<script>
import { gsap, TweenLite, Back } from "gsap";
import { Draggable } from "gsap/Draggable";
import fileViewer from './file-viewer.vue';

const bgSize = 2500;
const subdivisions = 60;
const minZoom = 90;
const maxZoom = 35;

export default {
  name: "app-registry-collection",
  props: {
      collectionJson: {
        type: Array,
        required: true
      },
      currentCategory1: {
        type: Number,
        required: false
      }
  },
  components: {
    fileViewer
  },
  data: () => {
    return {
      screenWith: 1116,
      size: 0,
      subdivisions: 0,
      currentTarget: null,
      draggablesArray: [],
      componentsCollection: [],
      currentRegistry: {}
    };
  },
  mounted() {
    window.onresize = this.handleResizeEvent;
    this.size = bgSize;
    this.subdivisions = subdivisions;
    let el = document.getElementById("grid-container");
    //let allElements = document.querySelectorAll(".canvas-element");

    let currentBgSize = this.getPixelsAsInt(
      getComputedStyle(el).backgroundSize
    );

    //el.style.backgroundSize = this.gridBlockRatio + "px" + this.gridBlockRatio + "px";
    gsap.registerPlugin(Draggable, TweenLite, Back);
    Draggable.create("#grid-container", {
      bounds: { minX: -1000, minY: -3000, maxX: 0, maxY: 0 }
    });

    this.positionComponets(this.collectionJson);
    //el.style.backgroundSize = (this.gridBlockRatio * 2 + + this.divSize) + "px" + " " + (this.gridBlockRatio * 2 + + this.divSize) + "px";
  },
  computed: {
    divSize() {
      return this.gridBlockRatio / 2;
    },
    gridBlockRatio() {
      return this.size / this.subdivisions;
    },
    elementsInView() {
      let elements = this.screenWith / (this.gridBlockRatio * 2 + this.divSize) - 1;
      if(elements > 10) {
        elements = 10;
      }
      
      return elements;
    }
  },
  methods: {
    positionComponets(collection) {
      let posX = (this.screenWith - ((this.gridBlockRatio * 2 + this.divSize) * this.elementsInView)) / 2, posY = 0;
      let cont = collection.length;

      for(let i = 1; i <= cont; i ++) {
        this.componentsCollection.push({
            id: collection[i - 1].id,
            width: this.gridBlockRatio * 2,
            height: this.gridBlockRatio * 2,
            zIndex: (collection.length + 1) * 10,
            miniatura: collection[i - 1].miniatura,
            category1: typeof collection[i - 1].categoria_contenido !== 'undefined' ? collection[i - 1].categoria_contenido[0].tipo : collection[i - 1].category1,
            x: posX,
            y: posY
        });

        posX += this.gridBlockRatio * 2 + this.divSize;
        if(i % 10 == 0 && i > 0) {
            posY += this.gridBlockRatio * 2 + this.divSize + 15;
            posX = (this.screenWith - ((this.gridBlockRatio * 2 + this.divSize) * this.elementsInView)) / 2;
        }
      }
    },
    handleWheel(e) {
      e.preventDefault();

      let el = document.getElementById("grid-container");

      let currentBgSize = this.getPixelsAsInt(
        getComputedStyle(el).backgroundSize
      );

      if (e.deltaY < 0 && this.subdivisions <= minZoom) {
        this.subdivisions += 2;
      } else if (e.deltaY > 0 && this.subdivisions >= maxZoom) {
        this.subdivisions -= 2;
      }
      //el.style.backgroundSize = this.gridBlockRatio + "px" + " " + this.gridBlockRatio + "px";

      for (let component of this.componentsCollection) {
        let canvasChild = document.getElementById("component_" + component.id);
        canvasChild.style.height = this.gridBlockRatio * 2 + "px";
        canvasChild.style.width = this.gridBlockRatio * 2 + "px";
        this.updatePosition(canvasChild, component);
      }
    },
    handleResizeEvent() {
      this.size = bgSize;
      //this.size = 2500;
    },
    updateXY(e) {
      /* TODO: Update bounds when scrolling in / out. Module can get lost if taken to edge and then zoomed in */    let currentTarget;
      if(e.target.parentNode.classList.contains("canvas-element")) {
        currentTarget = e.target.parentNode;
      } else if (e.target.classList.contains("canvas-element")) {
        currentTarget = e.target;
      }
      let xTarget =
        currentTarget.getBoundingClientRect().left -
        document.getElementById("grid-container").getBoundingClientRect().left;
      let yTarget =
        currentTarget.getBoundingClientRect().top -
        document.getElementById("grid-container").getBoundingClientRect().top;

      let targetId = parseInt(
        currentTarget.id.substring("component".length, e.target.parentNode.id.length)
      );
      let component = this.componentsCollection[
        this.componentsCollection.map((m) => m.id).indexOf(targetId)
      ];
      
      let xPos = Math.floor(xTarget / this.divSize) * this.divSize;
      let yPos = Math.floor(yTarget / this.divSize) * this.divSize;
      if (currentTarget.classList.contains("canvas-element")) {
        component.x = xPos == 0 ? 0 : Math.round(xPos / this.divSize);
        component.y = yPos == 0 ? 0 : Math.round(yPos / this.divSize);
      }
    },
    updatePosition(target, component) {
      /*gsap.to(target, 0.5, {
        x: component.x * this.divSize,
        y: component.y * this.divSize,
        ease: Back.easeOut.config(1)
      });*/
      //console.log('this.gridBlockRatio ', this.gridBlockRatio, 'this.subdivisions ', this.subdivisions)
      target.style.top = (Math.round(component.y / 2) * this.gridBlockRatio / 20) + 'px';
      target.style.left = (Math.round(component.x / 2) * (this.gridBlockRatio / 20)) + 'px'//(Math.round(component.x / 2) * this.gridBlockRatio / 20) + 'px';//this.gridBlockRatio * 2;
    },
    getPixelsAsInt(string) {
      return parseInt(string.substring(0, string.length - 2));
    },
    showComponentInfo(evt) {
        this.currentRegistry = { ...this.collectionJson[evt.currentTarget.id.split('_')[1]] };
    },
    shuffleCollection() {
      let componentsArray = [ ...this.componentsCollection ];
      this.componentsCollection = this.componentsCollection.splice();
      componentsArray = [ ...componentsArray.sort(() => Math.random() - 0.5) ];
      this.subdivisions = 60;
      this.positionComponets(componentsArray);
    },
    zoomInGrid() {
      if (this.subdivisions >= maxZoom) {
        this.subdivisions -= 2;
      }
      
      for (let component of this.componentsCollection) {
        let canvasChild = document.getElementById("component_" + component.id);
        canvasChild.style.height = this.gridBlockRatio * 2 + "px";
        canvasChild.style.width = this.gridBlockRatio * 2 + "px";
        this.updatePosition(canvasChild, component);
      }
    },
    zoomOutGrid() {
      if (this.subdivisions <= minZoom) {
        this.subdivisions += 2;
      }

      for (let component of this.componentsCollection) {
        let canvasChild = document.getElementById("component_" + component.id);
        canvasChild.style.height = this.gridBlockRatio * 2 + "px";
        canvasChild.style.width = this.gridBlockRatio * 2 + "px";
        this.updatePosition(canvasChild, component);
      }
    }
  }
};
</script>

<style>
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app-registry-collection {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
#grid-container {
  position: relative;
  z-index: 0;
  /*background-size: 300px 300px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);*/
}
.canvas-element {
  position: absolute;
  background-color: white;
  /*border: 1px dashed black;*/
}
.canvas-element{
  display: flex;
  justify-content: center;
  align-items: center;
}
.registry-icon {
  width: 100%;
  height: 100%;
  filter: sepia(100%) hue-rotate(195deg) saturate(100%);
  transition: opacity 0.2s;
}
/*.icon-category:before {
  content: ' ';
  width: 15px;
  height: 15px;
  background: #000;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;
}*/
.icon-category {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9999;
  opacity: 1;
}
.category-visible {
  opacity: 0.5;
}
</style>
