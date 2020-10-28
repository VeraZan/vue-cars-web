<template>
  <div class="amap-wrap">
    <el-amap ref="map" vid="amapContainer" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!--覆盖物 - 圆-->
      <el-amap-circle 
        v-for="item in circle" 
        :key="item.id" 
        :center="item.center" 
        :radius="item.radius" 
        :fillColor="item.color" 
        :strokeColor="item.color" 
        :strokeOpacity="item.strokeOpacity" 
        :strokeWeight="item.strokeWeight"
      ></el-amap-circle>
      <!--覆盖物 - 停车场-->
      <el-amap-marker 
        v-for="(item, index) in parking" 
        :key="item.id" 
        :content="item.content" 
        :offset="item.offset" 
        :position="item.position" 
        :vid="index"
      ></el-amap-marker>   
      <!--覆盖物 - 停车场 - 车辆-->
      <el-amap-marker 
        v-for="(item, index) in parking" 
        :extData="item" 
        :events="item.events" 
        :key="item.id + index" 
        :content="item.text" 
        :offset="item.offsetText" 
        :position="item.position" 
        :vid="index"
      ></el-amap-marker>                   
    </el-amap>
  </div>
</template>

<script>
import { AMapManager,lazyAMapApiLoaderInstance } from 'vue-amap';
import { SelfLocation } from "./location";
export default {
  name:"Map",
  props: {
    parking: {
      type: Array,
      default: () => []
    }
  },
  data(){
    const _this = this;
    return{
      map: null,
      zoom: 18,
      amapManager: new AMapManager(),
      center: [121.59996, 31.197646],
      events: {
        init: (o) => {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          })
        }
      },
      // 自身定位
      circle: [],
    }
  },
  methods:{
    initMap(){
      this.map = this.amapManager.getMap();
      // 地图初始化完成回调
      this.$emit("callback", {
        function: "loadMap"
      })
      // 自身定位
      this.selfLocation();
    },
    selfLocation(){
      SelfLocation({
        map: this.map,
        complete: (val) => this.selfLocationComplete(val)
      })
    },
    /** 自身定位 成功回调 */
    selfLocationComplete(data){
      this.self_lng = data.position.lng;
      this.self_lat = data.position.lat;
      const json = {
        radius: 4,
        color: "#393e43",
        strokeOpacity: "0.2",
        strokeWeight: "30"
      }
      json.center = [this.self_lng, this.self_lat];
      this.circle.push(json);
    }
  },
  mounted(){
   
  }
}
</script>

<style lang="scss" scoped>
.amap-wrap{
  height:100vh;
}
</style>