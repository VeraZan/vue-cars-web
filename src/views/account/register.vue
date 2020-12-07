<template>
  <div class="user-container">
    <Back>
      <template v-slot:navHeaderRight>
        <router-link class="color-white opacity-4" to="/login">登录</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <Username :value.sync="form.username" />
        <PasswordVue :value.sync="form.password" :passwordConfirm="form.passwordConfirm" />
        <PasswordConfirm :value.sync="form.passwordConfirm" :password="form.password" />
        <Code :username="form.username" :value.sync="form.code" />
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-block">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import sha1 from "js-sha1";
//组件
import Username from "@c/account/username";
import PasswordVue from "@c/account/password";//直接写Password会关键词冲突
import PasswordConfirm from "@c/account/passwordConfirm";
import Code from "@c/code";
export default {
  name: "Register",
  components: { Username,PasswordVue,PasswordConfirm,Code },
  data(){
    return {
      form: {
        username: "",
        password: "",
        passwordConfirm: "",
        code: ""
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.register();
        }
      })
    },
    register(){
      const requestData={
        username: this.form.username,
        password: sha1(this.form.password),
        code: this.form.code
      }
      this.$store.dispatch("account/registerAction",requestData).then(response => {
        this.$message.success(response.message);   
        this.$router.push({
          name:"Login"
        })
      }).catch(error => {

      })
    }
  }
}
</script>
<style lang="scss"></style>