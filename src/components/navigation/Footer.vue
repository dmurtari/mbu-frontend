<template>
  <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>MBU Online</strong> by Domenic Murtari
        </p>
        <p>
          Source code licensed
          <a href="https://opensource.org/licenses/MIT">MIT</a>, website licensed
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Version 4</a>
        </p>
        <p>
          <router-link to="/privacy">Privacy Policy</router-link>
          &nbsp;|&nbsp;
          <a href="mailto:support@mbu.online">Technical Problems?</a>
          &nbsp;|&nbsp;
          <a href="https://github.com/dmurtari/mbu-frontend">Contribute</a>
        </p>
    </div>
  </footer>
</template>

<style lang="scss">
html {
  position: relative;
  min-height: 100%;
}

body {
  margin-bottom: 180px;
}

footer {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 180px;
  width: 100%;

  .icon {
    color: black;
  }
}
</style>