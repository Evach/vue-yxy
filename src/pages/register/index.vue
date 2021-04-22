<template>
  <div>
    <h1>注册</h1>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名">
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="ruleForm.phone">
            <i slot="prefix" class="el-icon-mobile"></i>
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
        <el-form-item prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            placeholder="请再次输入密码"
            show-password
          >
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="submitForm('ruleForm')"
            type="primary"
            style="width:100%"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { setStore } from "u/store";
import { validate } from "u/validate";

export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        phone: "",
      },
      rules: {
        username: [
          {
            required: true,
            validator: validate(
              "username",
              "用户名由4-16位字母、数字、下划线以及短横线组成。",
              "用户名不能为空！"
            ),
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: validate(
              "phone",
              "请输入正确的手机号",
              "手机号不能为空！"
            ),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: validate(
              "passWord",
              "密码由6-16位数字，字母，下划线组成",
              "密码不能为空！"
            ),
            trigger: "blur",
          },
        ],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("注册成功!");
          this.$router.push("/login");
        } else {
          console.log("error !!");
          return false;
        }
      });
    },
  },
};
</script>
