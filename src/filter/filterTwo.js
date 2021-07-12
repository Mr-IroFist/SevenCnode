import Vue from "vue";
Vue.filter("getArticleTab", articleMain =>
  articleMain.tab === "share"
    ? "分享"
    : articleMain.tab === "ask"
    ? "问答"
    : articleMain.tab === "job"
    ? "招聘"
    : "客户端测试"
);
