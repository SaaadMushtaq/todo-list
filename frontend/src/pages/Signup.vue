<template>
  <div class="h-full flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <span
        class="text-2xl font-bold mb-6 flex items-center justify-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'user-plus']" /> Sign Up
      </span>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium">First Name</label>
          <input
            v-model="firstName"
            type="text"
            placeholder="Enter your first name"
            class="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
          />
          <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">
            {{ errors.firstName }}
          </p>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Enter your last name"
            class="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
          />
          <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">
            {{ errors.lastName }}
          </p>
        </div>

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
            placeholder="At least 8 characters"
            class="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          :class="`w-full text-white py-2 flex items-center justify-center rounded ${
            isLoading ? 'bg-gray-200' : 'bg-green-500 hover:bg-green-600'
          }`"
        >
          <Loader v-if="isLoading" />
          <span v-else>Sign Up</span>
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Already have an account?
        <router-link to="/login" class="text-blue-500 hover:underline">
          Log in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "../api/auth";
import Loader from "../components/Loader.vue";

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const isLoading = ref(false);
const errors = ref({});
const router = useRouter();

const validateForm = () => {
  const err = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName.value.trim()) {
    err.firstName = "First name is required";
  }

  if (!lastName.value.trim()) {
    err.lastName = "Last name is required";
  }

  if (!email.value) {
    err.email = "Email is required";
  } else if (!emailPattern.test(email.value)) {
    err.email = "Invalid email format";
  }

  if (!password.value) {
    err.password = "Password is required";
  } else if (password.value.length < 8) {
    err.password = "Password must be at least 8 characters";
  }

  errors.value = err;
  return Object.keys(err).length === 0;
};

const handleSignup = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  try {
    await signup(firstName.value, lastName.value, email.value, password.value);
    router.push("/login");
  } catch (err) {
    console.error(err);
    errors.value.password =
      err.response.data ?? "Signup failed. Try another email.";
  } finally {
    isLoading.value = false;
  }
};
</script>
