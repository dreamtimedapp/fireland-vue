<template>
  <div class="pixi-renderer">
    <canvas ref="renderCanvas"></canvas>
    <!-- All child <template> elements get added in here -->
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';
import * as PIXI from 'pixi.js';

export default {
  // Inject the EventBus and PIXIWrapper objects from the ancestor renderer component.
  inject: ['EventBus', 'PIXIWrapper'],
  // Take properties for the x and y position. (Basic, no validation)
  props: ['x', 'y'],

  data() {
    return {
      // Keep a reference to the container so children can be added to it.
      container: null
    }
  },

  // At the current time, Vue does not allow empty components to be created without a DOM element if they have children.
  // To work around this, we create a tiny render function that renders to <template><!-- children --></template>.
  render: function(h) {
    return h('template', this.$slots.default)
  },

  created() {
    // Create a new PIXI container and set some default values on it.
    this.container = new this.PIXIWrapper.PIXI.Container();

    // You should probably use computed properties to set the position instead.
    this.container.x = this.x || 0;
    this.container.y = this.y || 0;

    // Allow the container to be interacted with.
    this.container.interactive = true;

    // Forward PIXI's pointerdown event through Vue.
    this.container.on('pointerdown', () => this.$emit('pointerdown', this.container));

    // Once the PIXI app in the renderer component is ready, add this container to its parent.
    this.EventBus.$on('ready', () => {
      if (this.$parent.container) {
        // If the parent is another container, add to it.
        this.$parent.container.addChild(this.container)
      } else {
        // Otherwise it's a direct descendant of the renderer stage.
        this.PIXIWrapper.PIXIApp.stage.addChild(this.container)
      }

      // Emit a Vue event on every tick with the container and tick delta for an easy way to do frame-by-frame animation.
      // (Not performant)
      this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.container, delta))
    })
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>