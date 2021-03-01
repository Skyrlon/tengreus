<template>
  <svg
    version="1.1"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M40,1 V75 H25 L50,99 L75,75 H60 V1 z"
      stroke="transparent"
      fill="black"
      :transform="`rotate(${degree} 50 50)`"
    />
  </svg>
</template>

<script>
export default {
  name: "CompassIcon",
  props: {
    degree: Number,
  },
};
</script>

<style>
</style>