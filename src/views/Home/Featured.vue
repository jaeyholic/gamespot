<template>
  <div>
    <carousel
    :per-page="1"
    :mouse-drag="false"
    :paginationEnabled="false"
    :autoplay="true"
    :loop="true"
    :autoplayTimeout="5000">
      <slide v-for="(slide, index) in slides" :key="index">
        <div class="slider_bck" :style="{'background': `url(${slide.bck})`}">
          <div class="gradient">
            <div class="container">
              <div class="content">
                <app-button
                  type="link"
                  linkTo="#">
                  See Review
                </app-button>
                <div class="item">
                  {{ slide.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import SlideOne from '../../assets/images/featured/1.jpg'
import SlideTwo from '../../assets/images/featured/2.jpg'
import SlideThree from '../../assets/images/featured/3.jpg'
import SlideFour from '../../assets/images/featured/4.jpg'
  export default {
    data() {
      return {
        slides: [
          {title: 'Red dead Redemption 2', bck: SlideOne},
          {title: 'Watch Dogs 2', bck: SlideTwo},
          {title: 'Rise of the Tomb Raider', bck: SlideThree},
          {title: 'Spider-Man', bck: SlideFour},
        ]
      }
    },
    components: {
      Slide,
      Carousel
    },
    methods: {
      
    }
  }
</script>

<style scoped>

</style>