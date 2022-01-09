<template>
  <v-app light class="grey lighten-4">
    <Navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import Navbar from '../components/Navbar'

export default {
  name: "Default",
  components: { Navbar },
  data() {
    return {

    }
  },
  methods: {
    gotoPage(page) {
      this.$router.push(page)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
