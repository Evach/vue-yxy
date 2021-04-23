<template>
  <el-container>
    <el-header><Header></Header> </el-header>

    <el-container>
      <el-aside v-if="!hidden" width="200px"><Aside></Aside></el-aside>
      <el-main>
        <keep-alive exclude="Search">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <el-footer> </el-footer>
  </el-container>
</template>

<script>
import Header from "./header";
import Aside from "./Aside";
export default {
  name: "Layout",
  components: { Header, Aside },
  computed: {
    hidden() {
      return this.$route.meta.hidden;
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style lang="scss" scoped></style>
