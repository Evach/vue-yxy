<template>
  <div>
    <div class="search_select_out">
      <el-select v-model="value1" filterable placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value2" filterable placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input placeholder="请输入内容" v-model="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="全部（150）">
        <div class="block">
          <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :style="{ 'padding-bottom': loading ? '100px' : '20px' }"
          >
            <el-card
              class="box-card list_card"
              v-for="item in search_data.list"
              :key="item.id"
            >
              <el-row>
                <el-col :span="12">
                  <h3>{{ item.name }}</h3>
                </el-col>
                <el-col :span="12">
                  <p class="fright">发布时间：{{ item.publish }}</p>
                </el-col>
              </el-row>
              <div class="about">简介：{{ item.desc }}</div>
              <el-row>
                <div class="fright">
                  <el-button>了解详情</el-button>
                  <el-button type="primary" @click="openDialog(item.id)"
                    >立即咨询</el-button
                  >
                </div>
              </el-row>
            </el-card>
          </div>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="search_data.pageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="search_data.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="search_data.total"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="企业（100）">企业</el-tab-pane>
      <el-tab-pane label="个人（50）">个人</el-tab-pane>
    </el-tabs>
    <Dialog
      :dialogVisible="dialogVisible"
      v-on:dialogVisibleChanged="setDialogVisibles($event)"
    />
  </div>
</template>

<script>
import { getList } from "@/api/";
import Dialog from "c/dialog/";

export default {
  name: "Search",
  data() {
    return {
      loading: false,
      options1: [
        {
          value: "选项1",
          label: "智慧医疗",
        },
        {
          value: "选项2",
          label: "院内信息化",
        },
        {
          value: "选项3",
          label: "loT一体化",
        },
        {
          value: "选项4",
          label: "信息/数据服务类",
        },
        {
          value: "选项5",
          label: "便民服务",
        },
      ],
      value1: "选项1",
      options2: [
        {
          value: "选项1",
          label: "互联网医院",
        },
      ],
      value2: "选项1",
      search: "",

      search_data: {},
      currentPage: 1,
      dialogVisible: false,
      referId: "",
    };
  },
  components: {
    Dialog,
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.search_data.pageSize = val;

      this.getSearchList({ pageNo: this.search_data.pageNo, pageSize: val });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.search_data.pageNo = val;
      this.getSearchList({ pageNo: val, pageSize: this.search_data.pageSize });
    },
    getSearchList(data) {
      this.loading = true;
      getList(data)
        .then((res) => {
          if (res.code == 200) {
            this.search_data = res.data;
          }
        })
        .catch((err) => Promise.reject(err))
        .finally(() => {
          this.loading = false;
        });
    },
    openDialog(id) {
      this.referId = id;
      this.dialogVisible = true;
    },
    setDialogVisibles(m) {
      this.dialogVisible = m;
    },
  },
  mounted() {
    // console.log(this.$route.query.keyword); //获取用户搜索关键词

    this.getSearchList();
  },
};
</script>

<style lang="scss" scoped>
.fright {
  float: right;
}

.search_select_out {
  margin-bottom: 30px;
}

.el-select {
  margin-right: 20px;
}

.el-input {
  width: 300px;
}

.about {
  margin: 10px 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.list_card {
  margin-bottom: 10px;
}
</style>
