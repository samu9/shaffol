import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import Tone from 'tone'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './main.css'

import { MdField, MdMenu, MdList, MdButton} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
/*import 'vue-material/dist/theme/default.css'*/

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faStop, faRandom, faPause, faTrashAlt, faDrum, faTimesCircle, faVolumeDown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MusicService from './services/MusicService';

library.add(faPlay,faStop,faRandom, faPause, faTrashAlt, faDrum, faTimesCircle, faVolumeDown, faVolumeUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(MdField)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdButton)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
export var musicService = new MusicService("C", "Pentatonic Major", 180);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})

// key bindings
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        e.preventDefault();
        musicService.toggleStartPause();
    }
    if (e.keyCode == 13) {
        e.preventDefault();
        musicService.stop();
    }
})



// export { musicService,EventBus }