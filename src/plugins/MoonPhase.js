const MoonPhase = {
    install(Vue) {
        Vue.mixin({
            methods: {
                getMoonPhase(value) {
                    let time = new Date(value * 1000);
                    var year = time.getUTCFullYear(),
                        month = time.getUTCMonth(),
                        day = time.getUTCDate();
                    if (month < 3) {
                        year--;
                        month += 12;
                    }
                    ++month;
                    let jd = 365.25 * year + 30.6 * month + day - 694039.09; // jd is total days elapsed
                    jd /= 29.53; // divide by the moon cycle (29.53 days)
                    let phase = parseInt(jd, 10); // int(jd) -> phase, take integer part of jd
                    jd -= phase; // subtract integer part to leave fractional part of original jd
                    phase = Math.ceil(jd * 8); // scale fraction from 0-8 and round by adding 0.5
                    phase = phase & 7; // 0 and 8 are the same so turn 8 into 0
                    switch (phase) {
                        case 0:
                            phase = "new_moon";
                            break;
                        case 1:
                            phase = "waxing_crescent";
                            break;
                        case 2:
                            phase = "first_quarter";
                            break;
                        case 3:
                            phase = "waxing_gibbous";
                            break;
                        case 4:
                            phase = "full_moon";
                            break;
                        case 5:
                            phase = "waning_gibbous";
                            break;
                        case 6:
                            phase = "last_quarter";
                            break;
                        case 7:
                            phase = "waning_crescent";
                            break;
                    }
                    return phase;
                }
            }

        });
    }
};

export default MoonPhase;