import { login, logout } from "@/api/";
// import { getToken, setToken, removeToken } from "@/utils/auth";
import { Message } from "element-ui";
import router, { resetRouter } from "@/router";
import { setStore, getStore, removeStore } from "u/store";
const state = {
  token: getStore("token"),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.username = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(({ data }) => {
          console.log(data);
          if (data.code !== 200) {
            Message.error({
              message: data.message,
              duration: 1000,
            });
            return;
          }
          Message.success({
            message: data.message,
            duration: 1000,
          });
          // const { data } = response;
          commit("SET_TOKEN", data.token);
          commit("SET_NAME", data.username);
          setStore("token", data.token);
          setStore("username", data.username);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token)
  //       .then((response) => {
  //         const { data } = response;

  //         if (!data) {
  //           reject("Verification failed, please Login again.");
  //         }

  //         // const { roles, name, avatar, introduction } = data;
  //         const { name } = data;
  //         // roles must be a non-empty array
  //         // if (!roles || roles.length <= 0) {
  //         //   reject("getInfo: roles must be a non-null array!");
  //         // }

  //         // commit("SET_ROLES", roles);
  //         commit("SET_NAME", name);
  //         // commit('SET_AVATAR', avatar)
  //         // commit('SET_INTRODUCTION', introduction)
  //         resolve(data);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(({ data }) => {
          console.log(data);
          if (data.code !== 200) {
            Message.error({
              message: data.message,
              duration: 1000,
            });
            return;
          }
          Message.success({
            message: data.desc,
            duration: 1000,
          });

          commit("SET_TOKEN", "");
          commit("SET_NAME", "");
          removeStore("token");
          removeStore("username");
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch("tagsView/delAllViews", null, { root: true });

          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeStore("token");
      removeStore("username");
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setStore("token", token);

    const { roles } = await dispatch("getInfo");

    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
