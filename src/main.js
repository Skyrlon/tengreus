import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Converters from './plugins/Converters'

Vue.config.productionTip = false

Vue.use(Converters)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')