<template>
  <div class="test">
    <v-carousel
    >
      <!-- interval="10000"
      :hide-controls="true"
      :hide-delimiters="true" -->
      <v-carousel-item
        v-for="(item,i) in imgSrc"
        :key="i"
        :src="item"
        transition="fade"
        reverse-transition="fade"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    props: {
      imgSrc: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scobed lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0
      &-enter, &-leave, &-leave-to
        opacity: 0
  .test {
    overflow: hidden;
    width: calc(100% + 2px);
    height: 500px;
  }
  .carousel {
    border-radius: 12px;
    height: 100%;
    // height: 300px!important;
    // border-radius: 12px 12px 0 0;
    // left: -1px;
  }
  .carousel__item {
    // background-size: contain;
  }
  @media (max-width: 576px) {
    .test {
      // height: 400px;
    }
    .carousel {
      height: 80%;
    }
    .carousel__item {
      // background-size: contain;
    }
  }
  // .carousel .carousel__right i.icon,
  // .carousel .carousel__left i.icon {
  //   color: #1E88E5 !important;
  // }
  // .carousel .carousel__controls {
  //   background-color: #eaeaea;
  // }
  .carousel .carousel__controls i.icon {
    // color: #1E88E5 !important;
    font-size: 20px;
  }
</style>