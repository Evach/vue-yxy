<template>
  <div class="aside_wrapper">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      background-color="#324157"
      :default-active="$route.path"
      :default-openeds="defaultOpenIndex"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :collapse="isCollapse"
      router
    >
      <template v-for="item in routes">
        <el-submenu :index="item.path" :key="item.name">
          <template slot="title" :index="item.path">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>

          <template v-for="(child, index) in item.children">
            <el-menu-item
              :key="child.name"
              :index="child.path"
              :class="
                selectedSubmenuIndex === index &&
                selectedSubmenuPath === item.path
                  ? 'active'
                  : ''
              "
              @click="setPath(item.path, child.path, index)"
              >{{ child.meta.title }}</el-menu-item
            >
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { asyncRoutes } from "@/router";
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false,
      routes: asyncRoutes,
      defaultOpenIndex: [],
      // current: "",
      // currentPath: "",
    };
  },
  computed: {
    ...mapGetters(["selectedSubmenuIndex", "selectedSubmenuPath"]),
  },
  mounted() {
    const path = this.$route.path.split("/").slice(1);
    let _index = 0;
    this.routes.forEach((el, index) => {
      this.defaultOpenIndex.push(el.path);
      if (el.path === path[1]) {
        _index = index;
      }
    });

    this.$store.dispatch("app/selectedSubmenu", {
      index: _index,
      item: "/" + path[0],
    });
  },
  methods: {
    setPath(item, child, index) {
      this.$router.push(`${item}/${child}`);
      // this.current = index;
      // this.currentPath = item;
      this.$store.dispatch("app/selectedSubmenu", { index, item });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.aside_wrapper ::v-deep .el-submenu .el-menu-item.active {
  background: #999 !important;
}
</style>
