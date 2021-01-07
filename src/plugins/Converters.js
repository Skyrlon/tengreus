const Converters = {
    install(Vue) {
        Vue.mixin({
            methods: {
                convertTemperature(value) {
                    let temperature;
                    switch (this.$store.state.tempUnit) {
                        case "°C":
                            temperature = value;
                            break;
                        case "°F":
                            temperature = (value * 1.8) + 32;
                            break;
                        case "K":
                            temperature = value + 273.15;
                            break;
                    }
                    return temperature;
                },

                convertPressure(value) {
                    let pressure;
                    switch (this.$store.state.pressureUnit) {
                        case "atm":
                            pressure = value / 1013.25;
                            break;
                        case "bar":
                            pressure = value / 1000;
                            break;
                        case "hPa":
                            pressure = value;
                            break;
                        case "Pa":
                            pressure = value * 100;
                            break;
                        case "psi":
                            pressure = value / 68.946;
                            break;
                        case "Torr":
                            pressure = value / 1.33322;
                            break;
                    }
                    return Math.round(pressure * 1000) / 1000
                },

                convertLength(value) {
                    let length;
                    switch (this.$store.state.lengthUnit) {
                        case "m":
                            length = value;
                            break;
                        case "mi":
                            length = value / 1609.344;
                            break;
                    }
                    return Math.round(length * 1000) / 1000
                },

                convertSpeed(value) {
                    let speed;
                    switch (this.$store.state.speedUnit) {
                        case "km/h":
                            speed = value * 3.6;
                            break;
                        case "mi/h":
                            speed = value * 2.237;
                            break;
                    }
                    return Math.round(speed * 100) / 100
                }
            }
        });
    }
};

export default Converters;