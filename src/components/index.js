import Vue from 'vue'

import Annotorious from './Annotorious.vue'

const Components = {
  Annotorious
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
