import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import Tone from 'tone'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './main.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faRandom, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import NoteService from './services/NoteService';

library.add(faPlay, faStop, faRandom, faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.config.productionTip = false



var noteService = new NoteService("A", "minor", 150);


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

// key bindings
window.addEventListener('keydown', function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    noteService.toggleStartPause();
  }
  if (e.keyCode == 13) {
    e.preventDefault();
    noteService.stop();
  }
})



export { noteService }