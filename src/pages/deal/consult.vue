<template>
  <div id="consult">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <consult-table></consult-table>
      </el-tab-pane>
      <el-tab-pane label="待回复" name="wait">
        <consult-table></consult-table>
      </el-tab-pane>
      <el-tab-pane label="已回复" name="replied">
        <consult-table></consult-table>
      </el-tab-pane>
      <el-tab-pane label="已拒绝" name="refused">
        <consult-table></consult-table>
      </el-tab-pane>
      <el-tab-pane label="已评价" name="recommended">
        <consult-table></consult-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ConsultTable from "./components/consultTable";
export default {
  name: "Consult",
  components: {
    ConsultTable,
  },
  data() {
    return {
      activeName: "all",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style></style>
