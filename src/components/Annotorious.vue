<template>
  <div>
    <loading
      :active.sync="isLoading"
      :is-full-page="isFullPage">
    </loading>
    <div ref="images">
      <img :src="image" :key="index" v-for="(image, index) in imageDatas" alt="图片" ref="image"/>
    </div>
  </div>
</template>


<script>
import annotoriouseLoader from './AnnotoriousLoader'
import { loadImage } from './utils'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Vue from 'vue';


export default {
  name: 'Annotorious',

  components: {
    Loading
  },

  props: {
    images: Array,
    onAnnotationCreate: Function,
    onAnnotationUpdate: Function,
    onAnnotationRemove: Function,
    srcPath: String
  },

  data: function () {
    return {
      imageDatas: [],
      err: null,
      anno: null,
      isLoading: false,
      isFullPage: true,
      loaded: 0
    }
  },

  mounted: async function () {
    this.isLoading = true;
    await annotoriouseLoader.load(this.srcPath);
    this.afterLoadAnnotorious();

    this.imageDatas = await this.fetchImages();

    setTimeout(() => {
      this.makeAnnotatables();
    }, 2000);
  },

  watch: {
    images: async function () {
      this.isLoading = true;
      this.imageDatas = await this.fetchImages();

      while (this.$refs.images.firstChild) {
        this.$refs.images.removeChild(this.$refs.images.firstChild)
      }

      this.$nextTick(function () {
        const Compoent = Vue.extend({
          template: '<img :src="image" alt="图片"/>',
          props: {
            image: String
          },
          ref: 'image1'
        });

        let imgs = [];
        for (let i = 0; i < this.images.length; i++) {
          let img = new Compoent({propsData: {image: this.imageDatas[i]}});
          img.$mount();
          this.$refs.images.appendChild(img.$el);
          imgs.push(img)
        }

        this.$nextTick(function () {
          setTimeout(() => {
            for (let img of imgs) {
              window.anno.makeAnnotatable(img.$el);
            }
            this.isLoading = false;
          }, 2000);
        })
      })
    }
  },

  methods: {
    fetchImages: async function () {
      const tasks = this.images.map(image => {
        return loadImage(image)
      });
      return await Promise.all(tasks);
    },
    
    makeAnnotatables: function () {
      for (let i = 0; i < this.images.length; i++) {
        window.anno.makeAnnotatable(this.$refs.image[i]);
      }
      this.isLoading = false;
    },

    afterLoadAnnotorious: function () {
      if (!this.anno) {
        this.anno = window.anno;
        this.onCreate.bind(this);
        this.onRemove.bind(this);
        this.onUpdate.bind(this);
        window.anno.addHandler('onAnnotationCreated', this.onCreate);
        window.anno.addHandler('onAnnotationRemoved', this.onRemove);
        window.anno.addHandler('onAnnotationUpdated', this.onUpdate);
      }
    },

    onCreate: function (annotation) {
      const { src, shapes, text } = annotation;
      if (this.onAnnotationCreate) {
        this.onAnnotationCreate(this.images[this.imageDatas.indexOf(src)], shapes[0].geometry, text);
      }
    },

    onRemove: function (annotation) {
      const { src, shapes, text } = annotation;
      

      if (this.onAnnotationRemove) {
        this.onAnnotationRemove(this.images[this.imageDatas.indexOf(src)], shapes[0].geometry, text);
      }
    },

    onUpdate: function (annotation) {
      const { src, shapes, text } = annotation;

      if (this.onAnnotationUpdate) {
        this.onAnnotationUpdate(this.images[this.imageDatas.indexOf(src)], shapes[0].geometry, text);
      }
    }
  }
}
</script>

<style scoped>
@import '../../node_modules/annotorious/css/theme-dark/annotorious-dark.css';

img {
  width: 500px;
}
</style>

