<template>
  <div>
    <el-table :data="list" height="500" border style="width: 100%; ">
      <el-table-column
        prop="productName"
        label="咨询产品名称"
      ></el-table-column>
      <el-table-column prop="createTime" label="咨询时间"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column label="状态">
        <el-button icon="el-icon-back">撤销</el-button>
        <el-button type="primary" icon="el-icon-s-custom">咨询</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getConsultList } from "@/api/index";
import { Message } from "element-ui";
export default {
  name: "ConsultTable",
  data() {
    return {
      list: [],
      totalNum: 0,
      currentPage: 1,
      pageSize: 10,
    };
  },
  mounted() {
    getConsultList()
      .then((r) => {
        if (r.code !== 200) {
          Message.error(r.msg);
          return;
        }
        const {
          data: { resultList, totalNum, currentPage, pageSize },
        } = r;
        this.list = resultList;
        this.totalNum = totalNum;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
      })
      .catch((err) => Promise.reject(err));
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="scss" scoped></style>
