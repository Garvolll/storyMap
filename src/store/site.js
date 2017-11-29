export const CHANGEACTIVESITE = 'site/changeActiveSite';

const site = {
  state: {
    activeSite: ""
  },
  mutations: {
    [CHANGEACTIVESITE](state, data) {
      state.activeSite = data
    }
  },
  actions: {
    changeActiveSite({
      commit,
      dispatch
    }, data) {
      commit(CHANGEACTIVESITE, data)
    }
  }
}
export default site
