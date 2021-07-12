import Vue from "vue";
Vue.filter("getArtcleTop", articleMain =>
  articleMain.top ? "置顶" : articleMain.good ? "精华" : ""
);
