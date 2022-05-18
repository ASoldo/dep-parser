import Vue from 'vue'
import App from './App.vue'

import VueJsonToCsv from 'vue-json-to-csv'

Vue.component('vue-json-to-csv', VueJsonToCsv)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
