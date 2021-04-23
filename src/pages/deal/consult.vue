<template>
  <div id="consult">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"> </el-tab-pane>
      <el-tab-pane label="待回复" name="wait"> </el-tab-pane>
      <el-tab-pane label="已回复" name="replied"> </el-tab-pane>
      <el-tab-pane label="已拒绝" name="refused"> </el-tab-pane>
      <el-tab-pane label="已评价" name="recommended"> </el-tab-pane>
    </el-tabs>
    <deal-table
      :res_data="consult_data"
      @getList="getList"
      v-loading="loading"
    ></deal-table>
  </div>
</template>

<script>
import { getConsultList } from "@/api/index";
import DealTable from "./components/dealTable";
import { Message } from "element-ui";
export default {
  name: "Consult",
  components: {
    DealTable,
  },
  data() {
    return {
      activeName: "all",
      consult_data: {},
      loading: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleClick() {
      this.getList();
    },
    getList() {
      this.loading = true;
      getConsultList()
        .then((r) => {
          if (r.code !== 200) {
            Message.error(r.msg);
            return;
          }
          const {
            data: { resultList, totalNum, currentPage, pageSize },
          } = r;

          this.consult_data = {
            resultList,
            totalNum,
            currentPage,
            pageSize,
          };
          this.loading = false;
        })
        .catch((err) => Promise.reject(err));
    },
  },
};
</script>

<style></style>
