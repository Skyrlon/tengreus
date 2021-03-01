<template>
  <div class="error-page">
    <div class="sad-smiley">
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M35,20 v20 M60,20 v20 M20,80 A10,8 0 0,1 75,80"
          fill="transparent"
          stroke-width="5"
        />
      </svg>
    </div>
    An error has occurred : {{ errorText }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ErrorPage",
  computed: {
    ...mapState(["errorText"]),
  },
};
</script>

<style lang="scss">
.error-page {
  display: flex;
  margin: 0 auto;
  width: 40%;
  margin-top: 10%;
}

.sad-smiley {
  width: 20%;
  & svg {
    & path {
      stroke: var(--base-font-color);
    }
  }
}

#app.dark {
  .error-page {
    & path {
      stroke: var(--darktheme-font-color);
    }
  }
}
</style>