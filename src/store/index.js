import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personalData: null,
    decide: false,
    token: null,
    article: {},
    articleAuthor: {},
    posts: [],
    messageInfro: [],
    userDetails: {},
  },
  mutations: {
    getPersonalData: (state, data) => {
      state.personalData = data;
    },
    getArticle: (state, article) => {
      state.article = article;
    },
    getArticleAuthor: (state, articleAuthor) => {
      state.articleAuthor = articleAuthor;
    },
    getPosts: (state, posts) => {
      state.posts = posts;
    },
    getMessageInfro: (state, messageInfro) => {
      state.messageInfro = messageInfro;
    },
    getUserDetails: (state, user) => {
      state.userDetails = user;
    }
  },
  actions: {
    getPosts: async ({ commit }, { tab, currentPage }) => {
      const res = await axios.get(
        `/topics?page=${currentPage}&limit=40&tab=${tab}`
      );
      commit("getPosts", res.data);
    },
    getPersonalData({ commit }, { token }) {
      return new Promise((resolve, reject) => {
        const res = axios
          .post("/accesstoken", { accesstoken: token })
          .then(res => {
            commit("getPersonalData", res);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    getArticle: async ({ commit }, { articleid }) => {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(`/topic/${articleid}?accesstoken=${token}`);
      commit("getArticle", res.data);
      commit("getArticleAuthor", res.data.author);
    },
    getMessageInfro: async ({ commit }, { token }) => {
      const res = await axios.get(`/messages?accesstoken=${token}`);
      commit("getMessageInfro", res.data.has_read_messages);
    },
    getUserDetails: async ({ commit }, { loginname }) => {
      const res = await axios.get(`/user/${loginname}`);
      commit("getUserDetails", res.data);
    }
  },
  modules: {}
});
