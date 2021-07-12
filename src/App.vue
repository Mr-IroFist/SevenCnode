<template>
  <div class="app">
    <Header />
    <div v-if="!sideShow" class="main">
      <router-view class="left" />
      <SideInformation
        v-if="
          !(
            $route.path == '/topic/article' ||
            $route.path.includes('/topic/user')
          )
        "
        class="right"
      />
    </div>
    <router-view name="topic" />
    <router-view name="article" />
    <router-view name="users" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import SideInformation from "./components/SideInformation.vue";
export default {
  components: { Header, SideInformation },
  computed: {
    sideShow() {
      return this.$route.path === "/topic/create";
    },
  },
};
</script>
<style lang="less">
.app {
  width: 1170px;
  margin: 0 auto;
  .main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .left {
      width: 70%;
    }
    .right {
      width: 28%;
    }
  }
}
</style>


