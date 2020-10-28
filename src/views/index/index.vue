<template>
  <div>
    <!-- 汽车数据 -->
    <!-- <Cars /> -->
    <!-- 地图 -->
    <Map />
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
export default {
  name:"Index",
  components:{ Map,Cars,Navbar,Login },
  data(){
    return{
     
    }
  },
  computed:{
    show(){
      const activeRouter = this.$route;
      return activeRouter.name === "Index" ? false : true;
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