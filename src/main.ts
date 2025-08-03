import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons and add them to the Library */
import {
  faUserSecret,
  faThumbsUp,
  faDeleteLeft,
  faBars,
  faClockRotateLeft,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
// import { faFacebook } from '@fortawesome/free-brands-svg-icons'

library.add(faUserSecret, faThumbsUp, faDeleteLeft, faBars, faClockRotateLeft, faHouse)
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
