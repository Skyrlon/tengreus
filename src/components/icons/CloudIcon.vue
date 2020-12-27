<template>
  <svg
    viewBox="0 0 100 100"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <def>
      <radialGradient id="SunGradient">
        <stop offset="0%" stop-color="yellow" />
        <stop offset="40%" stop-color="yellow" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <path
        id="cloud"
        d="M 20,70
        a 10,10 0 0,1 0,-25
        a 10,10 0 0,1 15,-5
        a 5,5 0 0,1 40,5
        a 10,10 0 0,1 0,25
        Z"
        fill="white"
        stroke="black"
        stroke-width="1"
      />
    </def>
    <moon-icon
      :moonPhase="moonPhase"
      style="transform: scale(0.5)"
      v-if="cloudiness == 'Few Clouds'"
    />
    <circle
      cx="30"
      cy="40"
      r="35"
      fill="url(#SunGradient)"
      v-if="cloudiness == 'Few Clouds'"
    />
    <use
      x="-5"
      y="5"
      href="#cloud"
      transform="scale(0.6)"
      v-if="cloudiness == 'Overcast Clouds'"
    />
    <use x="0" y="0" href="#cloud" />
    <use
      x="40"
      y="45"
      href="#cloud"
      transform="scale(0.7)"
      v-if="cloudiness == 'Broken Clouds' || cloudiness == 'Overcast Clouds'"
    />
  </svg>
</template>

<script>
import MoonIcon from "./MoonIcon.vue";
export default {
  name: "CloudIcon",
  components: {
    MoonIcon,
  },
  props: {
    cloudiness: String,
    moonPhase: String,
  },
};
</script>

<style>
</style>