<template>
  <div v-if="res_data">
    <el-table
      :data="res_data.resultList"
      height="500"
      border
      style="width: 100%; "
    >
      <el-table-column
        prop="productName"
        label="咨询产品名称"
      ></el-table-column>
      <el-table-column prop="createTime" label="咨询时间"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span
            :class="{
              primary:
                scope.row.status === '已回复' || scope.row.status === '已评价',
              warn: scope.row.status === '待回复',
              danger: scope.row.status === '已拒绝',
            }"
            >{{ scope.row.status }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <div v-if="pageName === 'Consult'">
            <el-button icon="el-icon-back" v-if="scope.row.status == '待回复'">
              撤销
            </el-button>
            <p v-else-if="scope.row.status == '已回复'" class="button_out">
              <router-link to="/deal/consult/evaluate">
                <el-button icon="el-icon-thumb">评价</el-button>
              </router-link>
              <router-link to="/deal/consult/complaint">
                <el-button icon="el-icon-phone">投诉</el-button>
              </router-link>
            </p>
            <router-link to="/deal/consult/evaluate" v-else>
              <el-button icon="el-icon-edit">修改评价</el-button>
            </router-link>
            <router-link to="/deal/consult/detail">
              <el-button type="primary" icon="el-icon-s-custom">
                咨询详情
              </el-button>
            </router-link>
          </div>
          <div v-else-if="pageName === 'Order'">
            <el-button
              icon="el-icon-thumb"
              v-if="scope.row.status === '待回复'"
            >
              查看并回复
            </el-button>
            <el-button type="primary" icon="el-icon-s-custom">
              订单详情
            </el-button>
          </div>
          <div v-else>
            <div v-if="scope.row.status === '未发布'">
              <el-button icon="el-icon-edit">编辑</el-button>
              <el-button icon="el-icon-edit">上架发布</el-button>
            </div>
            <div
              v-else-if="
                scope.row.status === '审核中' || scope.row.status === '已发布'
              "
            >
              <el-button icon="el-icon-edit">下架</el-button>
              <el-button icon="el-icon-edit" type="primary">查看详情</el-button>
            </div>
            <div v-else-if="scope.row.status === '上架失败'">
              <el-button icon="el-icon-edit">编辑</el-button>
              <el-button icon="el-icon-edit">查看原因</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="res_data.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="res_data.pageSize"
      prev-text="上一页"
      next-text="下一页"
      layout="total, sizes, prev, pager, next, jumper"
      :total="res_data.totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "DealTable",

  props: ["res_data"],
  data() {
    return {
      pageName: this.$route.name,
    };
  },
  mounted() {
    console.log(this.pageName);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("getList", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("getList", val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~a/css/variables.scss";
.button_out {
  float: left;
  margin-right: 10px;
}
.primary {
  color: $status-normal;
}
.warn {
  color: $status-warn;
}
.danger {
  color: $status-danger;
}
</style>
