<script lang="ts" setup>
import { useTodosStore } from "@/stores/todos";
import { ref } from "vue";

const todos = useTodosStore();
const newTodoText = ref("");
</script>

<template>
  <form @submit.prevent="todos.addTodo(newTodoText)">
    <input v-model.trim="newTodoText" placeholder="Add new todo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos.todos" :key="todo.id">
      <input
        :value="todo.text"
        @input="
          todos.updateTodoText(
            todo.id,
            ($event.target as HTMLInputElement).value
          )
        "
      />
      <button @click="todos.removeTodo(todo.id)">X</button>
    </li>
  </ul>
</template>
