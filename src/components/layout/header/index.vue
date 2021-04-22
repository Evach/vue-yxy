<template>
  <el-row class="header" justify="space-between">
    <el-col :span="12">
      <router-link to="/home"><h1>众包</h1> </router-link>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light header_right">
        <el-row>
          <el-button>我要发布</el-button>

          <el-button>我的咨询</el-button>

          <span style="margin-left:20px">{{ username }}</span>
          <el-button @click="logout">退出登录</el-button>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getStore } from "u/store";
export default {
  data() {
    return {
      username: getStore("username"),
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  margin: 20px 0;

  h1 {
    height: 40px;
    margin: 0;
  }

  .header_right {
    float: right;
  }
}
</style>
