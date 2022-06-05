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
            <span class="headline px-5">Informasi Jadwal Ujian</span>
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
                <v-skeleton-loader
                  v-if="state.skeleton"
                  ref="skeleton"
                  type="table-thead, table-tbody"
                  class="mx-auto"
                ></v-skeleton-loader>
                <v-data-table
                  v-if="!state.skeleton"
                  :headers="headers"
                  :items="itemsWithIndex"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                  :width="headers.width"
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
                          <v-btn color="blue darken-1" text @click="verifikasiPeserta">Verifikasi</v-btn>
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
                          <v-btn color="red darken-1" text @click="deleteJadwal">Delete Peserta</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="asesorDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Asesor</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-select
                                  v-model="editedAsesors.asesor.id"
                                  :items="asesors"
                                  label="Pilih Asesor*"
                                  item-value="id" item-text="nama"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="asesorDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateAsesorPeserta">Simpan</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="randomDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Acak Asesor</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="random"
                                  :items="asesors"
                                  class="shrink mr-5"
                                  dense
                                  :rules="[v => random.length <= 4 || 'maksimal 4']"
                                  label="Pilih Asesor"
                                  item-value="id"
                                  item-text="nama"
                                  :menu-props="{ top: false, offsetY: true}"
                                  multiple
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="randomDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="randomAsesor">Acak</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.status="{ item }">
                    <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                    <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                    <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                    <v-chip v-if="item.status == 2" small color="success" dark>Kompeten</v-chip>
                    <v-chip v-if="item.status == -2" small color="error" dark>Belum Kompeten</v-chip>
                  </template>
                  <!-- <template v-slot:item.asesor="{ item }">
                <span>{{ item.asesor.nama }}</span>
              </template> -->
                  <template #item.asesor="{ item }">
                    <span>{{ item.asesor == null ? "" : item.asesor.nama }}</span>
                  </template>
                  <template #item.asesi.nama="{ item }">
                    <nuxt-link :to="`/admin/peserta/${item.id}`">
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
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_TUKS, CREATE_JADWAL_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/graphql'
import { GET_JADWAL_UJIAN } from '@/constants/ujian'
import { GET_JADWALS_ASESOR, GET_ANGGARANS, GET_PESERTAS_ASESOR, VERIFIKASI_PESERTA_MUTATION, DELETE_PESERTABYADMIN_MUTATION, GET_ASESORS_BYSKEMA , UPDATE_ASESOR_PESERTA_MUTATION, RANDOM_ASESOR_MUTATION, GET_SKEMAS_BYJADWAL } from '../../../constants/graphql'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      rules: [
        random => !!random || 'Required.',
      ],
      random: [],
      id: this.$route.params.id,
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
      randomDialog: false,
      editDialog: false,
      asesorDialog: false,
      profile: {
        username: ''
      },
      editedIndex: -1,
      editedPesertas: {
        id: '',
        status: '',
        note_apl1: null
      },
      editedAsesors: -1,
      editedAsesors: {
        asesor: {
          id: ''
        }
      },
      deletedIndex: -1,
      deletedPesertas: {},
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
        { text: 'No', value:'index', width: '5%'},
        { text: 'Nama Asesi', value: 'asesi.nama' },
        { text: 'NIK', value: 'asesi.nik'},
        { text: 'Jenis Kelamin', value: 'asesi.jenis_kelamin' },
        { text: 'Status', value: 'status' },
        // { text: 'Aksi', value: 'actions' },
      ],
      meas: ['Mea', 'None Mea'],
      status: [
        {
          id: -1,
          status: 'Ditolak'
        },
        {
          id: 0,
          status: 'Belum'
        },
        {
          id: 1,
          status: 'Disetujui'
        }
      ],
      pesertas: [],
      tuks: [],
      anggarans: [],
      jadwals: [],
      jadwal_ujian: null,
      skemas: {
        id: '',
        skema: ''
      },
      asesors: []
    }
  },
  computed: {
    itemsWithIndex() {
      return this.jadwal_ujian.pesertaUjian.map(
        (pesertas, index) => ({
          ...pesertas,
          index: index + 1
        }))
    }
  },
  mounted() {
    this.getJadwalUjian()
  },
  methods: {
    async randomAsesor() {
      const asesors = this.skemas.asesor
      // const asesor_id = Object.keys(asesors).map(function(key) {
      //   return asesors[key].id;
      // });
      const asesor_id = this.random
      console.log(asesor_id)
      const jadwal_id = this.id
      const result = await this.$apollo.mutate({
        mutation: RANDOM_ASESOR_MUTATION,
        variables: {
          jadwal_id, asesor_id
        }
      }).then(({ data }) => {
        console.log(data)
        this.showAlert('success', 'Asesor berhasil di random')
        this.state.skeleton = true
        this.getPesertas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.randomDialog = false
      })
    },  
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
      this.editedIndex = this.pesertas.indexOf(item)
      this.editedPesertas = Object.assign({}, item)
      this.editDialog = true
    },
    editAsesor(item) {
      this.editedAsesors = this.pesertas.indexOf(item)
      this.editedAsesors = Object.assign({}, item)
      if (this.editedAsesors.asesor == null) {
        this.editedAsesors.asesor = Object.assign({}, {id: ''})
      }
      this.asesorDialog = true
    },
    async deleteItem(item){
      this.deletedIndex = this.pesertas.indexOf(item)
      this.deletedPesertas = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getJadwals() {
      const result = await this.$apollo.mutate({
        mutation: GET_JADWALS_ASESOR
      }).then(({ data }) => {
        this.jadwals = data.checkselfAsesor.skema.jadwal
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
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
      const id = this.id
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMAS_BYJADWAL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.skemas = data.jadwal.skema
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.getAsesors()
      })
    },
    async getAsesors() {
      const id = this.skemas.id
      const result = await this.$apollo.mutate({
        mutation: GET_ASESORS_BYSKEMA,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.asesors = data.skema.asesor
        console.log(data)
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
    async verifikasiPeserta() {
      this.alert.show = false
      const { editedPesertas: {id, status} } = this.$data
      const note = this.editedPesertas.note_apl1
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_PESERTA_MUTATION,
        variables: {
          id, status, note
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Peserta berhasil diverifikasi')
        this.state.skeleton = true
        this.getPesertas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async updateAsesorPeserta() {
      this.alert.show = false
      const { editedAsesors: {id} } = this.$data
      const asesor_id = this.editedAsesors.asesor.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_ASESOR_PESERTA_MUTATION,
        variables: {
          id, asesor_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Asesor peserta telah diperbarui')
        this.state.skeleton = true
        this.getPesertas()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.asesorDialog = false
      })
    },
    async deleteJadwal() {
      this.alert.show = false
      const id = this.deletedPesertas.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_PESERTABYADMIN_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.state.skeleton = true
        this.showAlert('success', 'Data Peserta berhasil dihapus')
        this.getPesertas()
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
    },
    async getJadwalUjian() {
      const { id } = this.$data
      const result = await this.$apollo.mutate({
        mutation: GET_JADWAL_UJIAN,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.jadwal_ujian = data.jadwalUjian
        return console.log('hello' , data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
