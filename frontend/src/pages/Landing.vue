<template>
  <div class="p-4 w-full flex flex-col items-center gap-y-4">
    <ListContainer
      :todos="todos"
      :handleDeleteTask="handleDeleteTask"
      :deleteLoading="deleteLoading"
      :fetchLoading="fetchLoading"
    />
    <AddTask :handleAddTask="handleAddTask" :addTaskLoading="addTaskLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ListContainer from "../components/Landing/ListContainer.vue";
import AddTask from "../components/Landing/AddTask.vue";
import { addTask, deleteTask, getAllTasks } from "../api/tasks";

const todos = ref([]);
const deleteLoading = ref("");
const fetchLoading = ref(false);
const addTaskLoading = ref(false);

const handleFetchAllTasks = async () => {
  fetchLoading.value = true;
  await getAllTasks(localStorage.getItem("token"))
    .then((res) => {
      todos.value = res.data;
    })
    .catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    })
    .finally(() => (fetchLoading.value = false));
};

const handleAddTask = async (text) => {
  addTaskLoading.value = true;
  await addTask(localStorage.getItem("token"), { text })
    .then((res) => {
      todos.value.push(res.data);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    })
    .finally(() => (addTaskLoading.value = false));
};

const handleDeleteTask = async (id) => {
  deleteLoading.value = id;
  await deleteTask(localStorage.getItem("token"), id)
    .then((res) => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    })
    .finally(() => (deleteLoading.value = ""));
};
onMounted(() => {
  handleFetchAllTasks();
});
</script>
