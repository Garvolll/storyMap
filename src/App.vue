<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  width: 100%;
  min-height:100%;
}
@import "./css/app.scss";
</style>
