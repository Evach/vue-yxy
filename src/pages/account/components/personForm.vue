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
    <el-form-item
      label="联系地址"
      :label-width="formLabelWidth"
      prop="linkAddr"
    >
      <el-cascader
        size="large"
        :options="options"
        v-model="person_form.linkAddr"
        @change="addressChange"
        style="width: 230px"
      >
      </el-cascader>
    </el-form-item>

    <el-form-item
      label="证件图片"
      :label-width="formLabelWidth"
      prop="identityCard"
    >
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";
import { validate } from "u/validate";
export default {
  name: "PersonForm",
  data() {
    return {
      options: regionData,
      selectedOptions: [],

      person_form: {
        name: "",
        sex: "",
        phone: "",
        email: "",
        linkAddr: "",
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
  methods: {
    addressChange(arr) {
      console.log(arr);
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    submitUpload() {
      //上传到服务器
      this.$refs.upload.submit();
    },
  },
};
</script>
