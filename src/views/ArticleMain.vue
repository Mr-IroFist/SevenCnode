<template>
  <div class="article-main">
    <div class="article-left">
      <Panel>
        <template #header>
          <div class="header">
            <div class="header-top">
              <div class="title-header">
                <span v-if="articleMain.top || articleMain.good" class="tabs">{{
                  articleMain | getArtcleTop
                }}</span>
                <span class="title">{{ articleMain.title }}</span>
              </div>
              <div class="details">
                <span
                  >⚪发布于{{
                    $moment(articleMain.create_at).fromNow(true)
                  }}前</span
                >
                <span>⚪作者{{ articleAuthor.loginname }}</span>
                <span>⚪{{ articleMain.visit_count }}次浏览</span>
                <span>⚪来自{{ articleMain | getArticleTab }}</span>
              </div>
            </div>
            <button v-if="isSubmitIn" @click="collectionBtn" class="collection">
              {{ articleCollect ? "取消收藏" : "收藏" }}
            </button>
          </div>
        </template>
        <template #content>
          <div v-html="articleMain.content"></div>
        </template>
      </Panel>
      <div class="reply-box">
        <Panel>
          <template #header>回复</template>
          <template #content>
            <div
              class="reply"
              v-for="(replie, index) in articleReplies"
              :key="replie.id"
            >
              <div class="reply-header">
                <div class="reply-left">
                  <img :src="replie.author.avatar_url" alt="" />
                  <p>{{ replie.author.loginname }}</p>
                  <a>{{ index + 1 }}楼</a>
                  <span>⚪</span>
                  <a>{{ $moment(replie.create_at).fromNow(true) }}前</a>
                </div>
                <span
                  ><span
                    @click="likes(replie.id, index)"
                    :class="
                      replie.is_uped
                        ? 'iconfont icon-dianzan reply-right-active'
                        : 'iconfont icon-dianzan reply-right'
                    "
                  ></span
                  >{{ replie.ups.length }}
                  <span
                    @click="editorShow(index, replie.author.loginname)"
                    class="reply-topic iconfont icon-icon_reply"
                  ></span
                ></span>
              </div>
              <span v-html="replie.content"></span>
              <div class="editor" ref="editorbox">
                <Editor
                  ref="listeditor"
                  :value="'@' + replie.author.loginname"
                  api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
                  :init="{
                    height: 160,
                    menubar: false,
                    language: 'zh_CN',
                    resize: false,
                    statusbar: false,
                    toolbar:
                      'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help',
                  }"
                />
                <el-button
                  @click="newReply(replie.id)"
                  class="reply-btn"
                  type="danger"
                >
                  回复</el-button
                >
              </div>
            </div>
          </template>
        </Panel>
      </div>
      <div v-if="isSubmitIn" class="new-reply">
        <Panel>
          <template #header> 添加回复 </template>
          <template #content>
            <Editor
              api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
              :init="{
                height: 200,
                menubar: false,
                language: 'zh_CN',
                resize: false,
                statusbar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help',
              }"
            />
            <el-button @click="newReply" class="reply-btn" type="danger">
              回复</el-button
            >
          </template>
        </Panel>
      </div>
    </div>
    <div class="article-right">
      <Panel>
        <template #header>
          <span class="author">作者</span>
        </template>
        <template #content>
          <div class="author-personal">
            <router-link
              :to="{
                name: 'user',
                params: { username: articleAuthor.loginname },
              }"
            >
              <img
                @click="getUserHome(articleAuthor.loginname)"
                :src="articleAuthor.avatar_url"
                alt=""
              />
            </router-link>
            <span>{{ articleAuthor.loginname }}</span>
          </div>
          <div class="profile">
            <span>这是一段简单的个人介绍</span>
          </div>
        </template>
      </Panel>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Panel from "../layout/Panel.vue";
export default {
  computed: {
    articleMain() {
      return this.$store.state.article;
    },
    articleCollect() {
      return this.$store.state.article.is_collect;
    },
    articleAuthor() {
      return this.$store.state.articleAuthor;
    },
    isSubmitIn() {
      return sessionStorage.getItem("submitIn");
    },
    articleReplies() {
      return this.$store.state.article.replies;
    },
  },
  data() {
    return {
      active: false,
    };
  },
  components: { Panel, Editor },

  async created() {
    const articleId = sessionStorage.getItem("articleId");
    this.$store.dispatch({ type: "getArticle", articleid: articleId });
  },
  methods: {
    editorShow(index, name) {
      this.active = true;
      this.aaa = name;
      this.$refs.editorbox[index].style.display = "block";
    },
    async collectionBtn() {
      const token = sessionStorage.getItem("token");
      if (!this.articleCollect) {
        const res = await this.$axios.post("/topic_collect/collect", {
          accesstoken: token,
          topic_id: this.$store.state.article.id,
        });
      } else {
        const res = await this.$axios.post("/topic_collect/de_collect", {
          accesstoken: token,
          topic_id: this.$store.state.article.id,
        });
      }
      const articleId = sessionStorage.getItem("articleId");
      this.$store.dispatch({ type: "getArticle", articleid: articleId });
    },
    async newReply(id) {
      const token = sessionStorage.getItem("token");
      const articleid = sessionStorage.getItem("articleId");
      const activeEditor = tinymce.activeEditor;
      const editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      const text = activeEditor.selection.getContent({ format: "text" });
      if (!this.active) {
        await this.$axios.post(`/topic/${articleid}/replies`, {
          accesstoken: token,
          content: text,
        });
      } else {
        await this.$axios.post(`/topic/${articleid}/replies`, {
          accesstoken: token,
          content: text,
          reply_id: id,
        });
        this.active = false;
      }
      const articleId = sessionStorage.getItem("articleId");
      this.$store.dispatch({ type: "getArticle", articleid: articleId });
    },
    async likes(id) {
      const token = sessionStorage.getItem("token");
      if (token) {
        await this.$axios
          .post(`reply/${id}/ups`, {
            accesstoken: token,
          })
          .then(() => {
            const articleId = sessionStorage.getItem("articleId");
            this.$store.dispatch({ type: "getArticle", articleid: articleId });
          })
          .catch(() => {
            alert("不能帮自己点赞");
          });
      } else {
        alert("点赞前先登录");
      }
    },
    getUserHome(loginname) {
      sessionStorage.setItem("username", loginname);
      this.$store.dispatch({ type: "getUserDetails", loginname });
    },
  },
};
</script>

<style lang="less">
.article-main {
  display: flex;
  justify-content: space-between;
  .article-left {
    width: 70%;
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      margin: 5px;
    }
    .header {
      width: 100%;
      display: flex;
      align-items: flex-end;
      .header-top {
        .title-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          .tabs {
            background-color: #f08080;
            padding: 2px 4px;
            font-size: 12px;
            border-radius: 3px;
            margin-right: 10px;
            color: #fff;
          }
          .title {
            font-weight: bolder;
            font-size: 22px;
          }
        }
      }
      .collection {
        padding: 5px 15px;
        margin-left: auto;
        background-color: #ff7f50;
        outline: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #ffe4e1;
      }
    }
    .details {
      display: flex;
    }
    img {
      width: 100%;
    }
    h2 {
      padding-bottom: 10px;
      border-bottom: 1px solid #fffaf0;
    }
    a {
      text-decoration: none;
      color: #0088cc;
    }
    p {
      font-size: 14px;
      line-height: 30px;
    }
    .reply-box {
      margin-top: 15px;
      .reply-btn {
        width: 80px;
        margin-top: 10px;
      }
      .reply {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #fffaf0;
        padding: 10px 0;
        .editor {
          display: none;
        }
        .reply-header {
          display: flex;
          justify-content: space-between;
          .reply-topic {
            cursor: pointer;
          }
          .reply-left {
            display: flex;
            align-items: flex-start;
            p {
              font-size: 12px;
              font-weight: bolder;
            }
            a {
              font-size: 12px;
              color: #0088cc;
              margin: 5px;
              cursor: pointer;
            }
            img {
              width: 30px;
              border-radius: 5px;
              margin-right: 10px;
            }
          }
          .reply-right {
            font-size: 16px;
            cursor: pointer;
            color: #fffaf0;
          }
          .reply-right-active {
            color: #111;
            font-size: 16px;
            cursor: pointer;
          }
        }
        p {
          margin: 0;
        }
      }
    }
    .new-reply {
      margin-top: 15px;
      .reply-btn {
        margin-top: 10px;
      }
    }
  }
  .article-right {
    width: 28%;
    display: flex;
    .author-personal {
      display: flex;
      align-items: center;
      img {
        width: 48px;
        border-radius: 5px;
        margin-right: 10px;
      }
      span {
        color: #f00056;
      }
    }
    .profile {
      display: block;
      margin-top: 20px;
      font-size: 14px;
      color: #db5a6b;
    }
  }
}
</style>