<template>
  <v-app v-if="user">
    <v-container>
      <v-layout row>
        <v-flex  xs12 sm6 offset-sm3 text-xs-center mb-4>
          <h2 class="primary--text">
            <v-icon left class="primary--text">fas fa-user-plus</v-icon>
            &emsp;
            New Member
          </h2>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMember">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="name"
                  id="name"
                  label="Name"
                  v-model="name"
                  required
                  clearable
                  autocomplete="off"
                  prepend-icon="person"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="mobile"
                  id="mobile"
                  label="Mobile"
                  v-model="mobile"
                  required
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="phone_iphone"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="address"
                  id="address"
                  label="Address"
                  v-model="address"
                  required
                  clearable
                  autocomplete="off"
                  prepend-icon="home"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="monthlySubscription"
                  id="monthlySubscription"
                  label="Monthly Subscription"
                  v-model="monthlySubscription"
                  required
                  clearable
                  autocomplete="off"
                  type="number"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="memberId"
                  id="memberId"
                  label="Member Id"
                  v-model="memberId"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="fas fa-id-card-o"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-4>
                <v-text-field
                  name="notes"
                  id="notes"
                  label="Notes"
                  v-model="notes"
                  multi-line
                  clearable
                  autocomplete="off"
                  prepend-icon="notes"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <h4>
                  <v-icon left>fas fa-calendar</v-icon>
                  &emsp;
                  Choose Date
                </h4>
              </v-flex>
            </v-layout>
            <v-layout row justify-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row justify-center text-xs-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <v-btn type="submit" class="primary" round :disabled="!formIsValid">
                  <v-icon left class="accent--text">fas fa-user-plus</v-icon>
                  Add New Member
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>


      <v-layout row justify-center>
        <v-dialog persistent v-model="ConfirmModal" max-width="500">
          <v-card>
            <v-card-text>
              <h3>new member
                <span class="primary--text">{{MemberName}}</span>
                saved successfully!
              </h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="primary--text" @click.native="ConfirmModalCreate()">
                <v-icon left>check</v-icon>
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      name: '',
      memberId: '',
      mobile: '',
      address: '',
      monthlySubscription: '',
      notes: '',
      date: '',
      user: false,
      time: new Date(),
      ConfirmModal: false,
      MemberName: null
    }
  },
  created () {
    this.userState()
  },
  computed: {
    formIsValid () {
      return this.name !== '' && this.mobile !== '' && this.address !== '' && this.monthlySubscription !== '' && this.date !== ''
    }
  },
  methods: {
    userState () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = true
        } else {
          this.user = false
        }
      })
    },
    onCreateMember () {
      if (!this.formIsValid) {
        return
      }
      const newMember = {
        name: this.name,
        mobile: this.mobile,
        address: this.address,
        monthlySubscription: this.monthlySubscription,
        notes: this.notes,
        date: this.date,
        memberId: this.memberId,
        createdAt: this.time.toJSON()
      }
      firebase.database().ref('members').push(newMember)
        .then(
          (data) => {
            // alert(`new member ${newMember.name} saved successfully!`)
            // this.$router.push({name: 'index'})
            this.ConfirmModal = true
            this.MemberName = newMember.name
          return data
        })
        .catch(
          (error) => {
            console.log(error.message)
          }
        )
    },
    ConfirmModalCreate () {
      this.ConfirmModal = false
      this.$router.push({name: 'index'})
    }
  }
}
</script>

<style scoped>

</style>