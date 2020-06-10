<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/add-client">Add Client</router-link>
      <br />
      <br />
      <button @click="logoutUser()">LOGOUT</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { clearLogin } from "./api/utils";

export default {
  name: "App",
  methods: {
    logoutUser() {
      this.$router.push("/");
      return clearLogin();
    },
  },
};
</script>

<style>
body,
html {
  margin: 0 auto;
  height: 100vh;
  background: seashell;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
