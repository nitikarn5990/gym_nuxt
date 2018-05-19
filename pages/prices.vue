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
                  name="halfMonthGymText"
                  id="halfMonthGymText"
                  label="Half Month Gym Time"
                  v-model="halfMonthGymText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
                  name="monthGymText"
                  id="monthGymText"
                  label="Month Gym Time"
                  v-model="monthGymText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
                  name="halfMonthFitnessText"
                  id="halfMonthFitnessText"
                  label="Half Month Fitness Time"
                  v-model="halfMonthFitnessText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
                  name="monthFitnessText"
                  id="monthFitnessText"
                  label="Month Fitness Time"
                  v-model="monthFitnessText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
                  name="dayGymText"
                  id="dayGymText"
                  label="Daily Gym Time"
                  v-model="dayGymText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 mb-2>
                <v-text-field
                  name="dayFitnessText"
                  id="dayFitnessText"
                  label="Daily Fitness Time"
                  v-model="dayFitnessText"
                  type="number"
                  clearable
                  autocomplete="off"
                  prepend-icon="title"
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
      halfMonthGymText: '',
      monthGymText: '',
      halfMonthFitnessText: '',
      monthFitnessText: '',
      dayGym: '',
      dayGymText: '',
      dayFitness: '',
      dayFitnessText: '',
      user: false,
      time: new Date(),
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
        halfMonthGymText: this.halfMonthGymText,
        monthGymText: this.monthGymText,
        halfMonthFitnessText: this.halfMonthFitnessText,
        monthFitnessText: this.monthFitnessText,
        dayGym: this.dayGym,
        dayGymText: this.dayGymText,
        dayFitness: this.dayFitness,
        dayFitnessText: this.dayFitnessText,
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
            alert(`new prices saved successfully!`)
            this.$router.push({name: 'index'})
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