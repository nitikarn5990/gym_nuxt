<template>
  <v-app>
    <newMember></newMember>
    <v-container>
      <v-layout row>
        <v-flex  xs12 sm6 offset-sm3 text-xs-center mb-4>
          <h2 class="primary--text">All Members</h2>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>

        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import newMember from '@/components/newMember'

export default {
  components: {
    newMember
  },
  data () {
    return {
 
    }
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style scoped>

</style>