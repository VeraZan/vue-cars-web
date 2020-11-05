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
          alert('submit!');
        }
      })
    }
  }
}
</script>
<style lang="scss"></style>