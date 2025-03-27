<template>
  <header
    class="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md"
  >
    <div class="text-xl font-bold text-gray-800">Todo List</div>

    <div>
      <button
        v-if="route?.path == '/'"
        @click="logout"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer flex items-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /> Logout
      </button>
      <button
        v-else
        @click="navigate"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
      >
        {{ isLoginPage ? "Signup" : "Login" }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const isLoginPage = computed(() => route?.path === "/login");

const navigate = () => {
  const target = isLoginPage.value ? "/signup" : "/login";
  router.push({ path: target });
};

const logout = () => {
  localStorage.removeItem("token");
  router.push({ path: "/login" });
};
</script>
