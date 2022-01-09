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
            <span class="headline px-5">Lembaga</span>
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
                      <v-btn color="primary" outlined rounded dark v-on="on">Tambah Lembaga</v-btn>
                    </template>
                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Lembaga</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.nama" label="Nama Lembaga" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.email" label="Email"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.telepon" label="Telepon"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                <v-text-field v-model="form.alamat" label="Alamat"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field v-model="form.kodepos" label="Kodepos"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                          <v-btn color="primary" text @click="createLembaga">Tambah Lembaga</v-btn>
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
                  :items="lembagas"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Lembaga</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedLembaga.nama" label="Nama Lembaga" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedLembaga.email" label="Email"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedLembaga.telepon" label="Telepon"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                <v-text-field v-model="editedLembaga.alamat" label="Alamat"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4" md="4">
                                <v-text-field v-model="editedLembaga.kodepos" label="Kodepos"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="primary" text @click="updateLembaga">Update Lembaga</v-btn>
                        </v-card-actions>
                      </v-card>
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
                          <v-btn color="red darken-1" text @click="deleteLembaga">Delete Lembaga</v-btn>
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
import { GET_TUKS, GET_LEMBAGAS, REGISTER_JADWALS, GET_SYARATS, UPDATE_LEMBAGA_MUTATION, CREATE_LEMBAGA_MUTATION, DELETE_LEMBAGA_MUTATION } from '@/constants/graphql'

export default {
  name: 'Tuks',
  layout: 'App_admin',
  data() {
    return {
      state:{
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      tambahDialog: false,
      editDialog: false,
      deleteDialog: false,
      profile: {
        username: ''
      },
      headers: [
        { text: 'Nama Lembaga', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Alamat', value: 'alamat' },
        { text: 'Telepon', value: 'telepon' },
        { text: 'Jumlah Asesi', value: 'asesi.length' },
        { text: 'Aksi', value: 'actions' },
      ],
      editedIndex: -1,
      editedLembaga: {
        id: '',
        nama: '',
        alamat: '',
        kodepos: '',
        telepon: '',
        email: ''
      },
      deletedIndex: -1,
      deletedLembaga: {
        id: '',
        nama: '',
        alamat: '',
        kodepos: '',
        telepon: '',
        email: ''
      },
      form: {
        nama: '',
        alamat: '',
        kodepos: '',
        telepon: '',
        email: ''
      },
      tuks: [
      ],
      lembagas:[]
    }
  },
  mounted() {
    this.getLembagas()
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.lembagas.indexOf(item)
      this.editedLembaga = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.deletedIndex = this.lembagas.indexOf(item)
      this.deletedLembaga = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getLembagas() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_LEMBAGAS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.lembagas = data.lembagas
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async createLembaga() {
      this.alert.show = false
      const { form: {nama, alamat, kodepos, telepon, email} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_LEMBAGA_MUTATION,
        variables: {
          nama, alamat, kodepos, telepon, email
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Lembaga '+ data.createLembaga.nama + ' berhasil dibuat')
        this.getLembagas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateLembaga() {
      this.alert.show = false
      const { editedLembaga: {id, nama, alamat, kodepos, telepon, email} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_LEMBAGA_MUTATION,
        variables: {
          id, nama, alamat, kodepos, telepon, email
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Lembaga '+ data.updateLembaga.nama + ' berhasil diperbarui')
        this.getLembagas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteLembaga() {
      this.alert.show = false
      const { deletedLembaga: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_LEMBAGA_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Lembaga berhasil dihapus')
        this.getLembagas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
