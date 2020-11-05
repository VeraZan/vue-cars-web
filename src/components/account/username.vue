<template>
  <!-- :readonly="readonlyInput" @focus="cancelReadOnly()" 防止浏览器自动填入 -->
  <el-form-item prop="username" :rules="[{ validator:validateUser,trigger:'change' }]">
    <el-input 
      v-model="username" 
      :placeholder="placeholder" 
      :readonly="readonlyInput" 
      minlength="0" 
      maxlength="11" 
      @focus="cancelReadOnly()" 
      @input="enterInput()"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_phone } from "@/utils/validate";
export default {
  name:"Username",
  props:{
    placeholder:{
      type:String,
      default:"手机号"
    }
  },
  data(){
    return {
      username:"",
      readonlyInput:true
    }
  },
  methods:{
    cancelReadOnly(){
      this.readonlyInput = false;
    },
    validateUser(rules,value,callback){
      if(!this.username || this.username === ""){
        return callback(new Error("手机号不能为空"))
      }else if(!validate_phone(this.username)){
        return callback(new Error("手机号格式不正确"))
      }else{
        callback();
      }
    },
    enterInput(){
      const validate_status = validate_phone(this.username);
      let value = validate_status ? this.username : "";
      this.$emit("update:value",value);
    }
  }
}
</script>

<style>

</style>