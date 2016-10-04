<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">MBU Online</router-link>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <div class="container">
        <p class="text-muted credit">
          &copy; 2016 Domenic Murtari
        </p>
      </div>
    </footer>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style lang="sass">
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;

  p {
    padding-top: 10px;
  }
}
</style>
