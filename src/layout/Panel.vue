<template>
  <div :style="{ width: width }" class="panel">
    <div class="header">
      <slot name="header" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
// 这是一个布局组件 panel
export default {
  props: {
    width: {
      type: [String, Number],
      default: "100%",
    },
  },
  computed: {
    formatWidth() {
      const { width } = this;
      return typeof width === "number"
        ? width + "px"
        : Number(width)
        ? width + "px"
        : width;
      //   return typeof width === "number" || Number(Width) ? width + "px" : width;
    },
  },
};
</script>

<style lang="less">
.panel {
  width: 100%;
  .header {
    padding: 10px;
    background-color: #FFA07A;
    border-radius: 5px 5px 0 0;
  }
  .content {
    padding: 10px;  
    background-color: #FFE4C4;
    border-radius: 0 0 5px 5px;
  }
}
</style>