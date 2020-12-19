<template>
  <div class="compass">
    <svg
      version="1.1"
      viewport="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <text x="45" y="15" fill="black">N</text>
      <text x="90" y="55" fill="black">E</text>
      <text x="45" y="95" fill="black">S</text>
      <text x="0" y="55" fill="black">W</text>
      <circle cx="50" cy="50" r="50" fill="transparent" stroke="black" />
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
  position: absolute;
  width: 10%;
  height: 10%;
  & svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>