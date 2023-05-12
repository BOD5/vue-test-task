<template>
  <section class="post-block">
    <h1>{{ text }}</h1>
    <div v-if="success">
      <img src="/images/success-image.svg" alt="success" />
    </div>
    <sign-up-form
      v-else
      @success="
        success = true;
        $emit('success');
      "
    />
  </section>
</template>

<script setup lang="ts">
import signUpForm from "./forms/sign-up-form.vue";
import { computed, defineEmits, Ref, ref } from "vue";

defineEmits(["success"]);
const success: Ref<boolean> = ref(false);

const text = computed(() =>
  success.value ? "User successfully registered" : "Working with POST request"
);
</script>

<style lang="scss">
.post-block {
  h1 {
    margin-bottom: 50px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
