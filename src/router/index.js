import Vue from "vue";
import VueRouter from "vue-router";
import { getStore } from "u/store";
import Layout from "c/layout";
const Redirect = () => import(/*webpackChunkName:'redirect'*/ "p/redirect"); //首页
const Home = () => import(/*webpackChunkName:'home'*/ "p/home"); //首页
const Reg = () => import(/*webpackChunkName:'register'*/ "p/register"); //注册
const Login = () => import(/*webpackChunkName:'login'*/ "p/login"); //登录
const Search = () => import(/*webpackChunkName:'search'*/ "p/search"); //搜索
const Consult = () => import(/*webpackChunkName:'consult'*/ "p/deal/consult"); //咨询
const ConsultDetail = () =>
  import(
    /*webpackChunkName:'consultDetail'*/ "p/deal/components/consultDetail"
  ); //咨询详情
const EvaluateDetail = () =>
  import(
    /*webpackChunkName:'evaluateDetail'*/ "p/deal/components/evaluateDetail"
  ); //咨询评价
const ComplaintDetail = () =>
  import(
    /*webpackChunkName:'complaintDetail'*/ "p/deal/components/complaintDetail"
  ); //咨询投诉
const Order = () => import(/*webpackChunkName:'order'*/ "p/deal/order"); //订单
const Publish = () => import(/*webpackChunkName:'publish'*/ "p/deal/publish"); //发布
const User = () => import(/*webpackChunkName:'user'*/ "p/account/user"); //用户信息
// const UserInfo = () =>
//   import(/*webpackChunkName:'userInfo'*/ "p/account/components/userInfo"); //用户信息
// const CompanyInfo = () =>
//   import(/*webpackChunkName:'companyInfo'*/ "p/account/components/companyInfo"); //用户信息
const CompleteInfo = () =>
  import(
    /*webpackChunkName:'completeInfo'*/ "p/account/components/completeInfo"
  ); //用户信息

const ForgetPsw = () =>
  import(/*webpackChunkName:'forgetPsw'*/ "p/account/forgetPsw"); //忘记密码

const Error404 = () => import(/*webpackChunkName:'404'*/ "p/404"); //404
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "/home",
  // },
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: Redirect,
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Reg,

    meta: {
      title: "注册",
      hidden: true,
      // keepAlive: false
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,

    meta: {
      title: "登录",
      hidden: true,
      // keepAlive: false
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { hidden: true },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "首页",
          requireAuth: true,
          hidden: true,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/search",
    component: Layout,
    redirect: "/search/index",
    meta: { hidden: true },
    children: [
      {
        path: "index",
        name: "Search",
        component: Search,
        meta: {
          title: "搜索",
          hidden: true,
          requireAuth: true,
        },
      },
    ],
  },

  {
    path: "*",
    component: Error404,
  },
];

export const asyncRoutes = [
  {
    path: "/deal",
    component: Layout,
    redirect: "/deal/consult",
    name: "Deal",
    meta: { title: "交易管理" },
    children: [
      {
        path: "consult",
        name: "Consult",
        component: Consult,
        meta: {
          title: "咨询",
          requireAuth: true,
        },
      },
      {
        path: "consult/detail",
        name: "ConsultDetail",
        component: ConsultDetail,
        meta: {
          title: "咨询详情",
          requireAuth: true,
          hide: true,
        },
      },
      {
        path: "consult/evaluate",
        name: "EvaluateDetail",
        component: EvaluateDetail,
        meta: {
          title: "咨询评价",
          requireAuth: true,
          hide: true,
        },
      },
      {
        path: "consult/complaint",
        name: "ComplaintDetail",
        component: ComplaintDetail,
        meta: {
          title: "咨询投诉",
          requireAuth: true,
          hide: true,
        },
      },
      {
        path: "order",
        name: "Order",
        component: Order,
        meta: {
          title: "订单",
          requireAuth: true,
        },
      },
      {
        path: "publish",
        name: "Publish",
        component: Publish,
        meta: {
          title: "投诉",
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/account",
    component: Layout,
    redirect: "/account/user",
    name: "Account",
    meta: { title: "账户管理" },
    children: [
      {
        path: "user",
        name: "User",
        component: User,
        meta: {
          title: "账号信息",
          requireAuth: true,
        },
      },
      // {
      //   path: "/account/userInfo",
      //   name: "UserInfo",
      //   component: UserInfo,
      //   meta: {
      //     title: "账号信息（个人）",
      //     requireAuth: true,
      //     hide: true,
      //   },
      // },
      // {
      //   path: "/account/companyInfo",
      //   name: "CompanyInfo",
      //   component: CompanyInfo,
      //   meta: {
      //     title: "账号信息（企业）",
      //     requireAuth: true,
      //     hide: true,
      //   },
      // },
      {
        path: "/account/completeInfo",
        name: "CompleteInfo",
        component: CompleteInfo,
        meta: {
          title: "设置账号信息",
          requireAuth: true,
          hide: true,
        },
      },
      {
        path: "forgetPsw",
        name: "ForgetPsw",
        component: ForgetPsw,
        meta: {
          title: "忘记密码",
          requireAuth: true,
        },
      },
    ],
  },
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    mode: "history",
    base: process.env.BASE_URL,
    routes: [...routes, ...asyncRoutes],
  });

const router = createRouter();

// 动态标题 + 登录拦截
router.beforeEach((to, from, next) => {
  switch (to.path) {
    case "/login":
      next();
      break;
    case "/register":
      next();
      break;
    default:
      // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
      if (to.meta.requireAuth) {
        if (getStore("token")) {
          //向后端发送请求查看是否正常登录

          next();
        } else {
          next("/login");
        }
      } else {
        next();
      }

      break;
  }
  document.title = to.meta.title;
  next();
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
