<template>
    <div>
      <v-app-bar color="blue-grey lighten-5" class="collapse-sidebar" elevate-on-scroll app>
        <v-app-bar-nav-icon color="orange lighten-2" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase pl-0">
          <span class="font-weight-bold">Asesi</span>
          <span>Panel</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!state.loading">
          <v-menu
            transition="slide-y-transition"
            bottom
            offset-y
          >
            <template #activator="{ on }">
              <v-btn text v-on="on">
                <v-list-item-avatar class="ml-0">
                  <img :src="profile.image">
                </v-list-item-avatar>
                <span v-if="profile.nama.length < 20" class="d-none d-sm-flex">{{ profile.nama }}</span>
                <span v-else class="d-none d-sm-flex">{{ profile.nama.substring(0,20)+"..." }}</span>
              </v-btn>
            </template>
            <v-list dense shaped>
              <v-list-item
                v-for="(item, i) in navItems"
                :key="i"
                :to="item.link"
                :exact="item.exact"
              >
                <v-list-item-icon>
                  <v-icon color="orange lighten-1">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-dialog v-model="passwordDialog" max-width="600px">
                <template #activator="{ on }">
                  <v-list-item v-on="on">
                    <v-list-item-icon>
                      <v-icon color="orange lighten-1">lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Ubah Password</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <v-form>
                  <v-card>
                    <v-card-title>
                      <span>Ubah Password</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <!-- <div >
                            
                          </div> -->
                          <v-col v-if="alert.show" cols="12" sm="12" md="12" class="pb-0">
                            <v-alert v-model="alert.show" :type="alert.type" dismissible>
                              <div class="white--text">
                                {{ alert.message }}
                              </div>
                            </v-alert>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="form.old_password" type="password" label="Password Lama" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="form.password" type="password" label="Password Baru" required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="form.password_confirmation" type="password" label="Konfirmasi Password Baru" required></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*Wajib diisi</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey" text @click="passwordDialog = false">Batal</v-btn>
                      <v-btn color="blue darken-1" text @click="changePassword">Ubah Password</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon color="orange lighten-1">exit_to_app</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        color="blue-grey lighten-5"
        app
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-img
              :src="require('@/assets/img/lsp_logo.png')"
              height="170"
              contain
            ></v-img>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list
          nav
          shaped
          dense
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
    </div>
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL, LSP_USERNAME } from '../constants/settings'
import { GET_USERDATA, GET_SELF_ASESI, UPDATE_SELF_USER } from '../constants/graphql'

export default {
  name: "NavbarAsesi",
  data() {
    return {
      profile: [],
      drawer: true,
      state: {
        loading: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      passwordDialog: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/asesi', exact: true},
        { title: 'Report', icon: 'folder', link: '/asesi/report-asesmen'},
        { title: 'Profile', icon: 'person', link: '/asesi/profile' },
      ],
      form: {
        password_confirmation: null,
        password: null,
        old_password: null,
        email: null
      },
      navItems: [
        { title: 'Profile', icon: 'person', link: '/asesi/profile' },
      ],
    }
  },
  mounted () {
    this.checkAsesiData()
  },
  methods: {
    onClick() {

    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async checkAsesiData() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        if (data.checkselfAsesi.user.role.role != 'asesi') {
          return this.logout()
        }
        this.profile = data.checkselfAsesi
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.loading = false
      })
    },
    async changePassword() {
      const { form: {password, password_confirmation, old_password} } = this.$data
      const email = this.profile.user.email
      const result = await this.$apollo.mutate({
        mutation: UPDATE_SELF_USER,
        variables: {
          email, password, password_confirmation, old_password
        }
      }).then(({ data }) => {
        console.log(data)
        this.showAlert('success', 'Password baru berhasil disimpan')
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.loading = false
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
