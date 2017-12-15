<template>
  <div id="app">
    <HeaderTop/>
    <Index />
  </div>
</template>

<script>

import HeaderTop from './components/Header'
import Index from './components/Index'
export default {
  name: 'app',
  data() {
    return {
    }
  },
  components: {
    HeaderTop,
    Index
  },
  methods: {

  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100%;
}

@import "./css/app.scss";
</style>
