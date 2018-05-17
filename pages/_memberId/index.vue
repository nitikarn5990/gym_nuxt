<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Name : {{memberDetail.name}}</h3>
            <br><br>
            <div>
              Mobile : {{memberDetail.mobile}}
              <br><br>
              Monthly Subscription : {{memberDetail.monthlySubscription}} LE.
              <br><br>
              Subscriped at : {{memberDetail.date}}
              <br><br>
              Address : {{memberDetail.address}}
              <br><br>
              Member Id : {{memberDetail.memberId}}
              <br><br>
              Notes : {{memberDetail.notes}}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      memberDetail: {}
    }
  },
  methods: {
  },
  created () {
    // firebase.database().ref('members').once('value')
    //   .then((data) => {
    //     const members = []
    //     const obj = data.val()
    //     for (let key in obj) {
    //       members.push({
    //         id: key,
    //         name: obj[key].name,
    //         mobile: obj[key].mobile,
    //         address: obj[key].address,
    //         monthlySubscription: obj[key].monthlySubscription,
    //         notes: obj[key].notes,
    //         date: obj[key].date,
    //         memberId: obj[key].memberId
    //       })
    //     }
    //     members.forEach(member => {
    //       if (member.id == this.$route.params.memberId) {
    //         this.memberDetail = member
    //       }
    //     })
    //   })
    //   .catch((error) => {
    //     alert(error.message)
    //   })

    firebase.database().ref('members').once('value')
      .then((data) => {
        const members = []
        const obj = data.val()
        for (let key in obj) {
          if (key == this.$route.params.memberId) {
            this.memberDetail = {
              id: key,
              name: obj[key].name,
              mobile: obj[key].mobile,
              address: obj[key].address,
              monthlySubscription: obj[key].monthlySubscription,
              notes: obj[key].notes,
              date: obj[key].date,
              memberId: obj[key].memberId
            }
          }
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }
}
</script>

<style scoped>

</style>