<template>
  <el-form-item prop="code" :rules="rules">
    <el-button class="button-vcode" :loading="loading" :disabled="disabled" @click="handlerCode">{{ button_text }}</el-button>
    <el-input v-model="code" placeholder="验证码" @input="enterInput()"></el-input>
  </el-form-item>
</template>

<script>
import { GetCode } from "@/api/account";
export default {
  name:"Code",
  props:{
    username:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      code:"",
      disabled:true,
      loading:false,
      timer:null,
      button_text:"获取验证码",
      rules:[
        { required:true,message:"验证码不能为空",trigger:"blur"},
        { min:6,max:6,message:"请输入6位字符的验证码",trigger:"change"}
      ]
    }
  },
  methods:{
    handlerCode(){
      const requestData = {
        username:this.username,
        module:"register"
      }
      this.loading = true;
      GetCode(requestData).then(response => {
        this.$message.success(response.message);
        this.loading = false;
        this.countDown();
      }).catch(error => {
        this.loading = false;
      })    
    },
    countDown(){
      let second = 120;
      this.button_text = `倒计时${second}秒`;
      this.disabled = true;
      this.timer = setInterval(() => {
        second--;
        this.button_text = `倒计时${second}秒`;
        if(second === 0){
          clearInterval(this.timer);
          this.button_text = `重新获取验证码`;
          this.disabled = false;
        }
      },1000)
    },
    enterInput(){
      this.$emit("update:value",this.code);
    }
  },
  watch:{
    username:{
      handler(newValue,oldValue){
        this.disabled = newValue ? false : true;
      }
    }
  }
}
</script>

<style>

</style>