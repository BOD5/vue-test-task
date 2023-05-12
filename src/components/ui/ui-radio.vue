<template>
  <label class="ui-radio" :class="{ active: isActive }">
    <input
      type="radio"
      :value="value"
      v-model="model"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: false },
  value: { type: String, required: true },
});
defineEmits(["update:modelValue"]);

const model = computed(() => props.modelValue);

const isActive = computed(() => model.value === props.value);
</script>

<style lang="scss">
.ui-radio {
  display: block;
  position: relative;
  padding-left: 32px;

  cursor: pointer;
  input {
    display: none;
  }

  &::before,
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
  }
  &::before {
    top: 3px;
    left: 0px;
    width: 20px;
    height: 20px;
    border: 1px solid v.$light-gray;
    border-radius: 20px;
    transition: border 0.3s ease-in-out;
  }
  &::after {
    opacity: 0;
    top: 8px;
    left: 5px;
    width: 10px;
    height: 10px;
    border-radius: 20px;
    background-color: v.$secondary;
    transition: opacity 0.3s ease-out;
  }
  &:hover,
  &.active {
    &::before {
      border: 1px solid v.$secondary;
    }
  }
  &.active {
    &::after {
      opacity: 1;
    }
  }
}
</style>
