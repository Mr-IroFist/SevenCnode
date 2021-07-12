<template>
  <header>
    <span class="iconfont icon-node-js nodes"></span>
    <div class="header-nav">
      <router-link
        :class="{ 'router-link-exact-active': exactActiveColor }"
        to="/"
        ><button @click="quitUser">首页</button></router-link
      >
      <router-link class="info" to="/info"
        ><button @click="updateReply">未读消息</button
        >{{ !unMessages ? "" : unMessages }}</router-link
      >
      <router-link class="intro" to="/intro"
        ><button>新手入门</button></router-link
      >
      <router-link class="aboutWith" to="/aboutWidth"
        ><button>关于</button></router-link
      >
      <router-link class="install" to="/install"
        ><button>设置</button></router-link
      >
    </div>
    <div class="btn">
      <span @click="quit" v-if="persondlData" class="signout">退出</span>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      unMessages: null,
    };
  },
  created() {
    const submitIn = sessionStorage.getItem("submitIn");
    if (submitIn) {
      this.$store.state.decide = true;
      const token = sessionStorage.getItem("token");
      return this.$axios
        .get(`/message/count?accesstoken=${token}`)
        .then((res) => {
          this.unMessages = res.data;
        });
    }
  },
  updated() {
    const headerNav = [
      "/",
      "/info",
      "/intro",
      "/aboutWidth",
      "/install",
    ].includes(this.$route.path);
    if (headerNav) {
      sessionStorage.removeItem("articleId");
    }
  },
  computed: {
    exactActiveColor() {
      return ["/", "/all", "/good", "/share", "/ask", "/job", "/dev"].includes(
        this.$route.path
      );
    },
    persondlData() {
      return this.$store.state.decide;
    },
  },

  methods: {
    quit() {
      this.$store.state.personalData = null;
      sessionStorage.removeItem("submitIn");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("articleId");
      this.$store.state.decide = false;
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    updateReply() {
      this.currentPage = sessionStorage.getItem("currentPage");
      const token = sessionStorage.getItem("token");
      if (token) {
        this.$store.dispatch({ type: "getMessageInfro", token: token });
      } else {
        this.$store.state.messageInfro = [];
      }
    },
    quitUser() {
      sessionStorage.removeItem("username");
    },
  },
};
</script>

<style lang="less">
header {
  width: 100%;
  height: 80px;
  line-height: 80px;
  display: flex;
  padding-left: 30px;
  border-bottom: 1px solid #bc8f8f;
  margin: 0 auto;
  .nodes {
    font-size: 30px;
    color: #ff4500;
    margin-right: 20px;
  }
  .header-nav {
    display: flex;
    width: 50%;
    a {
      button {
        color: #ff7f50;
        text-decoration: none;
        margin: 0 10px;
        font-size: 1em;
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
      }
      button:hover {
        color: #6a8372;
      }
    }

    .router-link-exact-active {
      color: #6a8372;
    }
  }
  .btn {
    color: #ff6347;
    margin: 0 20px;
    font-weight: bolder;
    cursor: pointer;
    margin-left: auto;
  }
}
</style>