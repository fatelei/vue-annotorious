<template>
  <div id="app">
    <Annotorious
      :images="images.slice(index, index + 3)"/>
    <button @click="nextImage" class="click-btn">click</button>
  </div>
</template>

<script>
import Annotorious from './components/Annotorious.vue'

export default {
  name: 'app',
  components: {
    Annotorious
  },
  data: function () {
    return {
      index: 0,
      images: [
        'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/ce2ece60-9b32-11e6-95ab-00163ed833e7/1025091706/the-test-fun-for-friends-screenshot.jpg',
        'https://annotorious.github.io/demos/640px-Hallstatt_300.jpg',
        'https://annotorious.github.io/img/splash-image-2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/NY-233.svg/750px-NY-233.svg.png',
        'https://media-cdn.tripadvisor.com/media/photo-s/03/34/25/1b/club-233.jpg',

      ],
    }
  },
  methods: {
    nextImage: function () {
      this.index += 3
      if (this.index > this.images.length) {
        this.index = 0
      }
    }
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

.click-btn {
  position: fixed;
  bottom: 0;
}
</style>
