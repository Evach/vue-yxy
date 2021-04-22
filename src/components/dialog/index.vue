<template>
  <el-dialog
    title="完善信息"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="setDialogVisible()"
  >
    <div class="usertype">
      <span>用户类型</span>
      <el-radio v-model="radio" label="person">个人用户</el-radio>
      <el-radio v-model="radio" label="company">企业用户</el-radio>
    </div>
    <person-form v-if="radio === 'person'" ref="person_form"></person-form>
    <company-form v-else ref="company_form"></company-form>
    <div class="dialog_btm">
      <el-button @click="setDialogVisible">取 消</el-button>
      <el-button type="primary" @click="submitDialogForm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import PersonForm from "./personForm";
import CompanyForm from "./companyForm";
export default {
  components: { PersonForm, CompanyForm },
  name: "Dialog",
  props: {
    dialogVisible: Boolean,
  },
  data() {
    return {
      radio: "person",

      dialogFormVisible: this.dialogVisible,
    };
  },
  watch: {
    dialogVisible() {
      this.dialogFormVisible = this.dialogVisible;
    },
  },
  methods: {
    setDialogVisible: function() {
      this.$emit("dialogVisibleChanged", false);
      this.$refs[`${this.radio}_form`].$children[0].resetFields();
    },
    submitDialogForm() {
      //子组件form表单
      console.log(this.$refs[`${this.radio}_form`]);
      this.$refs[`${this.radio}_form`].$children[0].validate((valid) => {
        if (valid) {
          this.setDialogVisible();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn_box {
  display: flex;
  justify-content: center;
}

.usertype {
  height: 40px;
  > span {
    width: 120px;
    display: inline-block;
    text-align: right;
    padding-right: 12px;
    box-sizing: border-box;
  }
}

.dialog_btm {
  text-align: center;
}
</style>
