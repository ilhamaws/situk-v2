<template>
  <div
    id="signinPage"
    class="bg-image"
    fluid
    style="background: url('/images/forgot-password.jpg');"
  >
    <div
      class="fill-height bg-black-op"
      fluid
    >
      <img class="img-responsive" src="@/assets/img/lsp_logo.png" alt="" style="position: fixed; width: auto !important; height: 170px; top: 15px; left: 40px;">
      <div class="d-flex justify-end">
        <v-col md="4" xs="12" class="hero-static bg-white animated fadeInRight d-flex align-center justify-center animated fadeInRight">
          <div class="content content-full">
            <div class="px-7">              <!-- <a href="/">
                <img class="img-responsive" src="@/assets/img/upn_logo.png" alt="" style="position: fixed; width: auto !important; height: 50px; top: 20px; right: 120px;">
              </a> -->
              <h1><strong>Lupa password?</strong></h1>
              <h3 class="mt-0 pb-2">Silahkan masukkan email yang terdaftar</h3>
              <!-- Alert section -->
              <div v-if="alert.show">
                <v-alert :type="alert.type" dismissible>
                  <div class="white--text">
                    {{ alert.message }}
                  </div>
                </v-alert>
              </div>
              <!-- End alert section -->
              <v-form>
                <v-text-field
                  v-model="resetPassword.email"
                  label="Email"
                  name="email"
                  type="email"
                />
                <v-btn
                  class="mt-5"
                  large
                  block
                  rounded
                  color="warning"
                  dark
                  @click="forgotPassword">
                  <v-progress-circular
                    v-if="state.loading"
                    :size="20"
                    :width="2"
                    indeterminate
                    color="white"
                    class="mr-2"
                  ></v-progress-circular>
                  Reset Password
                </v-btn>
                <div class="or-divider">
                  <div class="divider"></div>
                  <div class="or">ATAU</div>
                  <div class="divider"></div>
                </div>
                <div class="text-center">
                  <a @click="gotoPage('/signup')">Buat akun</a>
                  <span class="mx-2">-</span>
                  <a @click="gotoPage('/signin')">Masuk</a>
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
import { RESET_PASSWORD_MUTATION } from '../constants/graphql'
export default {
  name: 'ForgotPassword',
  layout: 'App_blank',
  data() {
    return {
      state: {
        loading: false
      },
      resetPassword: {
        email: ''
      },
      alert: {
        show: false,
        type: '',
        message: ''
      }
    }
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async forgotPassword(e) {
      e.preventDefault()
      const { state: { loading } } = this
      const { resetPassword: { email } } = this.$data
      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const result = await this.$apollo.mutate({
          mutation: RESET_PASSWORD_MUTATION,
          variables: {
            email
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Silahkan cek email anda')
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
        })
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
