<template>
  <div class="h-full flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <span
        class="text-2xl font-bold mb-6 flex items-center justify-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'user']" /> Login</span
      >
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>
        <button
          type="submit"
          :class="`w-full text-white py-2 flex items-center justify-center cursor-pointer rounded ${
            isLoading ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'
          }`"
        >
          <Loader v-if="isLoading" />
          <span v-else>Login</span>
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Don’t have an account?
        <router-link to="/signup" class="text-blue-500 hover:underline">
          Sign up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../api/auth";
import Loader from "../components/Loader.vue";

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errors = ref({});
const router = useRouter();

const validateForm = () => {
  const err = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    err.email = "Email is required";
  } else if (!emailPattern.test(email.value)) {
    err.email = "Invalid email format";
  }

  if (!password.value) {
    err.password = "Password is required";
  } else if (password.value.length < 6) {
    err.password = "Password must be at least 6 characters";
  }

  errors.value = err;
  return Object.keys(err).length === 0;
};

const handleLogin = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    const res = await login(email.value, password.value);
    localStorage.setItem("token", res.data.token);
    setTimeout(() => router.push("/"), 500);
  } catch (err) {
    errors.value.password = err.response.data ?? "Invalid credentials";
  } finally {
    isLoading.value = false;
  }
};
</script>
