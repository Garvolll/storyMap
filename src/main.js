// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import {
  Loading,
  Button,
  Icon,
  Row,
  Col
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Loading)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)



Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
