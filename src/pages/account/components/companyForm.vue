<template>
  <el-form :model="refer_form" :rules="refer_rules">
    <el-form-item
      label="企业名称"
      :label-width="formLabelWidth"
      prop="compname"
    >
      <el-input
        v-model="refer_form.compname"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="企业法人" :label-width="formLabelWidth" prop="corp">
      <el-input
        v-model="refer_form.corp"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="社会信用代码"
      :label-width="formLabelWidth"
      prop="creditcode"
    >
      <el-input
        v-model="refer_form.creditcode"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="注册地址" :label-width="formLabelWidth" prop="regaddr">
      <el-input
        v-model="refer_form.regaddr"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="联系方式" :label-width="formLabelWidth" prop="regaddr">
      <el-input
        v-model="refer_form.contact"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="regaddr">
      <el-input
        v-model="refer_form.email"
        placeholder=""
        style="width: 230px"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CompanyForm",
  data() {
    return {
      refer_form: {
        compname: "",
        corp: "",

        creditcode: "",
        regaddr: "",
        contact: "",
        email: "",
      },
      refer_rules: {
        compname: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        corp: [{ required: true, trigger: "blur" }],
        creditcode: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        regaddr: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
};
</script>
