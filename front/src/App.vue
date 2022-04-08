<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/article">Article</router-link> |
    <router-link to="/signup">Signup</router-link>|
    <router-link to="/signup">Signup</router-link>
    |

    <router-link to="/login" v-if="!$store.state.loggedIn">Login</router-link> |
    <router-link to="/about">À propos</router-link>
  </nav>
  <router-view />

  <footer>
    <p>2022 -- Groupomania</p>
  </footer>
</template>



<style>
/*on l'ajoutera à la fin afin de ne pas masquer de suite dynamiquement les menus
v-if="!$store.state.loggedIn"
*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

