import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'
import Converters from './plugins/Converters'
import MoonPhase from './plugins/MoonPhase'
import i18n from './i18n'

Vue.config.productionTip = false

Vue.use(vueDebounce);
Vue.use(Converters);
Vue.use(MoonPhase);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')