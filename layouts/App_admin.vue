<template>
  <v-app class="grey lighten-4">
    <NavbarAdmin />
    <v-main id="content">
      <div v-if="alert.show">
        <v-container class="pb-0">
          <v-alert :type="alert.type" dismissible>
            <div class="white--text">
              {{ alert.message }}
            </div>
          </v-alert>
        </v-container>
      </div>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import NavbarAdmin from '../components/NavbarAdmin'
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL, LSP_USERNAME } from '../constants/settings'


export default {
  name: "AppAdmin",
  components: {
    NavbarAdmin
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
        // this.gotoPage('signin');
      } else {
        // this.checkAsesiData();
      };
    },
    checkAsesiData() {
      const DataAsesi = this.$axios.post(API_BASE_URL,{
        query: `{
        user(
          id : "${localStorage.getItem('lsp-user-id')}"
        ){
          asesi{
            nama
          }
        }
      }`,
      }).then(({ data }) => {
        // console.log(data.data);
        if (data.errors) {
          // throw new Error(data.errors[0].message);
          this.showAlert('error', data.errors[0].message)
          this.gotoPage('/edit-profile')
        } else {
          const username = data.data.user.asesi.nama
          this.saveUserData(username)
        }
      }).catch((error) => {
        this.gotoPage('/edit-profile')
        this.showAlert('warning', 'harap melengkapi form APL 1 terlebih dahulu')
        // alert(error);
      })
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
