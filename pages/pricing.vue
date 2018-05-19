<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex xs12 text-xs-center mb-5>
          <h2 class="primary--text">Prices</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
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
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
  .card {
    border-radius: 12px;
    margin-right: 20px;
    margin-left: 20px;
    min-height: 220px;
    display: grid;
  }
</style>