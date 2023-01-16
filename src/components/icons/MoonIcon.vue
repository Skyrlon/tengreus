<template>
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <!--new moon-->
    <circle
      cx="50"
      cy="50"
      r="49"
      fill="black"
      v-if="moonPhase == 'new_moon'"
    />
    <!--full moon-->
    <circle
      cx="50"
      cy="50"
      r="49"
      fill="lightgrey"
      v-if="moonPhase == 'full_moon'"
    />
    <!--waxing crescent-->
    <path
      d="M50,1 A49,49 0 0,1 50,99 A25,50 0 0,0 50,1"
      fill="lightgrey"
      v-if="moonPhase == 'waxing_crescent'"
    />
    <!--first quarter-->
    <path
      d="M50,1 A49,49 0 0,1 50,99"
      fill="lightgrey"
      v-if="moonPhase == 'first_quarter'"
    />
    <!--waxing gibbous-->
    <path
      d="M50,1 A49,49 0 0,1 50,99 A30,50 0 0,1 50,1"
      fill="lightgrey"
      v-if="moonPhase == 'waxing_gibbous'"
    />
    <!--waning gibbous-->
    <path
      d="M50,1 A49,49 0 0,0 50,99 A30,50 0 0,0 50,1"
      fill="lightgrey"
      v-if="moonPhase == 'waning_gibbous'"
    />
    <!--last quarter-->
    <path
      d="M50,1 A49,49 0 0,0 50,99"
      fill="lightgrey"
      v-if="moonPhase == 'last_quarter'"
    />
    <!--waning crescent-->
    <path
      d="M50,1 A49,49 0 0,0 50,99 A25,50 0 0,1 50,1"
      fill="lightgrey"
      v-if="moonPhase == 'waning_crescent'"
    />
    <!-- crater top left-->
    <circle
      cx="26"
      cy="25"
      r="5"
      fill="darkgrey"
      transform="skewY(-20) skewX(-20)"
      v-if="
        moonPhase == 'last_quarter' ||
        moonPhase == 'waning_gibbous' ||
        moonPhase == 'full_moon'
      "
    />
    <!-- crater top right-->
    <circle
      cx="60"
      cy="30"
      r="7"
      fill="darkgrey"
      transform="skewY(-10) skewX(20)"
      v-if="
        moonPhase == 'first_quarter' ||
        moonPhase == 'waxing_gibbous' ||
        moonPhase == 'full_moon'
      "
    />
    <!-- crater bottom left-->
    <circle
      cx="0"
      cy="80"
      r="9"
      fill="darkgrey"
      transform="skewX(20)"
      v-if="
        moonPhase == 'last_quarter' ||
        moonPhase == 'waning_gibbous' ||
        moonPhase == 'full_moon'
      "
    />
    <!-- crater middle right-->
    <circle
      cx="70"
      cy="70"
      r="5"
      fill="darkgrey"
      transform="skewY(-10)"
      v-if="
        moonPhase == 'first_quarter' ||
        moonPhase == 'waxing_gibbous' ||
        moonPhase == 'full_moon'
      "
    />
    <!-- crater middle left-->
    <circle
      cx="20"
      cy="50"
      r="5"
      fill="darkgrey"
      transform="skewY(-5)"
      v-if="
        moonPhase == 'last_quarter' ||
        moonPhase == 'waning_gibbous' ||
        moonPhase == 'full_moon'
      "
    />
  </svg>
</template>

<script>
export default {
  name: "MoonIcon",
  props: {
    moonPhase: String,
  },
};
</script>

<style lang="scss">
</style>