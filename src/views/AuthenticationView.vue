<script lang="ts" setup>
import { googleAuthProvider } from "@/firebase";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  AuthCredential,
  getRedirectResult,
} from "firebase/auth";
import { ref } from "vue";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
const auth = useFirebaseAuth();
const user = useCurrentUser();
let credential: AuthCredential | null = null;

function signinPopup() {
  return signInWithPopup(auth, googleAuthProvider).then((result) => {
    const googleCredential = GoogleAuthProvider.credentialFromResult(result);
    credential = googleCredential;
    console.log("Got googleCredential", googleCredential);
  });
}

getRedirectResult(auth).then((creds) => {
  console.log("got creds", creds);
  if (creds) {
    // credential = creds.user.
  }
});
</script>

<template>
  <main>
    <h1>Auth playground</h1>
    <button @click="signOut(auth)">SignOut</button>
    <button @click="signinPopup()">Signin Google (popup)</button>

    <p v-if="user">
      Name: {{ user.displayName }} <br />
      <img v-if="user.photoURL" :src="user.photoURL" />
    </p>

    <hr />

    <p>Current User:</p>
    <pre>{{ user }}</pre>
  </main>
</template>
