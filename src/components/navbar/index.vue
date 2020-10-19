<template>
  <div class="navbar">
    <ul>
      <li><i class="icon icon-help"></i></li>
      <li><i class="icon icon-search"></i></li>
      <li>
        <a href="javascript: void(0);" class="select-car-btn">选择车辆</a>
      </li>
      <li><i class="icon icon-location"></i></li>
      <li><i class="icon icon-user" @click="toUser"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"Navbar",
  methods: {
    toUser(){
      this.$router.push({
        name: "User"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  position: fixed;
  left:0;
  right:0;
  bottom:86px;
  text-align: center;
  z-index:10;
  li{
    display: inline-block;
  }
  .icon {
    margin: 0 17px;
    vertical-align: middle;
    cursor: pointer;
  }
}
.select-car-btn{
  display:block;
  width:240px;
  height:84px;
  line-height: 84px;
  border-radius: 42px;
  margin: 0 17px;
  text-align: center;
  color:#fff;
  font-size: 26px;
  font-weight: 300;
  background-color: $color-main;
}
</style>