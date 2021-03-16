<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <g id="loading-icon">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="grey"
          stroke-width="10"
        />
        <path
          d="M50,50 V5 Q92.5,7.5 95,50 L50,50"
          fill="black"
          stroke="transparent"
        />
      </g>
    </defs>
    <mask id="maskInnerCircle">
      <rect x="0" y="0" width="100" height="100" fill="white" />
      <circle cx="50" cy="50" r="35" fill="black" />
    </mask>

    <use x="0" y="0" href="#loading-icon" mask="url(#maskInnerCircle)">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 50 50"
        to="360 50 50"
        dur="1s"
        repeatCount="indefinite"
      />
    </use>
  </svg>
</template>

<script>
export default {
  name: "LoadingIcon",
};
</script>