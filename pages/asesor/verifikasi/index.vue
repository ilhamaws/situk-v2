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
              <!-- <v-avatar size="30" color="warning lighten-2">
                <span class="white--text">APL.1</span>
              </v-avatar> -->
              <span class="font-weight-bold">Informasi Asesi Yang Diuji</span>
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
                      <!-- <v-dialog v-model="tambahDialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                          <v-btn color="primary" outlined rounded dark v-on="on">Tambah Jadwal</v-btn>
                        </template>
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
                                    <v-menu
                                    ref="menu"
                                    v-model="dateMenu"
                                    :close-on-content-click="false"
                                    :return-value.sync="form.tanggal"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
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
                                </v-col>
                              </v-row>
                            </v-container>
                            <small>*Wajib diisi</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="reset">Close</v-btn>
                            <v-btn color="blue darken-1" text @click='createJadwal'>Tambah Jadwal</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog> -->
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
                      <!-- <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Peserta</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="4" md="4">
                                  <v-select
                                      v-model="editedPesertas.status"
                                      :items="status"
                                      label="Status*"
                                      item-value="id" item-text="status"
                                  />
                              </v-col>
                              <v-col cols="12" sm="8" md="8">
                                  <v-text-field
                                    v-model="editedPesertas.note_apl1"
                                    label="Note"
                                    type="text"
                                  ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click='verifikasiPeserta'>Verifikasi</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog> -->
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
                      <v-chip v-if="item.status == -2" small color="red darken-1" dark>Tidak Lulus</v-chip>
                      <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                      <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                      <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                      <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                    </template>
                    <template #item.asesor="{ item }">
                      <span>{{ item.asesor.nama }}</span>
                    </template>
                    <template #item.asesi.nama="{ item }">
                      <!-- <a :href="`/asesor/peserta/${item.id}`">
                        <span>{{ item.asesi.nama }}</span>
                      </a> -->
                      <nuxt-link :to="`/asesor/verifikasi/${item.id}`">
                        <div class="blobs-container">
                          <span class="blobs-container">
                            <span v-if="item.status == -2" class="blob error"></span>
                            <span v-if="item.status == -1" class="blob red"></span>
                            <span v-if="item.status == 0" class="blob orange"></span>
                            <span v-if="item.status == 1" class="blob blue"></span>
                            <span v-if="item.status == 2" class="blob success"></span>
                            {{ item.asesi.nama }}
                          </span>
                        </div>
                      </nuxt-link>
                    </template>
                  <!-- <template v-slot:item.actions="{ item }">
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
                  </template> -->
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
import { GET_JADWALS_ASESOR, GET_ANGGARANS, GET_SELF_ASESOR } from '../../../constants/graphql'

export default {
  name: 'Jadwal',
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
        anggaran: {
          id: ''
        },
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
        { text: 'Nama Asesi', value: 'asesi.nama' },
        { text: 'Skema', value: 'jadwal.skema.skema'},
        { text: 'Tanggal', value: 'jadwal.tanggal' },
        { text: 'Asesor', value: 'asesor.nama' },
        { text: 'Status', value: 'status' },
        // { text: 'Aksi', value: 'actions' },
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
      skemas: [],
      pesertas: []
    }
  },
  mounted() {
    this.getPesertas()
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
        mutation: GET_SELF_ASESOR
      }).then(({ data }) => {
        this.pesertas = data.checkselfAsesor.peserta
        console.log(data.checkselfAsesor)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
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
