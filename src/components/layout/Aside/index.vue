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
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>

          <template v-for="(child, index) in item.children">
            <el-menu-item
              v-if="!child.meta.hide"
              :key="child.name"
              :index="child.path"
              :class="
                selectedSubmenuChildPath === child.path &&
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
    ...mapGetters(["selectedSubmenuChildPath", "selectedSubmenuPath"]),
  },
  mounted() {
    const path = this.$route.path.split("/").slice(1);

    this.routes.forEach((el) => {
      this.defaultOpenIndex.push(el.path);
    });

    this.$store.dispatch("app/selectedSubmenu", {
      child: path[1],
      item: "/" + path[0],
    });
  },
  methods: {
    setPath(item, child) {
      this.$router.push(`${item}/${child}`);

      this.$store.dispatch("app/selectedSubmenu", { child, item });
    },

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
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
