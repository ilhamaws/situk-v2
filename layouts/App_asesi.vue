<template>
  <v-app class="grey lighten-4">
    <NavbarAsesi />
    <v-main id="content">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import NavbarAsesi from '../components/NavbarAsesi'
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL, LSP_USERNAME } from '../constants/settings'


export default {
  name: "AppAsesi",
  components: {
    NavbarAsesi
  },
  middleware: ['isAuth'],
  data() {
    return {
      state:{
        sessionChecking: true
      },
      profile: {
      },
      alert:{
        show: false,
        type: '',
        message: '',
      }
    }
  },
  async mounted () {
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    checkToken() {
      if (localStorage.getItem('lsp-auth-token') == null) {
        this.gotoPage('signin')
      } else {
      };
    },
    saveUserData(username) {
      localStorage.setItem(LSP_USERNAME, username)
    },
    gotoPage(page) {
      this.$router.push(page)
    }
  }
}
</script>
