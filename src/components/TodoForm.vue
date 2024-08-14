<script setup lang="ts">
import { useTodoListStore } from "@/stores/todoList";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useTodoListStore();
const { addItem, open } = store;
const { files } = storeToRefs(store);

const todoItem = ref("");

function createItem() {
  console.log("item", todoItem.value);
  if (!todoItem.value.length) {
    return;
  }
  addItem(todoItem.value);
  todoItem.value = "";
}
</script>

<template>
  <div>
    <form @submit.prevent="createItem">
      <input v-model="todoItem" />
      <button>Add</button>
    </form>
    <button @click="open()">Add file</button>
    <li v-for="file of files" :key="file.name">{{ file.name }}</li>
  </div>
</template>

<style lang="scss" scoped></style>
