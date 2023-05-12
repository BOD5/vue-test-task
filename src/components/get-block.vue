<template>
  <section class="get-block">
    <h1>Working with GET request</h1>
    <div class="card-container">
      <person-card v-for="user in usersCl" :key="user.id" :user="user" />
    </div>
    <my-button @click="loadMore" v-if="page < maxP">Show more</my-button>
  </section>
</template>

<script setup lang="ts">
import API from "@/helpers/api";
import { UserDto } from "@/types/UserDto";
import { Ref, onMounted, ref, defineProps, watch, defineEmits } from "vue";
import personCard from "./person-card.vue";
import MyButton from "./ui/my-button.vue";

const usersCl: Ref<UserDto[]> = ref([]);
const page: Ref<number> = ref(1);
const maxP: Ref<number> = ref(0);
const count: Ref<number> = ref(6);

const props = defineProps({
  refresh: { type: Boolean, requierd: false, default: false },
});
const emit = defineEmits(["refreshed"]);
watch(props, () => {
  if (!props.refresh) {
    return;
  }
  page.value = 1;
  usersCl.value = [];
  setUsers();
  emit("refreshed");
});
const setUsers = async () => {
  const response = await API.getUsers(undefined, {
    count: count.value,
    page: page.value,
  });
  if (!response) {
    return;
  }
  const { users, pageNum, totalPages } = response;
  usersCl.value = [...usersCl.value, ...users];
  page.value = pageNum;
  maxP.value = totalPages;
};

const loadMore = () => {
  page.value++;
  setUsers();
};

onMounted(async () => {
  setUsers();
});
</script>

<style lang="scss">
.get-block {
  text-align: center;
}
.card-container {
  margin: 50px 0px;
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
  @media (min-width: v.$bp-tb) {
    grid-template-columns: repeat(2, calc(1 / 2 * (100% - 16px)));
    gap: 16px;
  }
  @media (min-width: v.$bp-s) {
    grid-template-columns: repeat(3, calc(1 / 3 * (100% - 2 * 29px)));
    gap: 29px;
  }
}
</style>
