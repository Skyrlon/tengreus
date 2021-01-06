const Converters = {
    install(Vue) {
        Vue.mixin({
            methods: {
                convertTemperature(value) {
                    if (this.$store.state.tempUnit === "°C") {
                        return value;
                    } else if (this.$store.state.tempUnit === "°F") {
                        return (value * 1.8) + 32;
                    } else if (this.$store.state.tempUnit === "K") {
                        return value - 273.15;
                    }
                }
            }
        });
    }
};

export default Converters;