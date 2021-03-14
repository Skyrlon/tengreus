<template>
  <div class="error-page">
    <div class="error-page_content">
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
      <div class="error-page_content-text">
        <div class="error-page_content-text1">{{ $t("error_occurred") }} :</div>
        <div class="error-page_content-text2">{{ errorText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ErrorPage",
  computed: {
    ...mapState(["errorText", "currentView"]),
  },
};
</script>

<style lang="scss">
.error-page {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 99%;
  height: 99%;
  &_content {
    display: flex;
    @media (orientation: landscape) {
      flex-direction: row;
    }
    @media (orientation: portrait) {
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    &-text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 18em;
      &2 {
        margin-top: 1em;
      }
      @media (orientation: landscape) {
        text-align: left;
      }
      @media (orientation: portrait) {
        text-align: center;
      }
    }
  }
}

.sad-smiley {
  width: 7.5em;
  & path {
    stroke: var(--base-font-color);
  }
}

#app.dark {
  & .error-page {
    & .sad-smiley {
      & path {
        stroke: var(--darktheme-font-color);
      }
    }
  }
}
</style>