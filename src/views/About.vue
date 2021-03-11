<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="sources">
      <div class="images">
        <p>Images sources</p>
        <p :key="info.name" v-for="info in imagesInfos">
          <a :href="info.link">{{ info.name }}</a>
        </p>
      </div>
      <div class="api">
        <p>API used</p>
        <p :key="info.name" v-for="info in ApiInfos">
          <a :href="info.link">{{ info.name }}</a>
        </p>
      </div>
      <div class="github">
        <p>GitHub Repository</p>
        <p>
          <a :href="githubInfos.link">{{ githubInfos.name }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesInfos: [
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
          name: "current weather data",
          link: "https://openweathermap.org/current",
        },
        {
          name: "forecast weather data",
          link: "https://openweathermap.org/api/one-call-api",
        },
        {
          name: "cities data",
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
  & .sources {
    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    & div {
      display: flex;
      flex-direction: column;
      text-align: left;
      text-transform: capitalize;
    }
  }
}
</style>