<template>
  <div>
    <el-row :gutter="10" class="item">
      <el-col :span="24">
        <span class="label">用户名：</span>
        <span>jshofdksj</span>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="item">
      <el-col :span="24">
        <span class="label">用户类型：</span>
        <span>手机临时账号</span>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="item">
      <el-col :span="24">
        <span class="label">手机号：</span>
        <span>134****3721</span>
      </el-col>
    </el-row>
    <div style="text-align: center;">
      <router-link to="/account/completeInfo">
        <el-button type="primary">完善信息</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 15px;
}
.module {
  margin-bottom: 30px;
}
.text {
  font-style: normal;
}
.info {
  padding: 20px;
  border: solid 1px #333;
}
.item {
  margin-bottom: 15px;
}
.info .item:last-child {
  margin: 0;
}
.label {
  width: 80px;
  display: inline-block;
  text-align: right;
}
</style>
