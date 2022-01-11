<template>
  <v-app light class="grey lighten-4">
    <v-main id="content">
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
  unmounted() {
    this.style.remove()
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
