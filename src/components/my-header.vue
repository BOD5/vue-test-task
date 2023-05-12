<template>
  <header>
    <div class="container">
      <img src="@/assets/images/Logo.svg" class="logo" alt="" />
      <div class="buttons">
        <my-button>Users</my-button>
        <my-button>Sign up</my-button>
      </div>
    </div>
  </header>
</template>

<script>
import myButton from "./ui/my-button.vue";
export default {
  components: { myButton },
};
</script>

<style lang="scss">
header {
  height: 60px;
  width: 100%;
  padding: 13px 0px;
  background-color: white;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    height: 26px;
    width: 104px;
    object-fit: contain;
  }

  .buttons {
    display: flex;
    gap: 10px;
  }
}
</style>
