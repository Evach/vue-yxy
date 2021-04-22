<template>
  <div>
    <h1>登录</h1>
    <div>
      <div class="logintype">
        <span>用户类型</span>
        <el-radio v-model="radio" label="user" @change="changeLoginType"
          >账号登录</el-radio
        >
        <el-radio v-model="radio" label="phone" @change="changeLoginType"
          >手机号登录</el-radio
        >
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div v-if="usernameLogin">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名">
              <i slot="prefix" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            >
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号">
              <i slot="prefix" class="el-icon-mobile"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="verification">
            <el-input
              v-model="ruleForm.verification"
              placeholder="请输入验证码"
            >
              <i slot="prefix" class="el-icon-lock"></i>
            </el-input>
            <a @click="changeVerifyCode">{{ verifySrc }}</a>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            :loading="loading"
            :plain="true"
            @click="submitForm('ruleForm')"
            type="primary"
            style="width:100%"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import {mapGetters} from "vuex"
// import { setStore } from "u/store";

// import { login } from "@/api";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      radio: "user",
      usernameLogin: true,
      loading: false,
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
      },
      verifySrc: `123123`,
    };
  },

  methods: {
    changeLoginType() {
      this.usernameLogin = this.radio === "user" ? true : false;
    },
    changeVerifyCode() {
      this.verifySrc = "";
      let i = 0;
      while (i < 6) {
        this.verifySrc += Math.floor(Math.random() * 9);
        ++i;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", { ...this.ruleForm })
            .then(() => {
              this.$router.push("/home");
            })
            .catch((error) => Promise.reject(error))
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.changeVerifyCode();
  },
};
</script>
