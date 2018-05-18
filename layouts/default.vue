<template>
  <v-app>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
      class="primary"
    >
    
      <v-icon left class="accent--text">fitness_center</v-icon>
      <v-toolbar-title
        class="accent--text hidden-xs-only"
        v-text="title"
      ></v-toolbar-title>

      <v-toolbar-title
        class="accent--text hidden-xs-only"
      >
        <v-btn flat href="https://www.osamamohamed.com" class="accent--text hidden-sm-and-down">Developed by: OSAMA MOHAMED</v-btn>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn flat to="/" exact class="accent--text" v-if="userEmail">
        <v-icon left>group</v-icon>
        All Members
      </v-btn>
      <v-btn flat to="new-member" exact class="accent--text" v-if="userEmail">
        <v-icon left>person_add</v-icon>
        New Member
      </v-btn>
      
      <v-toolbar-title
        class="accent--text hidden-sm-and-down"
      >{{userEmail}}</v-toolbar-title>

      <v-btn flat exact class="accent--text" @click="logoutUser()" v-if="userEmail">
        Log out
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
      
      <v-btn flat to="/login" exact class="accent--text" @click="logoutUser()" v-if="!userEmail">
        Log in
        <v-icon right>mdi-login</v-icon>
      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container>
        <newMember v-if="userEmail"></newMember>
        <nuxt v-on:currentEmail="name($event)"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import newMember from '@/components/newMember'

  export default {
    components: {
      newMember
    },
    data() {
      return {
        clipped: true,
        title: 'Power Core Gym',
        userEmail: null
      }
    },
    created() {
      this.userState()
    },
    watch: {
      '$route': 'userState'
    },
    methods: {
      logoutUser () {
        alert(`${firebase.auth().currentUser.email} logged out successfully!`)
        firebase.auth().signOut()
        this.$router.push({path: '/login'})
        this.userState()
      },
      userState () {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.userEmail = firebase.auth().currentUser.email
          } else {
            this.userEmail = null
          }
        })
        
        // if (firebase.auth().currentUser) {
        //   this.userEmail = firebase.auth().currentUser.email
        // } else {
        //   this.userEmail = null
        // }
      }
    },
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  /* .btn--active .btn__content:before, .btn:hover .btn__content:before, .btn:focus .btn__content:before {
    background-color: transparent;
  } */
  .application {
    background-color: #f2f2f2 !important;
  }
  .picker--date__table .btn.btn--active { /* from index date picker*/
    color: #1E88E5!important;
  }
</style>