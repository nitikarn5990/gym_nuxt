<template>
<span>
  <v-btn
    fixed
    round
    bottom
    left
    exact
    to="/"
    target="_blank"
    class="primary hidden-xs-only"
  >
    <v-icon left>group</v-icon>
    All Members
  </v-btn>
  <v-btn
    fixed
    round
    bottom
    right
    exact
    to="/new-member"
    target="_blank"
    class="primary hidden-xs-only"
  >
    <v-icon left>person_add</v-icon>
    Add New Member
  </v-btn>


  
  <v-btn
    fixed
    round
    bottom
    left
    exact
    to="/"
    target="_blank"
    class="primary b-small"
  >
    <v-icon>group</v-icon>
  </v-btn>
  <v-btn
    fixed
    round
    bottom
    right
    exact
    to="/new-member"
    target="_blank"
    class="primary b-small"
  >
    <v-icon>person_add</v-icon>
  </v-btn>
  </span>
</template>

<style scoped>
  .primary.btn.btn--bottom.btn--fixed.btn--left {
    z-index: 2;
  }
  .primary.btn.btn--bottom.btn--fixed.btn--right {
    z-index: 2;
  }
</style>
