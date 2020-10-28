<template>
  <div>
    <!-- 汽车数据 -->
    <!-- <Cars /> -->
    <!-- 地图 -->
    <Map ref="map" :parking="parking" @callback="callbackComponent" />
    <!-- 导航 -->
    <Navbar />
    <!-- 会员管理 -->
    <div id="children-view" :class="{open:show}">
      <router-view></router-view>
    </div>
    <Login />
  </div>
</template>

<script>
import Map from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import Login from "./login";
import { Parking } from "@/api/parking";
export default {
  name:"Index",
  components:{ Map,Cars,Navbar,Login },
  data(){
    return{
      parking: []
    }
  },
  computed:{
    show(){
      const activeRouter = this.$route;
      return activeRouter.name === "Index" ? false : true;
    }
  },
  methods: {
    callbackComponent(params) {
      params.function && this[params.function](params.data);
    },
    // 地图初始化完成回调
    loadMap(){
      this.getParking();
    },
    // 获取停车场数据
    getParking(){
      Parking().then(response => {
        const data = response.data.data;
        data.forEach(item => {
          item.position = item.lnglat.split(",");
          item.content = "<img src='"+ require('@/assets/images/parking_location_img.png') +"' />";
          item.offset = [-35, -60];
          item.offsetText = [-30, -55];
          item.label = {content: "11", offset: [10, 10]};
          item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`;
          item.events = {
            click: (e) => {
               
            }
          }
        });
        this.parking = data;
      })
    }
  },
  mounted(){
    document.addEventListener('mouseup', (e) => {
      const userCon = document.getElementById("children-view");
      if(userCon && !userCon.contains(e.target)) {
        this.$router.push({
          name: "Index"
        })
      }
    })
  }
}
</script>

<style lang="scss">
#children-view{
  position: fixed;
  top:0;
  bottom:0;
  right:-410px;
  width:410px;
  @include webkit(transform,all .3s ease 0s);
  @include webkit(box-shadow,-5px 0 38px rgba(0,0,0,.4));
  background-color: #34393f;
  z-index:101;
  &.open{
    right:0;
  }
}
</style>