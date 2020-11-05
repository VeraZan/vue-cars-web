<template>
  <!-- :readonly="readonlyInput" @focus="cancelReadOnly()" 防止浏览器自动填入 -->
  <el-form-item id="password" prop="password" :rules="[{ validator:validatePassword,trigger:'change' }]">
    <el-input 
      type="password" 
      v-model="password" 
      :placeholder="placeholder" 
      :readonly="readonlyInput" 
      minlength="6" 
      maxlength="20" 
      @focus="cancelReadOnly()" 
      @input="enterInput()"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_password } from "@/utils/validate";
export default {
  name:"Password",
  props:{
    placeholder:{
      type:String,
      default:"密码"
    },
    passwordConfirm:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      password:"",
      readonlyInput:true
    }
  },
  methods:{
    cancelReadOnly(){
      this.readonlyInput = false;
    },
    validatePassword(rules,value,callback){
      if(!this.password || this.password === ""){
        return callback(new Error("密码不能为空"))
      }else if(!validate_password(this.password)){
        return callback(new Error("密码为6~20位的英文和数字组合"))
      }else if(this.passwordConfirm && this.passwordConfirm !== this.password){
        return callback(new Error("两次密码不一致"))
      }else{
        callback();
      }
    },
    enterInput(){
      const validate_status = validate_password(this.password);
      let value = validate_status ? this.password : "";
      this.$emit("update:value",value);
    }
  },
  watch:{
    passwordConfirm:{
      handler(newValue,oldValue){
        if(newValue === this.password){
          const errorDom = document.getElementById("password").querySelector(".el-form-item__error");
          if(errorDom){
            errorDom.style.display = "none";
          }
        }
      }
    }
  }
}
</script>

<style>

</style>