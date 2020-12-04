<template>
<div class="weather-card">
    <weather-banner/>
</div>
    
</template>

<script>
import WeatherBanner from '@/components/WeatherBanner.vue'

export default {
    name: 'WeatherCard',
    components: {
        WeatherBanner,
    }
}
</script>

<style lang="scss" scoped>
.weather-card {
    margin: 0 auto;
    width: 100%;
    height: 100%;
}
</style>