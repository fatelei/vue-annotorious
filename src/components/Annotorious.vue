<template>
  <div>
    <img :src="image" alt="图片" ref="image" @load="onLoad"/>
  </div>
</template>


<script>
import annotoriouseLoader from './AnnotoriousLoader'

export default {
  name: 'Annotorious',
  props: {
    image: String,
    onAnnotationCreate: Function,
    onAnnotationUpdate: Function,
    onAnnotationRemove: Function,
    srcPath: String
  },

  methods: {
    fetchAnnotorious: function () {
      annotoriouseLoader.load(this.srcPath, this.afterLoadAnnotorious)
    },

    onLoad: function () {
      this.fetchAnnotorious()
    },

    afterLoadAnnotorious: function () {
      this.anno = window.anno;

      this.anno.makeAnnotatable(this.$refs.image);

      this.onCreate.bind(this);
      this.onRemove.bind(this);
      this.onUpdate.bind(this);
      this.anno.addHandler('onAnnotationCreated', this.onCreate);
      this.anno.addHandler('onAnnotationRemoved', this.onCreate);
      this.anno.addHandler('onAnnotationUpdated', this.onCreate);
    },

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

