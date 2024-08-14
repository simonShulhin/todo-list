<script setup>
import { useTodoListStore } from "@/stores/todoList";
import { storeToRefs } from "pinia";

const store = useTodoListStore();
// const { todoList } = storeToRefs(store);
const { todoList } = store;
const { toggleCompleting, deleteItem, updateEditMode } = store;

let currentItem = "";

function editItem(id, item) {
  updateEditMode(id, item);
  currentItem = "";
}
</script>

<template>
  <div>
    <ul class="list">
      <li
        v-for="{ item, id, completed, editMode } in todoList"
        :key="id"
        class="list-item"
      >
        <input v-if="editMode" :value="item" @input="currentItem = $event.target.value" />
        <p
          v-else
          :class="completed ? 'completed' : 'in-progress'"
          @click="toggleCompleting(id)"
        >
          {{ item }}
        </p>
        <button @click.stop="editItem(id, currentItem)">edit</button>
        <button @click.stop="deleteItem(id)">delete</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .list-item {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    gap: 10px;

    p,
    input {
      flex: 1;
    }
  }

  .completed {
    text-decoration: line-through;
  }
}
</style>
