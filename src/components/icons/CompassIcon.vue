<template>
  <div class="compass">
    <svg
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="50" cy="50" r="49" fill="white" stroke="black" />
      <text x="45" y="13" fill="black">N</text>
      <text x="89" y="55" fill="black">E</text>
      <text x="45" y="95" fill="black">S</text>
      <text x="1" y="55" fill="black">W</text>
      <path
        d="M45,50 L50,1 L55,50 z"
        stroke="red"
        fill="red"
        :transform="'rotate(' + degree + ' 50 50)'"
      />
      <path
        d="M45,50 L50,99 L55,50 z"
        stroke="black"
        fill="white"
        :transform="'rotate(' + degree + ' 50 50)'"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "CompassIcon",
  props: {
    degree: Number,
  },
};
</script>

<style lang="scss">
.compass {
  position: relative;
  display: inline-block;
  padding: 0 0 0 0;
  top: 0.5em;
  width: 2em;
  height: auto;
  & svg {
    width: 100%;
    height: 100%;
  }
}
</style>