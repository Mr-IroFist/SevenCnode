<template>
  <div class="dialog-sign-in">
    <el-dialog
      title="登录"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="main">
        <span>accessToken</span>
        <el-input v-model="accessToken"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('dialogShowIn')">取 消</el-button>
        <el-button
          class="sure"
          type="primary"
          plain
          @click="
            close();
            submit();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogSignIn",
  props: ["centerDialogVisible", "accesstoken"],
  data() {
    return {
      accessToken: "",
    };
  },
  methods: {
    close() {
      this.$emit("dialogShowIn");
    },
    submit() {
      const token = this.accessToken;
      this.$store
        .dispatch("getPersonalData", { token })
        .then(() => {
          sessionStorage.setItem("submitIn", true);
          sessionStorage.setItem("token", this.accessToken);
        })
        .catch(() => {
          this.$notification.error({
            title: "错误",
            message: "密钥输入错误，请重新输入！",
          });
        });
      this.$store.state.decide = true;
      this.$store.state.token = token;
    },
  },
  created() {
    var submitIn = sessionStorage.getItem("submitIn");
    if (submitIn) {
      const token = sessionStorage.getItem("token");
      this.$store.dispatch("getPersonalData", { token });
      this.$store.state.decide = true;
    }
  },
};
</script>

<style lang="less">
.dialog-sign-in {
  .main {
    display: flex;
    align-items: center;
    span {
      width: 40%;
      font-size: 16px;
    }
    input {
      width: 70%;
    }
  }
  .dialog-footer {
    button {
      border: 1px solid #ccc;
    }
    .sure {
      background-color: #ff7f50;
    }
  }
}
</style>