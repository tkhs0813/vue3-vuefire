import { acceptHMRUpdate, defineStore } from "pinia";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

type Todo = {
  id: string;
  text: string;
  finished: boolean;
  created: Date;
};

export const useTodosStore = defineStore("todos", () => {
  const db = useFirestore();

  const todosRef = collection(db, "todos");
  const todos = useCollection<Todo>(todosRef);

  const addTodo = async (newTodoText: string) => {
    addDoc(todosRef, {
      text: newTodoText,
      finished: false,
      created: serverTimestamp(),
    });
  };
  const updateTodoText = async (todoId: string, newText: string) => {
    updateDoc(doc(db, "todos", todoId), {
      text: newText,
    });
  };
  function removeTodo(todoId: string) {
    deleteDoc(doc(db, "todos", todoId));
  }

  return { todos, addTodo, updateTodoText, removeTodo };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodosStore, import.meta.hot));
}
