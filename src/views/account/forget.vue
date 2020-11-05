<template>
  <div class="user-container">
    <Back>
      <template v-slot:navHeaderRight>
        <router-link class="color-white opacity-4" to="/login">登录</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">      
        <el-form-item>
          <el-input v-model="form.newPassword" type="password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.confirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="button-vcode">获取验证码</button>
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-block">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Forget",
  //components: {},
  data(){
    return {
      form: {
        newPassword: '',
        confirmPassword: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
<style lang="scss"></style>