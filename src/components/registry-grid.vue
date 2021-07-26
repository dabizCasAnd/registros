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
            v-for="component in components"
            :key="component.id"
            class="canvas-element"
            @click="showComponentInfo"
            :id="'component' + component.id"
            :style="{
            height: component.height + 'px',
            width: component.width + 'px',
            zIndex: component.zIndex,
            left: component.x + 'px',
            top: component.y + 'px'
            }"
        >
            <div style="color: black;">
              <img class="registry-icon" :src="require('@/assets/video.svg')" alt="" title="">
                <!-- <svg height="100%" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg"><g><path d="m476 56h-440a28.031 28.031 0 0 0 -28 28v344a28.031 28.031 0 0 0 28 28h440a28.031 28.031 0 0 0 28-28v-344a28.031 28.031 0 0 0 -28-28zm12 372a12.01 12.01 0 0 1 -12 12h-440a12.01 12.01 0 0 1 -12-12v-308h464zm0-324h-464v-20a12.01 12.01 0 0 1 12-12h440a12.01 12.01 0 0 1 12 12z"/><path d="m40 96h8a8 8 0 0 0 0-16h-8a8 8 0 0 0 0 16z"/><path d="m72 96h8a8 8 0 0 0 0-16h-8a8 8 0 0 0 0 16z"/><path d="m104 96h8a8 8 0 0 0 0-16h-8a8 8 0 0 0 0 16z"/><path d="m336 176h-160a48.054 48.054 0 0 0 -48 48v112a48.054 48.054 0 0 0 48 48h160a48.054 48.054 0 0 0 48-48v-112a48.054 48.054 0 0 0 -48-48zm32 160a32.036 32.036 0 0 1 -32 32h-160a32.036 32.036 0 0 1 -32-32v-112a32.036 32.036 0 0 1 32-32h160a32.036 32.036 0 0 1 32 32z"/><path d="m315.578 272.845-112-56a8 8 0 0 0 -11.578 7.155v112a8 8 0 0 0 11.578 7.155l112-56a8 8 0 0 0 0-14.31zm-107.578 50.211v-86.112l86.111 43.056z"/></g></svg> -->
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { gsap, TweenLite, Back } from "gsap";
import { Draggable } from "gsap/Draggable";
import fileViewer from './file-viewer.vue';

const bgSize = 2500;
const subdivisions = 50;
const minZoom = 90;
const maxZoom = 35;

export default {
  name: "app-registry-collection",
  props: {
      collectionJson: {
        type: Array,
        required: true
      }
  },
  components: {
    fileViewer
  },
  data: () => {
    return {
      size: 0,
      subdivisions: 0,
      currentTarget: null,
      draggablesArray: [],
      components: [],
      currentRegistry: {}
    };
  },
  mounted() {
      console.log(this.collectionJson)
    window.onresize = this.handleResizeEvent;
    this.size = bgSize;
    this.subdivisions = subdivisions;
    let el = document.getElementById("grid-container");
    let allElements = document.querySelectorAll(".canvas-element");

    let currentBgSize = this.getPixelsAsInt(
      getComputedStyle(el).backgroundSize
    );

    el.style.backgroundSize = this.gridBlockRatio + "px" + this.gridBlockRatio + "px";
    gsap.registerPlugin(Draggable, TweenLite, Back);
    Draggable.create("#grid-container", {
      bounds: { minX: -2000, minY: -2000, maxX: 0, maxY: 0 }
    });

    let posX = 1280 / 10, posY = 0;
    for(let i = 1; i <= 45; i ++) {
        this.components.push({
            id: this.components.length,
            width: this.gridBlockRatio * 2,
            height: this.gridBlockRatio * 2,
            zIndex: (this.components.length + 1) * 10,
            img: this.collectionJson[0].miniatura,
            x: posX,
            y: posY
        });

        posX += this.gridBlockRatio * 2 + this.divSize; //posX + this.gridBlockRatio * 2 + this.divSize / 4;
        if(i % 10 == 0 && i > 0) {
            posY += this.gridBlockRatio * 2 + this.divSize;
            posX = 1280 / 10;
        }
    }

    el.style.backgroundSize = this.gridBlockRatio + "px" + " " + this.gridBlockRatio + "px";
  },
  computed: {
    divSize() {
      return this.gridBlockRatio / 2;
    },
    gridBlockRatio() {
      return this.size / this.subdivisions;
    }
  },
  methods: {
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
      el.style.backgroundSize = this.gridBlockRatio + "px" + " " + this.gridBlockRatio + "px";

      for (let component of this.components) {
        let canvasChild = document.getElementById("component" + component.id);
        canvasChild.style.height = this.gridBlockRatio * 2 + "px";
        canvasChild.style.width = this.gridBlockRatio * 2 + "px";
        this.updatePosition(canvasChild, component);
      }
    },
    handleResizeEvent() {
      this.size = bgSize;
      //this.size = 2500;
    },
    updateDraggableList() {
      let elements = document.querySelectorAll(".canvas-element");
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (Draggable.get(element)) continue;
        let dragEl = Draggable.create(element, {
          allowEventDefault: false,
          type: "x,y",
          bounds: "#grid-container",
          onPress: function (e) {
            e.stopPropagation();
          },
          liveSnap: true,
          autoScroll: 3,
          snap: {
            x: (endValue) => {
              return Math.round(endValue / this.divSize) * this.divSize;
            },
            y: (endValue) => {
              return Math.round(endValue / this.divSize) * this.divSize;
            }
          },
          onDragEnd: this.updateXY
        });
        this.draggablesArray.push(dragEl);
      }
    },
    updateXY(e) {
        console.log('pasa por aqui')
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
      let component = this.components[
        this.components.map((m) => m.id).indexOf(targetId)
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
      target.style.top = (Math.round(component.y / 2) * this.gridBlockRatio / 20) + 'px';
      target.style.left = (Math.round(component.x / 2) * this.gridBlockRatio / 20) + 'px';//this.gridBlockRatio * 2;
    },
    getPixelsAsInt(string) {
      return parseInt(string.substring(0, string.length - 2));
    },
    showComponentInfo(evt) {
        console.log(evt.currentTarget.id)
        this.currentRegistry = { ...this.collectionJson[0] };
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
#grid-container {
  position: relative;
  z-index: 0;
  background-size: 80px 80px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
}
.canvas-element {
  position: absolute;
  background-color: white;
  border: 2px solid black;
}
.registry-icon {
  width: 100%;
  height: 100%;
}
</style>
