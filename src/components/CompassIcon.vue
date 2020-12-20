<template>
  <div class="compass">
    <svg
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="50" cy="50" r="50" fill="white" stroke="black" />
      <text x="45" y="15" fill="black">N</text>
      <text x="90" y="55" fill="black">E</text>
      <text x="45" y="95" fill="black">S</text>
      <text x="0" y="55" fill="black">W</text>
      <path d="M45,50 L50,0 L55,50 z" stroke="red" fill="red" />
      <path d="M45,50 L50,100 L55,50 z" stroke="black" fill="white" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "CompassIcon",
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