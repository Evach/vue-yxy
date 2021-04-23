<template>
  <div id="publish">
    <div class="top">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"> </el-tab-pane>
        <el-tab-pane label="未发布" name="wait"> </el-tab-pane>
        <el-tab-pane label="已发布" name="published"> </el-tab-pane>
      </el-tabs>
      <el-button type="primary" class="publish_pro_btn">发布产品</el-button>
    </div>

    <deal-table
      :res_data="publish_data"
      @getList="getList"
      v-loading="loading"
    ></deal-table>
  </div>
</template>

<script>
import { getPublishList } from "@/api/index";
import DealTable from "./components/dealTable";
import { Message } from "element-ui";
export default {
  name: "Publish",
  components: {
    DealTable,
  },
  data() {
    return {
      activeName: "all",
      publish_data: {},
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
      getPublishList()
        .then((r) => {
          if (r.code !== 200) {
            Message.error(r.msg);
            return;
          }
          const {
            data: { resultList, totalNum, currentPage, pageSize },
          } = r;

          this.publish_data = {
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

<style lang="scss" scoped>
.top {
  position: relative;
}
.publish_pro_btn {
  position: absolute;
  right: 20px;
  top: 0;
}
</style>
