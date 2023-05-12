<template>
  <my-header />
  <top-block />
  <div class="container">
    <get-block :refresh="refreshGet" @refreshed="refreshGet = false" />
    <post-block @success="refreshGet = true" />
  </div>
</template>

<script lang="ts" setup>
import GetBlock from "./components/get-block.vue";
import myHeader from "./components/my-header.vue";
import TopBlock from "./components/top-block.vue";
import PostBlock from "./components/post-block.vue";
import { Ref, ref } from "vue";

const refreshGet: Ref<boolean> = ref(false);
</script>

<style lang="scss">
body {
  background-color: v.$bg;
}

//reset styles
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: Nunito;
  font-size: 16px;
  line-height: 26px;
  font-weight: 400;
}
h1 {
  font-size: 40px;
  line-height: 40px;
}
section {
  margin: 140px 0px;
}
</style>
