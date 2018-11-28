import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import Tone from 'tone'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './main.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faRandom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlay,faStop,faRandom)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
