<template>
  <div
    id="signinPage"
    class="bg-image"
    fluid
    style="background: url('/images/signup-img.jpg');"
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
              <h1><strong>Buat akun.</strong></h1>
              <h3 class="mt-0 pb-2">Isi data Anda dengan lengkap</h3>
              <!-- Alert section -->
              <div v-if="alert.show">
                <v-alert :type="alert.type" dismissible>
                  <div class="white--text">
                    {{ alert.message }}
                  </div>
                </v-alert>
              </div>
              <!-- <div v-if="alert.show" class="px-30 pt-10">
                <div
                  v-bind:class="[alert.success ? 'alert-success' : 'alert-danger']"
                  class="alert alert-dismissable"
                  role="alert"
                >
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span @click="closeAlert" aria-hidden="true">×</span>
                  </button>
                  <p class="mb-0">{{ alert.message }}</p>
                </div>
              </div> -->
              <!-- END Alert section -->
              <v-form>
                <!-- <v-text-field
                  v-model="register.nama"
                  label="Nama lengkap"
                  name="name"
                  type="text"
                  require
                /> -->

                <v-text-field
                  id="email"
                  v-model="register.email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                />

                <!-- <v-text-field
                  id="phone_number"
                  v-model="register.telepon"
                  label="No. Telepon"
                  name="phone_number"
                  type="tel"
                  require
                /> -->

                <v-text-field
                  id="password"
                  v-model="register.password"
                  label="Password"
                  name="password"
                  :rules="rules"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  @click:append="show_password = !show_password"
                  required
                />

                <v-text-field
                  id="passwordConfirm"
                  v-model="register.password_confirm"
                  label="Konfirmasi Password"
                  name="passwordConfirm"
                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_password ? 'text' : 'password'"
                  @click:append="show_password = !show_password"
                  required
                />
                <!-- <input type="hidden" name="" value=""> -->
                <v-checkbox v-model="register.terms" label="Setuju dengan Peraturan dan Syarat Penggunaan">
                </v-checkbox>
                <v-btn
                  large
                  block
                  rounded
                  color="success"
                  dark
                  @click="registerUser">
                  <v-progress-circular
                    v-if="state.loading"
                    :size="20"
                    :width="2"
                    indeterminate
                    color="white"
                    class="mr-2"
                  ></v-progress-circular>
                  Sign up
                </v-btn>
                <div class="or-divider">
                  <div class="divider"></div>
                  <div class="or">ATAU</div>
                  <div class="divider"></div>
                </div>
                <div class="text-center">
                  <a @click="gotoPage('/signin')">Masuk</a>
                  <span class="mx-2">-</span>
                  <a @click="gotoPage('/forgot-password')">Kebijakan privasi</a>
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
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '../constants/settings'
import { SIGNUP_MUTATION } from '../constants/graphql'

export default {
  name: 'Signin',
  layout: 'App_blank',
  data() {
    return {
      state:{
        loading: false,
      },
      register:{
        nama:"",
        email:"",
        telepon:"",
        password:"",
        password_confirm:"",
        role:"asesi",
        terms: false
      },
      rules: [
        v => /[a-z]+/.test(v) || 'Minimal 1 huruf kecil.',
        v => /[A-Z]+/.test(v) || 'Minimal 1 huruf kapital.',
        v => /.{8,}/.test(v) || 'Minimal 8 karakter.',
        v => /[0-9]+/.test(v) || 'Minimal 1 angka.',
        v => /[^A-Za-z0-9]+/.test(v) || 'Minimal 1 spesial karakter.',
      ],
      show_password: false,
      alert: {
        show: false,
        type: '',
        message: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async registerUser(e) {
      e.preventDefault()
      const { state: { loading } } = this
      const { register: { email, password, password_confirm} } = this.$data
      if (!this.register.terms) {
        return this.showAlert('error', 'Syarat dan ketentuan harus disetujui')
      }
      if (!loading) {
        // set page status
        this.alert.show = false
        this.state.loading = true
        const result = await this.$apollo.mutate({
          mutation: SIGNUP_MUTATION,
          variables: {
            email,
            password,
            password_confirm
          }
        }).then(({ data }) => {
          console.log(data)
          this.gotoPage('activate')
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    gotoPage(page) {
      this.$router.push(page)
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
