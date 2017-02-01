<template>
  <div class="container">
    <h3 class="title is-3">Event Administration</h3>
    <h5 class="subtitle is-5">
      Manage and make changes to all merit badge events, such as badges offered
      at events, as well as users of this website.
    </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a Section</p>
          <ul class="menu-list">
            <router-link to="/administration/offerings">Manage Offerings</router-link>
            <router-link to="/administration/users">Manage Users</router-link>
          </ul>
        </aside>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>