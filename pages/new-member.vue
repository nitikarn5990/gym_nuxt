<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex  xs12 sm6 offset-sm3 text-xs-center mb-4>
          <h2 class="primary--text">Register a new member</h2>
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
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="id"
                  id="id"
                  label="Id"
                  v-model="id"
                  type="number"
                  clearable
                  autocomplete="off"
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
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <h4>Choose Date</h4>
              </v-flex>
            </v-layout>
            <v-layout row justify-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>
            </v-layout>
            <v-layout row justify-center text-xs-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <v-btn type="submit" class="primary" round :disabled="!formIsValid">Register New Member</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
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
      id: '',
      mobile: '',
      address: '',
      monthlySubscription: '',
      notes: '',
      date: ''
    }
  },
  computed: {
    formIsValid () {
      return this.name !== '' && this.mobile !== '' && this.address !== '' && this.monthlySubscription !== '' && this.date !== ''
    }
  },
  methods: {
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
        id: this.id
      }
      firebase.database().ref('members').push(newMember)
        .then(
          (data) => {
            alert(`new member ${newMember.name} saved successfully!`)
          return data
        })
        .catch(
          (error) => {
            alert(error.message)
          }
        )
    },
  }
}
</script>

<style scoped>

</style>