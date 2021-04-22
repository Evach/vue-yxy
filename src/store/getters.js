const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  selectedSubmenuIndex: (state) => state.app.selectedSubmenuIndex,
  selectedSubmenuPath: (state) => state.app.selectedSubmenuPath,
  roles: (state) => state.user.roles,
};
export default getters;
