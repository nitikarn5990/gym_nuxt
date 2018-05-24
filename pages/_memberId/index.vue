<template>
  <v-layout v-if="user">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Name : <span class="primary--text">{{memberDetail.name}}</span></h3>
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
              <strong>Created At : </strong>{{memberDetail.createdAt | DateTime}}
              <br>
              <strong>Updated At : </strong>{{memberDetail.updatedAt | DateTime}}
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


          <v-layout row justify-center>
            <v-dialog persistent v-model="deleteModal" max-width="500">
              <v-card>
                <v-card-text>
                  <h3>Are you sure that you want to delete 
                    <span class="primary--text">{{memberDetail.name}}
                    </span> ?
                  </h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" flat @click.native="deleteMemberModal()">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                  <v-btn flat class="secondary--text" @click.native="deleteModal = false">
                    <v-icon left>close</v-icon>
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          
          <v-layout row justify-center>
            <v-dialog persistent v-model="ConfirmModal" max-width="500">
              <v-card>
                <v-card-text>
                  <h3>
                    <span class="primary--text">{{memberDetail.name}}</span>
                    has been deleted successfully!
                  </h3>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat class="primary--text" @click.native="ConfirmModalDelete()">
                    <v-icon left>check</v-icon>
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>


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
      memberDetail: {},
      user: false,
      deleteModal: false,
      ConfirmModal: false
    }
  },
  methods: {
    fetchMember () {
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
                memberId: obj[key].memberId,
                createdAt: obj[key].createdAt,
                updatedAt: obj[key].updatedAt
              }
            }
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    deleteMember () {
      // if (confirm(`Are you sure that you want to delete ${this.memberDetail.name} ?`) === true) {
      //   firebase.database().ref('members').once('value')
      //     .then((data) => {
      //       const members = []
      //       const obj = data.val()
      //       for (let key in obj) {
      //         if (key == this.$route.params.memberId) {
      //           firebase.database().ref('members/' + key).remove()
      //           alert(`${this.memberDetail.name} has been deleted successfully!`)
      //           this.$router.push({name: 'index'})
      //         }
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.message)
      //     })
      // }
      this.deleteModal = true
    },
    deleteMemberModal () {
      this.deleteModal = false
      firebase.database().ref('members').once('value')
        .then((data) => {
          const members = []
          const obj = data.val()
          for (let key in obj) {
            if (key == this.$route.params.memberId) {
              firebase.database().ref('members/' + key).remove()
              this.ConfirmModal = true
            }
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    ConfirmModalDelete () {
      this.ConfirmModal = false
      this.$router.push({name: 'index'})
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
  },
  created () {
    this.fetchMember()
    this.userState()
  },
}
</script>

<style scoped>
.information {
  white-space: pre-line;
}
</style>