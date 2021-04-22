<template>
  <div class="home_search_out">
    <el-input placeholder="请输入内容" v-model="home_search">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="toSearch"
      ></el-button>
    </el-input>

    <div>
      <router-link to="/deal"
        ><el-button type="primary">交易管理</el-button></router-link
      >
      <br />
      <br />
      <router-link to="/account"
        ><el-button type="primary">账户管理</el-button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home_search: "",
    };
  },

  methods: {
    toSearch() {
      this.$router.push({
        path: "/search",
        query: { keyword: this.home_search },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 500px;
}
.home_search_out {
  margin-bottom: 50px;
}
</style>
