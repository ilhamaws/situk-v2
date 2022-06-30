<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <div v-if="!state.skeleton">
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
            <div class="col-md-8 col-xs-12 pt-0">
              <v-row>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <span class="font-weight-bold">Menu Peserta</span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <!-- <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" class="px-10 py-5">
                        <v-row>
                          <v-col md="3">
                            <v-card :to="`/admin/apl-1/${pesertas.id}`" text link>
                              <v-card-actions class="justify-center fill-height">
                                <v-list-item two-line>
                                  <v-list-item-content class="text-center">
                                    <v-list-item-title class="headline mb-2">
                                      <v-icon size="30" color="primary">person</v-icon>
                                    </v-list-item-title>
                                    <v-list-item-title>Detil APL 1</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                          <v-col md="3">
                            <v-card :to="`/admin/asesmen-mandiri/${pesertas.id}`" text link>
                              <v-card-actions class="justify-center fill-height">
                                <v-list-item two-line>
                                  <v-list-item-content class="text-center">
                                    <v-list-item-title class="headline mb-2">
                                      <v-icon size="30" color="warning">subject</v-icon>
                                    </v-list-item-title>
                                    <v-list-item-title>Asesmen Mandiri</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                          <v-col md="3">
                            <v-card :disabled="pesertas.asesor == null" :to="`/admin/hasil-observasi/${pesertas.id}`" text link>
                              <v-card-actions class="justify-center fill-height">
                                <v-list-item two-line>
                                  <v-list-item-content class="text-center">
                                    <v-list-item-title class="headline mb-2">
                                      <v-icon size="30" color="error">wrap_text</v-icon>
                                    </v-list-item-title>
                                    <v-list-item-title>Hasil observasi</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                          <v-col md="3">
                            <v-card :disabled="disabledMenu" :to="`/admin/hasil-asesmen/${pesertas.id}`" text link>
                              <v-card-actions class="justify-center fill-height">
                                <v-list-item two-line>
                                  <v-list-item-content class="text-center">
                                    <v-list-item-title class="headline mb-2">
                                      <v-icon size="30" color="success">playlist_add_check</v-icon>
                                    </v-list-item-title>
                                    <v-list-item-title>Rekaman Asesmen</v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row> -->
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card link :to="`/admin/apl-1/${pesertas.id}`" dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Permohonan Sertifikasi</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.APL.01
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <!-- <v-icon size="80">playlist_add_check</v-icon> -->
                          <h1 class="font-weight-bold mt-0 px-5">1</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card link :to="`/admin/asesmen-mandiri/${pesertas.id}`" dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Asesmen Mandiri</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.APL.02
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <!-- <v-icon size="80">playlist_add_check</v-icon> -->
                          <h1 class="font-weight-bold mt-0 px-5">2</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card :disabled="pesertas.asesor == null" :to="`/admin/soal-observasi/${pesertas.id}`" link dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Pertanyaan Wawancara</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.IA.09
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <!-- <v-icon size="80">playlist_add_check</v-icon> -->
                          <h1 class="font-weight-bold mt-0 px-5">3</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card :disabled="pesertas.asesor == null" :to="`/admin/hasil-observasi/${pesertas.id}`" link dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Ceklis Observasi</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.IA.01
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <!-- <v-icon size="80">playlist_add_check</v-icon> -->
                          <h1 class="font-weight-bold mt-0 px-5">4</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card :disabled="pesertas.asesor == null" :to="`/admin/verifikasi-portofolio/${pesertas.id}`" link dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Ceklis Verifikasi Portofolio</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.IA.08
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <h1 class="font-weight-bold mt-0 px-5">5</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                      <v-card link :disabled="disabledMenu" :to="`/admin/hasil-asesmen/${pesertas.id}`" dark color="primary" class="rounded-lg">
                        <v-card-title>
                          <p class="ma-0">Rekaman Asesmen</p>
                        </v-card-title>
                        <v-card-subtitle>
                          FR.AK.02
                        </v-card-subtitle>
                        <v-card-text class="d-flex justify-end align-center">
                          <!-- <v-icon size="80">playlist_add_check</v-icon> -->
                          <h1 class="font-weight-bold mt-0 px-5">6</h1>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-card>
                    <v-card-title>
                      <span class="font-weight-bold">Verifikasi Syarat Peserta</span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text v-if="show === 'informasi'" class="px-8 py-8"> 
                      <div>
                        <v-data-table
                          v-if="!state.skeleton"
                          :headers="headers"
                          :items="pesertas.syaratPeserta"
                          :items-per-page="5"
                          :line-numbers="true"
                          :width="headers.width"
                        >
                          <template #top>
                            <v-dialog v-model="syaratDialog" persistent max-width="600px">
                              <v-card>
                                <v-card-title>
                                  <span class="font-weight-bold">Verifikasi Syarat</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-select
                                          outlined
                                          dense
                                          v-model="verifiedSyarat.status"
                                          :items="status"
                                          label="Pilih Status"
                                          item-value="id" item-text="status"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="grey" text @click="syaratDialog = false">Batal</v-btn>
                                  <v-btn color="blue darken-1" text @click="verifikasiSyarat">Simpan</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                          <template #item.status="{ item }">
                            <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                            <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                            <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                            <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                          </template>
                          <template #item.file="{ item }">
                            <span v-if="item.file != null">{{ item.file.substr(item.file.lastIndexOf('/') + 1) }}</span>
                          </template>
                          <template #item.actions="{ item }">
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="primary" :href="item.file" v-on="on">
                                  <v-icon>
                                    cloud_download
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Download file</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="orange lightern-1" :href="item.file" target="_blank" v-on="on">
                                  <v-icon>
                                    remove_red_eye
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Lihat file</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template #item.file="{ item }">
                                <span v-if="item.file != null">{{ item.file.substr(item.file.lastIndexOf('/') + 1) }}</span>
                              </template>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="pink darken-3" target="_blank" v-on="on" @click="editItem(item)">
                                  <v-icon>
                                    edit
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Verifikasi file</span>
                            </v-tooltip>
                            <!-- <v-btn color="success" target="_blank" outlined rounded x-small :href="item.file">Download</v-btn> -->
                          </template>
                        </v-data-table>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col v-if="pesertas.status < 1" cols="12">
                  <v-card>
                    <v-card-title>
                      <span class="font-weight-bold">Verifikasi Peserta</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="px-8 py-8">
                      <v-alert
                        icon="info"
                        text
                        type="info"
                      >
                        Verifikasi peserta untuk dapat melanjutkan ke asesmen mandiri.
                      </v-alert>
                      <v-row>
                        <v-col cols="12" sm="4" md="4">
                          <label for=""><b>Status</b></label>
                          <v-select
                            v-model="input.status"
                            class="mt-2"
                            :items="status"
                            item-text="status"
                            item-value="id"
                            label="Status peserta"
                            solo
                          />
                        </v-col>
                        <v-col cols="12" sm="8" md="8">
                          <label for=""><b>Note</b></label>
                          <v-text-field
                            v-model="input.note_apl1"
                            class="mt-2"
                            label="Tuliskan note untuk peserta"
                            type="text"
                            solo
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-end">
                          <v-btn
                            width="200"
                            large
                            rounded
                            color="primary"
                            dark
                            @click="verifikasiPeserta">
                            <v-progress-circular
                              v-if="state.loading"
                              :size="20"
                              :width="2"
                              indeterminate
                              color="white"
                              class="mr-2"
                            ></v-progress-circular>
                            Verifikasi
                          </v-btn>
                          <!-- <v-btn rounded color="blue darken-2" dark @click='verifikasiPeserta'>Verifikasi Peserta</v-btn> -->
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div class="col-md-4 col-xs-12 pt-0">
              <v-card>
                <div class="d-flex flex-no-wrap">
                  <v-avatar
                    class="mx-auto mt-10"
                    size="125"
                    circle
                  >
                    <v-img :src="pesertas.asesi.image"></v-img>
                  </v-avatar>
                  <!-- <div>
                    <v-card-title
                      class="headline"
                      v-text="pesertas.asesi.nama"
                    ></v-card-title>
                    <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                    <v-card-actions>
                      <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                      <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                      <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                      <v-btn v-if="pesertas.status == 2" text color="success">Lulus Sertifikasi</v-btn>
                    </v-card-actions>
                  </div> -->
                </div>
                <div class="d-flex flex-no-wrap mt-5">
                  <v-chip class="mx-auto" v-if="pesertas.status == -1" text small color="danger">Ditolak</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 0" text small color="grey">Belum</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 1" text small color="primary">Disetujui</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 2" text small color="success">Lulus Sertifikasi</v-chip>
                </div>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="px-5">
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="20%"><b>Nama:</b></td>
                        <td>{{ pesertas.asesi.nama }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Skema:</b></td>
                        <td>{{ pesertas.jadwal.skema.skema }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Tanggal:</b></td>
                        <td>{{ pesertas.jadwal.tanggal }}</td>
                      </tr>
                      <tr>
                        <td width="10%"><b>Asesor:</b></td>
                        <td v-if="pesertas.asesor != null">{{ pesertas.asesor.nama }}</td>
                        <td v-if="pesertas.asesor == null">Belum Ditentukan</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
                <!-- <v-card-actions v-if="pesertas.status == 2 || pesertas.status == -2" class="d-flex justify-center pb-8 pt-0">
                  <nuxt-link :to="`/admin/hasil-asesmen/${pesertas.id}`">
                    <v-btn color="success" rounded>Lihat Hasil Sertifikasi</v-btn>
                  </nuxt-link>
                </v-card-actions> -->
              </v-card>
            </div>
          </v-row>
        </div>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_PESERTAS_DETAIL, VERIFIKASI_FILEINPUT_MUTATION, EVALUASI_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { VERIFIKASI_PESERTA_MUTATION, VERIFIKASI_ASESMEN_MANDIRI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'DetailPeserta',
  layout: 'App_admin',
  data() {
    return {
      show: 'informasi',
      syaratDialog: false,
      portofolioDialog: false,
      peserta_id: this.$route.params.id,
      headers: [
        { text: 'Syarat', value: 'syarat.syarat' },
        // { text: 'File', value: 'file' },
        { text: 'Status', value: 'status', width: '20%' },
        { text: 'Aksi', value: 'actions', width: '30%' },
      ],
      portofoliosHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Valid', value: 'valid' },
        { text: 'Memadai', value: 'memadai' },
        { text: 'Keaslian', value: 'asli' },
        { text: 'terkini', value: 'terkini' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      editDialog: false,
      items: [
        { title: 'Informasi Profil' , icon: 'person', show: 'informasi'},
        { title: 'Asesmen Mandiri' , icon: 'lock', show: 'asesmen-mandiri'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      input: [],
      disabledMenu: true,
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
      state: {
        loading: false,
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      rules: [
        value => !value || value.size < 1000000 || 'Ukuran gambar harus kurang dari 1 MB!',
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      verifiedSyarat: {},
      verifiedPortofolio: {},
      gender: [
        {
          kode: "L",
          jk: "Laki-laki"
        },
        {
          kode: "P",
          jk: "Perempuan"
        }
      ],
      pesertas: {
        asesi: {
          image: null
        }
      },
      ujikompetensi: []
    }
  },  
  async mounted() {
    await this.getpesertaDetails()
  },
  methods: {
    editItem(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedSyarat = Object.assign({}, item)
      this.syaratDialog = true
    },
    editItemPortofolio(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedPortofolio = Object.assign({}, item)
      this.portofolioDialog = true
    },
    //  get peserta
    async verifikasiPeserta() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        this.alert.show = false
        const { input: {id, status} } = this.$data
        const note = this.pesertas.note_apl1
        const result = await this.$apollo.mutate({
          mutation: VERIFIKASI_PESERTA_MUTATION,
          variables: {
            id, status, note
          }
        }).then(({ data }) => {
          window.scrollTo(0,0)
          this.showAlert('success', 'Peserta berhasil diverifikasi')
          this.state.skeleton = true
          this.getpesertaDetails()
        }).catch(({graphQLErrors}) => {
          window.scrollTo(0,0)
          console.log(graphQLErrors)
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    async verifikasiSyarat() {
      this.alert.show = false
      const { verifiedSyarat: {id} } = this.$data
      const status = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_FILEINPUT_MUTATION,
        variables: {
          id, status
        }
      }).then(({ data }) => {
        window.scrollTo(0,0)
        this.showAlert('success', 'Peserta berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        window.scrollTo(0,0)
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.syaratDialog = false
      })
    },
    async verifikasiPortofolio() {
      this.alert.show = false
      const { verifiedPortofolio: {id, valid, memadai, asli, terkini} } = this.$data
      const hasil = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: EVALUASI_PORTOFOLIO_MUTATION,
        variables: {
          id, valid, memadai, asli, terkini
        }
      }).then(({ data }) => {
        // this.showAlert('success', 'Peserta berhasil diverifikasi');
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.portofolioDialog = false
      })
    },
    async getpesertaDetails() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        if (data.peserta.status == 2 || data.peserta.status == -2) {
          this.disabledMenu = false
        }
        this.pesertas = data.peserta
        this.input = {...this.pesertas}
        this.ujikompetensi = data.peserta.ujiKompetensi
        console.log(data.peserta)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async verifikasiAsesmenMandiri(ujiIndex) {
      console.log(this.ujikompetensi[ujiIndex].asesmen.length)
      const asesmenData = this.ujikompetensi[ujiIndex].asesmen
      const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id
      let rekomendasi_am = this.ujikompetensi[ujiIndex].rekomendasi_am
      if (rekomendasi_am === undefined) {
        rekomendasi_am = null
      }
      const asesmen = []
      for (let indexAsesmen = 0; indexAsesmen < asesmenData.length; indexAsesmen++) {
        const element = Object.assign({}, {asesmen_mandiri: asesmenData[indexAsesmen].asesmen_mandiri, kuk_id: asesmenData[indexAsesmen].kriteriaUk.id})
        // console.log(element);
        // const element = this.ujikompetensi[ujiIndex].asesmen[indexAsesmen].kriteriaUk.id;
        asesmen.push(element)
      }
      console.log(rekomendasi_am)
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_ASESMEN_MANDIRI_MUTATION,
        variables: {
          uji_kompetensi_id, rekomendasi_am, asesmen
        }
      }).then(({ data }) => {
        window.scrollTo(0,0)
        this.showAlert('success', 'peserta berhasil diverifikasi')
        console.log(data)
      }).catch(({graphQLErrors}) => {
        window.scrollTo(0,0)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
