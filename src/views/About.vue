<template>
  <div class="about">
    <h1>{{ $t("about") }} {{ $t("of") }} Tengreus</h1>
    <div class="sources">
      <div class="images">
        <h2>{{ $t("images_sources") }}</h2>
        <p :key="source.name" v-for="source in imagesSources">
          <a :href="source.link" target="_blank">{{ $t(source.name) }}</a>
        </p>
      </div>
      <div class="api">
        <h2>{{ $t("api_used") }}</h2>
        <p :key="info.name" v-for="info in ApiInfos">
          <a :href="info.link" target="_blank">{{ info.name }}</a>
        </p>
      </div>
      <div class="github">
        <h2>{{ $t("github_repository") }}</h2>
        <p>
          <a :href="githubInfos.link" target="_blank">{{ githubInfos.name }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesSources: [
        {
          name: "fog",
          link:
            "https://pixabay.com/fr/photos/brouillard-chemin-randonn%C3%A9e-p%C3%A9destre-1209205/",
        },
        {
          name: "thunderstorm",
          link:
            "https://pixabay.com/fr/photos/tonnerre-%C3%A9clairage-la-foudre-nuage-1368797/",
        },
        {
          name: "rain",
          link:
            "https://pixabay.com/fr/photos/gouttes-de-pluie-nuage-fen%C3%AAtre-3216607/",
        },
        {
          name: "snow",
          link: "https://www.pexels.com/photo/photo-of-snowy-field-3462588/",
        },
        {
          name: "sandstorm",
          link:
            "https://pixabay.com/fr/photos/temp%C3%AAte-de-sable-d%C3%A9sert-sable-vent-3642893/",
        },
        {
          name: "wind",
          link: "https://unsplash.com/photos/OsYYPaPgIjw",
        },
        {
          name: "clouds",
          link:
            "https://pixabay.com/fr/photos/nuages-cumulus-ciel-nature-2329680/",
        },
        {
          name: "night",
          link:
            "https://pixabay.com/fr/photos/lac-l-eau-les-eaux-ciel-star-4541454/",
        },
        {
          name: "sun",
          link:
            "https://pixabay.com/fr/photos/sun-%C3%A9t%C3%A9-bleu-ciel-3588618/",
        },
        {
          name: "tornado",
          link:
            "https://pixabay.com/fr/photos/tornade-cisaillement-du-vent-oc%C3%A9an-3189351/",
        },
      ],

      ApiInfos: [
        {
          name: "Open Weather Map",
          link: "https://openweathermap.org/api",
        },
        {
          name: "Geonames",
          link: "http://www.geonames.org/export/web-services.html",
        },
      ],

      githubInfos: {
        name: "GitHub",
        link: "https://github.com/Skyrlon/tengreus",
      },
    };
  },
};
</script>

<style lang="scss">
.about {
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    height: 10%;
  }
  & h2 {
    text-transform: none;
    font-size: 1.2em;
  }
  & .sources {
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media (orientation: landscape) {
      align-items: center;
      flex-wrap: wrap;
    }
    @media (orientation: portrait) {
      flex-wrap: nowrap;
    }
    & div {
      display: flex;
      flex-direction: column;
      text-align: left;
      text-transform: capitalize;
    }
  }
}
</style>