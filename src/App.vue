<template>
  <div id="app"> 
    <router-view />
  </div>
</template>
<script>
export default {
  name:"App",
  mounted(){
    document.addEventListener('mouseup', (e) => {
      const userCon = document.getElementById("children-view");
      if(userCon && !userCon.contains(e.target)) {
        this.$router.push({
          name: "Index"
        })
      }
      const carsSwiper = document.getElementsByClassName("cars-wrap")[0];
      if(carsSwiper && !carsSwiper.contains(e.target)) {
        const isRequestCarsList = this.$store.state.app.isRequestCarsList;
        if(!isRequestCarsList) this.$store.commit("app/SET_CARS_LIST_STATUS",false);      
      }
    })
  }
}
</script>
<style lang="scss">
#app {height:100vh;}
</style>
