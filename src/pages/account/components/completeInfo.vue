<template>
  <div>
    <div class="usertype">
      <span>用户类型</span>
      <div class="type">
        <el-radio v-model="radio" label="person">个人用户</el-radio>
        <el-radio v-model="radio" label="company">企业用户</el-radio>
      </div>
    </div>
    <person-form v-if="radio === 'person'" ref="person_form"></person-form>
    <company-form v-else ref="company_form"></company-form>
    <div class="dialog_btm">
      <el-button>取 消</el-button>
      <el-button type="primary">保 存</el-button>
    </div>
  </div>
</template>

<script>
import PersonForm from "./personForm";
import CompanyForm from "./companyForm";
export default {
  name: "CompleteInfo",
  data() {
    return {
      radio: "person",
    };
  },
  components: { PersonForm, CompanyForm },
};
</script>

<style lang="scss" scoped>
.type {
  margin: 20px;
}
</style>
