<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-row>
          <v-col cols="8">
            <v-card class="rounded-lg">
              <v-card-title>
                <span class="headline">Edit Paket Soal</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-alert text type="primary" :value="true">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta consectetur delectus ex dolorem a corrupti omnis rerum, esse fugiat ipsam aperiam autem in, doloremque, provident dolor accusantium voluptatem ullam enim?
                </v-alert>
                <v-form class="mt-5">
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Kode paket"
                        outlined
                        dense
                      ></v-text-field>
                      <v-text-field
                        label="Judul paket"
                        outlined
                        dense
                      ></v-text-field>
                      <v-text-field
                        label="Total durasi pengerjaan"
                        outlined
                        dense
                      ></v-text-field>
                      <v-textarea outlined label="Penjelasan paket">
                      </v-textarea>
                      <v-btn class="px-5 mr-3">Batal</v-btn>
                      <v-btn color="primary" class="px-5">Edit paket soal</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-card class="rounded-lg">
              <v-card-title>
                <span class="headline">Section</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-alert text type="primary" :value="true">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta consectetur delectus ex dolorem a corrupti omnis rerum, esse fugiat ipsam aperiam autem in, doloremque, provident dolor accusantium voluptatem ullam enim?
                </v-alert>
                <v-expansion-panels
                  v-model="panel"
                  multiple
                >
                  <v-expansion-panel
                    v-for="(item,i) in items"
                    :key="i"
                  >
                    <v-expansion-panel-header>Section {{ item }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-form class="mt-5">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="Judul bagian"
                              outlined
                              dense
                            ></v-text-field>
                            <v-text-field
                              label="Waktu pengerjaan"
                              outlined
                              dense
                            ></v-text-field>
                            <v-text-field
                              label="Penjelasan bagian"
                              outlined
                              dense
                            ></v-text-field>
                            <v-textarea hide-details outlined label="Deskripsi atau contoh soal">
                            </v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-alert text type="primary" :value="true">
                              <v-row align="center">
                                <v-col class="grow">
                                  List soal
                                </v-col>
                                <v-col class="shrink">
                                  <v-dialog v-model="add_soal_dialog" persistent max-width="940px">
                                    <template #activator="{ on }">
                                      <v-btn outlined color="primary" v-on="on">Tambah soal</v-btn>
                                    </template>
                                    <v-card>
                                      <v-card-title>
                                        <span class="headline">Tambah soal</span>
                                      </v-card-title>
                                      <v-card-text>
                                        <v-row>
                                          <v-col cols="4">
                                            <v-text-field
                                              id="id"
                                              dense
                                              hide-details
                                              name="name"
                                              label="Cari disini"
                                              outlined
                                            ></v-text-field>
                                          </v-col>
                                        </v-row>
                                        <v-simple-table>
                                          <template #default>
                                            <thead>
                                              <tr>
                                                <th width="20%" class="text-left">
                                                  No KUK
                                                </th>
                                                <th class="text-left">
                                                  Soal
                                                </th>
                                                <th class="text-left">
                                                  Action
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr
                                                v-for="item in 5"
                                                :key="item.name"
                                              >
                                                <td>
                                                  <v-checkbox v-model="check_Soal" value="value" label="KODE-KUK"></v-checkbox>
                                                </td>
                                                <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. itaque tempora recusandae blanditiis consectetur consequatur quia perspiciatis exercitationem doloremque?</td>
                                                <td>
                                                  <v-icon fab color="primary" text @click="viewSoal">visibility</v-icon>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </template>
                                        </v-simple-table>
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="grey" text @click="add_soal_dialog = false">Batal</v-btn>
                                        <v-btn color="blue darken-1" text @click="add_soal_dialog = false">Tambah soal</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-dialog>
                                </v-col>
                              </v-row>
                            </v-alert>
                            <v-simple-table class="mb-3">
                              <template #default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      No
                                    </th>
                                    <th class="text-left">
                                      No KUK
                                    </th>
                                    <th class="text-left">
                                      Soal
                                    </th>
                                    <th class="text-left">
                                      Action
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="(item , i) in 5"
                                    :key="item.name"
                                  >
                                    <td>{{ i+1 }}</td>
                                    <td>KUK-{{ i+1 }}</td>
                                    <td>Lorem ipsum dolor sit amet?</td>
                                    <td>
                                      <v-btn small text color="primary" fab @click="viewSoal">
                                        <v-icon>visibility</v-icon>
                                      </v-btn>
                                      <v-btn small text color="error" fab>
                                        <v-icon>clear</v-icon>
                                      </v-btn>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                            <v-btn class="px-5 mr-3">Batal</v-btn>
                            <v-btn color="primary" class="px-5">Edit bagian</v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn class="mt-5" block color="primary">
                  <v-icon left>add</v-icon>
                  Tambah section</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="view_soal_dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Detail soal</span>
            </v-card-title>
            <v-card-text>
              <v-img
                class="rounded-lg"
                aspect-ratio="2"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              </v-img>
            </v-card-text>
            <v-card-text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. quisquam voluptatum repellat distinctio molestiae harum?
              <v-radio-group
                v-model="radios"
                disabled
                mandatory
              >
                <v-radio
                  label="Jawaban 1"
                  value="radio-1"
                ></v-radio>
                <v-radio
                  label="Jawaban 2"
                  value="radio-2"
                ></v-radio>
                <v-radio
                  label="Jawaban 3"
                  value="radio-3"
                ></v-radio>
                <v-radio
                  label="Jawaban 4"
                  value="radio-4"
                ></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="view_soal_dialog = false">Tutup</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- <v-row>
            <v-col cols="6">
                <v-card class="rounded-lg">
                    <v-card-title>
                        <span class="headline">Tambah Section</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-alert text type="primary" :value="true">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta consectetur delectus ex dolorem a corrupti omnis rerum, esse fugiat ipsam aperiam autem in, doloremque, provident dolor accusantium voluptatem ullam enim?
                        </v-alert>
                        <v-form class="mt-5">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Judul bagian"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-text-field
                                        label="Waktu pengerjaan"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-text-field
                                        label="Penjelasan bagian"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-textarea hide-details outlined label="Deskripsi atau contoh soal">
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-alert text type="primary" :value="true">
                                        Bagian soal
                                    </v-alert>
                                    <v-text-field
                                        class="mt-5"
                                        label="Judul bagian"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-text-field
                                        label="Waktu pengerjaan"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-text-field
                                        label="Penjelasan bagian"
                                        outlined
                                        dense
                                    ></v-text-field>
                                    <v-textarea outlined label="Deskripsi atau contoh soal">
                                    </v-textarea>
                                    <v-btn class="px-5 mr-3">Batal</v-btn>
                                    <v-btn color="primary" class="px-5">Tambah bagian</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    </v-card>
            </v-col>
        </v-row> -->
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_ALL_JURUSANS, GET_JURUSANS, GET_FAKULTASS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_TUKS, CREATE_JADWAL_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/graphql'
import { GET_JADWALS, GET_ANGGARANS } from '../../../constants/graphql'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      rules: [
        random => !!random || 'Required.',
      ],
      check_soal: [],
      radios: null,
      panel: [],
      add_soal_dialog: false,
      view_soal_dialog: false,
      items: 5,
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
        // jurusan_id: ''
        jurusan_id: []
      },
      random: [],
      headers: [
        { text: 'Skema', value: 'skema.skema', width: '30%' },
        { text: 'Tanggal', value: 'tanggal' },
        // { text: 'Tempat TUK', value: 'tempatUk.nama' },
        // { text: 'Anggaran', value: 'anggaran.anggaran' },
        { text: 'Jurusan', value: 'jurusan.jurusan', width: '20%' },
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
    viewSoal() {
      this.view_soal_dialog = true
    },
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
      const { form: {keterangan, tempat_uk_id, skema_id, anggaran_id, tanggal, jurusan_id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_JADWAL_MUTATION,
        variables: {
          tempat_uk_id, skema_id, anggaran_id, tanggal, keterangan, jurusan_id
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
