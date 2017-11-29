// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
// import VueAMap from 'vue-amap';

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

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: '764d710f9fc5aae6d8b8f8007acd16ac',
//   mapStyle: 'amap://styles/f55e6c52149700def688e88d2fa2ed67',//样式URL
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
//   // uiVersion: '1.0.11',
// });

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
