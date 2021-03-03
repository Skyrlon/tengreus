<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="sources">
      <div class="images">
        <p>Images sources</p>
        <p :key="info.name" v-for="info in imagesInfos">
          {{ info.name }}
          <a :href="info.link">Link</a>
        </p>
      </div>
      <div class="api">
        <p>API used</p>
        <p :key="info.name" v-for="info in ApiInfos">
          {{ info.name }}
          <a :href="info.link">Link</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    imagesInfos() {
      return [
        this.fogInfos,
        this.thunderstormInfos,
        this.rainInfos,
        this.snowInfos,
        this.sandstormInfos,
        this.windInfos,
        this.cloudsInfos,
        this.nightInfos,
        this.sunInfos,
        this.tornadoInfos,
      ];
    },

    ApiInfos() {
      return [
        this.currentWeatherInfos,
        this.forecastWeatherInfos,
        this.citiesDataInfos,
      ];
    },
  },

  data() {
    return {
      fogInfos: {
        name: "fog",
        link:
          "https://pixabay.com/fr/photos/brouillard-chemin-randonn%C3%A9e-p%C3%A9destre-1209205/",
      },

      thunderstormInfos: {
        name: "thunderstorm",
        link:
          "https://pixabay.com/fr/photos/tonnerre-%C3%A9clairage-la-foudre-nuage-1368797/",
      },

      rainInfos: {
        name: "rain",
        link:
          "https://pixabay.com/fr/photos/gouttes-de-pluie-nuage-fen%C3%AAtre-3216607/",
      },

      snowInfos: {
        name: "snow",
        link: "https://www.pexels.com/photo/photo-of-snowy-field-3462588/",
      },

      sandstormInfos: {
        name: "sandstorm",
        link:
          "https://pixabay.com/fr/photos/temp%C3%AAte-de-sable-d%C3%A9sert-sable-vent-3642893/",
      },

      windInfos: {
        name: "wind",
        link: "https://unsplash.com/photos/OsYYPaPgIjw",
      },

      cloudsInfos: {
        name: "clouds",
        link:
          "https://pixabay.com/fr/photos/nuages-cumulus-ciel-nature-2329680/",
      },

      nightInfos: {
        name: "night",
        link:
          "https://pixabay.com/fr/photos/lac-l-eau-les-eaux-ciel-star-4541454/",
      },

      sunInfos: {
        name: "sun",
        link:
          "https://pixabay.com/fr/photos/sun-%C3%A9t%C3%A9-bleu-ciel-3588618/",
      },

      tornadoInfos: {
        name: "tornado",
        link:
          "https://pixabay.com/fr/photos/tornade-cisaillement-du-vent-oc%C3%A9an-3189351/",
      },

      currentWeatherInfos: {
        name: "current weather data",
        link: "https://openweathermap.org/current",
      },

      forecastWeatherInfos: {
        name: "forecast weather data",
        link: "https://openweathermap.org/api/one-call-api",
      },

      citiesDataInfos: {
        name: "cities data",
        link: "http://www.geonames.org/export/web-services.html",
      },
    };
  },
};
</script>

<style lang="scss">
.about {
  & .sources {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & div {
      display: flex;
      flex-direction: column;
      text-align: left;
      text-transform: capitalize;
    }
  }
}
</style>