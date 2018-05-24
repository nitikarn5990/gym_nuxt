<template>
  <v-app v-if="user">
    <v-container>
      <v-layout row>
        <v-flex  xs12 sm6 offset-sm3 text-xs-center mb-4>
          <h2 class="primary--text">
            <v-icon left class="primary--text">attach_money</v-icon>
            &emsp;
            Prices
          </h2>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMember">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="halfMonthGym"
                  id="halfMonthGym"
                  label="Half Month Gym"
                  v-model="halfMonthGym"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="monthGym"
                  id="monthGym"
                  label="Month Gym"
                  v-model="monthGym"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="halfMonthFitness"
                  id="halfMonthFitness"
                  label="Half Month Fitness"
                  v-model="halfMonthFitness"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="monthFitness"
                  id="monthFitness"
                  label="Month Fitness"
                  v-model="monthFitness"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="dayGym"
                  id="dayGym"
                  label="Daily Gym"
                  v-model="dayGym"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="dayFitness"
                  id="dayFitness"
                  label="Daily Fitness"
                  v-model="dayFitness"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="attach_money"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row justify-center text-xs-center mb-4>
              <v-flex xs12 sm6 offset-sm-3>
                <v-btn type="submit" class="primary" round>
                  <v-icon left>attach_money</v-icon>
                  Add Prices
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
              <h3>New prices saved successfully!</h3>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="primary--text" @click.native="ConfirmModalPrices()">
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
      halfMonthGym: '',
      monthGym: '',
      halfMonthFitness: '',
      monthFitness: '',
      dayGym: '',
      dayFitness: '',
      user: false,
      time: new Date(),
      ConfirmModal: false
    }
  },
  created () {
    this.userState()
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
      const newPrice = {
        halfMonthGym: this.halfMonthGym,
        monthGym: this.monthGym,
        halfMonthFitness: this.halfMonthFitness,
        monthFitness: this.monthFitness,
        dayGym: this.dayGym,
        dayFitness: this.dayFitness,
        createdAt: this.time.toJSON()
      }
      firebase.database().ref('prices').remove()
        .then((data) => {})
        .catch(
          (error) => {
            console.log(error.message)
          }
        )
      firebase.database().ref('prices').push(newPrice)
        .then(
          (data) => {
            // alert(`new prices saved successfully!`)
            // this.$router.push({name: 'index'})
            this.ConfirmModal = true
          return data
        })
        .catch(
          (error) => {
            console.log(error.message)
          }
        )
    },
    ConfirmModalPrices () {
      this.ConfirmModal = false
      this.$router.push({name: 'index'})
    }
  }
}
</script>

<style scoped>

</style>