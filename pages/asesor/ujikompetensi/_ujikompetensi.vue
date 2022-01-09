<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <v-card>
            <v-card-title class="px-8 ">
              <!-- <v-avatar size="30" color="warning lighten-2">
                <span class="white--text">APL.1</span>
              </v-avatar> -->
              <span class="headline">Asesmen Mandiri</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-8 py-8">
              <v-alert
                icon="info"
                text
                type="info"
              >
                Perhatikan pengisian asesmen mandiri, pengisian asesmen mandiri hanya dapat dilakukan sekali.
              </v-alert>
              <!-- Alert section -->
              <div v-if="alert.show">
                <v-alert :type="alert.type" dismissible class="mb-10">
                  <div class="white--text">
                    {{ alert.message }}
                  </div>
                </v-alert>
              </div>
              <!-- End alert section -->
              <!-- <v-row>
              <v-col cols="3">
                  <v-select
                      :items="items"
                      v-model="value"
                      prepend-icon="date_range"
                      label="Pilih Jadwal"
                  ></v-select>
              </v-col>
              </v-row> -->
              <!-- <v-radio-group v-model="radios" :mandatory="false">
                <v-radio label="Radio 1" value="radio-1"></v-radio>
                <v-radio label="Radio 2" value="radio-2"></v-radio>
              </v-radio-group> -->
              <div v-if="ujikompetensi != null" class="pt-5">
                <v-expansion-panels multiple accordion>
                  <v-expansion-panel
                    v-for="(uji, ujiIndex) in ujikompetensi"
                    :key="uji.id"
                  >
                    <v-expansion-panel-header>{{ uji.unitKompetensi.kode }} {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-simple-table>
                        <template #default>
                          <thead>
                            <tr>
                              <th width="10"><b>No</b></th>
                              <th width="20%"><b>Apakah saya dapat?</b></th>
                              <th width="10%" class="text-center"><b>ya</b></th>
                              <th width="10%" class="text-center"><b>tidak</b></th>
                              <!-- <th width="10%" class="text-center"><b>Observasi</b></th> -->
                              <th width="30%" class="text-center"><b>Penelitian Lanjut</b></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td></td>
                              <td colspan="5" width="20">Kriteria Unjuk Kerja :</td>
                            </tr>
                            <tr v-for="(kuk, kukIndex) in uji.asesmen" :key="kuk.id">
                              <!-- <td></td> -->
                              <td width="5%">{{ 1 }}.{{ kukIndex+1 }}</td>
                              <td>{{ kuk.kriteriaUk.kriteria }}</td>
                              <td class="text-center">
                                <v-radio-group v-model="ujikompetensi[ujiIndex].asesmen[kukIndex].observasi">
                                  <v-radio class="justify-center" :value="1"></v-radio>
                                </v-radio-group>
                              </td>
                              <td class="text-center">
                                <v-radio-group v-model="ujikompetensi[ujiIndex].asesmen[kukIndex].observasi">
                                  <v-radio class="justify-center" :value="-1"></v-radio>
                                </v-radio-group>
                              </td>
                              <td>
                                <v-text-field
                                  v-model="ujikompetensi[ujiIndex].asesmen[kukIndex].penelitian_lanjut"
                                  class="mt-5"
                                  label="penelitian lanjut"
                                  type="text"
                                  solo
                                />
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="umpan_balik"
                      class="mt-5"
                      label="Umpan balik"
                      type="text"
                      solo
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn color="blue darken-3 mt-5 px-10" dark rounded @click="observasi">Observasi</v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesor',
  data() {
    return {
      tambahDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      peserta_id: this.$route.params.ujikompetensi,
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
      umpan_balik: null
    }
  },
  mounted() {
    this.getpesertaDetails()
    // this.getAsesi();
  },
  methods: {
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
    async getpesertaDetails() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_UJIKOMPETENSI_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        // this.pesertas = data.peserta;
        this.ujikompetensi = data
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        // this.state.skeleton = false;
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
    async observasi(){
      // console.log(this.ujikompetensi[ujiIndex].asesmen.length);
      // const asesmenData = this.ujikompetensi[ujiIndex].asesmen;
      // const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id;
      // let rekomendasi_am = this.ujikompetensi[ujiIndex].rekomendasi_am;
      // if (rekomendasi_am === undefined) {
      //   rekomendasi_am = null;
      // }
      const asesmenData = this.ujikompetensi.ujikompetensi.asesmen
      const observasi = []
      for (let indexAsesmen = 0; indexAsesmen < asesmenData.length; indexAsesmen++) {
        const element = Object.assign({}, {kuk_id: asesmenData[indexAsesmen].kriteriaUk.id, observasi: asesmenData[indexAsesmen].observasi, penelitian_lanjut: asesmenData[indexAsesmen].penelitian_lanjut})
        observasi.push(element)
      }
      const uji_kompetensi_id = this.ujikompetensi.ujikompetensi.id
      const umpan_balik = this.umpan_balik
      const result = await this.$apollo.mutate({
        mutation: OBSERVASI_MUTATION,
        variables: {
          uji_kompetensi_id, umpan_balik, observasi
        }
      }).then(({ data }) => {
        this.showAlert('success', 'peserta berhasil diverifikasi')
        console.log(data)
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async asesmenMandiri() {
      const ujiData = Object.values(this.input)
      if (ujiData.length > 0) {
        for (let index = 0; index < ujiData.length; index++) {
          const asesmen = Object.values(ujiData[index].asesmen)
          const uji_kompetensi_id = ujiData[index].uji_kompetensi_id
          console.log(asesmen)

          const result = await this.$apollo.mutate({
            mutation: ASESMEN_MANDIRI_MUTATION,
            variables: {
              asesmen, uji_kompetensi_id
            }
          }).then(({ data }) => {
            console.log(data)
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
