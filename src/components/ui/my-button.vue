<template>
  <button class="btn" :class="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
  props: {
    type: String,
    disabled: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  outline: none;
  background-color: v.$primary;
  border-radius: 50px;
  min-width: 100px;
  padding: 4px 18px;
  transition: background-color 0.3s ease-in;
  cursor: pointer;
  &:hover {
    background-color: v.$active-primary;
  }
  &:disabled {
    color: white;
    background-color: v.$gray;
    cursor: default;
  }
}
</style>
