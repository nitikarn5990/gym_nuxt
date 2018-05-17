<template>
  <v-btn
    fixed
    round
    bottom
    right
    to="/new-member"
    target="_blank"
    class="primary"
  >
    <v-icon left>add</v-icon>
    Add New Member
  </v-btn>
</template>

<style scoped>
  .primary.btn.btn--bottom.btn--fixed.btn--right {
    z-index: 2;
  }
</style>
