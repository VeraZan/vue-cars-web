<template>
  <div class="user-container">
    <Back>
      <template v-slot:navHeaderRight>
        <router-link class="color-white opacity-4" to="/register">注册</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <Username :value.sync="form.username" />
        <PasswordVue :value.sync="form.password" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-block">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-right">
      <router-link class="color-white opacity-4" to="/forget">忘记密码</router-link>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
//组件
import Username from "@c/account/username";
import PasswordVue from "@c/account/password";//直接写Password会关键词冲突
export default {
  name: "Register",
  components: { Username,PasswordVue },
  data(){
    return {
      form: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login();
        }
      })
    },
    login(){
      const requestData = {
        username:this.form.username,
        password:sha1(this.form.password)
      }
      this.$store.dispatch("account/loginAction",requestData).then(response => {
        this.$message.success(response.message); 
        //需要保存历史记录用push，不需要用replace（替换当前历史记录）  
        this.$router.push({
          name:"Index"
        })
      }).catch(error => {

      })
    }
  }
}
</script>
<style lang="scss"></style>