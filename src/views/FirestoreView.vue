<script setup lang="ts">
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "@firebase/firestore";
import { ref } from "vue";
import { useCollection, useFirestore } from "vuefire";

type Todo = {
  id: string;
  text: string;
  finished: boolean;
  created: Date;
};

const db = useFirestore();
const todosRef = collection(db, "todos");

const finishedTodos = query(todosRef, where("finished", "==", true));
const unfinishedTodos = query(todosRef, where("finished", "==", false));
const todos = useCollection<Todo>(todosRef);
const newTodoText = ref("");

function addTodo() {
  if (newTodoText.value) {
    addDoc(todosRef, {
      text: newTodoText.value,
      finished: false,
      created: serverTimestamp(),
    });
    newTodoText.value = "";
  }
}
function updateTodoText(todo: Todo, newText: string) {
  console.log(todo);
  updateDoc(doc(db, "todos", todo.id), {
    text: newText,
  });
}
function removeTodo(todo: Todo) {
  deleteDoc(doc(db, "todos", todo.id));
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model.trim="newTodoText" placeholder="Add new todo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input
        :value="todo.text"
        @input="updateTodoText(todo, ($event.target as HTMLInputElement).value)"
      />
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
