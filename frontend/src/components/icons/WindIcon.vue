<template>
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path
      class="wind"
      d="M 2,45 L 45,45 C65,45 64,25 52,25 C47,24 42,30 44,35"
    />
    <path
      class="wind"
      d="M 20,55 L 75,55 C90,53 90,35 80,32 C70,28 60,42 70,48 C80,50 80,40 78,41"
    />
    <path
      class="wind"
      d="M 12,65 L 65,65 C85,68 75,87 65,83 C60,81 60,78 61,76"
    />
  </svg>
</template>

<script>
export default {
  name: "WindIcon",
};
</script>

<style>
.wind {
  stroke: black;
  stroke-width: 4;
  fill: transparent;
  stroke-linecap: round;
}
</style>