<template>
  <v-app>
    <v-container v-if="user && !imgs">
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

          <v-card>
            <v-card-title>
              <!-- <v-layout row wrap>
                <v-flex xs12>
                  <h4 class="primary--text hidden-xs-only">
                    <v-icon class="primary--text hidden-xs-only" left style="font-size: 18px;">fas fa-users</v-icon> &emsp;
                    All Members
                  </h4>
                </v-flex>
              </v-layout> -->
              <v-layout row>
                <v-flex xs12 offset-xs0 text-xs-center>
                  <newmember></newmember>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs8 offset-xs2>
                  <v-text-field
                    v-model="allmembers.name"
                    append-icon="search"
                    label="Search"
                    hide-details
                  ></v-text-field>
                <!-- single-line -->
                </v-flex>
              </v-layout>
            </v-card-title>


            <v-data-table
              @update:pagination="load()"
              rows-per-page-text="Members Per Page :"
              :rows-per-page-items="[5,10,15,20,25,50,100,{'text':'All','value':-1}]"
              :loading="loading"
              :headers="headers"
              :items="allmembers"
              :search="allmembers.name"
              class="elevation-1"
            >
              <!-- hide-actions -->
              <!-- <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear> -->
              <template slot="items" slot-scope="props">
                <!-- <td class="text-xs-left">{{props.index+1}}</td> -->
                <td class="text-xs-left">{{props.item.name}}</td>
                <td class="text-xs-left">{{props.item.mobile}}</td>
                <td class="text-xs-left">{{props.item.monthlySubscription}}</td>
                <td class="text-xs-left">{{props.item.date}}</td>
                <td class="text-xs-left">{{props.item.address}}</td>
                <td class="text-xs-center">
                  <v-btn :to="'/' + props.item.id" flat class="success--text mx-0">
                    <v-icon left>fas fa-eye</v-icon>
                    View
                  </v-btn>
                <!-- </td>
                <td class="text-xs-center"> -->
                  <update :info="props.item"></update>
                <!-- </td>
                <td class="text-xs-center"> -->
                  <v-btn flat color="red" class="mx-0" @click="deleteMember(props.item.name, props.item.id)">
                    <v-icon left>delete</v-icon>
                    Delete
                  </v-btn>
                </td>


                <v-layout row justify-center>
                  <v-dialog persistent v-model="deleteModal" max-width="500">
                    <v-card>
                      <v-card-text>
                        <h3>Are you sure that you want to delete 
                          <span class="primary--text">{{memberName}}
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
                          <span class="primary--text">{{memberName}}</span>
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



              </template>

              <template slot="pageText" slot-scope="props">
                {{ props.pageStart }} - {{ props.pageStop }} Members of {{ props.itemsLength }} Members
              </template>

              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ allmembers.name }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="!user && imgs">
      <v-layout row>
        <v-flex xs12 mb-4>
          <carousel :imgSrc="imgs"></carousel>
        </v-flex>
      </v-layout>
      <br>
      <h2 class="primary--text text-xs-center">Mobile : 01066446642</h2>
      <br>
      <h2 class="primary--text text-xs-center">Manager : Osama</h2>
      <br>
      <h2 class="primary--text text-xs-center">Address : El-Fayoum - Egypt</h2>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import carousel from '@/components/carousel'
import update from '@/components/update'
import newmember from '@/components/newmember'

export default {
  components: {
    carousel,
    update,
    newmember
  },
  data () {
    return {
      allmembers: [],
      headers: [
        // { text: 'Id', value: '', align: 'left', sortable: false},
        { text: 'Name', value: 'name', align: 'left', sortable: true },
        { text: 'Mobile', value: 'mobile', align: 'left', sortable: true },
        { text: 'Monthly Subscription', value: 'monthlySubscription', align: 'left', sortable: true },
        { text: 'Subscriped At', value: 'date', align: 'left', sortable: true },
        { text: 'Address', value: 'address', align: 'left', sortable: true },
        // { text: 'View', align: 'center', sortable: false },
        // { text: 'Edit', align: 'center', sortable: false },
        // { text: 'Delete', align: 'center', sortable: false },
        { text: 'Actions', align: 'center', sortable: false },
      ],
      user: false,
      imgs: null,
      loading: false,
      deleteModal: false,
      ConfirmModal: false,
      memberName: null,
      memberId: null
    }
  },
  created () {
    this.allMembers()
    this.userState()
    this.$bus.$on('logged', (data) => {
      this.userState()
    })
  },
  methods: {
    load () {
      this.loading=true
      setTimeout(() => {
        this.loading = false
      }, 250)
    },
    allMembers () {
      this.loading = true
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
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error.message)
        })
    },
    userState () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = true
        } else {
          this.user = false
          this.imgs = [
            '/gym_nuxt/img/1.jpg',
            '/gym_nuxt/img/2.jpg',
            '/gym_nuxt/img/4.jpg',
            '/gym_nuxt/img/3.jpg',
          ]
          // this.imgs = [
          //   '/img/1.jpg',
          //   '/img/2.jpg',
          //   '/img/4.jpg',
          //   '/img/3.jpg',
          // ]
        }
      })
    },
    deleteMember (name, id) {
      // if (confirm(`Are you sure that you want to delete ${name} ?`) === true) {
      //   firebase.database().ref('members').once('value')
      //     .then((data) => {
      //       const members = []
      //       const obj = data.val()
      //       for (let key in obj) {
      //         if (key == id) {
      //           firebase.database().ref('members/' + key).remove()
      //           alert(`${name} has been deleted successfully!`)
      //           this.allMembers()
      //         }
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error.message)
      //     })
      // }
      this.deleteModal = true
      this.memberName = name
      this.memberId = id
    },
    deleteMemberModal () {
      this.deleteModal = false
      firebase.database().ref('members').once('value')
        .then((data) => {
          const members = []
          const obj = data.val()
          for (let key in obj) {
            if (key == this.memberId) {
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
      this.allMembers()
    },
  }
}
</script>

<style scoped>
  img {
    max-width: 100%;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>