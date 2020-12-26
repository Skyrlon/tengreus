<template>
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!--new moon-->
  <circle cx="50" cy="50" r="49" fill="black" />
    <!--full moon-->
    <circle cx="50" cy="50" r="49" fill="lightgrey" />
    <!--waxing crescent-->
    <path d="M50,1 A49,49 0 0,1 50,99 A25,50 0 0,0 50,1" fill="lightgrey" />
    <!--first quarter-->
    <path d="M50,1 A49,49 0 0,1 50,99" fill="lightgrey" />
    <!--waxing gibbous-->
    <path d="M50,1 A49,49 0 0,1 50,99 A30,50 0 0,1 50,1" fill="lightgrey" />
    <!--waning gibbous-->
    <path d="M50,1 A49,49 0 0,0 50,99 A30,50 0 0,0 50,1" fill="lightgrey" />
    <!--last quarter-->
    <path d="M50,1 A49,49 0 0,0 50,99" fill="lightgrey" />
    <!--waning crescent-->
    <path d="M50,1 A49,49 0 0,0 50,99 A25,50 0 0,1 50,1" fill="lightgrey" />
    <!-- crater top left-->
    <circle
      cx="26"
      cy="25"
      r="5"
      fill="darkgrey"
      transform="skewY(-20) skewX(-20)"
    />
    <!-- crater top right-->
    <circle
      cx="60"
      cy="30"
      r="7"
      fill="darkgrey"
      transform="skewY(-10) skewX(20)"
    />
    <!-- crater bottom left-->
    <circle cx="0" cy="80" r="9" fill="darkgrey" transform="skewX(20)" />
    <!-- crater middle right-->
    <circle cx="70" cy="70" r="5" fill="darkgrey" transform="skewY(-10)" />
    <!-- crater middle left-->
    <circle cx="20" cy="50" r="5" fill="darkgrey" transform="skewY(-5)" />
  </svg>
</template>

<script>
export default {
  name: "MoonIcon",
};
</script>

<style>
</style>