import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleView from "../views/ArticleView.vue";
import createArticleView from "../views/createArticleView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import createAdminView from "../views/createAdmin.vue";
import AccountView from "../views/AccountView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: IndexView,
    meta: {
      title: "Accueil",
    },
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticlesView,
    meta: {
      title: "Tous les posts",
    },
  },
  {
    path: "/article/:id",
    name: "article",
    component: ArticleView,
    meta: {
      title: "Post",
    },
  },
  {
    path: "/article-create",
    name: "article-create",
    component: createArticleView,
    meta: {
      title: "Rédiger un post",
    },
  },
  {
    path: "/admin",
    component: AdminView,
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/createAdmin",
    name: "createAdmin",
    component: createAdminView,
    meta: {
      title: "Création d'un administrateur",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Inscription | Connexion",
    },
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
    meta: {
      title: "Utilisateur",
    },
  },
  {
    path: "/account/:id",
    name: "account",
    component: AccountView,
    meta: {
      title: "Mon compte",
    },
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

//change the title pour each page for the WCAG constraints described in the projetct
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
