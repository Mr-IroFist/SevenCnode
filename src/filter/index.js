import Vue from "vue";
Vue.filter("getPostTabCn", post =>
  post.top
    ? "置顶"
    : post.good
    ? "精华"
    : post.tab === "job"
    ? "招聘"
    : post.tab === "ask"
    ? "问答"
    : post.tab === "dev"
    ? "客户端测试"
    : "分享"
);
