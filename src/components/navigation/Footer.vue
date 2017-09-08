<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>MBU Online</strong> by Domenic Murtari
        </p>
        <p>
          <router-link to="/about">About</router-link>
          &nbsp;|&nbsp;
          <router-link to="/privacy">Privacy Policy</router-link>
          &nbsp;|&nbsp;
          <a href="mailto:support@mbu.online">Technical Problems?</a>
        </p>
        <p>
          <a class="icon"
             href="https://github.com/dmurtari/mbu-frontend">
            <i class="fa fa-github"></i>
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  margin: 0 0 150px;
}

footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 150px;
  width: 100%;

  .icon {
    color: black;
  }
}
</style>