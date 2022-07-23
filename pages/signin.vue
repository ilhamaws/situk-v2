<template>
  <div
    id="signinPage"
    class="bg-image"
    fluid
    style="background: url('/images/signin-img.jpg');"
  >
    <div
      class="fill-height bg-black-op"
      fluid
    >
      <div class="d-flex justify-end">
        <img class="img-responsive" src="@/assets/img/lsp_logo.png" alt="" style="position: fixed; width: auto !important; height: 170px; top: 15px; left: 40px;">
        <v-col md="4" xs="12" class="hero-static bg-white animated fadeInRight d-flex align-center justify-center animated fadeInRight">
          <div class="content content-full">
            <div class="px-7">
              <!-- <a href="/">
                <img class="img-responsive" src="@/assets/img/upn_logo.png" alt="" style="position: fixed; width: auto !important; height: 50px; top: 20px; right: 120px;">
              </a> -->
              <h1 class="font-weight-bold">Masuk.</h1>
              <h3 class="mt-0 pb-2">Silahkan masuk ke akun Anda</h3>
              <!-- Alert section -->
              <div v-if="alert.show">
                <v-alert :type="alert.type" dismissible>
                  <div class="white--text">
                    {{ alert.message }}
                  </div>
                </v-alert>
              </div>
              <!-- End alert section -->
              <v-form @submit="loginUser">
                <v-text-field
                  v-model="login.email"
                  label="Email"
                  type="email"
                />

                <v-text-field
                  id="password"
                  v-model="login.password"
                  label="Password"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  @click:append="show_password = !show_password"
                />
                <v-btn
                  type="submit"
                  class="mt-5"
                  large
                  block
                  rounded
                  color="primary"
                  dark>
                  <v-progress-circular
                    v-if="state.loading"
                    :size="20"
                    :width="2"
                    indeterminate
                    color="white"
                    class="mr-2"
                  ></v-progress-circular>
                  Sign in
                </v-btn>
                <div class="or-divider">
                  <div class="divider"></div>
                  <div class="or">ATAU</div>
                  <div class="divider"></div>
                </div>
                <div class="text-center">
                  <a @click="gotoPage('/signup')">Buat akun</a>
                  <span class="mx-2">-</span>
                  <a @click="gotoPage('/forgot-password')">Lupa password</a>
                  <span class="mx-2">-</span>
                  <a @click="gotoPage('/activate')">Aktivasi akun</a>
                </div>
              </v-form>
            </div>
          </div>
        </v-col>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '../constants/settings'
import { client } from '../apollo/client-configs/default'
import { SIGNIN_MUTATION, GET_SELF_ASESOR } from '../constants/graphql'
export default {
  name: 'AppLogin',
  layout: 'App_blank',
  data() {
    return {
      state:{
        loading: false,
        token: null
      },
      login:{
        email: '',
        password: ''
      },
      authDetails:{
        email: '',
        password: ''
      },
      show_password: false,
      alert:{
        show: false,
        type: '',
        message: '',
      }
    }
  },
  async mounted () {
    // if (localStorage.getItem('lsp-auth-token') != null) {
    //   this.gotoPage('dashboard-asesi');
    // }
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async loginUser(e) {
      e.preventDefault()
      const { state: { loading } } = this
      const { login: { email, password } } = this.$data
      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const result = await this.$apollo.mutate({
          mutation: SIGNIN_MUTATION,
          variables: {
            email,
            password
          }
        }).then(( result ) => {
          const id = result.data.login.id
          const token = result.data.login.token
          const role = result.data.login.role.role
          this.saveUserData(id, token)
          // show alert
          this.showAlert('success', 'anda berhasil login')
          this.$apolloHelpers.onLogin(token)
          // check if user has already have username
          this.checkUserData(role, result.data.login.asesi)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    // confirm () {
    //   },
    saveUserData (id, token) {
      localStorage.setItem(LSP_USER_ID, id)
      localStorage.setItem(LSP_AUTH_TOKEN, token)
    },
    checkRole(data) {
      if (data = 'admin') {
        this.gotoPage('admin')
      } else {
      }
    },
    async checkUserData(role, data) {
      // console.log(data);
      if (role == 'admin') {
        this.gotoPage('/admin')
      } 
      else if (role == 'asesor') {
        const result = await this.$apollo.mutate({
          mutation: GET_SELF_ASESOR
        }).then(({ data }) => {
          if (data.checkselfAsesor == null) {
            this.gotoPage('/asesor-form')
          } else {
            this.gotoPage('/asesor')
          }
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        })
      } 
      else if (role == 'asesi') {
        if (data != null) {
          this.gotoPage('/asesi')
        } else {
          // alert('error');
          this.gotoPage('/apl-1')
        }
      }
    },
    gotoPage(page) {
      this.$router.push(page)
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
