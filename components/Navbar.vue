<template>
  <nav>
    <v-app-bar elevate-on-scroll app style="background: rgb(7, 71, 166);" dark>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-bold">LSP</span>
        <span>Thesis</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="gotoPage('/')">Beranda</v-btn>
        <v-btn text>Tentang</v-btn>
        <v-btn text @click="gotoPage('/signin')">
          <span>Sign In</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
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
