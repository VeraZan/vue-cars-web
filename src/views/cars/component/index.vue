<template>
  <div>
    <section class="cars-item" @click="getCarsInfo">
      <header> 
        <h4 class="cars-logo" :title="data.carsMode">
          <img :src="data.imgUrl" :alt="data.carsMode">
          <span class="name">{{ data.carsMode }}</span>
        </h4>
        <p class="cars-attr">
          <span>{{ data.carsAttr | energyType }}</span> 
          <span>{{ data.carsAttr | seatNumber }}座</span>
        </p>
      </header>
      <div class="cars-content">
        <div class="info">         
          <h4 class="cars-number">{{ data.carsNumber }}</h4>
          <div class="cars-electric">
            <ul :class="data.oil | electricNumber">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <p class="distance">
              <sub>约</sub>
              <strong>{{ data.countKm }}</strong>
              <sub>KM</sub>
            </p>
          </div>
        </div>
        <img :src="data.carsImg" alt="">
      </div>
      <footer>
        <a href="javascript:void(0);" class="parking-link">{{ data.parkingName }}</a>
      </footer>
    </section>
    <section class="cars-item cars-detailed" :style="'height:' + cars_info_height" v-if="car_info_show">     
      <div class="column">
        {{ data.parkingName }}
        <i class="close" @click="closeCarsInfo"></i>
      </div>
      <div class="scroll">
        <header> 
          <h4 class="cars-logo" :title="data.carsMode">
            <img :src="data.imgUrl" :alt="data.carsMode">
            <span class="name">{{ data.carsMode }}</span>
          </h4>
          <p class="cars-attr">
            <span>{{ data.carsAttr | energyType }}</span> 
            <span>{{ data.carsAttr | seatNumber }}座</span>
          </p>
        </header>
        <img :src="data.carsImg" alt="" width="100%">
        <div class="clearfix">
          <div class="pull-left fs-24">{{ data.carsNumber }}</div>
          <p class="distance pull-right">
            <sub>约</sub>
            <strong>{{ data.countKm }}</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="cars-electric-box">
          <div class="p-r">
            <span class="e-high" :style="'width: '+ data.oil +'%;'"></span>
            <span class="e-bg"></span>
          </div>
        </div>
        <p class="info color-main text-center">取车约支付12.0元停车费，实际补贴12.0元</p>
        <ul class="cars-type-list">
          <li class="current">
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
          <li>
            <h4 class="name">日租车</h4>
            <span class="price">￥300/1天</span>
          </li>
        </ul>
        <div class="clause-dec">
          <span class="pull-left">参保《全面保障服务》用车更放心</span>
          <i></i>
        </div>
      </div>
      <a href="javascript: void(0);" class="select-car-btn">预约用车</a>
    </section>
  </div>
</template>

<script>
import { getCarsAttrKey } from "@/utils/format";
export default {
  name:"CarsItem",
  data(){
    return{
      car_info_show:false,
      cars_info_height:"0",
      timer:null
    }
  },
  filters: {
    electricNumber(val){
      const number = Math.round(val / 10);//Math.round 四舍五入为最接近的整数
      return `active-li-${number}`;  
    },
    energyType(val){
      return getCarsAttrKey({
        data: val,
        parentKey: "basics",
        childKey: "energyType"
      });
    },
    seatNumber(val){
      return getCarsAttrKey({
        data: val,
        parentKey: "carsBody",
        childKey: "seatNum"
      });
    }
  },
  props:{
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods:{
    getCarsInfo(){
      this.openCarsInfo();
    },
    openCarsInfo(){
      const viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 145;
      this.car_info_show = true;
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.cars_info_height = `${height}px`;
        clearTimeout(this.timer);
      },10)
    },
    closeCarsInfo(){
      this.car_info_show = false;
      this.cars_info_height = "0";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>