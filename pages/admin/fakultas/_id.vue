<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
        class="container container--fluid px-10 py-10"
      >
        <v-card>
          <v-card-title>
            <span class="headline px-5">Program Studi</span>
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
                <v-form ref="form">
                  <v-row>
                    <v-dialog v-model="tambahDialog" persistent max-width="600px">
                      <template #activator="{ on }">
                        <v-btn color="primary" outlined rounded dark v-on="on">Tambah Program Studi</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Program Studi</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  id="id"
                                  v-model="form.jurusan"
                                  name="name"
                                  label="Nama Fakultas"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="createJurusan">Tambah Program Studi</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
                </v-form>
                <v-skeleton-loader
                  v-if="state.skeleton"
                  ref="skeleton"
                  type="table-thead, table-tbody"
                  class="mx-auto"
                ></v-skeleton-loader>
                <v-data-table
                  v-if="!state.skeleton"
                  :headers="headers"
                  :items="jurusans"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Program Studi</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                  id="id"
                                  v-model="editedJurusan.jurusan"
                                  name="name"
                                  label="Nama Program Studi"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateJurusan">Edit Fakultas</v-btn>
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
                          <v-btn color="red darken-1" text @click="deleteJurusan">Delete Program Studi</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.tindak_lanjut="{ item }">
                    <v-chip v-if="item.status == -1" small color="grey" dark>Ditolak</v-chip>
                    <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                    <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                    <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                  </template>
                  <!-- <template v-slot:item.tempatUk.id="{ item }">
                    <span :items="tuks" item-value="id" item-text="nama">{{ item.nama }}</span>
                </template> -->
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
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_TUKS, CREATE_JURUSAN_MUTATION, UPDATE_JURUSAN_MUTATION, DELETE_JURUSAN_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/graphql'
import { GET_JADWALS, GET_ANGGARANS, GET_PESERTAS, GET_JURUSANS } from '../../../constants/graphql'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      fakultas_id: this.$route.params.id,
      date: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      dateMenu2: false,
      state: {
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      deleteDialog: false,
      tambahDialog: false,
      editDialog: false,
      profile: {
        username: ''
      },
      editedIndex: -1,
      editedJurusan: {
        id: '',
        jurusan: ''
      },
      deletedIndex: -1,
      deletedJurusan: {},
      defaultJadwals: {
        id: '',
        fakultas: ''
      },
      form: {
        jurusan: ''
      },
      headers: [
        { text: 'Nama Program Studi', value: 'jurusan' },
        { text: 'Aksi', value: 'actions' },
      ],
      meas: ['Mea', 'None Mea'],
      status: [
        {
          id: 0,
          status: 'Batal'
        },
        {
          id: 1,
          status: 'Aktif'
        }
      ],
      tuks: [],
      jurusans: []
    }
  },
  mounted() {
    this.getJurusans()
  },
  methods: {
    reset(dialog) {
      if (this.tambahDialog = true) {
        this.tambahDialog = false
      }
      if (this.editDialog = true) {
        this.editDialog = false
      }
      this.$refs.form.reset()
    },
    editItem(item) {
      this.editedIndex = this.jurusans.indexOf(item)
      this.editedJurusan = Object.assign({}, item)
      this.editDialog = true
    },
    async deleteItem(item){
      this.deletedIndex = this.jurusans.indexOf(item)
      this.deletedJurusan = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getJurusans() {
      const id = this.fakultas_id
      const result = await this.$apollo.mutate({
        mutation: GET_JURUSANS,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.jurusans = data.fakultas.jurusan
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async createJurusan() {
      this.alert.show = false
      const { form: {jurusan} } = this.$data
      const fakultas_id = this.fakultas_id
      const result = await this.$apollo.mutate({
        mutation: CREATE_JURUSAN_MUTATION,
        variables: {
          jurusan, fakultas_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Fakultas baru berhasil dibuat')
        this.getJurusans()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateJurusan() {
      this.alert.show = false
      const { editedJurusan: {id, jurusan} } = this.$data
      const fakultas_id = this.fakultas_id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_JURUSAN_MUTATION,
        variables: {
          id, jurusan, fakultas_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Program Studi berhasil diperbarui')
        this.getJurusans()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteJurusan() {
      this.alert.show = false
      const id = this.deletedJurusan.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_JURUSAN_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Program Studi berhasil dihapus')
        this.getJurusans()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
    async cancelJadwal() {
      this.alert.show = false
      const id = this.editedFakultass.id
      const result = await this.$apollo.mutate({
        mutation: CANCEL_JADWAL_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Jadwal berhasil dibatalkan')
        this.editDialog = false
        this.getJadwals()
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
