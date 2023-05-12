<template>
  <form class="form-container" @submit="submitForm">
    <ui-input
      v-model="name"
      :has-error="!!fails['name']"
      :help="fails['name']?.join(', ')"
      label="Your name"
      @change="validate(nameValidator, 'name', name)"
    />
    <ui-input
      v-model="email"
      :has-error="!!fails['email']"
      :help="fails['email']?.join(', ')"
      label="Email"
      type="email"
      @change="validate(emailValidator, 'email', email)"
    />
    <ui-input
      v-model="phone"
      :has-error="!!fails['phone']"
      label="Phone"
      type="tel"
      :help="(fails['phone']?.join(', ') || '') + '+38 (XXX) XXX - XX - XX'"
      :mask="'+38(###)###-##-##'"
      @change="validate(phoneValidator, 'phone', phone)"
    />
    <div class="positions">
      <p class="positions-title">Select your position</p>
      <div class="positions-list">
        <ui-radio
          v-for="p in positions"
          :key="p.id"
          :label="p.name"
          v-model="position"
          @change="delete fails['position_id']"
          :value="'' + p.id"
        />
      </div>
      <div class="error" v-if="!!fails['position_id']">
        {{ fails["position_id"]?.join(", ") }}
      </div>
    </div>
    <file-input
      placeholder="Upload your photo"
      :accept="'image/jpeg'"
      :has-error="!!fails['photo']"
      @change="delete fails['photo']"
      :help="fails['photo']?.join(', ')"
      @update:files="(file) => (image = file)"
    />
    <div class="error error_msg">
      {{ errorMsg }}
    </div>
    <div class="button-wrapper">
      <my-button :disabled="!btnActive">Sign Up</my-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref, defineEmits, computed } from "vue";
import uiInput from "../ui/ui-input.vue";
import FileInput from "../ui/file-input.vue";
import UiRadio from "../ui/ui-radio.vue";
import MyButton from "../ui/my-button.vue";
import PositionDto from "@/types/PositionDto";
import nameValidator from "@/helpers/validations/name";
import emailValidator from "@/helpers/validations/email";
import API from "@/helpers/api";
import phoneValidator from "@/helpers/validations/phone";

const emit = defineEmits(["success"]);
const positions: Ref<PositionDto[]> = ref([]);
const position: Ref<string> = ref("");
const name: Ref<string> = ref("");
const email: Ref<string> = ref("");
const phone: Ref<string> = ref("");
const image: Ref<File | null> = ref(null);
const errorMsg: Ref<string> = ref("");
const fails: Ref<{ [key: string]: string[] }> = ref({});

const load: Ref<boolean> = ref(false);

onMounted(async () => {
  positions.value = await API.getPositions();
});

const submitForm = async (e: Event) => {
  e.preventDefault();
  load.value = true;
  const result = await API.registrate({
    name: name.value,
    email: email.value,
    phone: "+" + phone.value.replace(/\D/g, ""),
    position_id: position.value,
    photo: image.value,
  });
  load.value = false;
  if (!result) {
    errorMsg.value = "Something went wrong pleace try again later";
    return;
  }
  const { fails: f, message, user_id } = result;
  if (user_id) {
    emit("success");
    return;
  }
  errorMsg.value = message;
  if (f) {
    fails.value = f;
  }
};

const validate = (fun, param, value) => {
  const errors = fun(value);
  if (errors.length === 0) {
    delete fails.value[param];
    return;
  }
  fails.value[param] = errors;
};

const btnActive = computed(
  () =>
    !Object.keys(fails.value).length &&
    name.value &&
    email.value &&
    position.value &&
    image.value &&
    !load.value
);
</script>

<style lang="scss" scoped>
.form-container {
  max-width: 380px;
  width: 100%;
  .ui-input:not(:first-child) {
    margin-top: 32px;
  }
  .positions {
    margin-top: 25px;
    &-list {
      margin-top: 11px;
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
  }
  .file-input {
    margin-top: 47px;
  }
  .button-wrapper {
    margin-top: 32px;
    text-align: center;
  }
}
</style>
