<template>
  <v-layout
    column
    wrap
  >
    <v-card class="rounded-lg">
      <v-card-title class="font-weight-bold">
        <!-- <v-avatar size="30" color="warning lighten-2">
          <span class="white--text">APL.1</span>
        </v-avatar> -->
        Informasi Jadwal
      </v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card-text>
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
                <v-row class="mb-3">
                  <v-dialog v-model="tambahDialog" persistent max-width="600px">
                    <template #activator="{ on }">
                      <v-btn color="primary" outlined dark v-on="on">Tambah Jadwal</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Tambah Jadwal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                outlined
                                dense
                                v-model="form.skema_id"
                                :items="skemas"
                                label="Skema*"
                                item-value="id" item-text="skema"
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="form.kuota"
                                label="Kuota"
                                type="number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                id="id"
                                v-model="form.keterangan"
                                name="Keterangan"
                                label="Keterangan"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                outlined
                                dense
                                v-model="form.tempat_uk_id"
                                :items="tuks"
                                label="Tempat Uji Kompetensi (TUK)*"
                                item-value="id" item-text="nama"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                dense
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
                                    outlined
                                    dense
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
                        <v-btn color="grey" text @click="reset">Batal</v-btn>
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
                :items="jadwals"
                :search="search"
                :items-per-page="5"
                :line-numbers="true"
                :width="headers.width"
              >
                <template #top>
                  <v-dialog v-model="editDialog" persistent max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="font-weight-bold">Edit Jadwals</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                outlined
                                dense
                                v-model="editedJadwals.skema.id"
                                :items="skemas"
                                label="Skema*"
                                item-value="id" item-text="skema"
                                disabled
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                dense
                                v-model="editedJadwals.tempatUk.id"
                                :items="tuks"
                                label="Tempat Uji Kompetensi (TUK)*"
                                item-value="id" item-text="nama"
                              />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                dense
                                v-model="editedJadwals.kuota"
                                label="Kuota"
                                type="number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                dense
                                v-model="editedJadwals.anggaran.id"
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
                                :return-value.sync="editedJadwals.tanggal"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template #activator="{ on }">
                                  <v-text-field
                                    outlined
                                    dense
                                    readonly
                                    v-model="editedJadwals.tanggal"
                                    label="Tanggal Uji Kompetensi"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="grey" @click="dateMenu2 = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                              <!-- date -->
                            </v-col>
                            <v-col v-if="editedJadwals.status != 0" cols="12" sm="6" md="6">
                              <v-btn color="success" outlined @click="updateJadwal(2)">Selesaikan jadwal</v-btn>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="updateJadwal(1)">Edit Jadwal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="deleteDialog" persistent max-width="600px">
                    <v-card>
                      <v-card-title class="font-weight-bold">Apakah anda yakin menghapus Data?</v-card-title>

                      <v-card-text>
                        Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="deleteDialog = false">Batal</v-btn>
                        <v-btn color="red darken-1" text @click="deleteJadwal">Delete Jadwal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template #item.tempatUk.nama="{ item }">
                  <span v-if="item.tempatUk == null">-</span>
                  <span v-else>{{ item.tempatUk.nama }}</span>
                </template>
                <template #item.status="{ item }">
                  <v-chip v-if="item.status == 0" small color="red darken-1" dark>Batal</v-chip>
                  <v-chip v-if="item.status == 1" small color="primary">Aktif</v-chip>
                  <v-chip v-if="item.status == 2" small color="success" dark>Selesai</v-chip>
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
                <template #item.skema.skema="{ item }">
                  <nuxt-link :to="`/admin/jadwal/${item.id}`">
                    <span>{{ item.skema.skema }}</span>
                  </nuxt-link>
                </template>
                <template #item.sisa="{ item }">
                  <v-chip v-if="countVerified(item) == 0" small color="red darken-1" dark>Penuh</v-chip>
                  <span v-else>{{ countVerified(item) }}</span>
                </template>
                <template #item.peserta="{ item }">
                  <span>{{ item.peserta.length }}</span>
                </template>
                <template #item.jurusan.jurusan="{ item }">
                  <ul>
                    <li v-for="(jurusan, i) in item.jurusan" :key="i">
                      <span>{{ jurusan.jurusan }}</span>
                    </li>
                  </ul>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-layout>
</template>
<script>
import { GET_SKEMAS, GET_ALL_JURUSANS, GET_JURUSANS, GET_FAKULTASS, GET_TUKS, GET_JADWALS, GET_ANGGARANS } from '@/constants/graphql'
import { CREATE_JADWAL_NO_JURUSAN_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/jadwal'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      rules: [
        random => !!random || 'Required.',
      ],
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
        jurusan_id: '',
        panduan: null,
        tempatUk: [],
        anggaran: {
          id: ''
        },
        jurusan: {
          id: '',
          jurusan: ''
        },
        mea: '',
        status: ''
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
        mea: '',
        status: ''
      },
      form: {
        tempat_uk_id: '',
        skema_id: '',
        anggaran_id: '',
        tanggal: '',
        keterangan: '',
        kuota: '',
        // jurusan_id: ''
        jurusan_id: []
      },
      random: [],
      headers: [
        { text: 'Skema', value: 'skema.skema', width: '30%' },
        { text: 'Tanggal', value: 'tanggal' },
        // { text: 'Tempat TUK', value: 'tempatUk.nama' },
        // { text: 'Anggaran', value: 'anggaran.anggaran' },
        // { text: 'Jurusan', value: 'jurusan.jurusan', width: '20%' },
        { text: 'Status', value: 'status' },
        { text: 'Kuota', value: 'kuota' },
        { text: 'Sisa', value: 'sisa' },
        { text: 'Peserta', value: 'peserta' },
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
      skemas: [],
      fakultass: [],
      jurusans: []
    }
  },
  created() {
    this.getJadwals()
    this.getSkemas()
    this.getTuks()
    this.getAnggarans()
    this.getFakultass()
    this.getAllJurusans()
  },
  methods: {
    countVerified(item){
      var verified = 0
      for (var x of item.peserta) {
        if (x.status > 0) {
          verified++
        }
      }
      var count = item.kuota - verified
      if ( count > 0) {
        return count
      }
      return 0
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
      this.editedIndex = this.jadwals.indexOf(item)
      const jurusan_id = []
      for (let i = 0; i < item.jurusan.length; i++) {
        const element = item.jurusan[i].id
        jurusan_id.push(element)
      }
      console.log(jurusan_id)
      this.editedJadwals = Object.assign({}, item)
      // this.editedJadwals.push(jurusan_id);
      this.editedJadwals.jurusan = Object.assign(this.editedJadwals.jurusan, jurusan_id)
      if (this.editedJadwals.tempatUk == null) {
        this.editedJadwals.tempatUk = Object.assign({}, {id: ''})
      }
      if (this.editedJadwals.anggaran == null) {
        this.editedJadwals.anggaran = Object.assign({}, {id: ''})
      }
      if (this.editedJadwals.jurusan == null) {
        this.editedJadwals.jurusan = Object.assign({}, {id: '', jurusan: ''})
      }
      this.editDialog = true
    },
    async deleteItem(item){
      this.deletedIndex = this.jadwals.indexOf(item)
      this.deletedJadwals = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getJadwals() {
      const result = await this.$apollo.mutate({
        mutation: GET_JADWALS
      }).then(({ data }) => {
        this.jadwals = data.jadwals
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
      const { form: {keterangan, tempat_uk_id, skema_id, anggaran_id, tanggal, kuota} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_JADWAL_NO_JURUSAN_MUTATION,
        variables: {
          tempat_uk_id, skema_id, anggaran_id, tanggal, keterangan, kuota
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
    async updateJadwal(item) {
      this.alert.show = false
      const { editedJadwals: {id, kuota, tanggal, keterangan} } = this.$data
      const jurusan_id = this.editedJadwals.jurusan
      const status = item
      const tempat_uk_id = this.editedJadwals.tempatUk.id
      const anggaran_id = this.editedJadwals.anggaran.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_JADWAL_MUTATION,
        variables: {
          id, tempat_uk_id, anggaran_id, tanggal, kuota, status, keterangan, jurusan_id
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
    async getFakultass() {
      const result = await this.$apollo.mutate({
        mutation: GET_FAKULTASS
      }).then(({ data }) => {
        console.log(data)
        this.fakultass = data.fakultass
      }).catch((error) => {
        console.log(error)
      })
    },
    async getAllJurusans() {
      console.log('hello')
      const result = await this.$apollo.mutate({
        mutation: GET_ALL_JURUSANS
      }).then(({ data }) => {
        console.log('hello', data)
        this.jurusans = data.jurusans
      }).catch((error) => {
        console.log(error)
      })
    },

    async getJurusans() {
      const id = this.form.fakultas_id
      const result = await this.$apollo.mutate({
        mutation: GET_JURUSANS,
        variables: {
          id
        }
      }).then(({ data }) => {
        console.log(data)
        this.jurusans = data.fakultas.jurusan
      }).catch((error) => {
        console.log(error)
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
