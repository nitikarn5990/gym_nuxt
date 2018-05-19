<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex xs12 text-xs-center mb-5>
          <h2 class="primary--text">Pricing</h2>
        </v-flex>
      </v-layout>
      <!-- <v-layout row wrap>
        <v-flex xs12 sm8 md6 mb-5 offset-sm2 offset-md0>
          <v-card>
            <v-card-actions>
              <v-layout row>
                <v-flex xs12 text-xs-center>
                <h2 class="headline primary--text">Monthly</h2>
                  <br>
                  <span class="black--text">Gym : 80 LE. (15 times)</span>
                  <br>
                  <br>
                  <span class="black--text">Gym : 110 LE. (30 times)</span>
                  <br>
                  <br>
                  <span class="black--text">Fitness : 180 LE. (15 times)</span>
                  <br>
                  <br>
                  <span class="black--text">Fitness : 240 LE. (30 times)</span>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>

         <v-flex xs12 sm8 md6 mb-5 offset-sm2 offset-md0>
          <v-card>
            <v-card-actions>
              <v-layout row>
                <v-flex xs12 text-xs-center>
                <h2 class="headline primary--text">Daily</h2>
                  <br>
                  <span class="black--text">Gym : 5 LE.</span>
                  <br>
                  <br>
                  <span class="black--text">Fitness : 7 LE. (20 minutes)</span>
                  <br>
                  <br>
                  <span class="black--text">Fitness : 12 LE. (30 minutes)</span>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout> -->
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      allprices: [],
    }
  },
  created () {
    this.allPrices()
  },
  methods: {
    allPrices () {
      firebase.database().ref('prices').once('value')
        .then((data) => {
          let prices = {}
          const obj = data.val()
          for (let key in obj) {
            prices = {
              id: key,
              halfMonthGym: obj[key].halfMonthGym,
              monthGym: obj[key].monthGym,
              halfMonthFitness: obj[key].halfMonthFitness,
              monthFitness: obj[key].monthFitness,
              halfMonthGymText: obj[key].halfMonthGymText,
              monthGymText: obj[key].monthGymText,
              halfMonthFitnessText: obj[key].halfMonthFitnessText,
              monthFitnessText: obj[key].monthFitnessText,
              dayGym: obj[key].dayGym,
              dayGymText: obj[key].dayGymText,
              dayFitness: obj[key].dayFitness,
              dayFitnessText: obj[key].dayFitnessText,
              createdAt: obj[key].createdAt
            }
          }
          this.allprices = prices
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
  }
}
</script>


<style scoped>
  .card {
    border-radius: 12px;
    margin-right: 20px;
    margin-left: 20px;
    min-height: 220px;
    display: grid;
  }
</style>