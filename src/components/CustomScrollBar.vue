<template>
  <div id="scrollbar">
    <div
      id="scroller"
      @mousedown="mouseDown($event)"
      @mouseup="mouseUp"
      @mousemove="mouseMove($event)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CustomScrollBar",
  data() {
    return {
      isDown: false,
      offset: 0,
      mousePosition: 0,
    };
  },
  methods: {
    mouseDown(e) {
      this.isDown = true;
      this.offset = e.target.offsetTop - e.clientY;
    },

    mouseUp() {
      this.isDown = false;
    },

    mouseMove(e) {
      e.preventDefault();
      if (this.isDown) {
        this.mousePosition = e.clientY;
        e.target.style.top = this.mousePosition + this.offset + "px";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#scrollbar {
  position: absolute;
  top: 0.75em;
  right: 10px;
  width: 3px;
  height: 20.5em;
  background: black;
}
#scroller {
  position: absolute;
  left: ((3 - 10)/2)+ 0px;
  width: 10px;
  height: 1em;
  background: green;
  border-radius: 5px;
}
</style>