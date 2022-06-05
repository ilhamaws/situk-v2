<template>
  <nav>
    <v-app-bar class="collapse-sidebar" elevate-on-scroll app>
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase pl-0">
        <span class="font-weight-bold">Admin</span>
        <span>Panel</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items>
        <v-list-item-avatar>
          <img :src="profile.image">
        </v-list-item-avatar>
      </v-toolbar-items> -->
      <v-toolbar-items>
        <v-btn color="primary" text @click="logout">
          <v-icon left>exit_to_app</v-icon>
          <span>Logout</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="primary"
      dark
    >
      <!-- <v-list-item two-line>
        <v-list-item-content>
          <v-img
            :src="require('@/assets/img/lsp_logo.png')"
            height="80"
            contain
          ></v-img>
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item class="text-uppercase text-h6">
        <span class="font-weight-bold mr-1">LSP</span>
        <span>TIFA</span>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        nav
        dense
        shaped
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          class="mx-0"
          :to="item.link"
          link
          :exact="item.exact"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL, LSP_USERNAME } from '../constants/settings'
import { GET_USERDATA } from '../constants/graphql'

export default {
  name: "NavbarAdmin",
  data() {
    return {
      collapseNavbar: false,
      profile: {
      },
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/admin/', exact: true},
        { title: 'Skema', icon: 'folder', link: '/admin/skema' },
        { title: 'Jadwal', icon: 'date_range', link: '/admin/jadwal' },
        { title: 'TUK', icon: 'location_on', link: '/admin/tuk' },
        // { title: 'Lembaga', icon: 'business', link: '/admin/lembaga' },
        // { title: 'Fakultas', icon: 'school', link: '/admin/fakultas' },
        // { title: 'Umpan Balik', icon: 'reply', link: '/admin/umpan-balik' },
        { title: 'User', icon: 'person_add', link: '/admin/users' },
        // { title: 'Unit Kompetensi', icon: 'toc', link: '/admin/unit-kompetensi' },
        // { title: 'Elemen', icon: 'menu_open', link: '/admin/element' },
        // { title: 'Settings', icon: 'settings', link:'#' },
      ],
    }
  },
  created () {
    this.checkAsesiData()
  },
  methods: {
    onClick() {

    },
    async checkAsesiData() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_USERDATA,
        variables: {
          user_id
        }
      }).then(({ data }) => {
        if (data.user.role.role != 'admin') {
          this.logout()
        }
        this.profile.email = data.user.email
        console.log(data.user.role.role)
      }).catch((graphQLErrors) => {
        alert(graphQLErrors[0].message)
      })
    },
    saveUserData(username) {
      localStorage.setItem(LSP_USERNAME, username)
      this.profile.username = localStorage.getItem('lsp-username')
    },
    gotoPage(page) {
      this.$router.push(page)
    },
    logout () {
      localStorage.removeItem(LSP_USER_ID)
      localStorage.removeItem(LSP_AUTH_TOKEN)
      this.$apolloHelpers.onLogout()
      this.gotoPage('/signin')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
