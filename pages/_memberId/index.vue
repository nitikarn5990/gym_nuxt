<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Name : {{memberDetail.name}}</h3>
            <br>
            <div class="information">
              <strong>Mobile : </strong>{{memberDetail.mobile}}
              <br>
              <strong>Monthly Subscription : </strong>{{memberDetail.monthlySubscription}} LE.
              <br>
              <strong>Subscriped at : </strong>{{memberDetail.date}}
              <br>
              <strong>Address : </strong>{{memberDetail.address}}
              <br>
              <strong>Member Id : </strong>{{memberDetail.memberId}}
              <br>
              <strong>Notes : </strong>{{memberDetail.notes}}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <updateMember :info="memberDetail"></updateMember>
          <v-btn flat color="red" @click="deleteMember()">
            <v-icon left>delete</v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import updateMember from '@/components/updateMember'

export default {
  components: {
    updateMember
  },
  data () {
    return {
      memberDetail: {}
    }
  },
  methods: {
    fetchMember () {
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
    },
    editMember () {
      // console.log('vvvvvvv')
    },
    deleteMember () {
      if (confirm(`Are you sure that you want to delete ${this.memberDetail.name} ?`) === true) {
        firebase.database().ref('members').once('value')
          .then((data) => {
            const members = []
            const obj = data.val()
            for (let key in obj) {
              if (key == this.$route.params.memberId) {
                firebase.database().ref('members/' + key).remove()
                alert(`${this.memberDetail.name} has been deleted successfully!`)
                this.$router.push({path: '/'})
              }
            }
          })
          .catch((error) => {
            alert(error.message)
          })
        
      }
    }
  },
  created () {
    this.fetchMember()
  }
}
</script>

<style scoped>
.information {
  white-space: pre-line;
}
</style>