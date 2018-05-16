<template>
  <v-app>
    <!-- <v-navigation-drawer
      class="accent"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
      class="primary"
    >
      <!-- <v-toolbar-side-icon 
        class="accent--text"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon> -->
      <v-toolbar-title
        class="accent--text"
        v-text="title"
      ></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="accent--text hidden-xs-only"
        
      >Full-Stack Developer</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
        <!-- <download></download> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // import download from '@/components/download'

  export default {
    components: {
      // download
    },
    data() {
      return {
        clipped: true,
        // drawer: true,
        // items: [
        //   { icon: 'home', title: 'Welcome', to: '/' },
        // ],
        // miniVariant: false,
        title: 'Power Core Gym'
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }
  .application {
    background-color: #f2f2f2 !important;
  }
</style>