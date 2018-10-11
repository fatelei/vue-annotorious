<template>
  <div>
    <img :src="image" alt="图片" ref="image"/>
  </div>
</template>


<script>
import 'annotorious'

export default {
  name: 'Annotorious',
  props: {
    image: String,
    onAnnotationCreate: Function,
    onAnnotationUpdate: Function,
    onAnnotationRemove: Function
  },

  mounted: function () {
    window.anno.makeAnnotatable(this.$refs.image)
    this.onCreate.bind(this)
    this.onRemove.bind(this)
    this.onUpdate.bind(this)
    window.anno.addHandler('onAnnotationCreated', this.onCreate)
    window.anno.addHandler('onAnnotationRemoved', this.collect)
    window.anno.addHandler('onAnnotationUpdated', this.onUpdate)
  },

  methods: {
    onCreate: function (annotation) {
      const { src, shapes, text } = annotation

      if (this.onAnnotationCreate) {
        this.onAnnotationCreate(src, shapes[0].geometry, text)
      }
    },

    onRemove: function (annotation) {
      const { src, shapes, text } = annotation

      if (this.onAnnotationRemove) {
        this.onAnnotationRemove(src, shapes[0].geometry, text)
      }
    },

    onUpdate: function (annotation) {
      const { src, shapes, text } = annotation

      if (this.onAnnotationUpdate) {
        this.onAnnotationUpdate(src, shapes[0].geometry, text)
      }
    }
  }
}
</script>

<style scoped>
@import '../../node_modules/annotorious/css/theme-dark/annotorious-dark.css';
</style>

