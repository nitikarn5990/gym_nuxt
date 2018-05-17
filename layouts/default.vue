<template>
  <v-app>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
      class="primary"
    >
      <v-toolbar-title
        class="accent--text"
        v-text="title"
      ></v-toolbar-title>

      <v-toolbar-title
        class="accent--text hidden-xs-only"
      >
        <v-btn flat href="https://www.osamamohamed.com" class="accent--text">Developed by: OSAMA MOHAMED</v-btn>
      </v-toolbar-title>
      
      <v-btn flat to="/" class="accent--text">
        <v-icon left>group</v-icon>
        All Members
      </v-btn>
      <v-btn flat to="new-member" class="accent--text">
        <v-icon left>person_add</v-icon>
        New Member
      </v-btn>
      
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="accent--text hidden-xs-only"
        
      >email@domain.com</v-toolbar-title>

    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    components: {
    },
    data() {
      return {
        clipped: true,
        title: 'Power Core Gym'
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    /* font-family: 'Raleway', sans-serif; */
  }
  .application {
    background-color: #f2f2f2 !important;
  }
  .picker--date__table .btn.btn--active { /* from index date picker*/
    color: #1E88E5!important;
  }
</style>