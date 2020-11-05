<template>
  <!-- :readonly="readonlyInput" @focus="cancelReadOnly()" 防止浏览器自动填入 -->
  <el-form-item id="passwordConfirm" prop="passwordConfirm" :rules="[{ validator:validatePassword,trigger:'change' }]">
    <el-input 
      type="password" 
      v-model="passwordConfirm" 
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
  name:"PasswordConfirm",
  props:{
    placeholder:{
      type:String,
      default:"确认密码"
    },
    password:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      passwordConfirm:"",
      readonlyInput:true
    }
  },
  methods:{
    cancelReadOnly(){
      this.readonlyInput = false;
    },
    validatePassword(rules,value,callback){
      if(!this.passwordConfirm || this.passwordConfirm === ""){
        return callback(new Error("密码不能为空"))
      }else if(!validate_password(this.passwordConfirm)){
        return callback(new Error("密码为6~20位的英文和数字组合"))
      }else if(this.password && this.passwordConfirm !== this.password){
        return callback(new Error("两次密码不一致"))
      }else{
        callback();
      }
    },
    enterInput(){
      const validate_status = validate_password(this.passwordConfirm);
      let value = validate_status ? this.passwordConfirm : "";
      this.$emit("update:value",value);
    }
  },
  watch:{
    password:{
      handler(newValue,oldValue){
        if(newValue === this.passwordConfirm){
          const errorDom = document.getElementById("passwordConfirm").querySelector(".el-form-item__error");
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