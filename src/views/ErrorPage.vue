<template>
  <div class="error-page">
    <div class="back-icon" @click="goBackToHome()">
      <arrow-icon :degree="90" />
    </div>
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
import ArrowIcon from "../components/icons/ArrowIcon.vue";

export default {
  components: { ArrowIcon },
  name: "ErrorPage",
  computed: {
    ...mapState(["errorText", "currentView"]),
  },
  methods: {
    goBackToHome() {
      this.$store.commit("SWITCH_PAGE", { page: "Home" });
    },
  },
};
</script>

<style lang="scss">
.error-page {
  display: flex;
  margin: 0 auto;
  width: 40%;
  margin-top: 10%;
  & .back-icon {
    position: absolute;
    top: 1em;
    left: 1em;
    width: 3em;
  }
}

.sad-smiley {
  width: 20%;
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