import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useFileDialog } from '@vueuse/core';

export const useTodoListStore = defineStore('todoList', () => {
  //state
  let currentItemId = 0;
  let id = 0;

  const todoList = reactive([]);
  // const doubleCount = computed(() => count * 2);

  const { files, open } = useFileDialog();

  // getters
  const currentItemIndex = computed(() => getIndex(currentItemId));

  // actions
  function addItem(item) {
    todoList.push({ item, id: id++, completed: false, editMode: false });
  }

  function toggleCompleting(itemId) {
    const todoItem = todoList.find(({ id }) => itemId === id);
    todoItem.completed = !todoItem.completed;
  }

  function deleteItem(itemId) {
    const index = getIndex(itemId);
    // console.log(todoList.value, todoList);
    // todoList.value = todoList.value.filter(({ id }) => id !== itemId);
    todoList.splice(index, 1);
  }

  function updateEditMode(id, item) {
    // currentItemId = id;
    // console.log("index", currentItemIndex);
    const isEditMode = todoList[getIndex(id)].editMode;

    if (isEditMode && item) {
      todoList[getIndex(id)].item = item;
    }

    todoList[getIndex(id)].editMode = !isEditMode;
  }

  // helpers
  function editItem(value) {
    todoList[currentItemIndex].item = value;
  }

  function getIndex(id) {
    return todoList.findIndex((el) => el.id === id);
  }

  return { todoList, addItem, toggleCompleting, deleteItem, updateEditMode, files, open };
});
