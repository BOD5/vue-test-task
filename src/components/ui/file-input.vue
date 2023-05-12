<template>
  <div class="file-input" :class="{ error: hasError }">
    <label class="file-input__fake" :for="elId">
      <span> Upload </span>
      <span class="file-input__pl">{{ placeholder }}</span>
      <input
        type="file"
        @change="onChange"
        :multiple="multiple"
        :accept="accept"
        :id="elId"
      />
    </label>
    <span class="file-input__help"> {{ help }} </span>
  </div>
</template>

<script setup lang="ts">
import { uid } from "@/helpers/functions";
import { computed, Ref, ref, defineProps, defineEmits } from "vue";

const props = defineProps({
  hasError: { type: Boolean, required: false, default: false },
  multiple: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: "" },
  accept: { type: String, required: false },
  help: { type: String, required: false, default: "" },
  id: { type: String, required: false, default: "" },
});

const emit = defineEmits(["update:files"]);

const elId = computed(() => props.id || uid());

const files: Ref<FileList | null> = ref(null);

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!(target && target.files)) {
    return;
  }
  files.value = target.files;
  emit("update:files", props.multiple ? target.files : target.files[0]);
};

const placeholder = computed(
  () =>
    Array.from(files.value || [])
      .map((f) => f.name)
      .join(", ") || props.placeholder
);
</script>

<style lang="scss">
.file-input {
  position: relative;
  padding-bottom: 18px;
  input {
    display: none;
  }
  &__fake {
    height: 54px;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 81px 1fr;
    color: black;
    cursor: pointer;
    & > span {
      height: 100%;
      display: flex;
      align-items: center;
    }
    & > :first-child {
      justify-content: center;
      border: 1px solid black;
      border-radius: 4px 0px 0px 4px;
    }
    & > :nth-child(2) {
      border: 1px solid v.$light-gray;
      border-left: none;
      border-radius: 0px 4px 4px 0px;
      padding-left: 16px;
    }
  }
  &__pl {
    color: v.$dark-gray;
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
    .file-input {
      &__fake {
        border-color: v.$red;
        border-width: 2px;
        & > span {
          border-color: v.$red;
          border-width: 2px;
        }
      }
      &__help {
        color: v.$red;
      }
    }
  }
}
</style>
