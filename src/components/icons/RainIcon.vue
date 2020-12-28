<template>
  <svg viewBox="0 0 100 100">
    <def>
      <path
        id="rain"
        d="M30, 51 v 49"
        stroke="lightblue"
        stroke-width="3"
        stroke-dasharray="5"
        transform="skewX(-10)"
      />
      <g id="snowflake">
        <rect width="2" height="10" rx="1" fill="white" />
        <rect
          class="rotate"
          width="2"
          height="10"
          rx="1"
          fill="white"
          style="transform-origin: 1px 5px; transform: rotate(60deg)"
        />
        <rect
          width="2"
          height="10"
          rx="1"
          fill="white"
          style="transform-origin: 1px 5px; transform: rotate(120deg)"
        />
      </g>
    </def>
    <path
      d="M 20,50 a 10,10 0 0,1 0,-25 a 10,10 0 0,1 15,-5 a 5,5 0 0,1 40,5 a 10,10 0 0,1 0,25 Z"
      fill="lightgrey"
      stroke="black"
      stroke-width="1"
    />
    <use href="#rain" x="0" />
    <use href="#rain" x="10" v-if="isSnowing == false" />
    <use href="#rain" x="20" />
    <use href="#rain" x="30" />
    <use href="#rain" x="40" v-if="isSnowing == false" />
    <use href="#rain" x="50" />
    <use x="28" y="55" href="#snowflake" v-if="isSnowing == true" />
    <use x="25" y="70" href="#snowflake" v-if="isSnowing == true" />
    <use x="23" y="85" href="#snowflake" v-if="isSnowing == true" />
    <use x="59" y="55" href="#snowflake" v-if="isSnowing == true" />
    <use x="57" y="70" href="#snowflake" v-if="isSnowing == true" />
    <use x="54" y="85" href="#snowflake" v-if="isSnowing == true" />
  </svg>
</template>

<script>
export default {
  name: "RainIcon",
  props: {
    isSnowing: Boolean,
  },
};
</script>

<style>
</style>