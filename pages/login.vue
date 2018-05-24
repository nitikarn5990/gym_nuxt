<template>
  <v-container>
    <v-layout row justify-center v-if="error">
      <v-flex xs12 sm6 offset-sm-3>
        <erralert @dismissed="onDismissed" :text="errorMessage"></erralert>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 sm6 offset-sm-6>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      id="email"
                      label="E-Mail"
                      v-model="email"
                      type="email"
                      clearable
                      autocomplete="off"
                      prepend-icon="fas fa-at"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      id="password"
                      label="Password"
                      v-model="password"
                      type="password"
                      clearable
                      autocomplete="off"
                      prepend-icon="fas fa-key"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 text-xs-center>
                    <v-btn type="submit" class="primary" :disabled="loading" :loading="loading">
                      Log In
                      <v-icon right>fas fa-sign-in</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog persistent v-model="ConfirmModal" max-width="500">
        <v-card>
          <v-card-text>
            <h3>You logged in as
              <span class="primary--text">{{MemberName}}</span>
              successfully!
            </h3>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="primary--text" @click.native="ConfirmModalLogin()">
              <v-icon left>check</v-icon>
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


  </v-container>
</template>


<script>
import firebase from 'firebase'
import erralert from '@/components/alert'

export default {
  components: {
    erralert
  },
  data () {
    return {
      email: '',
      password: '',
      error: false,
      errorMessage: '',
      loading: false,
      ConfirmModal: false,
      MemberName: null
    }
  },
  methods: {
    onSignin () {
      this.loading = true
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.loading = false
            // alert(`You logged in as ${user.user.email}`)
            // this.$router.push({name: 'index'})
            this.MemberName = this.email
            this.ConfirmModal = true
          }
        )
        .catch(
          error => {
            this.error = true
            this.errorMessage = error.message
            this.loading = false
          }
        )
    },
    onDismissed () {
      this.error = false
      this.loading = false
    },
    ConfirmModalLogin () {
      this.ConfirmModal = false
      this.$router.push({name: 'index'})
    }
  }
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>