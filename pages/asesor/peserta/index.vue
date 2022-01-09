<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <v-card>
            <v-card-title>
              <span class="headline px-5">Detail Peserta</span>
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
                        <!-- <template v-slot:activator="{ on }">
                          <v-btn color="primary" outlined rounded dark v-on="on">Tambah Jadwal</v-btn>
                        </template> -->
                        <v-card>
                          <v-card-title>
                            <span class="headline">Tambah Jadwal</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-select
                                    v-model="form.skema_id"
                                    :items="skemas"
                                    label="Skema*"
                                    item-value="id" item-text="skema"
                                  />
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                  <v-select
                                    v-model="form.tempat_uk_id"
                                    :items="tuks"
                                    label="Tempat Uji Kompetensi (TUK)*"
                                    item-value="id" item-text="nama"
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    v-model="form.anggaran_id"
                                    :items="anggarans"
                                    label="Anggaran*"
                                    item-value="id" item-text="anggaran"
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <!-- date -->
                                  <v-menu
                                    ref="menu"
                                    v-model="dateMenu"
                                    :close-on-content-click="false"
                                    :return-value.sync="form.tanggal"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template #activator="{ on }">
                                      <v-text-field
                                        v-model="form.tanggal"
                                        label="Tanggal Uji Kompetensi"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                  <!-- date -->
                                </v-col>
                              </v-row>
                            </v-container>
                            <small>*Wajib diisi</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="createJadwal">Tambah Jadwal</v-btn>
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
                    :items="pesertas"
                    :search="search"
                    :items-per-page="5"
                    :line-numbers="true"
                  >
                    <template #top>
                      <v-dialog v-model="editDialog" persistent max-width="600px">
                        <v-card>
                          <v-card-title>
                            <span class="headline">Edit Peserta</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-select
                                    v-model="editedJadwals.skema.id"
                                    :items="skemas"
                                    label="Skema*"
                                    item-value="id" item-text="skema"
                                    disabled
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    v-model="editedJadwals.tempatUk.id"
                                    :items="tuks"
                                    label="Tempat Uji Kompetensi (TUK)*"
                                    item-value="id" item-text="nama"
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field
                                    v-model="editedJadwals.kuota"
                                    label="Kuota"
                                    type="number"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    v-model="editedJadwals.anggaran"
                                    :items="anggarans"
                                    label="Anggaran*"
                                    item-value="id" item-text="anggaran"
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <!-- date -->
                                  <v-menu
                                    ref="menu"
                                    v-model="dateMenu2"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template #activator="{ on }">
                                      <v-text-field
                                        v-model="editedJadwals.tanggal"
                                        label="Tanggal Uji Kompetensi"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" no-title scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn text color="primary" @click="dateMenu2 = false">Cancel</v-btn>
                                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                  <!-- date -->
                                </v-col>
                                <v-col v-if="editedJadwals.status != 0" cols="12" sm="6" md="6">
                                  <v-btn color="red darken-1" rounded outlined @click="cancelJadwal">Batalkan Jadwal</v-btn>
                                </v-col>
                              </v-row>
                            </v-container>
                            <small>*Wajib diisi</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="editDialog = false">Batal</v-btn>
                            <v-btn color="blue darken-1" text @click="updateJadwal">Edit Jadwal</v-btn>
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
                            <v-btn color="red darken-1" text @click="deleteDialog = false">Batal</v-btn>
                            <v-btn color="red darken-1" text @click="deleteJadwal">Delete Jadwal</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </template>
                    <template #item.status="{ item }">
                      <v-chip v-if="item.status != 0" small color="success">Aktif</v-chip>
                      <v-chip v-else small color="red darken-1" dark>Batal</v-chip>
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
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_TUKS, CREATE_JADWAL_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/graphql'
import { GET_JADWALS, GET_ANGGARANS, GET_PESERTAS_ASESOR } from '../../../constants/graphql'

export default {
  name: 'PesertaDetail',
  layout: 'App_asesor',
  data() {
    return {
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
      editedJadwals: {
        id: '',
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: null,
        tempatUk: [],
        mea: ''
      },
      deletedIndex: -1,
      deletedJadwals: {},
      defaultJadwals: {
        id: '',
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: '', 
        default_tuk: '', 
        mea: ''
      },
      form: {
        tempat_uk_id: '',
        skema_id: '',
        anggaran_id: '',
        tanggal: ''
      },
      headers: [
        { text: 'Nama', value: 'asesi.nama' },
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Asesor', value: 'asesor.nama' },
        { text: 'Tindak Lanjut', value: 'tindak_lanjut' },
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
      anggarans: [],
      jadwals: [],
      pesertas: [],
      skemas: []
    }
  },
  mounted() {
    this.getPesertas()
    this.getJadwals()
    this.getSkemas()
    this.getTuks()
    this.getAnggarans()
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
      this.editedIndex = this.jadwals.indexOf(item)
      this.editedJadwals = Object.assign({}, item)
      if (this.editedJadwals.tempatUk == null) {
        this.editedJadwals.tempatUk = Object.assign({}, {id: ''})
      }
      if (this.editedJadwals.anggaran == null) {
        this.editedJadwals.anggaran = Object.assign({}, {id: ''})
      }
      this.editDialog = true
    },
    async deleteItem(item){
      this.deletedIndex = this.jadwals.indexOf(item)
      this.deletedJadwals = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getPesertas() {
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_ASESOR
      }).then(({ data }) => {
        this.pesertas = data.checkselfAsesor.peserta
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getJadwals() {
      const result = await this.$apollo.mutate({
        mutation: GET_JADWALS
      }).then(({ data }) => {
        this.jadwals = data.jadwals
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async getTuks() {
      const result = await this.$apollo.mutate({
        mutation: GET_TUKS
      }).then(({ data }) => {
        this.tuks = data.tempatuks
      }).catch((error) => {
        console.log(error)
      })
    },
    async getAnggarans() {
      const result = await this.$apollo.mutate({
        mutation: GET_ANGGARANS
      }).then(({ data }) => {
        this.anggarans = data.anggarans
      }).catch((error) => {
        console.log(error)
      })
    },
    async getSkemas() {
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMAS
      }).then(({ data }) => {
        this.skemas = data.skemas
      }).catch((error) => {
        console.log(error)
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async createJadwal() {
      this.alert.show = false
      const { form: {tempat_uk_id, skema_id, anggaran_id, tanggal} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_JADWAL_MUTATION,
        variables: {
          tempat_uk_id, skema_id, anggaran_id, tanggal
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Jadwal baru berhasil dibuat')
        this.getJadwals()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateJadwal() {
      this.alert.show = false
      const { editedJadwals: {id, kuota, tanggal} } = this.$data
      const tempat_uk_id = this.editedJadwals.tempatUk.id
      const anggaran_id = this.editedJadwals.anggaran.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_JADWAL_MUTATION,
        variables: {
          id, tempat_uk_id, anggaran_id, tanggal, kuota
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data skema berhasil diperbarui')
        this.getJadwals()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteJadwal() {
      this.alert.show = false
      const id = this.deletedJadwals.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_JADWAL_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data skema berhasil dihapus')
        this.getJadwals()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
    async cancelJadwal() {
      this.alert.show = false
      const id = this.editedJadwals.id
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
