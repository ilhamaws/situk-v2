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
              <span class="font-weight-bold">FR.APL.02 Hasil Asesmen Mandiri</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <!-- Alert section -->
              <v-alert
                v-if="peserta.persetujuan == 5"
                icon="info"
                text
                prominent
                type="info"
                class="mb-0"
              >
                <v-row align="center">
                  <v-col class="grow">Form APL-2 telah diverifikasi. Kirimkan FR.AK.01 persetujuan asesmen dan kerahasiaan</v-col>
                  <v-col class="shrink">
                    <v-dialog v-model="persetujuanDialog" persistent max-width="1000">
                      <template #activator="{ on }">
                        <v-btn color="primary" outlined v-on="on">Lihat Form</v-btn>
                      </template>
                      <v-form>
                        <v-card>
                          <v-card-title>
                            <span>FR.AK.01 - PERSETUJUAN ASESMEN DAN KERAHASIAN</span>
                          </v-card-title>
                          <v-card-text>
                            <v-simple-table>
                              <tbody>
                                <tr>
                                  <td colspan="5">
                                    Persetujuan Asesmen ini untuk menjamin bahwa Asesi telah diberi arahan secara rinci tentang perencanaan dan proses asesmen
                                  </td>
                                </tr>
                                <tr>
                                  <td rowspan="2" width="30%">Skema Sertifikasi <br> (KKNI/Okupasi/Klaster)</td>
                                  <td width="10%">Judul: </td>
                                  <td colspan="3">{{ peserta.jadwal.skema.skema }}</td>
                                </tr>
                                <tr>
                                  <td>Nomor: </td>
                                  <td colspan="3">{{ peserta.jadwal.skema.kode }}</td>
                                </tr>
                                <tr>
                                  <td colspan="2">TUK</td>
                                  <td colspan="3">Sewaktu/Tempat Kerja/Mandiri*</td>
                                </tr>
                                <tr>
                                  <td colspan="2">Nama Asesor</td>
                                  <td class="text-capitalize" colspan="3">{{ peserta.asesor.nama }}</td>
                                </tr>
                                <tr>
                                  <td colspan="2">Nama Asesi</td>
                                  <td class="text-capitalize" colspan="3">{{ peserta.asesi.nama }}</td>
                                </tr>
                                <tr>
                                  <td rowspan="2" colspan="2" width="30%">Bukti yang akan dikumpulkan</td>
                                  <td colspan="3">
                                    <v-row>
                                      <v-col cols="6">
                                        <v-checkbox v-model="value" label="TL : Verifikasi Portofolio" value="value"></v-checkbox>
                                      </v-col>
                                      <v-col cols="6">
                                        <v-checkbox v-model="value" label="L : Observasi Langsung" value="value"></v-checkbox>
                                      </v-col>
                                    </v-row>
                                  </td>
                                </tr>
                                <tr>
                                  <td colspan="3">
                                    <v-checkbox v-model="form.tulis" class="py-0" label="T: Hasil Tes Tulis" value="1"></v-checkbox><br>
                                    <v-checkbox v-model="form.lisan" class="my-0 py-0" label="T: Hasil Tes Lisan" value="1"></v-checkbox><br>
                                    <v-checkbox class="my-0 py-0" input-value="true" label="T: Hasil Wawancara" value disabled></v-checkbox>
                                  </td>
                                </tr>
                                <tr>
                                  <td rowspan="3" colspan="2">Pelaksanaan asesmen disepakati pada:</td>
                                  <td>Hari/ Tanggal</td>
                                  <td colspan="2">{{ peserta.asesmen_date }}</td>
                                </tr>
                                <tr>
                                  <td>Waktu</td>
                                  <td colspan="2">07:00 - Selesai</td>
                                </tr>
                                <tr>
                                  <td>TUK</td>
                                  <td colspan="2"></td>
                                </tr>
                                <tr>
                                  <td class="py-2" colspan="5">
                                    <b>Asesi:</b><br>
                                    Bahwa Saya Sudah Mendapatkan Penjelasan hak dan Prosedur Banding Oleh Asesor.
                                  </td>
                                </tr>
                                <tr>
                                  <td class="py-2 text-justify" colspan="5">
                                    <b>Asesor:</b><br>
                                    Menyatakan tidak akan membuka hasil pekerjaan yang saya peroleh karena penugasan saya sebagai Asesor 
                                    dalam pekerjaan Asesmen kepada siapapun atau organisasi apapun selain kepada pihak yang berwenang sehubungan 
                                    dengan kewajiban saya sebagai Asesor yang ditugaskan oleh LSP.
                                  </td>
                                </tr>
                              </tbody>
                            </v-simple-table>
                            <v-container>
                              <!-- <v-row>
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
                              </v-row> -->
                            </v-container>
                            <!-- <small>*Wajib diisi</small> -->
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey" text @click="persetujuanDialog = false">Batal</v-btn>
                            <v-btn color="blue darken-1" text @click="accPersetujuanAsesor">Kirimkan</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-dialog>
                    <!-- <v-btn
                    outlined
                    color="primary"
                    >Lihat Form</v-btn> -->
                  </v-col>
                </v-row>
              </v-alert>
              <div v-if="alert.show">
                <!-- <v-alert v-model="alert.show" :type="alert.type" dismissible>
                  <div class="white--text">
                      {{ alert.message }}
                  </div>
                  </v-alert> -->
                <v-snackbar
                  v-model="alert.show"
                  :color="alert.type"
                  :timeout="-1"
                  top
                >
                  {{ alert.message }}
                  <template #action="{ attrs }">
                    <v-btn
                      dark
                      text
                      fab
                      v-bind="attrs"
                      @click="alert.show = false"
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
              <div v-if="ujikompetensi != null">
                <v-expansion-panels multiple accordion>
                  <v-expansion-panel
                    v-for="(uji, ujiIndex) in ujikompetensi"
                    :key="uji.id"
                  >
                    <v-expansion-panel-header>
                      {{ uji.unitKompetensi.kode }} {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}
                      <div v-if="ujikompetensi[ujiIndex].verifikasi_am == null" class="blobs-container">
                        <div class="blob orange"></div>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-alert
                        icon="info"
                        text
                        type="info"
                      >
                        Hasil asesmen mandiri
                      </v-alert>
                      <v-simple-table> 
                        <tbody>
                          <tr>
                            <td width="20%"><b>Nama Asesi:</b></td>
                            <td>{{ peserta.asesi.nama }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>Tempat Uji Kompetensi:</b></td>
                            <td>{{ peserta.jadwal.tempatUk.nama }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>Unit Kompetensi:</b></td>
                            <td>{{ uji.unitKompetensi.kode }} / {{ uji.unitKompetensi.unit }}</td>
                          </tr>
                          <tr>
                            <td width="10%"><b>Verifikasi:</b></td>
                            <td v-if="ujikompetensi[ujiIndex].verifikasi_am != null" class="success--text">Selesai</td>
                            <td v-if="ujikompetensi[ujiIndex].verifikasi_am == null" class="error--text">Belum
                              <v-dialog v-model="tambahDialog" persistent max-width="600px">
                                <template #activator="{ on }">
                                  <v-btn class="ml-2" text x-small fab color="grey" @click="verifikasiDialog(uji)" v-on="on">
                                    <v-icon>edit</v-icon>
                                  </v-btn>
                                  <!-- <v-btn color="primary" outlined rounded dark v-on="on">Tambah TUK</v-btn> -->
                                </template>
                                <v-form>
                                  <v-card>
                                    <v-card-title>
                                      <!-- <h1 class="headline">Verifikasi Asesmen Mandiri</h1> -->
                                      Verifikasi Asesmen Mandiri
                                    </v-card-title>
                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12" sm="12" md="12">
                                            <label for=""><b>Rekomendasi Asesmen Mandiri</b></label>
                                            <v-select
                                              class="mt-3"
                                              :items="rekomendasi_asesmen"
                                              v-model="editedVerifikasi.rekomendasi_am"
                                              outlined
                                              dense
                                            >
                                            </v-select>
                                            <!-- <v-text-field v-model="editedVerifikasi.rekomendasi_am" class="mt-2" solo label="Rekomendasi penilaian asesmen mandiri" required></v-text-field> -->
                                          </v-col>
                                        </v-row>
                                      </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                                      <v-btn color="blue darken-1" text @click="verifikasiAsesmenMandiri(ujiIndex)">Verifikasi</v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-form>
                              </v-dialog>
                            </td>
                          </tr>
                          <tr>
                            <td width="10%"><b>Rekomendasi:</b></td>
                            <td>{{ ujikompetensi[ujiIndex].rekomendasi_am }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-simple-table>
                        <template #default>
                          <thead>
                            <tr>
                              <th width="20"><b>No</b></th>
                              <th colspan="2" width="60%"><b>Apakah saya dapat?</b></th>
                              <th width="20%" class="text-center"><b>Kompeten</b></th>
                              <th width="20%" class="text-center"><b>Belum Kompeten</b></th>
                            </tr>
                          </thead>
                          <tbody v-for="(elemen, elemenIndex) in uji.unitKompetensi.element" :key="elemen.id">
                            <tr>
                              <th>{{ elemenIndex+1 }}</th>
                              <th colspan="2">Elemen: {{ elemen.elemen }}</th>
                              <td colspan="2" class="text-center">
                                <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].asesmen_mandiri" row>
                                  <v-col cols="6">
                                    <v-radio readonly class="justify-center" value="1"></v-radio>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-radio readonly class="justify-center" value="-1"></v-radio>
                                  </v-col>
                                </v-radio-group>
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td colspan="4" width="20">Kriteria Unjuk Kerja :</td>
                            </tr>
                            <tr v-for="(kuk, kukIndex) in elemen.kriteriaUk" :key="kuk.id">
                              <td></td>
                              <td width="5%">{{ elemenIndex+1 }}.{{ kukIndex+1 }}</td>
                              <td>{{ kuk.kriteria }}</td>
                              <td colspan="2"></td>
                            </tr>
                            <tr>
                              <td></td>
                              <td class="" colspan="4" width="20">Bukti yang relevan (Portofolio) :
                              </td>
                            </tr>
                            <tr v-for="(porto, i) in elemen.portofolioAsesmen" :key="i">
                              <td></td>
                              <td>{{ i+1 }}</td>
                              <td colspan="4">
                                <a :href="porto.portofolio.file" target="_blank">
                                  {{ porto.portofolio.nama }}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-row>
                        <v-col class="d-flex justify-end">
                          <v-btn target="_blank" :href="`/asesor/print/asesmen-mandiri/${ujikompetensi[ujiIndex].id}`" color="primary" outlined dark><v-icon left>print</v-icon>Print</v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, ACC_PERSETUJUAN_PESERTA_MUTATION, ACC_PERSETUJUAN_ASESOR_MUTATION, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, VERIFIKASI_ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesor',
  data() {
    return {
      persetujuanDialog: false,
      tambahDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      rekomendasi_asesmen: [
        'Asesmen dapat dilanjutkan',
        'Tidak dapat dilanjutkan'
      ],
      peserta_id: this.$route.params.id,
      state:{
        loading: false,
        skeleton: true
      },
      radios: '',
      alert:{
        show: false,
        type: '',
        message: '',
      },
      valid: true,
      e1: 1,
      profile: {
        username: ''
      },
      form: {
        lisan: 0,
        tulis: 0
      },
      input: [],
      skema: [],
      syarat: [],
      syaratUpload: [],
      input: {},
      items: [
      ],
      jenis_tes: '',
      editedVerifikasi: {},
      peserta: [],
      skema: [],
      asesi: [],
      ujikompetensi: null,
      e11: {},
      jenis_tes: null
    }
  },
  mounted() {
    this.getpesertasDetail()
    // this.getAsesi();
  },
  methods: {
    verifikasiDialog(uji) {
      this.editedVerifikasi = Object.assign({}, uji)
    },
    radioasesmen(uji, kuk, value, ujiIndex, elemenIndex, kukIndex){
      const val = `${value}`
      // const val = value;
      console.log(val)
      if (val === this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri) {
        return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = "0"
      }
      console.log(this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri)
      return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = val
    },
    asesmenkuk(uji, kuk, value, ujiIndex, elemenIndex, kukIndex ) {
      const val = `${value}`
      if (val === this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag) {
        return this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = "0"
      }
      // this.editedIndex = this.skemas.indexOf(item);
      // this.input.asesmen.push({kuk_id: kuk.id, asesmen_mandiri: value});
      // this.input = Object.assign(this.input, {uji_kompetensi_id: uji.id, asesmen: {[kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}}});
      // this.input = Object.assign(this.input, {[uji.id]:{uji_kompetensi_id: uji.id, asesmen: {[kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}}}});
      // this.input = Object.assign(this.input, {[uji.id]:{uji_kompetensi_id: uji.id, asesmen: {[kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}}}});
      // this.input = { 
      //   ...this.input, 
      //   [uji.id]: {
      //     uji_kompetensi_id: uji.id, 
      //     asesmen: { [kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}
      //     }
      //   }};
      let kukData = (this.input[uji.id] || {}).asesmen
      if (kukData == null) {
        kukData = {}
      }
      this.input = { 
        ...this.input, 
        [uji.id]: {
          uji_kompetensi_id: uji.id,
          asesmen: {
            ...kukData,
            [kuk.id]:{
              kuk_id: kuk.id, asesmen_mandiri: value
            }
          }
        }}
      return this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = `${value}`


      //benar
      // this.input = Object.assign(this.input, {[kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}});
      // this.input.asesmen = Object.assign(this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex], {asesmen: `${value}`});
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async accPersetujuanAsesor() {
      const peserta_id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: ACC_PERSETUJUAN_ASESOR_MUTATION,
        variables: {
          peserta_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Form FR.AK.01 berhasil dikirim')
        console.log(data)
        this.getpesertasDetail()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.persetujuanDialog = false
      })
      // console.log(jenis_tes);
    },
    async getpesertasDetail() {
      // this.alert.show = false;
      const id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta = data.peserta
        this.ujikompetensi = data.peserta.ujiKompetensi
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
            const element = this.ujikompetensi[x].unitKompetensi.element[i]
            for (let k = 0; k < this.ujikompetensi[x].asesmen.length; k++) {
              if (this.ujikompetensi[x].asesmen[k].element.id == element.id) {
                this.ujikompetensi[x].unitKompetensi.element[i] = Object.assign({}, this.ujikompetensi[x].unitKompetensi.element[i], {
                  asesmen_mandiri: `${this.ujikompetensi[x].asesmen[k].asesmen_mandiri}`,
                  portofolioAsesmen: this.ujikompetensi[x].asesmen[k].portofolioAsesmen
                })
                console.log(element.id)
              }
            }
          }
        }
        this.input = {...this.ujikompetensi}
        console.log(data.peserta)
        // this.input.asesmen = data.peserta.ujiKompetensi.ujikompetensi.unitKompetensi.element;
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getSyarat() {
      const { id } = this.$data
      const result = await this.$apollo.mutate({
        mutation: GET_REPORT_DETAIL
      }).then(({ data }) => {
        this.peserta = data.peserta
        this.items = data.peserta.syaratPeserta
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    // async asesmenMandiri() {
    //     const asesmen = Object.values(this.input.asesmen);
    //     const uji_kompetensi_id = null;
    //     console.log(asesmen);
    //     const result = await this.$apollo.mutate({
    //         mutation: ASESMEN_MANDIRI_MUTATION,
    //         variables: {
    //           asesmen, uji_kompetensi_id
    //         }
    //   }).then(({ data }) => {
    //       console.log(data);
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // },
    async verifikasiAsesmenMandiri(ujiIndex) {
      const uji_kompetensi_id = this.editedVerifikasi.id
      const rekomendasi_am = this.editedVerifikasi.rekomendasi_am
      const asesmen = []
      for (let indexAsesmen = 0; indexAsesmen < this.editedVerifikasi.asesmen.length; indexAsesmen++) {
        const element = Object.assign({}, {asesmen_mandiri: this.editedVerifikasi.asesmen[indexAsesmen].asesmen_mandiri, element_id: this.editedVerifikasi.asesmen[indexAsesmen].element.id})
        // console.log(element);
        // const element = this.ujikompetensi[ujiIndex].asesmen[indexAsesmen].kriteriaUk.id;
        asesmen.push(element)
      }
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_ASESMEN_MANDIRI_MUTATION,
        variables: {
          uji_kompetensi_id, rekomendasi_am, asesmen
        }
      }).then(({ data }) => {
        // window.scrollTo(0,0);
        this.showAlert('success', 'peserta berhasil diverifikasi')
        this.getpesertasDetail()
      }).catch(({graphQLErrors}) => {
        // window.scrollTo(0,0);
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        console.log('data')
        this.state.skeleton = false
        this.tambahDialog = false
      })
    },
    async asesmenMandiri(e) {
      const { state: { loading } } = this
      // const ujiData = Object.values(this.input);
      if (!loading) {
        this.state.loading = true
        // if (ujiData.length > 0) {
        console.log(this.ujikompetensi.length)
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          const asesmen = []
          const uji_kompetensi_id = this.ujikompetensi[x].id
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
            for (let j = 0; j < this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk.length; j++) {
              const element = Object.assign({}, {kuk_id: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].id, asesmen_mandiri: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].asesmen_mandiri})
              asesmen.push(element)
            }
          }
          const result = await this.$apollo.mutate({
            mutation: ASESMEN_MANDIRI_MUTATION,
            variables: {
              asesmen, uji_kompetensi_id
            }
          }).then(({ data }) => {
            this.showAlert('success', 'Asesmen mandiri berhasir terkirim')
          }).catch(({graphQLErrors}) => {
            this.showAlert('error', graphQLErrors[0].message)
          }).finally(() => {
            this.state.loading = false
          })
        }
        // for (let index = 0; index < ujiData.length; index++) {
        //   const asesmen = Object.values(ujiData[index].asesmen);
        //   const uji_kompetensi_id =  ujiData[index].uji_kompetensi_id;
        //   console.log(asesmen);

        //   const result = await this.$apollo.mutate({
        //     mutation: ASESMEN_MANDIRI_MUTATION,
        //     variables: {
        //       asesmen, uji_kompetensi_id
        //     }
        //   }).then(({ data }) => {
        //     console.log(data);
        //   }).catch(({graphQLErrors}) => {
        //     this.showAlert('error', graphQLErrors[0].message);
        //   }).finally(() => {
        //     this.state.loading = false;
        //   });
        // }
        // } else {
        //     this.showAlert('error', 'Harap mengisi asesmen mandiri');
        //     this.state.loading = false;
        // }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>