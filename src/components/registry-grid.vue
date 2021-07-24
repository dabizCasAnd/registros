<template>
  <div id="app" :style="{ minWidth: size + 'px', minHeight: size + 'px' }">
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
          left: component.x + 'px'
        }"
      >
        <div style="color: black; margin-top: 20px;">
          {{ component.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap, TweenLite, Back } from "gsap";
import { Draggable } from "gsap/Draggable";

const bgSize = 1280;
const subdivisions = 50;
const minZoom = 50;
const maxZoom = 10;

export default {
  name: "App",
  data: () => {
    return {
      size: 0,
      subdivisions: 0,
      currentTarget: null,
      draggablesArray: [],
      components: []
    };
  },

  mounted() {
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
      bounds: { minX: -1000, minY: -1000, maxX: 0, maxY: 0 }
    });

    let posX = 0, posY = 0;
    for(let i = 0; i < 15; i ++) {
        this.components.push({
            id: this.components.length,
            width: this.gridBlockRatio * 2,
            height: this.gridBlockRatio * 2,
            zIndex: (this.components.length + 1) * 10,
            x: posX,
            y: posY
        });

        posX += this.gridBlockRatio * 2 + this.divSize; //posX + this.gridBlockRatio * 2 + this.divSize / 4;
        posY += this.gridBlockRatio * 2;
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
    /*addComponent() {
      let el = document.getElementById("grid-container");
      let currentBgSize = this.getPixelsAsInt(
        getComputedStyle(el).backgroundSize
      );
      this.components.push({
        id: this.components.length,
        width: this.gridBlockRatio * 2,
        height: this.gridBlockRatio * 2,
        zIndex: (this.components.length + 1) * 10,
        x: 0,
        y: 0
      });
      setTimeout(() => {
        this.updateDraggableList();
      }, 1000);
    },*/
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
      target.style.top = component.y * this.divSize;
      target.style.left = (Math.round(component.x / 2) * this.gridBlockRatio / 10) + 'px';//this.gridBlockRatio * 2;
    },
    getPixelsAsInt(string) {
      return parseInt(string.substring(0, string.length - 2));
    },
    showComponentInfo(evt) {
        console.log(evt.currentTarget.id)
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
</style>
