<template>
  <div class="amap-wrap">
    <el-amap ref="map" vid="amapContainer" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
      <!--覆盖物 - 圆点标记-->
      <el-amap-circle-marker 
        v-for="item in circle" 
        :key="item.id" 
        :center="item.center" 
        :radius="item.radius" 
        :fillColor="item.color" 
        :strokeColor="item.color" 
        :strokeOpacity="item.strokeOpacity" 
        :strokeWeight="item.strokeWeight" 
        :zIndex="item.zIndex"
      ></el-amap-circle-marker>
      <!--覆盖物 - 停车场-->
      <el-amap-marker 
        v-for="(item, index) in parking" 
        :key="item.id" 
        :content="item.content" 
        :offset="item.offset" 
        :position="item.position" 
        :vid="index"
      ></el-amap-marker>   
      <!--覆盖物 - 停车场 - 车辆数-->
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
      <!--覆盖物 - 停车场 - 距离信息-->
      <el-amap-marker 
        v-for="(item, index) in parkingInfo" 
        zIndex="1000" 
        :key="item.id" 
        :content="item.text" 
        :offset="item.offset" 
        :position="item.position" 
        :vid="index"
      ></el-amap-marker>                      
    </el-amap>
  </div>
</template>

<script>
import { AMapManager,lazyAMapApiLoaderInstance } from 'vue-amap';
import { SelfLocation } from "./location";
import { Walking,distanceConversion } from "./walking";
import StyleCss from "./style";
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
      // 自身定位
      self_lng: "",
      self_lat: "",
      events: {
        init: (o) => {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initMap();
          })
        }
      },
      // 自身定位
      circle: [],
      // 停车场位置
      parkingData: {},
      // 停车场信息
      parkingInfo: []
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
    /** 存储数据 */
    saveData(params){
      if(this[params.key]) {
        this[params.key] = params.value;
      }
    },
    /** 自身定位 */
    selfLocation(){
      SelfLocation({
        map: this.map,
        complete: (val) => this.selfLocationComplete(val)
      })
    },
    /** 自身定位成功后回调 */
    selfLocationComplete(data){
      this.self_lng = data.position.lng;
      this.self_lat = data.position.lat;
      const json = {
        radius: 10,
        color: "#393e43",
        strokeOpacity: 0.2,
        strokeWeight: 30,
        zIndex:101
      }
      json.center = [this.self_lng, this.self_lat];
      this.circle = [json];
    },
    handlerWalking(lnglat){
      // 步行路线规划
      Walking({
        map: this.map,
        position_start: [this.self_lng, this.self_lat],
        position_end: lnglat,
        complete: (val) => this.handlerWalkingComlete(val),
        error: (msg) => this.$message.error(msg)
      })
    },
    handlerWalkingComlete(data){
      this.parkingInfo = [
        {
          position: this.parkingData.lnglat.split(","),
          text: `<div style='${StyleCss.parkingInfoWrap}'>
                    <span style="${StyleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
                    辆车<span style="${StyleCss.parkingInfoLine}"></span>距离您${distanceConversion(data.routes[0].distance)}
                </div>`,
          offset: [-25, -54]
        }
      ]
    }
  },
  watch: {
    "$store.state.location.selfLocation": {
      handler(){
        this.selfLocation();
      }
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