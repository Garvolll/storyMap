export const CHANGEACTIVESITE = 'site/changeActiveSite';
export const CREATEEVENTFORMSHOW = 'site/createEventFormShow';
export const EVENTLISTSHOW = 'site/eventListShow';
export const PANELSHOW = 'site/panelShow';
const site = {
  state: {
    activeSite: "",
    createEventFormShow:false,
    eventListShow:true,
    panelShow:false
  },
  mutations: {
    [CHANGEACTIVESITE](state, data) {
      state.activeSite = data
    },
    [CREATEEVENTFORMSHOW](state, data) {
      state.createEventFormShow = data
    },
    [EVENTLISTSHOW](state, data) {
      state.eventListShow = data
    },
    [PANELSHOW](state, data) {
      state.panelShow = data
    }
  },
  actions: {
    changeActiveSite({
      commit,
      dispatch
    }, data) {
      commit(CHANGEACTIVESITE, data)
    },
    createEventFormShow({
      commit,
      dispatch
    }, data) {
      commit(CREATEEVENTFORMSHOW, data)
    },
    eventListShowEvent({
      commit,
      dispatch
    }, data) {
      commit(EVENTLISTSHOW, data)
    },
    panelShowEvent({
      commit,
      dispatch
    }, data) {
      commit(PANELSHOW, data)
    }
  }
}
export default site
