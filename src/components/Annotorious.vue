<template>
  <div>
    <loading
      :active.sync="isLoading"
      :is-full-page="isFullPage"/>
    <h3 v-if="err">{{ err }}</h3>
    <img v-if="imageData" :src="imageData" alt="图片" :key="image" ref="image"/>
  </div>
</template>


<script>
import annotoriouseLoader from './AnnotoriousLoader'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'whatwg-fetch'

export default {
  name: 'Annotorious',

  components: {
    Loading
  },

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
      key: 0,
      isLoading: false,
      isFullPage: false
    }
  },

  mounted: function () {
    this.loadImage();
  },

  watch: {
    image: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.loadImage();
      }
    }
  },

  methods: {
    loadImage: function () {
      this.isLoading = true;
      fetch(this.image).then(res => res.blob()).then(imageBinary => {
        this.imageData = URL.createObjectURL(imageBinary)
        this.fetchAnnotorious();
        this.err = null;
        this.isLoading = false;
      }).catch(err => {
        this.err = err;
        this.isLoading = false;
      });
    },

    fetchAnnotorious: function () {
      annotoriouseLoader.load(this.srcPath, this.afterLoadAnnotorious);
    },

    afterLoadAnnotorious: function () {
      if (!this.anno) {
        this.anno = window.anno;
      }

      this.anno.makeAnnotatable(this.$refs.image);

      this.onCreate.bind(this);
      this.onRemove.bind(this);
      this.onUpdate.bind(this);
      this.anno.addHandler('onAnnotationCreated', this.onCreate);
      this.anno.addHandler('onAnnotationRemoved', this.onRemove);
      this.anno.addHandler('onAnnotationUpdated', this.onUpdate);
    },

    onCreate: function (annotation) {
      const { shapes, text } = annotation;

      if (this.onAnnotationCreate) {
        this.onAnnotationCreate(this.image, shapes[0].geometry, text);
      }
    },

    onRemove: function (annotation) {
      const { shapes, text } = annotation;
      

      if (this.onAnnotationRemove) {
        this.onAnnotationRemove(this.image, shapes[0].geometry, text);
      }
    },

    onUpdate: function (annotation) {
      const { shapes, text } = annotation;

      if (this.onAnnotationUpdate) {
        this.onAnnotationUpdate(this.image, shapes[0].geometry, text);
      }
    }
  }
}
</script>

<style scoped>
@import '../../node_modules/annotorious/css/theme-dark/annotorious-dark.css';
</style>

