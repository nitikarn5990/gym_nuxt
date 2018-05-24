<template>
  <v-app>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
      class="primary"
    >
    
      <v-icon left class="accent--text hidden-xs-only">fitness_center</v-icon>
      <v-toolbar-title
        class="accent--text hidden-xs-only"
        v-text="title"
      ></v-toolbar-title>
      
      <v-toolbar-title
        class="accent--text hidden-sm-and-up"
        v-text="title"
        v-if="!userEmail"
      ></v-toolbar-title>

      <v-toolbar-title
        class="accent--text hidden-xs-only"
      >
        <v-btn
          flat
          href="https://www.osamamohamed.com"
          class="accent--text hidden-sm-and-down"
          target="_blank"
        >
          Developed by: OSAMA MOHAMED
        </v-btn>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn flat to="/" exact class="accent--text hidden-xs-only" v-if="userEmail">
        <v-icon left>fas fa-users</v-icon>
        All Members
      </v-btn>
      <v-btn flat to="/new-member" exact class="accent--text hidden-xs-only" v-if="userEmail">
        <v-icon left>fas fa-user-plus</v-icon>
        New Member
      </v-btn>
      <v-btn flat to="/prices" exact class="accent--text hidden-xs-only" v-if="userEmail">
        <v-icon left>attach_money</v-icon>
        Prices
      </v-btn>

      <v-btn flat to="/" exact class="accent--text b-small" v-if="userEmail">
        <v-icon>fas fa-users</v-icon>
      </v-btn>
      <v-btn flat to="/new-member" exact class="accent--text b-small" v-if="userEmail">
        <v-icon>fas fa-user-plus</v-icon>
      </v-btn>
      
      <v-toolbar-title
        class="accent--text hidden-sm-and-down"
      >{{userEmail}}</v-toolbar-title>

      <v-btn flat exact class="accent--text" @click="logoutUser()" v-if="userEmail">
        Log out
        <v-icon right>fas fa-sign-out</v-icon>
      </v-btn>
      
      <v-btn flat to="/" exact class="accent--text" v-if="!userEmail">
        <v-icon left>fas fa-home</v-icon>
        Home
      </v-btn>
      <v-btn flat to="/pricing" exact class="accent--text" v-if="!userEmail">
        <v-icon left>fas fa-usd</v-icon>
        Pricing
      </v-btn>

      <v-btn flat to="/login" exact class="accent--text" @click="logoutUser()" v-if="!userEmail">
        <v-icon left>fas fa-sign-in</v-icon>
        Log in
      </v-btn>

    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <v-layout row justify-center>
      <v-dialog persistent v-model="ConfirmModal" max-width="500">
        <v-card>
          <v-card-text>
            <h3>
              <span class="primary--text">{{MemberName}}</span>
              logged out successfully!
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="primary--text" @click.native="ConfirmModalLogout()">
              <v-icon left>check</v-icon>
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </v-app>
</template>

<script>
import firebase from 'firebase'

  export default {
    components: {
    },
    data() {
      return {
        clipped: true,
        title: 'Gym',
        userEmail: null,
        ConfirmModal: false,
        MemberName: null
      }
    },
    created() {
      this.userState()
    },
    methods: {
      logoutUser () {
        // alert(`${firebase.auth().currentUser.email} logged out successfully!`)
        // firebase.auth().signOut()
        // this.$router.push({name: 'login'})
        // this.$router.push({name: 'index'})
        // this.userState()
        // this.$bus.$emit('logged')
        this.ConfirmModal = true
      },
      userState () {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.userEmail = firebase.auth().currentUser.email
          } else {
            this.userEmail = null
          }
        })
      },
    ConfirmModalLogout () {
      this.ConfirmModal = false
      firebase.auth().signOut()
      this.$router.push({name: 'index'})
      this.userState()
      this.$bus.$emit('logged')
    }
    },
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .application {
    background-color: #f2f2f2 !important;
  }
  i.fas {
    margin-bottom: 5px;
  }
  div.btn__content > i.fas {
    font-size: 20px!important;
  }
  div.input-group__input > i.fas { /* from updateMember component*/
    font-size: 20px!important;
  }
  .picker--date__table .btn.btn--active { /* from new-member date picker*/
    color: #1E88E5!important;
  }
  @media (max-width: 576px) {
    .picker.picker--date { /* from new-member date picker*/
      max-width: 107%;
    }
  }
  @media (min-width: 600px) {
    .b-small {
      display: none;
    }
  }
</style>