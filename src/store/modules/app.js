import Cookies from "js-cookie";

const state = {
  size: Cookies.get("size") || "medium",
  selectedSubmenuChildPath: "",
  selectedSubmenuPath: "",
};

const mutations = {
  SET_SIZE: (state, size) => {
    state.size = size;
    Cookies.set("size", size);
  },
  SELECTED_SUBMENU: (state, { child, item }) => {
    state.selectedSubmenuChildPath = child;
    state.selectedSubmenuPath = item;
  },
};

const actions = {
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
  selectedSubmenu({ commit }, data) {
    // console.log(data);
    commit("SELECTED_SUBMENU", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
