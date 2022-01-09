<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <div v-if="!state.skeleton">
            <v-row>
              <div class="col-md-4 col-xs-12 pt-0">
                <v-card>
                  <div class="d-flex flex-no-wrap">
                    <v-avatar
                      class="ml-5 mt-5"
                      size="125"
                      style="border-radius: .42rem;"
                      tile
                    >
                      <v-img :src="pesertas.asesi.image"></v-img>
                    </v-avatar>
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="pesertas.asesi.nama"
                      ></v-card-title>
                      <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn v-if="pesertas.status == -2" text color="error">Tidak Lulus</v-btn>
                        <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                        <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                        <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                        <v-btn v-if="pesertas.status == 2" text color="success">Lulus Sertifikasi</v-btn>
                      </v-card-actions>
                    </div>
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
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </div>
              <div class="col-md-8 col-xs-12 pt-0">
                <v-row>
                  <v-col cols="12" class="pt-0">
                    <v-card>
                      <v-card-title class="px-8 ">
                        <span class="headline">FR-APL-01. Formulir Permohonan Sertifikasi Kompetensi</span>
                        <v-spacer></v-spacer>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="px-5">
                        <v-simple-table>
                          <tbody>
                            <td colspan="2"><b>a. Data Pribadi</b></td>
                            <tr>
                              <td width="20%"><b>Nama lengkap:</b></td>
                              <td>{{ pesertas.asesi.nama }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>Tempat/ tgl. lahir:</b></td>
                              <td>{{ pesertas.asesi.tempat_lahir }}, {{ pesertas.asesi.tanggal_lahir }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>Jenis kelamin:</b></td>
                              <td>{{ pesertas.asesi.kebangsaan }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>Alamat rumah:</b></td>
                              <td>{{ pesertas.asesi.alamat }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>kodepos:</b></td>
                              <td>{{ pesertas.asesi.kodepos }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>No Telepon/ Email:</b></td>
                              <td>{{ pesertas.asesi.telepon }}</td>
                            </tr>
                            <tr>
                              <td width="20%"><b>Pendidikan terakhir:</b></td>
                              <td>{{ pesertas.asesi.pendidikan.pendidikan }}</td>
                            </tr>
                            <!-- <td colspan="2"><b>b. Data Pekerjaan Sekarang</b></td>
                              <tr>
                                  <td width="20%"><b>Nama lembaga/ Perusahaan:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.nama }}</td>
                              </tr>
                              <tr>
                                  <td width="20%"><b>Alamat lembaga/ Perusahaan:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.alamat }}</td>
                              </tr>
                              <tr>
                                  <td width="20%"><b>Alamat:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.alamat }}</td>
                              </tr>
                              <tr>
                                  <td width="20%"><b>Kodepos:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.kodepos }}</td>
                              </tr>
                              <tr>
                                  <td width="20%"><b>No Telpon:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.telepon }}</td>
                              </tr>
                              <tr>
                                  <td width="20%"><b>Email:</b></td>
                                  <td>{{ pesertas.asesi.lembaga.email }}</td>
                              </tr> -->
                          </tbody>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="px-8 ">
                        <!-- <v-avatar size="30" color="warning lighten-2">
                    <span class="white--text">APL.1</span>
                  </v-avatar> -->
                        <span v-if="show === 'informasi'" class="headline">Verifikasi Syarat Peserta</span>
                        <span v-if="show === 'asesmen-mandiri'" class="headline">Asesmen Mandiri</span>
                        <v-spacer></v-spacer>
                        <!-- <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        v-on="on"
                      >
                        <v-icon>settings</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="show = item.show"
                        link
                      >
                        <v-list-item-icon class="mr-3">
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu> -->
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text v-if="show === 'informasi'" class="px-8 py-8"> 
                        <div>
                          <div v-if="alert.show">
                            <v-snackbar
                              v-model="alert.show"
                              :color="alert.type"
                              :timeout="0"
                              bottom
                            >
                              {{ alert.message }}
                              <v-btn
                                dark
                                text
                                @click="alert.show = false"
                              >
                                Close
                              </v-btn>
                            </v-snackbar>
                          </div>
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
                                    <span class="headline">Verifikasi Syarat</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                          <v-select
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
                                    <v-btn color="blue darken-1" text @click="syaratDialog = false">Batal</v-btn>
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
                              <v-tooltip v-if="pesertas.status == 0" bottom>
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
                  <v-col v-if="pesertas.status < 1 && pesertas.status != -2" cols="12">
                    <v-card>
                      <v-card-title class="px-8 ">
                        <!-- <v-avatar size="30" color="warning lighten-2">
                          <span class="white--text">APL.1</span>
                        </v-avatar> -->
                        <span class="headline">Verifikasi Peserta</span>
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
                              label="Jenis Kelamin"
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
            </v-row>
          </div>
        </v-container>
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
  layout: 'App_asesor',
  data() {
    return {
      show: 'informasi',
      syaratDialog: false,
      portofolioDialog: false,
      peserta_id: this.$route.params.peserta,
      headers: [
        { text: 'Syarat', value: 'syarat.syarat' },
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
          // this.showAlert('success', 'Peserta berhasil diverifikasi');
          this.state.skeleton = true
          this.getpesertaDetails()
        }).catch(({graphQLErrors}) => {
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
        this.showAlert('success', 'Peserta berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
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
        this.showAlert('success', 'peserta berhasil diverifikasi')
        console.log(data)
      }).catch(({graphQLErrors}) => {
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
