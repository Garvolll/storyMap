import Vue from 'vue'
import Vuex from 'vuex'

import site from './site.js'

Vue.use(Vuex)

const modules = {
  site
}

const store = new Vuex.Store({
  modules,
})

store.regModule = function (args = []) {
  args.map((module) => {
    if (!store.state[module.name]) {
      store.registerModule(module.name, module.module)
    }
  })
}
export default store
