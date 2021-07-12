<template>
  <div class="big-box">
    <div v-if="!infoPath" class="home">
      <Panel>
        <template #header>
          <div class="nav">
            <router-link
              :class="{ 'router-link-exact-active': exactActiveColor }"
              to="/all"
              >全部</router-link
            >
            <router-link to="/good">精华</router-link>
            <router-link to="/share">分享</router-link>
            <router-link to="/ask">问答</router-link>
            <router-link to="/job">招聘</router-link>
            <router-link to="/dev">客户端测试</router-link>
          </div>
        </template>
        <template #content>
          <div v-if="posts.length" class="list">
            <div class="post-item" v-for="post in posts" :key="post.id">
              <router-link
                :to="{
                  name: 'user',
                  params: { username: post.author.loginname },
                }"
                ><img
                  :title="post.author.loginname"
                  :src="post.author.avatar_url"
                  alt=""
                  @click="inUser(post.author.loginname)"
              /></router-link>
              <span class="details">
                <span class="small">{{ post.reply_count }}/</span>
                <span class="big">{{ post.visit_count }}</span>
              </span>
              <!-- 当处于首页或者文章是置顶或者是精华的时候 tab 会出现 -->
              <span
                v-if="tab === 'all' || post.good || post.top || !tab"
                :class="post.top || post.good ? 'active-tab' : 'tab'"
                >{{ post | getPostTabCn }}</span
              >
              <router-link
                :title="post.title"
                class="post-title"
                to="/topic/article"
                ><button @click="articleIn(post.id,post.author.loginname)">
                  {{ post.title }}
                </button></router-link
              >
              <span class="from-time"
                >{{ $moment(post.last_reply_at).fromNow(true) }}前</span
              >
            </div>
            <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              :total="articleTotal"
              :current-page.sync="currentPage"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </template>
      </Panel>
    </div>
    <div v-if="infoPath" class="message-box">
      <div class="new-info">
        <Panel>
          <template #header>
            <router-link to="/">主页</router-link>
            <span> / </span>
            <span>新消息</span>
          </template>
          <template #content>
            <p>无消息</p>
          </template>
        </Panel>
      </div>
      <div class="old-info">
        <Panel>
          <template #header>
            <span>过往消息</span>
          </template>
          <template #content>
            <p v-if="!messageInfros">无消息</p>
            <div
              class="message-list"
              v-else
              v-for="list in messageInfros"
              :key="list.id"
            >
              <div v-if="list.has_read" class="lists">
                <p class="user-name">{{ list.author.loginname }}</p>
                <p>回复了你的话题</p>
                <p class="title">{{ list.topic.title }}</p>
              </div>
            </div>
          </template>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  name: "Home",
  data() {
    return {
      // posts: [],
      pageTotalList: {},
      counts: {
        articleCounts: 680,
        goodCounts: 680,
        shareCounts: 420,
        askCounts: 260,
        jobCounts: 210,
        devCounts: 360,
      },
      currentPage: 1,
    };
  },
  computed: {
    exactActiveColor() {
      return ["/", "/all"].includes(this.$route.path);
    },
    tab() {
      return this.$route.params.tab;
    },
    posts() {
      return this.$store.state.posts;
    },
    articleTotal() {
      const { path } = this.$route;
      const { counts } = this;
      return path === "/all" || path === "/"
        ? counts.articleCounts
        : path === "/good"
        ? counts.goodCounts
        : path === "/share"
        ? counts.shareCounts
        : path === "/ask"
        ? counts.askCounts
        : path === "/job"
        ? counts.jobCounts
        : counts.devCounts;
    },
    infoPath() {
      return this.$route.path === "/info";
    },
    messageInfros() {
      return this.$store.state.messageInfro;
    },
  },
  // 通过监听动态路由参数，获取对应的分类数据
  watch: {
    tab: {
      async handler(newValue) {
        this.currentPage = 1;
        sessionStorage.removeItem("currentPage");
        if (newValue) {
          // var res = await this.$axios.get(
          //   `/topics?page=1&limit=40&tab=${newValue}`
          // );
          this.$store.dispatch({
            type: "getPosts",
            tab: newValue,
            currentPage: this.currentPage,
          });
        } else {
          // var res = await this.$axios.get("/topics?page=1&limit=40");
          this.$store.dispatch({ type: "getPosts", tab: "" });
        }
        // this.posts = res.data;
      },
      immediate: true,
    },
  },

  created() {
    this.currentPage = sessionStorage.getItem("currentPage");
    const token = sessionStorage.getItem("token");
    if (token) {
      this.$store.dispatch({ type: "getMessageInfro", token: token });
    }
  },
  methods: {
    articleIn(id,name) {
      sessionStorage.setItem("username",name)
      this.$store.dispatch({ type: "getArticle", articleid: id });
      sessionStorage.setItem("articleId", id);
    },
    currentChange() {
      const { path } = this.$route;
      let tab = "";
      path === "/all" || path === "/"
        ? (tab = "all")
        : path === "/good"
        ? (tab = "good")
        : path === "/share"
        ? (tab = "share")
        : path === "/ask"
        ? (tab = "ask")
        : path === "/job"
        ? (tab = "job")
        : (tab = "dev");
      this.$store.dispatch({
        type: "getPosts",
        tab: tab,
        currentPage: this.currentPage,
      });
      sessionStorage.setItem("currentPage", this.currentPage);
    },
    inUser(name) {
      sessionStorage.setItem("username",name)
      this.$store.dispatch({ type: "getUserDetails", loginname: name });
    },
  },
};
</script>
<style lang="less">
.big-box {
  .home {
    margin-bottom: 15px;
    .nav {
      a {
        color: #ffe4e1;
        text-decoration: none;
        margin: 0 15px;
        padding: 2px 6px;
      }
      a:hover {
        color: #fff;
      }
      .router-link-exact-active {
        color: #fff;
        background-color: #f08080;
        padding: 2px 6px;
        border-radius: 7px;
      }
    }
    .list {
      width: 100%;
      .post-item {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #fffaf0;
        img {
          width: 30px;
          border: 1px solid #fff;
          border-radius: 10px;
          cursor: pointer;
        }
        .tab {
          font-size: 12px;
          background-color: #e6e6fa;
          padding: 2px 4px;
          border-radius: 5px;
          color: #aaa;
          margin-right: 10px;
        }
        .active-tab {
          font-size: 12px;
          background-color: #f08080;
          padding: 2px 4px;
          border-radius: 5px;
          color: #fff;
          margin-right: 10px;
        }
        .details {
          width: 10%;
          margin: 0 10px;
          .small {
            font-size: 14px;
            color: #666;
          }
          .big {
            font-size: 12px;
          }
        }
        .post-title {
          button {
            width: 400px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            cursor: pointer;
            background-color: transparent;
            outline: none;
            border: none;
            text-align: left;
          }
          button:hover {
            color: #ff7f50;
          }
        }
        .from-time {
          font-size: 12px;
          color: #666;
          margin-left: auto;
        }
      }
      .pagination {
        margin-top: 30px;
      }
    }
  }
  .message-box {
    span {
      color: #ffe4e1;
    }
    .new-info {
      margin-bottom: 15px;
      a {
        color: #f00056;
        text-decoration: none;
      }
    }
    .old-info {
      .message-list {
        .lists {
          display: flex;
          p {
            margin-right: 10px;
          }
          .user-name {
            color: #f00056;
            cursor: pointer;
          }
          .title {
            color: #f00056;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>