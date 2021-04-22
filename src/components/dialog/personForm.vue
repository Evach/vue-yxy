<template>
  <el-form :model="person_form" :rules="person_rules">
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input
        v-model="person_form.name"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-select
        v-model="person_form.sex"
        placeholder="请选择性别"
        style="width: 230px"
      >
        <el-option label="男" value="man"></el-option>
        <el-option label="女" value="women"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
      <el-input
        v-model="person_form.phone"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input
        v-model="person_form.email"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { validate } from "u/validate";
export default {
  name: "PersonForm",
  data() {
    return {
      person_form: {
        name: "",
        sex: "",
        phone: "",
        email: "",
      },
      person_rules: {
        name: [
          {
            required: true,
            validator: validate("name", "请输入中文名", "用户名不能为空！"),
            trigger: "blur",
          },
        ],
        sex: [{ required: true, message: "请选择你的性别！", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: validate(
              "phone",
              "请输入正确的手机号！",
              "手机号不能为空！"
            ),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            validator: validate(
              "email",
              "你输入的邮箱格式有误！",
              "邮箱不能为空！"
            ),
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
};
</script>
