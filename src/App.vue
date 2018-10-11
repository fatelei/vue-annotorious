<template>
  <div id="app">
    <Annotorious image="https://annotorious.github.io/img/splash-image-2.jpg"/>
    <Annotorious image="https://annotorious.github.io/demos/640px-Hallstatt_300.jpg"/>
  </div>
</template>

<script>
import Annotorious from './components/Annotorious.vue'

export default {
  name: 'app',
  components: {
    Annotorious
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
