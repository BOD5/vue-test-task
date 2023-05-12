<template>
  <article class="user">
    <img
      :src="user.photo || '/images/photo-cover.svg'"
      @error="setAltImg"
      alt="user photo"
      class="user-photo"
    />
    <p class="user-name" v-tippy="{ content: user.name }">{{ user.name }}</p>
    <div class="user-desc">
      <span>{{ user.position }}</span>
      <a :href="`mailto:${user.email}`" v-tippy="{ content: user.email }">
        {{ user.email }}
      </a>
      <a
        :href="`tel:${user.phone}`"
        v-tippy="{ content: phoneFormat(user.phone) }"
      >
        {{ phoneFormat(user.phone) }}
      </a>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { UserDto } from "@/types/UserDto";
import { defineProps } from "vue";
import { directive } from "vue-tippy";

defineProps<{
  user: UserDto;
}>();

const vTippy = directive;

const setAltImg = (event) => {
  event.target.src = "./images/photo-cover.svg";
};

const phoneFormat = (phoneNumber: string) => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }

  return phoneNumber;
};
</script>

<style lang="scss" scoped>
.user {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
  &-photo {
    width: 70px;
    height: 70px;
    border-radius: 70px;
  }
  &-name {
    @include m.oneLineText;
  }
  &-desc {
    max-width: 100%;
    & > * {
      @include m.oneLineText;
    }
    a {
      color: black;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
}
</style>
