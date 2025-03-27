<template>
  <div
    :class="
      !showAddTask
        ? 'w-full max-w-[600px] justify-self-start'
        : 'w-full max-w-[600px] bg-gray-100 rounded-lg shadow-lg'
    "
  >
    <button
      v-if="!showAddTask"
      @click="showAddTask = !showAddTask"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="text-white" />Add Task
    </button>
    <form
      v-else
      @submit.prevent="addTask"
      class="flex items-center gap-2 p-3 rounded-lg"
    >
      <input
        v-model="newTask"
        placeholder="Add a new task"
        class="flex-1 p-2 outline-none border-none bg-white rounded"
      />
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click.stop.prevent="showAddTask = !showAddTask"
          class="px-4 py-2 bg-red-500 text-white cursor-pointer rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          :class="`w-full text-white px-4 py-2 flex items-center justify-center gap-2 cursor-pointer rounded ${
            addTaskLoading ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'
          }`"
        >
          <Loader v-if="props.addTaskLoading" />
          <font-awesome-icon
            v-if="!addTaskLoading"
            :icon="['fas', 'plus']"
            class="text-white"
          />
          <span v-if="!addTaskLoading">Add</span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Loader from "../Loader.vue";

const props = defineProps(["handleAddTask", "addTaskLoading"]);

const newTask = ref("");
const showAddTask = ref(false);

const addTask = async () => {
  if (newTask.value.trim() === "") return;
  await props.handleAddTask(newTask.value);
  newTask.value = "";
  showAddTask.value = false;
};
</script>
