<template>
  <li
    class="flex items-center justify-between p-3 bg-white shadow rounded hover:scale-102 transition-all duration-200"
  >
    <span>
      {{ props.text }}
    </span>
    <button
      @click="props.handleDeleteTask(props.id)"
      class="p-4 shadow-lg rounded-md cursor-pointer"
    >
      <Loader v-if="props.deleteLoading === props.id" />
      <font-awesome-icon v-else :icon="['fas', 'trash']" class="text-red-500" />
    </button>
  </li>
</template>
<script setup>
import Loader from "../Loader.vue";
const props = defineProps(["id", "text", "handleDeleteTask", "deleteLoading"]);
</script>
