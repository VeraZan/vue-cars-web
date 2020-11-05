<template>
  <div class="cars-wrap" v-if="carsList && carsList.length > 0">
    <div class="cars-swiper-wrap">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="item in carsList" :key="item.id">
          <CarsItem :data="item" />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
import CarsItem from './component';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.min.css';
// API
import { GetCarsList } from "@/api/cars";
export default {
  name:"Cars",
  components: { CarsItem,Swiper, SwiperSlide },
  data() {
    return {
      carsList:[],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 50,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods:{
    getCarsList(parkingId){
      GetCarsList({ parkingId }).then(response => {  
        const data = response.data.data;
        data && (this.carsList = data);
        this.$store.commit("app/SET_CARS_LIST_REQUEST",false);
      })
    },
    clearCarsList(){
      this.carsList = []
    }
  },
  // watch:{
  //   "$store.state.app.isClickCarsList":{
  //     handler(newValue,oldValue){
  //       if(!newValue) this.carsList = [];
  //       this.$store.commit("app/SET_CARS_LIST_STATUS",true);
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>