<template>
  <v-app v-if="user">
    <v-container>
      <v-layout row>
        <v-flex  xs12 sm6 offset-sm3 text-xs-center mb-4>
          <h2 class="primary--text">
            <v-icon left class="primary--text">fas fa-users</v-icon>
            &emsp;
            All Members
          </h2>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="allmembers"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td>{{props.item.name}}</td>
              <td class="text-xs-right">{{props.item.mobile}}</td>
              <td class="text-xs-right">{{props.item.monthlySubscription}}</td>
              <td class="text-xs-right">{{props.item.date}}</td>
              <td class="text-xs-right">{{props.item.address}}</td>
              <td class="text-xs-right">
                <v-btn :to="props.item.id" flat class="primary--text">
                  <v-icon left>fas fa-eye</v-icon>
                  View
                </v-btn>
              </td>
            </template>
          </v-data-table>
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
      allmembers: [],
      headers: [
        {
          text: 'name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Mobile', value: 'mobile', sortable: true },
        { text: 'Monthly Subscription', value: 'monthlySubscription', sortable: true },
        { text: 'Subscriped At', value: 'date', sortable: true },
        { text: 'Address', value: 'address', sortable: true },
        {
          text: 'view',
          align: 'center',
          sortable: false
        },
      ],
      user: false
    }
  },
  created () {
    this.allMembers()
    this.userState()
  },
  methods: {
    allMembers () {
      firebase.database().ref('members').once('value')
        .then((data) => {
          const members = []
          const obj = data.val()
          for (let key in obj) {
            members.push({
              id: key,
              name: obj[key].name,
              mobile: obj[key].mobile,
              address: obj[key].address,
              monthlySubscription: obj[key].monthlySubscription,
              notes: obj[key].notes,
              date: obj[key].date,
              memberId: obj[key].memberId
            })
          }
          this.allmembers = members
        })
        .catch((error) => {
          console.log(error.message)
        })
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
  }
}
</script>

<style scoped>

</style>