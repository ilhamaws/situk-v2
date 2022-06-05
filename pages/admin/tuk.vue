<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-card>
          <v-card-title class="font-weight-bold">
            <!-- <v-avatar size="30" color="warning lighten-2">
            <span class="white--text">APL.1</span>
          </v-avatar> -->
            <span class="font-weight-bold">Informasi TUK</span>
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
                      <v-btn color="primary" outlined dark v-on="on">Tambah TUK</v-btn>
                    </template>
                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah TUK</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.nama" label="Nama Tempat Uji Kompetensi (TUK)*" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="form.kode" label="Kode TUK*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="form.jenis" label="Jenis TUK*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.alamat" label="Alamat*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Close</v-btn>
                          <v-btn color="blue darken-1" text @click="createTuk">Tambah TUK</v-btn>
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
                  :items="tuks"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="font-weight-bold">Edit Tuk</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedTuks.nama" label="Nama Tempat Uji Kompetensi (TUK)*" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedTuks.kode" label="Kode TUK*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedTuks.jenis" label="Jenis TUK*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedTuks.alamat" label="Alamat*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateTuk">Edit TUK</v-btn>
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
                          <v-btn color="red darken-1" text @click="deleteTuk">Delete Tuk</v-btn>
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
import { GET_TUKS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, UPDATE_TUK_MUTATION, CREATE_TUK_MUTATION } from '@/constants/graphql'
import { DELETE_TUK_MUTATION } from '../../constants/graphql'

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
        { text: 'Nama', value: 'nama' },
        { text: 'Kode', value: 'kode' },
        { text: 'Jenis', value: 'jenis' },
        { text: 'Alamat', value: 'alamat' },
        { text: 'Aksi', value: 'actions' },
      ],
      editedIndex: -1,
      editedTuks: {
        id: '',
        kode: '',
        nama: '',
        jenis: '',
        alamat: ''
      },
      deletedIndex: -1,
      deletedTuks: {
        id: '',
        kode: '',
        nama: '',
        jenis: '',
        alamat: ''
      },
      form: {
        kode: '',
        nama: '',
        jenis: '',
        alamat: ''
      },
      tuks: [
      ]
    }
  },
  mounted() {
    this.getTuks()
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.tuks.indexOf(item)
      this.editedTuks = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.deletedIndex = this.tuks.indexOf(item)
      this.deletedTuks = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getTuks() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_TUKS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.tuks = data.tempatuks
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async createTuk() {
      this.alert.show = false
      const { form: {kode, nama, jenis, alamat} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_TUK_MUTATION,
        variables: {
          kode, nama, jenis, alamat
        }
      }).then(({ data }) => {
        this.showAlert('success', 'TUK baru berhasil dibuat')
        this.getTuks()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateTuk() {
      this.alert.show = false
      const { editedTuks: {id, kode, nama, jenis, alamat} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_TUK_MUTATION,
        variables: {
          id, kode, nama, jenis, alamat
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data TUK berhasil diperbarui')
        this.getTuks()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteTuk() {
      this.alert.show = false
      const { deletedTuks: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_TUK_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data TUK berhasil dihapus')
        this.getTuks()
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
