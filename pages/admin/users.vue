<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-card>
          <v-card-title>
            <!-- <v-avatar size="30" color="warning lighten-2">
            <span class="white--text">APL.1</span>
          </v-avatar> -->
            <span class="headline px-5">Informasi Users</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="px-10 py-5">
              <div class="px-5 py-5">
                <!-- Alert section -->
                <div v-if="alert.show">
                  <v-alert :type="alert.type" dismissible class="mb-10">
                    <div class="white--text">
                      {{ alert.message }}
                    </div>
                  </v-alert>
                </div>
                <!-- End alert section -->
                <v-row>
                  <v-dialog v-model="tambahDialog" persistent max-width="600px">
                    <template #activator="{ on }">
                      <v-btn color="primary" outlined rounded dark v-on="on">Tambah User</v-btn>
                    </template>
                    <v-form 
                      ref="form"
                      v-model="valid"
                      lazy-validation
                    >
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah User</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.email" :rules="emailRules" label="Email*" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                  v-model="form.password" 
                                  :rules="passwordRules"
                                  :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="show_password ? 'text' : 'password'"
                                  @click:append="show_password = !show_password"
                                  label="Password*"
                                  hint="Minimal 5 karakter"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="form.role_id"
                                  :items="roles"
                                  label="Role"
                                  item-value="id" item-text="role"
                                  :rules="[v => !!v || 'wajib diisi']"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Close</v-btn>
                          <v-btn color="blue darken-1" text @click="createUser">Tambah User</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
                  </v-dialog>
                  <!-- <v-btn 
                  color="primary"
                  outlined
                  rounded
                >Tambah Skema</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    class="shrink"
                    rounded
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
                <v-skeleton-loader
                  v-if="state.skeleton"
                  ref="skeleton"
                  type="table-thead, table-tbody"
                  class="mx-auto"
                ></v-skeleton-loader>
                <v-data-table
                  v-if="!state.skeleton"
                  :headers="headers"
                  :items="users"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                  :width="headers.width"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-form>
                        <v-card>
                          <v-card-title>
                            <span class="headline">Edit User</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field v-model="editedUser.email" :rules="emailRules" label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    v-model="editedUser.role.id"
                                    readonly
                                    disabled
                                    :items="roles"
                                    label="Role"
                                    item-value="id" item-text="role"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field 
                                    v-model="editedUser.password"
                                    required :rules="passwordRules"
                                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show_password ? 'text' : 'password'"
                                    @click:append="show_password = !show_password"
                                    label="Password*"
                                    hint="Minimal 5 karakter"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                            <small>*Wajib diisi</small>
                          </v-card-text>
                          <nuxt-link :to="`/admin/asesor-form/${editedUser.id}`">
                            <v-col v-if="!asesor_data" cols="12" sm="6" md="6" class="px-5">
                              <v-btn color="warning" rounded outlined>Isi data asesor</v-btn>
                            </v-col>
                          </nuxt-link>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                            <v-btn color="blue darken-1" text @click="updateUser">Edit User</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-dialog>
                    <v-dialog v-model="deleteDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

                        <v-card-text>
                          Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="deleteDialog = false">Batal</v-btn>
                          <v-btn color="red darken-1" text @click="deleteUser">Delete User</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                    <!-- <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                  <v-btn rounded x-small color="primary">Detail</v-btn>
                </nuxt-link> -->
                  </template>
                </v-data-table>
                <!-- <v-data-table
                    headers="headers"
                    items="items"
                    hide-actions
                    class="elevation-1"
                    select-all
                    :items-per-page="5"
                    item-key="id"
                    loading="true"
                    search="search"
                >
                </v-data-table> -->
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_USERS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, CHECK_USER_DATA , GET_ROLES, CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from '@/constants/graphql'
import { DELETE_USER_MUTATION } from '../../constants/graphql'

export default {
  name: 'Users',
  layout: 'App_admin',
  data() {
    return {
      state:{
        skeleton: true
      },
      show_password: false,
      valid: false,
      passwordRules: [
        v => !!v || 'Password wajib diisi',
        v => (v && v.length >= 5) || 'Password harus lebih dari 5 karakter'
      ],
      emailRules: [
        v => !!v || 'E-mail wajib diisi',
        v => /.+@.+/.test(v) || 'E-mail tidak valid',
      ],
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      profile: {
        username: ''
      },
      tambahDialog: false,
      editDialog: false,
      deleteDialog: false,
      headers: [
        { text: 'id', value: 'id', width: '10%' },
        { text: 'Email', value: 'email' },
        { text: 'role', value: 'role.role' },
        { text: 'Tanggal Daftar', value: 'created_at' },
        { text: 'Terakhir Update', value: 'updated_at' },
        { text: 'Aksi', value: 'actions' },
      ],
      users: [
      ],
      form: {
        email: '',
        password: '',
        role_id: ''
      },
      asesor_data : true,
      editedIndex: -1,
      editedUser: {
        id: '',
        email: '',
        password: '',
        role : {
          id: '',
          role: ''
        }
      },
      deletedIndex: -1,
      deletedUser: {
        id: '',
        email: '',
        password: '',
        role : {
          id: '',
          role: ''
        }
      },
      roles:[]
    }
  },
  mounted() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.asesor_data = true
      this.editedIndex = this.users.indexOf(item)
      this.editedUser = Object.assign({}, item)
      if (this.editedUser.role.role == 'asesor') {
        this.checkAsesorData()
      }
      this.editDialog = true
    },
    deleteItem(item) {
      this.deletedIndex = this.users.indexOf(item)
      this.deletedUser = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getUsers() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_USERS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.users = data.users
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getRoles() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_ROLES
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.roles = data.roles
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async createUser() {
      this.alert.show = false
      if (!this.$refs.form.validate()) {
        return 
      }
      const { form: {email, password, role_id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email, password, role_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'User baru berhasil dibuat')
        this.getUsers()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateUser() {
      this.alert.show = false
      const { editedUser: {id, email, password} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id, email, password
        }
      }).then(({ data }) => {
        this.showAlert('success', 'User TUK berhasil diperbarui')
        this.getUsers()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteUser() {
      this.alert.show = false
      const { deletedUser: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_USER_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data User berhasil diperbarui')
        this.getUsers()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
    async checkAsesorData() {
      this.alert.show = false
      const { editedUser: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CHECK_USER_DATA,
        variables: {
          id
        }
      }).then(({ data }) => {
        if (data.user.asesor == null) {
          return this.asesor_data = false
        }
      }).catch(({graphQLErrors}) => {
      })
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
