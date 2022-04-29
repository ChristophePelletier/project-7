import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import SignupView from "../views/SignupView.vue";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleView from "../views/ArticleView.vue";
import createArticleView from "../views/createArticleView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import createAdminView from "../views/createAdmin.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: IndexView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticlesView,
  },
  {
    path: "/article/:id",
    name: "article",
    component: ArticleView,
  },
  {
    path: "/article-create",
    name: "article-create",
    component: createArticleView,
  },
  {
    path: "/tests",
    name: "tests",
    component: LoginView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/createAdmin",
    name: "createAdmin",
    component: createAdminView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
