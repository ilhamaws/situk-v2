<template>
  <div
    id="signinPage"
    class="bg-image"
    fluid
    style="background: url('/images/activate-img.jpg');"
  >
    <div
      class="fill-height bg-black-op"
      fluid
    >
      <img class="img-responsive" src="@/assets/img/lsp_logo.png" alt="" style="position: fixed; width: auto !important; height: 170px; top: 15px; left: 40px;">
      <div class="d-flex justify-end">
        <v-col md="4" xs="12" class="hero-static bg-white animated fadeInRight d-flex align-center justify-center animated fadeInRight">
          <div class="content content-full">
            <div class="px-7">
              <!-- <a href="/">
                <img class="img-responsive" src="@/assets/img/upn_logo.png" alt="" style="position: fixed; width: auto !important; height: 50px; top: 20px; right: 120px;">
              </a> -->
              <h1><strong>Aktivasi Akun.</strong></h1>
              <h3 class="mt-0 pb-2">Silahkan masukkan kode verifikasi</h3>
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
                  v-model="activate.email"
                  label="Email"
                  name="email"
                  type="email"
                />

                <v-text-field
                  id="activationCode"
                  v-model="activate.activation"
                  label="Kode Aktifasi"
                  name="activation"
                  type="password"
                />
                <v-btn
                  class="mt-5"
                  large
                  block
                  rounded
                  color="error"
                  dark
                  @click="activateAccount">
                  <v-progress-circular
                    v-if="state.loading"
                    :size="20"
                    :width="2"
                    indeterminate
                    color="white"
                    class="mr-2"
                  ></v-progress-circular>
                  Aktifkan
                </v-btn>
                <div class="or-divider">
                  <div class="divider"></div>
                  <div class="or">ATAU</div>
                  <div class="divider"></div>
                </div>
                <div class="text-center">
                  <a @click="dialog = true">Kirim ulang kode</a>
                  <span class="mx-2">-</span>
                  <a @click="gotoPage('/signin')">Masuk</a>
                </div>
              </v-form>
            </div>
          </div>
        </v-col>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          <h3><strong>Kirim ulang kode aktivasi</strong></h3>
        </v-card-title>
        <v-card-text>
          <!-- Alert section -->
          <div v-if="alertDialog.show">
            <v-alert :type="alertDialog.type" dismissible>
              <div class="white--text">
                {{ alertDialog.message }}
              </div>
            </v-alert>
          </div>
          <!-- End alert section -->
          <v-form>
            <v-text-field
              v-model="activate.email"
              label="Email"
              name="email"
              type="email"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="resendActivation">kirim ulang</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

import { ACTIVATE_ACCOUNT_MUTATION, RESEND_OTP_MUTATION } from '../constants/graphql'
export default {
  name: 'ActivatePage',
  layout: 'App_blank',
  data() {
    return {
      state: {
        loading: false
      },
      dialog: false,
      activate: {
        email: "",
        activation: ""
      },
      alert: {
        show: false,
        type: '',
        message: ''
      },
      alertDialog: {
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
    showAlertDialog(type, message) {
      this.alertDialog = { show: true, type, message }
    },
    async activateAccount(e) {
      e.preventDefault()
      const { state: { loading } } = this
      const { activate: { email, activation } } = this.$data
      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const result = await this.$apollo.mutate({
          mutation: ACTIVATE_ACCOUNT_MUTATION,
          variables: {
            email,
            activation
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Akun anda telah aktif, Silahkan menuju halaman Singin')
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    async resendActivation() {
      this.alertDialog.show = false
      const { activate: { email } } = this.$data
      const result = await this.$apollo.mutate({
        mutation: RESEND_OTP_MUTATION,
        variables: {
          email
        }
      }).then(({ data }) => {
        this.showAlertDialog('success', 'Silahkan cek email anda')
      }).catch(({graphQLErrors}) => {
        this.showAlertDialog('error', graphQLErrors[0].message)
      })
    },
    gotoPage(page) {
      this.$router.push(page)
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
