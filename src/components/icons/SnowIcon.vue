<template>
  <svg viewBox="0 0 100 100">
    <defs>
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
    </defs>
    <path
      d="M 20,50 
               a 10,10 0 0,1 0,-25
               a 10,10 0 0,1 15,-5
               a 5,5 0 0,1 40,5
               a 10,10 0 0,1 0,25
               Z"
      fill="white"
      stroke="black"
      stroke-width="1"
    />
    <use x="20" y="55" href="#snowflake" />
    <use x="30" y="75" href="#snowflake" />
    <use x="40" y="60" href="#snowflake" />
    <use x="50" y="80" href="#snowflake" />
    <use x="60" y="55" href="#snowflake" />
    <use x="70" y="70" href="#snowflake" />
  </svg>
</template>

<script>
export default {
    name: 'SnowIcon',
};
</script>

<style>
</style>