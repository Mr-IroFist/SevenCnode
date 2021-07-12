import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Topic from "../views/Topic.vue";
import ArticleMain from "../views/ArticleMain.vue";
import User from "../views/UserHomePage.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/topic/article",
    components: {
      article: ArticleMain
    },
    name: "article"
  },
  {
    path: "/topic/user/:username",
    components: {
      users: User
    },
    name: "user"
  },
  {
    path: "/topic/create",
    name: "Topic",
    components: {
      topic: Topic
    }
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:tab",
    component: Home
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
