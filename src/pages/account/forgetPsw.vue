<template>
  <div class="wrapper">
    <el-form :model="psw_form" :rules="psw_rules">
      <el-form-item
        label="原始密码："
        :label-width="formLabelWidth"
        prop="old_psw"
      >
        <el-input
          type="password"
          v-model="psw_form.old_psw"
          placeholder=""
          style="width: 230px"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="新密码："
        :label-width="formLabelWidth"
        prop="new_psw"
      >
        <el-input
          type="password"
          v-model="psw_form.new_psw"
          placeholder=""
          style="width: 230px"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="确认密码："
        :label-width="formLabelWidth"
        prop="sure_psw"
      >
        <el-input
          type="password"
          v-model="psw_form.sure_psw"
          placeholder=""
          style="width: 230px"
        ></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-left:160px">
      <el-button type="primary">确认密码</el-button>
    </div>
  </div>
</template>

<script>
import { validate } from "u/validate";
export default {
  name: "ForgetPsw",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.new_psw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formLabelWidth: "120px",
      psw_form: {
        old_psw: "",
        new_psw: "",
        sure_psw: "",
      },
      psw_rules: {
        old_psw: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        new_psw: [
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
        sure_psw: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// ::v-deep .el-form-item__label {
//   width: 120px;
// }
</style>
