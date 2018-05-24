<template>
  <div>
  <v-dialog width="549px" persistent v-model="editDialog">
    <v-btn flat class="primary--text" slot="activator" @click="fillDialog()">
      <v-icon left>edit</v-icon>
      Edit
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 style="margin: auto;">Edit Member : <span class="primary--text">{{editName}}</span></h3></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                id="name"
                label="Name"
                v-model="editName"
                required
                clearable
                autocomplete="off"
                prepend-icon="person"
              >
              </v-text-field>
              <v-text-field
                name="mobile"
                id="mobile"
                label="Mobile"
                v-model="editMobile"
                required
                type="number"
                clearable
                autocomplete="off"
                prepend-icon="phone_iphone"
              >
              </v-text-field>
              <v-text-field
                name="address"
                id="address"
                label="Address"
                v-model="editAddress"
                required
                clearable
                autocomplete="off"
                prepend-icon="home"
              >
              </v-text-field>
              <v-text-field
                name="monthlySubscription"
                id="monthlySubscription"
                label="Monthly Subscription"
                v-model="editMonthlySubscription"
                required
                type="number"
                clearable
                autocomplete="off"
                prepend-icon="attach_money"
              >
              </v-text-field>
              <!-- <v-text-field
                name="date"
                id="date"
                label="Date"
                v-model="editDate"
                required
                clearable
                autocomplete="off"
                prepend-icon="fas fa-calendar"
              >
              </v-text-field> -->

              <v-layout row mb-4>
                <v-flex xs12>
                  <h4>
                    <v-icon left>fas fa-calendar</v-icon>
                    &emsp;
                    Choose Date
                  </h4>
                </v-flex>
              </v-layout>
              <v-layout row mb-4>
                <v-flex xs12>
                  <v-date-picker v-model="editDate"></v-date-picker>
                </v-flex>
              </v-layout>

              <v-text-field
                name="memberId"
                id="memberId"
                label="MemberId"
                v-model="editMemberId"
                type="number"
                clearable
                autocomplete="off"
                prepend-icon="fas fa-id-card-o"
              >
              </v-text-field>
              <v-text-field
                name="notes"
                id="notes"
                label="Notes"
                v-model="editNotes"
                multi-line
                clearable
                autocomplete="off"
                prepend-icon="notes"
              >
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="primary--text" @click="onSaveChanges">
                <v-icon left>check</v-icon>
                Save
              </v-btn>
              <v-btn flat class="secondary--text darken-1" @click="closeDialog">
                <v-icon left>close</v-icon>
                Close
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>

  <v-layout row justify-center>
    <v-dialog persistent v-model="ConfirmModal" max-width="500">
      <v-card>
        <v-card-text>
          <h3>Member
            <span class="primary--text">{{MemberName}}</span>
            updated successfully!
          </h3>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat class="primary--text" @click.native="ConfirmModalUpdate()">
            <v-icon left>check</v-icon>
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>


  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  props: ['info'],
  data () {
    return {
      editName: this.info.name,
      editMemberId: this.info.memberId,
      editMobile: this.info.mobile,
      editAddress: this.info.address,
      editMonthlySubscription: this.info.monthlySubscription,
      editNotes: this.info.notes,
      editDate: this.info.date,
      editDialog: false,
      time: new Date(),
      ConfirmModal: false,
      MemberName: null
    }
  },
  methods: {
    closeDialog () {
      this.editDialog = false
      setTimeout(() => {
        this.fillDialog()
      }, 1000)
    },
    fillDialog () {
      this.editName= this.info.name,
      this.editMemberId= this.info.memberId,
      this.editMobile= this.info.mobile,
      this.editAddress= this.info.address,
      this.editMonthlySubscription= this.info.monthlySubscription,
      this.editNotes= this.info.notes,
      this.editDate= this.info.date
    },
    onSaveChanges () {
      if (this.editName === null || this.editMobile === null || this.editMonthlySubscription === null || this.editDate === null || this.editAddress === null) {
        alert('Name, Mobile, Monthly Subscription, Address and Date must be filled')
        return
      }
      this.editDialog = false
      const updateMember = {}

      if (this.editName) {
        updateMember.name = this.editName
      }
      if (this.editMemberId) {
        updateMember.memberId = this.editMemberId
      }
      if (this.editMobile) {
        updateMember.mobile = this.editMobile
      }
      if (this.editAddress) {
        updateMember.address = this.editAddress
      }
      if (this.editMonthlySubscription) {
        updateMember.monthlySubscription = this.editMonthlySubscription
      }
      if (this.editNotes) {
        updateMember.notes = this.editNotes
      }
      if (this.editDate) {
        updateMember.date = this.editDate
      }
      updateMember.updatedAt = this.time.toJSON()

      firebase.database().ref('members').child(this.$route.params.memberId).update(updateMember)
        .then(() => {
          // alert(`${this.info.name} updated successfully!`)
          this.ConfirmModal = true
          this.MemberName = this.info.name
        })
        .catch(error => {
          console.log(error.message)
        })
      // this.$parent.$parent.fetchMember()
    },
    ConfirmModalUpdate () {
      this.ConfirmModal = false
      this.$parent.$parent.fetchMember()
    },
  },
  created () {
    this.fillDialog()
  }
}
</script>

<style scoped>
div.input-group__input > i.fas {
  font-size: 20px!important;
  color: red!important;
}
@media (max-width: 576px) {
  .picker.picker--date {
    max-width: 124%;
  }
}
</style>