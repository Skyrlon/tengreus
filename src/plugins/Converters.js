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
                },

                convertTime(time) {
                    let dt = new Date((time + this.$store.state.timeShift) * 1000);
                    let hour = dt.getUTCHours();
                    let minutes = (dt.getUTCMinutes() < 10 ? '0' : '') + dt.getUTCMinutes();
                    return `${hour}:${minutes}`;
                },

                getWindDirection(degree) {
                    let direction;
                    if (degree <= 22 || degree >= 338) {
                        direction = "From North"
                    } else if (degree >= 23 && degree <= 67) {
                        direction = "From North East"
                    } else if (degree >= 68 && degree <= 112) {
                        direction = "From East"
                    } else if (degree >= 113 && degree <= 157) {
                        direction = "From South East"
                    } else if (degree >= 158 && degree <= 202) {
                        direction = "From South"
                    } else if (degree >= 203 && degree <= 247) {
                        direction = "From South West"
                    } else if (degree >= 248 && degree <= 292) {
                        direction = "From West"
                    } else if (degree >= 293 && degree <= 337) {
                        direction = "From North West"
                    }
                    return direction;
                }
            }
        });
    }
};

export default Converters;