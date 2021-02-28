<template>
  <div class="error-page">
    <div class="sad-smiley">
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect x="35" y="20" width="5" height="20" />
        <rect x="60" y="20" width="5" height="20" />
        <path
          d="M20,80 A10,7.5 0 0,1 80,80"
          fill="transparent"
          stroke="black"
          stroke-width="4"
        />
      </svg>
    </div>
    An error has occurred
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style>
.error-page {
  display: flex;
  margin: 0 auto;
  width: 40%;
  margin-top: 10%;
}

.sad-smiley {
  width: 20%;
}
</style>