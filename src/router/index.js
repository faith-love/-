import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login")
    },
    {
      path: "/",
      name: "layout",
      component: () => import("../views/layout"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/home")
        },
        { path: "/qa", name: "qa", component: () => import("../views/qa") },
        {
          path: "/video",
          name: "video",
          component: () => import("../views/video")
        },
        { path: "my", name: "my", component: () => import("../views/my") }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search")
    },
    //配置文章列表动态路由
    {
      path: "/article/:articleId",
      name: "article",
      component: () => import("@/views/article"),
      props: true
    },
    //配置用户编辑页面
    {
      path: "/user/profile",
      name: "user-profile",
      component: () => import("@/views/user-profile")
    }
  ]
});

export default router;
