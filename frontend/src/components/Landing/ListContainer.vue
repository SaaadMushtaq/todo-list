<template>
  <div
    :class="`p-4 bg-gray-100 h-[500px] custom-scrollbar overflow-y-auto shadow-md rounded-2xl w-full max-w-[600px] ${
      props.fetchLoading || props.todos.length === 0
        ? 'flex items-center justify-center'
        : ''
    }`"
  >
    <Loader v-if="props.fetchLoading && props.todos.length === 0" />

    <ul
      v-else-if="props.todos.length > 0 && !props.fetchLoading"
      class="space-y-2"
    >
      <ListItem
        v-for="todo in props.todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :handleDeleteTask="props.handleDeleteTask"
        :deleteLoading="props.deleteLoading"
      />
    </ul>

    <div v-else class="flex items-center justify-center">
      <span class="text-gray-500">No tasks found!</span>
    </div>
  </div>
</template>

<script setup>
import Loader from "../Loader.vue";
import ListItem from "./ListItem.vue";
const props = defineProps([
  "todos",
  "handleDeleteTask",
  "deleteLoading",
  "fetchLoading",
]);
</script>
