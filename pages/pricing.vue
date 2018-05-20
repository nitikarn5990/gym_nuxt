<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 text-xs-center mb-5>
        <h2 class="primary--text">Pricing</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6 mb-5 offset-sm2 offset-md0 v-if="allprices.monthGym || allprices.monthFitness">
        <v-card>
          <v-card-actions>
            <v-layout row>
              <v-flex xs12 text-xs-center>
              <h2 class="headline primary--text" v-if="allprices.monthGym || allprices.monthFitness">Monthly</h2>
                <br v-if="allprices.monthGym">
                <span class="black--text" v-if="allprices.monthGym">Gym : {{allprices.monthGym}} LE.</span>
                <br v-if="allprices.monthFitness && allprices.monthGym">
                <br v-if="allprices.monthFitness">
                <span class="black--text" v-if="allprices.monthFitness">Fitness : {{allprices.monthFitness}} LE.</span>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm8 md6 mb-5 offset-sm2 offset-md0 v-if="allprices.halfMonthGym || allprices.halfMonthFitness">
        <v-card>
          <v-card-actions>
            <v-layout row>
              <v-flex xs12 text-xs-center>
              <h2 class="headline primary--text" v-if="allprices.halfMonthGym || allprices.halfMonthFitness">Half Monthly</h2>
                <br v-if="allprices.halfMonthGym">
                <span class="black--text" v-if="allprices.halfMonthGym">Gym : {{allprices.halfMonthGym}} LE.</span>
                <br v-if="allprices.halfMonthFitness && allprices.halfMonthGym">
                <br v-if="allprices.halfMonthFitness">
                <span class="black--text" v-if="allprices.halfMonthFitness">Fitness : {{allprices.halfMonthFitness}} LE.</span>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>

        <v-flex xs12 sm8 md6 mb-5 offset-sm2 offset-md3 v-if="allprices.dayGym || allprices.dayFitness">
        <v-card>
          <v-card-actions>
            <v-layout row>
              <v-flex xs12 text-xs-center>
              <h2 class="headline primary--text" v-if="allprices.dayGym || allprices.dayFitness">Daily</h2>
                <br v-if="allprices.dayGym">
                <span class="black--text" v-if="allprices.dayGym">Gym : {{allprices.dayGym}} LE.</span>
                <br v-if="allprices.dayFitness && allprices.dayGym">
                <br v-if="allprices.dayFitness">
                <span class="black--text" v-if="allprices.dayFitness">Fitness : {{allprices.dayFitness}} LE.</span>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
              dayGym: obj[key].dayGym,
              dayFitness: obj[key].dayFitness,
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
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 150px;
    display: grid;
  }
</style>