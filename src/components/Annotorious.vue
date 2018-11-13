<template>
  <div>
    <h3 v-if="err !== null">{{err}}</h3>
    <img v-if="imageData" :src="imageData" alt="图片" :ref="key"/>
  </div>
</template>


<script>
import annotoriouseLoader from './AnnotoriousLoader'
import 'whatwg-fetch'

export default {
  name: 'Annotorious',
  props: {
    image: String,
    onAnnotationCreate: Function,
    onAnnotationUpdate: Function,
    onAnnotationRemove: Function,
    srcPath: String
  },

  data: function () {
    return {
      imageData: null,
      err: null,
      anno: null,
      key: 0
    }
  },

  mounted: function () {
    this.loadImage()
  },

  watch: {
    image: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.key += 1
        this.loadImage()
      }
    }
  },

  methods: {
    loadImage: function () {
      fetch(this.image).then(res => res.blob()).then(imageBinary => {
        this.imageData = URL.createObjectURL(imageBinary)
        this.fetchAnnotorious()
        this.err = null
      }).catch(err => {
        this.err = err
      })
    },

    fetchAnnotorious: function () {
      annotoriouseLoader.load(this.srcPath, this.afterLoadAnnotorious)
    },

    afterLoadAnnotorious: function () {
      if (!this.anno) {
        this.anno = window.anno;
      }

      this.anno.makeAnnotatable(this.$refs[this.key]);

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

img {
  width: 100%;
}
</style>

