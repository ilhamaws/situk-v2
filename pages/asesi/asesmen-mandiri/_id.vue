<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <v-card>
            <v-toolbar flat color="primary" dark>
              <v-icon class="white--text" left color="orange lighten-2">description</v-icon>
              <span>
                <h4>FR.APL.02 Melakukan Asesmen Mandiri</h4>
              </span>
            </v-toolbar>
            <v-card-text class="px-8 py-8">
              <!-- Alert section -->
              <!-- <div v-if="alert.show">
                  <v-alert v-model="alert.show" :type="alert.type" dismissible class="mb-10">
                  <div class="white--text">
                      {{ alert.message }}
                  </div>
                  </v-alert>
              </div> -->
              <v-snackbar
                v-model="alert.show"
                :color="alert.type"
                :timeout="0"
                top
              >
                {{ alert.message }}
                <v-btn
                  dark
                  text
                  fab
                  @click="alert.show = false"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </v-snackbar>
              <v-alert
                icon="info"
                text
                type="primary"
              >
                Isilah asesmen mandiri dibawah ini, usahakan telah menguasai bidang yang diujikan
              </v-alert>
              <div v-if="ujikompetensi != null" class="pt-5">
                <v-expansion-panels multiple accordion>
                  <v-expansion-panel
                    v-for="(uji, ujiIndex) in ujikompetensi"
                    :key="uji.id"
                  >
                    <v-expansion-panel-header>{{ uji.unitKompetensi.kode }} {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}
                      <div v-if="ujikompetensi[ujiIndex].am_date == null" class="blobs-container">
                        <div class="blob orange"></div>
                      </div>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
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
                                    <v-radio class="justify-center" value="1"></v-radio>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-radio class="justify-center" value="-1"></v-radio>
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
                              <td>{{ porto.nama }}</td>
                              <td colspan="4">
                                <v-btn icon color="orange lightern-1" :href="porto.file" target="_blank">
                                  <v-icon>
                                    remove_red_eye
                                  </v-icon>
                                </v-btn>
                                <v-btn icon color="error" @click="preparedDeletePortofolio(ujiIndex, elemenIndex, i)">
                                  <v-icon>
                                    mdi-close
                                  </v-icon>
                                </v-btn>
                              </td>
                            </tr>
                            <tr>
                              <td></td>
                              <td colspan="4">
                                <v-btn @click="preparedSelectPortofolio(elemen, ujiIndex, elemenIndex)" class="ml-10 my-3" color="blue darken-3" outlined dark>Tambahkan Portofolio</v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-row>
                        <v-col v-if="uji.am_date == null" class="d-flex justify-end">
                          <v-btn color="primary" outlined dark @click="asesmenMandiriUnit(ujiIndex)"><v-icon left>send</v-icon>Kirimkan asesmen</v-btn>
                        </v-col>
                        <v-col v-if="uji.am_date != null" class="d-flex justify-end">
                          <v-btn color="warning" outlined dark @click="asesmenMandiriUnit(ujiIndex)"><v-icon left>send</v-icon>Kirim ulang asesmen</v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-dialog v-model="tambahDialog" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="subtitle">Tambah Portofolio</span>
                    </v-card-title>
                    <v-card-text class="pb-0">
                      <v-select
                        multiple
                        outlined
                        dense
                        return-object
                        v-model="select_portofolio.elemen.portofolioAsesmen"
                        :items="peserta.portofolio"
                        label="Pilih Portofolio*"
                        item-value="id" item-text="nama"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                      <v-btn color="blue darken-1" :disabled="select_portofolio.elemen.portofolioAsesmen && select_portofolio.elemen.portofolioAsesmen.length <= 0" text @click="savePortofolio">Tambah portofolio</v-btn>
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
                      <v-btn color="red darken-1" text @click="deletePortofolio">Delete Portofolio</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- <v-row>
                    <v-col cols="12" class="d-flex justify-end">
                      <v-btn
                        @click='asesmenMandiri'
                        class="mt-5"
                        width="200"
                        large
                        rounded
                        color="primary"
                        dark>
                        <v-progress-circular
                          :size="20"
                          :width="2"
                          indeterminate
                          color="white"
                          v-if="state.loading"
                          class="mr-2"
                        ></v-progress-circular>
                        Kirim asesmen mandiri 
                      </v-btn>
                    </v-col>
                  </v-row> -->
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      tambahDialog: false,
      deleteDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      portofoliosHeaders: [ 
        { text: 'Portofolio', value: 'nama' },
        { text: 'Valid', value: 'valid' },
        { text: 'Memadai', value: 'memadai' },
        { text: 'Keaslian', value: 'asli' },
        { text: 'terkini', value: 'terkini' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
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
      select_portofolio: {
        elemen: {
          portofolioAsesmen: []
        }
      },
      delete_portofolio : {
        ujiIndex: null,
        elemenIndex: null,
        i: null
      },
      input: [],
      skema: [],
      syarat: [],
      syaratUpload: [],
      input: {},
      items: [
      ],
      peserta: [],
      skema: [],
      asesi: [],
      ujikompetensi: null,
      e11: {},
    }
  },
  mounted() {
    this.getpesertasDetail()
    // this.getAsesi();
  },
  methods: {
    deletePortofolio() {
      this.ujikompetensi[this.delete_portofolio.ujiIndex].unitKompetensi.element[this.delete_portofolio.elemenIndex].portofolioAsesmen.splice(this.delete_portofolio.elemenIndex, 1)
      this.deleteDialog = false
    },
    getPortoName(id) {
      console.log(id)
      console.log(this.peserta.portofolio.filter(x => x.id === id))
    },
    savePortofolio() {
      if (typeof(this.select_portofolio.elemen.portofolioAsesmen) !== 'undefined') {
        this.ujikompetensi[this.select_portofolio.ujiIndex].unitKompetensi.element[this.select_portofolio.elemenIndex].portofolioAsesmen = this.select_portofolio.elemen.portofolioAsesmen
      }
      this.select_portofolio = Object.assign({}, { elemen: {}})
      this.tambahDialog = false
    },
    preparedDeletePortofolio(ujiIndex, elemenIndex, i) {
      // console.log(elemen, i)
      this.$nextTick(() => {
        this.delete_portofolio = Object.assign({}, { ujiIndex: ujiIndex, elemenIndex: elemenIndex, i: i })
        this.deleteDialog = true
      })
    },
    preparedSelectPortofolio(elemen, ujiIndex, elemenIndex) {
      // console.log(elemen, i)
      this.$nextTick(() => {
        this.select_portofolio = Object.assign({}, { elemen: {...elemen}, ujiIndex: ujiIndex, elemenIndex: elemenIndex })
        this.tambahDialog = true
      })
    },
    radioasesmen(uji, kuk, value, ujiIndex, elemenIndex, kukIndex){
      const val = `${value}`
      // const val = value;
      // console.log(val);
      if (val === this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri) {
        return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = "0"
      }
      // console.log(this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri);
      return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = val
    },
    asesmenkuk(uji, kuk, value, ujiIndex, elemenIndex, kukIndex ) {
      const val = `${value}`
      if (val === this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag) {
        return this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = "0"
      }
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
        console.log(data.peserta.ujiKompetensi)
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
            const element = this.ujikompetensi[x].unitKompetensi.element[i]
            for (let k = 0; k < this.ujikompetensi[x].asesmen.length; k++) {
              if (this.ujikompetensi[x].asesmen[k].element.id == element.id) {
                this.ujikompetensi[x].unitKompetensi.element[i] = Object.assign({}, 
                  this.ujikompetensi[x].unitKompetensi.element[i], { 
                    asesmen_mandiri: `${this.ujikompetensi[x].asesmen[k].asesmen_mandiri}`,
                    portofolioAsesmen: this.ujikompetensi[x].asesmen[k].portofolioAsesmen.map((item) => {
                      return item.portofolio
                    })
                  })
              }
            }
          }
        }
        this.input = {...this.ujikompetensi}
      }).catch((error) => {
        // console.log(error);
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
        // console.log(data);
      }).catch((error) => {
        // console.log(error);
      })
    },
    async asesmenMandiri(e) {
      const { state: { loading } } = this
      // const ujiData = Object.values(this.input);
      if (!loading) {
        this.state.loading = true
        // if (ujiData.length > 0) {
        // console.log(this.ujikompetensi.length);
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          const asesmen = []
          const uji_kompetensi_id = this.ujikompetensi[x].id
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
            const element = Object.assign({}, {
              element_id: this.ujikompetensi[x].unitKompetensi.element[i].id,
              asesmen_mandiri: this.ujikompetensi[x].unitKompetensi.element[i].asesmen_mandiri,
              portofolio_id: []})
            asesmen.push(element)
          }
          console.log(asesmen)
          const result = await this.$apollo.mutate({
            mutation: ASESMEN_MANDIRI_MUTATION,
            variables: {
              asesmen, uji_kompetensi_id
            }
          }).then(({ data }) => {
            window.scrollTo(0,0)
            this.showAlert('success', 'Asesmen mandiri berhasil terkirim')
          }).catch(({graphQLErrors}) => {
            window.scrollTo(0,0)
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
    },
    async asesmenMandiriUnit(ujiIndex) {
      const { state: { loading } } = this
      // const ujiData = Object.values(this.input);
      if (!loading) {
        this.state.loading = true
        // if (ujiData.length > 0) {
        const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id
        const asesmen = []
        // console.log(this.ujikompetensi.length);
        for (let i = 0; i < this.ujikompetensi[ujiIndex].unitKompetensi.element.length; i++) {
          const element = Object.assign({}, {
            element_id: this.ujikompetensi[ujiIndex].unitKompetensi.element[i].id,
            asesmen_mandiri: this.ujikompetensi[ujiIndex].unitKompetensi.element[i].asesmen_mandiri,
            portofolio_id: 
              typeof(this.ujikompetensi[ujiIndex].unitKompetensi.element[i].portofolioAsesmen) !== 'undefined' 
                ? this.ujikompetensi[ujiIndex].unitKompetensi.element[i].portofolioAsesmen.map((item) => {
                  return item.id
                }) : []
          })
          asesmen.push(element)
        }
        const result = await this.$apollo.mutate({
          mutation: ASESMEN_MANDIRI_MUTATION,
          variables: {
            asesmen, uji_kompetensi_id
          }
        }).then(({ data }) => {
          // window.scrollTo(0,0);
          this.showAlert('success', 'Asesmen mandiri berhasil terkirim')
          this.getpesertasDetail()
        }).catch(({graphQLErrors}) => {
          // window.scrollTo(0,0);
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>