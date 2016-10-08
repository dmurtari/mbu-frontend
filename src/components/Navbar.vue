<template>
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">MBU Online</router-link>
      </div>
      <ul class="nav navbar-nav">
        <li><router-link to="/about">About</router-link></li>
      </ul>        
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#"
             class="dropdown-toggle"
             data-toggle="dropdown"
             role="button"
             aria-haspopup="true"
             aria-expanded="false">Login/Signup <span class="caret"></span></a>
          <ul @click="preventClose"
              class="dropdown-menu">
            <li><signin></signin></li>
          </ul>
        </li>          
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    preventClose(event) {
      event.stopPropagation();
    }
  }
}

</script>