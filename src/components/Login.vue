<script setup>
import { ref, computed } from "vue";
import Logo from "./Logo.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCookies } from "vue3-cookies";
import router from '../router';

const banner = new URL("/dance.png", import.meta.url);

const email = ref("");
const password = ref("");
const isProcessing = ref(false);

const apiValidationErrors = ref([]);

function setApiValidationErrors(value) {
  apiValidationErrors.value = value;
}

const { mobile } = useDisplay();

const logoWidth = computed(() => {
  if (mobile.value) {
    return 50;
  }
  return 198;
});

const { cookies } = useCookies();
async function login() {
  const loginEndpoint = import.meta.env.VITE_API_URL + "/login";
  const data = {
    email: email.value,
    password: password.value,
  };

  axios
    .post(loginEndpoint, data)
    .then((response) => {
      cookies.set("token", response.data.token);
      router.push({ name: "loggedIn" });
    })
    .catch((error) => {
      console.log("data eror", error.response);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setApiValidationErrors(error.response.data);
      }
      if (error.response && error.response.status >= 500) {
        toast.error("Something went wrong. Please contact the admin.");
      }
    });
}
</script>

<template>
  <v-row>
    <v-col cols="6" class="d-none d-md-flex">
      <v-sheet color="#f8eaff">
        <v-row class="pa-13 ma-0">
          <v-col cols="12">
            <a href="/">
              <Logo :width="logoWidth"></Logo>
            </a>
          </v-col>
          <v-col cols="12">
            <v-card variant="flat" border="20">
              <v-img :src="banner" cover></v-img>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div
              class="text-purple-darken-3 text-center text-h4 font-weight-bold"
            >
              Team Achieve
            </div>
            <div
              class="text-grey-darken-3 text-h5 text-center font-weight-bold shadow-sm custom-text"
            >
              Your perfect solution for funding your desires
            </div>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
    <v-col cols="12" md="6">
      <v-row class="px-3 pa-md-16 ma-0">
        <v-col cols="12" class="form-container">
          <div class="py-4 d-flex d-md-none justify-center">
            <Logo :width="logoWidth"></Logo>
          </div>
          <div
            class="text-h6 text-md-h4 text-center text-purple-darken-3 font-weight-bold"
          >
            Welcome Back
          </div>
          <div
            class="text-caption text-md-h6 text-center text-grey font-weight-regular noto-sans-secondary"
          >
            Enter your email address and password to access your account.
          </div>
          <v-card variant="flat">
            <form @submit.prevent="login">
              <v-card-text>
                <label
                  for="email"
                  class="noto-sans-secondary text-grey-darken-2"
                >
                  Email Address
                  <span class="text-red">*</span>
                </label>
                <v-text-field
                  id="email"
                  v-model="email"
                  placeholder="Enter your email"
                  type="email"
                  :error-messages="apiValidationErrors.email"
                  autocomplete="email"
                  variant="outlined"
                  density="compact"
                  single-line
                  clearable
                  required
                ></v-text-field>

                <label
                  for="password"
                  class="noto-sans-secondary text-grey-darken-2"
                >
                  Password
                  <span class="text-red">*</span>
                </label>
                <v-text-field
                  id="password"
                  v-model="password"
                  placeholder="Enter your password"
                  type="password"
                  :error-messages="apiValidationErrors.password"
                  autocomplete="current-password"
                  variant="outlined"
                  density="compact"
                  clearable
                  required
                ></v-text-field>
                <div class="d-flex justify-space-between">
                  <div class="noto-sans-secondary">
                    <!-- <v-input v-model="rememberMe" type="checkbox" label="Remember me"></v-input> -->
                    <input type="checkbox" /> Remember me
                  </div>
                  <a
                    href="#"
                    class="text-decoration-none text-purple-darken-3 noto-sans-secondary"
                  >
                    Forgot Password?
                  </a>
                </div>
              </v-card-text>

              <div class="text-center mt-6">
                <v-btn
                  class="text-none font-weight-bold noto-sans-secondary"
                  size="large"
                  color="purple-darken-3"
                  type="submit"
                  :loading="isProcessing"
                  block
                >
                  Sign in
                </v-btn>

                <div class="mt-4 text-grey-darken-1 noto-sans-secondary">
                  Don't have an account?
                  <a
                    href="#"
                    class="text-decoration-none text-purple-darken-3 font-weight-medium noto-sans-secondary"
                    >Sign up</a
                  >
                </div>
              </div>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style>
.custom-text {
  text-shadow: -2px 7px 5px #bbb;
}
.form-container {
  padding-top: 120px !important;
}
.v-messages__message,
.v-field__input,
button > .v-btn__content {
  font-family: "Noto Sans", sans-serif !important;
}

@media only screen and (max-width: 768px) {
  .form-container {
    padding-top: 12px !important;
  }
}
</style>
