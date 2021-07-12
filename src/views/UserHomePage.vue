<template>
  <div v-if="userDetail.recent_topics" class="user-home-page">
    <div class="left">
      <Panel>
        <template #header>
          <router-link to="/">主页 </router-link>
          <span>/</span>
        </template>
        <template #content>
          <div class="top">
            <img :src="userDetail.avatar_url" alt="" />
            <h5>{{ userDetail.loginname }}</h5>
          </div>
          <p>{{ userDetail.score }} 积分</p>
          <p>注册时间 {{ $moment(userDetail.create_at).fromNow(true) }} 前</p>
        </template>
      </Panel>
      <div class="topics top-mid">
        <Panel>
          <template #header>
            <span>最近创建的话题</span>
          </template>
          <template #content>
            <div
              class="list"
              v-for="list in userDetail.recent_topics.slice(0, 5)"
              :key="list.id"
            >
              <div class="user-topics">
                <img :src="list.author.avatar_url" alt="" />
                <router-link to="/topic/article"
                  ><p @click="articleIn(list.id)">
                    {{ list.title }}
                  </p></router-link
                >
              </div>
              <div class="at-time">
                <p>{{ $moment(list.last_reply_at).fromNow(true) }}</p>
              </div>
            </div>
            <a href="#">查看更多</a>
          </template>
        </Panel>
      </div>
      <div class="replies top-mid">
        <Panel>
          <template #header>
            <span>最近参与的话题</span>
          </template>
          <template #content>
            <div
              class="list"
              v-for="list in userDetail.recent_replies"
              :key="list.id"
            >
              <div class="user-topics">
                <img :src="list.author.avatar_url" alt="" />
                <router-link to="/topic/article"
                  ><p @click="articleIn(list.id)">
                    {{ list.title }}
                  </p></router-link
                >
              </div>
              <div class="at-time">
                <p>{{ $moment(list.last_reply_at).fromNow(true) }}</p>
              </div>
            </div>
            <a href="#">查看更多</a>
          </template>
        </Panel>
      </div>
    </div>
    <div class="right">
      <Panel>
        <template #header>
          <span>个人信息</span>
        </template>
        <template #content>
          <div class="top">
            <img :src="userDetail.avatar_url" alt="" />
            <h5>{{ userDetail.loginname }}</h5>
          </div>
          <p>积分：{{ userDetail.score }}</p>
        </template>
      </Panel>
    </div>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel },
  computed: {
    userDetail() {
      return this.$store.state.userDetails;
    },
  },
  created() {
    const name = sessionStorage.getItem("username");
    this.$store.dispatch({ type: "getUserDetails", loginname: name });
  },
  methods: {
    articleIn(id) {
      this.$store.dispatch({ type: "getArticle", articleid: id });
      sessionStorage.setItem("articleId", id);
    },
  },
};
//d36e63d5-f41d-4530-8b3f-b14a16bc2ef4
</script>

<style lang="less">
.user-home-page {
  width: 1170px;
  display: flex;
  justify-content: space-between;
  span {
    color: #ffe4e1;
  }
  .left {
    width: 70%;
    .top-mid {
      margin: 10px 0;
      .list {
        display: flex;
        margin: 15px 0;
        justify-content: space-between;
        border-bottom: 1px solid #ffe4e1;
        .user-topics {
          display: flex;
          img {
            width: 30px;
            height: 30px;
            border-radius: 5px;
          }
          p {
            margin: 0 15px;
          }
        }
      }
      a {
        color: #f00056;
      }
    }
    a {
      font-size: 16px;
      color: #ffe4e1;
      text-decoration: none;
    }
    .top {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
      h5 {
        color: #f00056;
        margin-left: 15px;
        font-size: 14px;
      }
    }
    p {
      margin: 5px 0;
      color: #f00056;
      font-size: 14px;
    }
  }
  .right {
    width: 28%;
    .top {
      display: flex;
      img {
        width: 48px;
        height: 48px;
        border-radius: 5px;
      }
      h5 {
        color: #f00056;
        margin-left: 15px;
        font-size: 16px;
      }
    }
    p {
      margin: 5px 0;
      color: #f00056;
      font-size: 14px;
    }
  }
}
</style>