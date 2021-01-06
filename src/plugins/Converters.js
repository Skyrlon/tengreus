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
                },
                convertPressure(value) {
                    if (this.$store.state.pressureUnit === "atm") {
                        return value / 1013;
                    } else if (this.$store.state.pressureUnit === "bar") {
                        return value / 1000;
                    } else if (this.$store.state.pressureUnit === "hPa") {
                        return value;
                    } else if (this.$store.state.pressureUnit === "Pa") {
                        return value * 100;
                    } else if (this.$store.state.pressureUnit === "psi") {
                        return value / 68.948;
                    } else if (this.$store.state.pressureUnit === "Torr") {
                        return value / 1.333;
                    }
                }
            }
        });
    }
};

export default Converters;