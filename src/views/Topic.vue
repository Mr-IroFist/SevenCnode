<template>
  <div class="topic">
    <Panel>
      <template #header>
        <router-link class="to-main" to="/">主页 </router-link>
        <span> / </span>
        <span> 发布话题</span>
      </template>
      <template #content>
        <div class="content-top">
          <p class="select-p">选择版块：</p>
          <el-select
            class="select"
            v-model="value"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <el-input
          v-model="title"
          class="title-input"
          placeholder="标题字数 10 字以上"
        />
        <br />
        <Editor
          api-key="9mieih2cqsubf30b1omff3w107ojvjfvzhmb7haq4giiy754"
          :init="{
            height: 500,
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
        <el-button @click="topicSubmit" class="submit-btn" type="danger"
          >提交</el-button
        >
      </template>
    </Panel>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Panel from "../layout/Panel.vue";
export default {
  components: { Panel, Editor },
  name: "Topic",
  data() {
    return {
      options: [
        {
          value: "share",
          label: "分享",
        },
        {
          value: "ask",
          label: "问答",
        },
        {
          value: "job",
          label: "招聘",
        },
        {
          value: "dev",
          label: "客户端测试",
        },
      ],
      value: "",
      title: "",
    };
  },
  methods: {
    topicSubmit() {
      const activeEditor = tinymce.activeEditor;
      const editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      const text = activeEditor.selection.getContent({ format: "text" });
      const token = sessionStorage.getItem("token");
      this.$axios
        .post("/topics", {
          accesstoken: token,
          title: this.title,
          tab: this.value,
          content: text,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.topic {
  margin-top: 20px;
  .to-main {
    text-decoration: none;
    font-size: 14px;
    color: #f00056;
  }
  span {
    color: #ffe4e1;
    font-size: 14px;
  }
  .content-top {
    display: flex;
    line-height: 50px;
    .select-p {
      color: #f00056;
      font-size: 14px;
      margin: 0;
    }
  }
  .title-input {
    height: 30px;
    display: block;
  }
  .submit-btn {
    margin-top: 40px;
  }
}
</style>