<template>
  <div class="side-information">
    <DialogSignIn
      :centerDialogVisible="centerDialogVisible"
      @dialogShowIn="dialogShowIn"
    />
    <Panel>
      <template #header>
        <span class="header-information">{{
          persondlData ? "个人信息" : "未登录"
        }}</span>
      </template>
      <template #content>
        <span v-if="!persondlData">前端技术交流社区</span>
        <div v-else class="personal">
          <router-link
            :to="{
              name: 'user',
              params: { username: persondlData.loginname },
            }"
            ><img
              @click="getMyHome(persondlData.loginname)"
              :src="persondlData.avatar_url"
              alt=""
          /></router-link>
          <span>{{ persondlData.loginname }}</span>
        </div>
        <span v-if="persondlData" class="profile">这是一段简单的个人介绍</span>
        <br />
        <el-button
          v-if="!persondlData"
          class="sign-in"
          @click="centerDialogVisible = true"
          >登录</el-button
        >
      </template>
    </Panel>
    <br />
    <Panel v-if="persondlData">
      <template #header>
        <span class="release">发布</span>
      </template>
      <template #content>
        <router-link class="release-btn" to="/topic/create"
          >发布话题</router-link
        >
      </template>
    </Panel>
  </div>
</template>

<script>
import Panel from "../layout/Panel.vue";
import DialogSignIn from "./DialogSignIn.vue";
export default {
  name: "SideInformation",
  components: { Panel, DialogSignIn },
  computed: {
    persondlData() {
      return this.$store.state.personalData;
    },
  },
  data() {
    return {
      centerDialogVisible: false,
    };
  },
  methods: {
    dialogShowIn() {
      this.centerDialogVisible = false;
    },
    getMyHome(loginname) {
      sessionStorage.setItem("username", loginname);
      this.$store.dispatch({ type: "getUserDetails", loginname });
    },
  },
};
</script>

<style lang="less">
.side-information {
  .header-information {
    color: #ffe4e1;
  }
  .personal {
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
  .sign-in {
    margin-top: 20px;
    padding: 5px 20px;
    border: none;
    outline: none;
    background-color: #ff7f50;
    border-radius: 3px;
    color: #ffe4e1;
    cursor: pointer;
  }
  .release {
    color: #ffe4e1;
  }
  .release-btn {
    background-color: #ff7f50;
    outline: none;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    color: #ffe4e1;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
    margin: 10px 0;
    display: block;
    width: 100px;
  }
}
</style>