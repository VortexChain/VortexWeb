import 'overlayscrollbars/css/OverlayScrollbars.css'

import Vue from 'vue'
import {
  OverlayScrollbarsPlugin,
  OverlayScrollbarsComponent,
} from 'overlayscrollbars-vue'

Vue.use(OverlayScrollbarsPlugin)
Vue.component('overlay-scrollbars', OverlayScrollbarsComponent)
