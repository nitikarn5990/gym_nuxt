<template>
  <v-dialog width="549px" persistent v-model="editDialog">
    <v-btn flat class="primary--text mx-0" slot="activator">
      <v-icon left>fas fa-user-plus</v-icon>
      New Member
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 style="margin: auto;">Add New Member</h3></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <form @submit.prevent="onCreateMember">
                <v-layout row>
                  <v-flex xs12>
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
                  <v-flex xs12>
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
                  <v-flex xs12>
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
                  <v-flex xs12>
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
                  <v-flex xs12>
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
                  <v-flex xs12>
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
                <v-layout row mb-4>
                  <v-flex xs12>
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
                <!-- <v-layout row justify-center text-xs-center mb-4>
                  <v-flex xs12 sm6 offset-sm-3>
                    <v-btn type="submit" class="primary" round :disabled="!formIsValid">
                      <v-icon left class="accent--text">fas fa-user-plus</v-icon>
                      Add New Member
                    </v-btn>
                  </v-flex>
                </v-layout> -->
              </form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <!-- <v-btn flat class="primary--text" @click="onSaveChanges">
                <v-icon left>check</v-icon>
                Save
              </v-btn> -->
              <v-btn flat class="primary--text" @click="onCreateMember" :disabled="!formIsValid">
                <v-icon left class="primary--text">fas fa-user-plus</v-icon>
                Add New Member
              </v-btn>
              <v-btn flat class="secondary--text darken-1" @click="closeDialog">
                <v-icon left>close</v-icon>
                Close
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['info'],
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
      editDialog: false
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
    closeDialog () {
      this.editDialog= false
      this.emptyDialog()
    },
    emptyDialog () {
      this.name= '',
      this.memberId= '',
      this.mobile= '',
      this.address= '',
      this.monthlySubscription= '',
      this.notes= '',
      this.date= '',
      this.user= false,
      this.time= new Date()
    },
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
      this.editDialog = false
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
      this.emptyDialog()
      firebase.database().ref('members').push(newMember)
        .then(
          (data) => {
            alert(`new member ${newMember.name} saved successfully!`)
            this.$parent.$parent.$parent.allMembers()
          return data
        })
        .catch(
          (error) => {
            console.log(error.message)
          }
        )
    },
  }
}
</script>

<style scoped>

</style>
