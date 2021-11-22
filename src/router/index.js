import {
  createRouter, // 新建路由 
  createWebHistory // 配置hash路由模式
} from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "AboutPage",
    component: About
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;