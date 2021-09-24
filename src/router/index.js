import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {path:"/",redirect:"/login"},
    {path:"/login",name:'login',component:()=>import("../views/login")}
  
  
  
  ]
});

export default router 