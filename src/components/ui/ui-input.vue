<template>
  <div class="ui-input" :class="{ error: hasError }">
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-if="mask"
      v-maska="mask"
      masked="false"
      ref="input"
    />
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-else
      ref="input"
    />
    <label
      class="ui-input__label"
      :class="{ top: labelTop }"
      @click="() => input.focus()"
    >
      {{ label }}</label
    >
    <span class="ui-input__help">{{ help }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import { mask as vMaska } from "vue-the-mask";

const props = defineProps({
  modelValue: { type: String, required: true },
  pattern: { type: String, required: false },
  type: { type: String, required: false, default: "text" },
  hasError: { type: Boolean, required: false, default: false },
  label: { type: String, required: false, default: "" },
  help: { type: String, required: false, default: "" },
  mask: { type: String, required: false, default: "" },
});

defineEmits(["update:modelValue"]);

const input = ref(null);

const labelTop = computed(() => {
  return !!props.modelValue;
});
</script>

<style lang="scss">
@mixin top-label {
  top: -7px;
  left: 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  padding: 0px 4px;
}
.ui-input {
  position: relative;
  padding-bottom: 18px;
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 14px 16px;
    height: 54px;
    border: 1px solid v.$light-gray;
    border-radius: 4px;
    width: 100%;
    &:focus + label {
      @include top-label();
    }
  }
  &__label {
    position: absolute;
    top: 14px;
    left: 16px;
    color: v.$dark-gray;
    transition: font-size 0.3s ease-in, top 0.3s, left 0.3s;
    background-color: v.$bg;
    cursor: pointer;
    &.top {
      @include top-label();
    }
  }
  &__help {
    position: absolute;
    color: v.$dark-gray;
    font-size: 12px;
    line-height: 14px;
    bottom: 0px;
    left: 16px;
  }
  &.error {
    * {
      color: v.$red;
    }
    input {
      border-color: v.$red;
      border-width: 2px;
      color: black;
    }
  }
}
</style>
