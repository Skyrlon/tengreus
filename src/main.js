import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Converters from './plugins/Converters'
import MoonPhase from './plugins/MoonPhase'

Vue.config.productionTip = false

Vue.use(Converters);
Vue.use(MoonPhase);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')