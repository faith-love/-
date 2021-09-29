import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {path:"/login" ,  name:"login"  ,component:()=>import("../views/login.vue")},
    {path:"/"   ,component:()=>import("@/views/layout"),redirect:'/home',
    children:[
      {path:"home" ,  name:"home"  ,component:()=>import("../views/home")},
      {path:"qa" ,  name:"qa"  ,component:()=>import("../views/qa")},
      {path:"video" ,  name:"video"  ,component:()=>import("../views/video")},
      {path:"my" ,  name:"my"  ,component:()=>import("../views/my")},
    ]},
  ]
});

export default router 