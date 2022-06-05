<template>
  <v-app light class="grey lighten-4">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import Navbar from '../components/Navbar'

export default {
  name: "App",
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
