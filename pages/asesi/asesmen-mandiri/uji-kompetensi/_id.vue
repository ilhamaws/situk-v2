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
                              <th width="20"><b>No</b></th>
                              <th colspan="2" width="60%"><b>Apakah saya dapat?</b></th>
                              <th width="20%" class="text-center"><b>Kompeten</b></th>
                              <th width="20%" class="text-center"><b>Belum Kompeten</b></th>
                            </tr>
                          </thead>
                          <tbody v-for="(elemen, elemenIndex) in uji.unitKompetensi.element" :key="elemen.id">
                            <tr>
                              <th>{{ elemenIndex+1 }}</th>
                              <th colspan="4">Elemen: {{ elemen.elemen }}</th>
                            </tr>
                            <tr>
                              <td></td>
                              <td colspan="4" width="20">Kriteria Unjuk Kerja :</td>
                            </tr>
                            <tr v-for="(kuk, kukIndex) in elemen.kriteriaUk" :key="kuk.id">
                              <td></td>
                              <td width="5%">{{ elemenIndex+1 }}.{{ kukIndex+1 }}</td>
                              <td>{{ kuk.kriteria }}</td>
                              <td class="text-center">
                                <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag">
                                  <v-radio class="justify-center" value="1" @click="asesmenkuk(uji, kuk, 1, ujiIndex, elemenIndex, kukIndex )"></v-radio>
                                </v-radio-group>
                              </td>
                              <td class="text-center">
                                <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag">
                                  <v-radio class="justify-center" value="-1" @click="asesmenkuk(uji, kuk, -1, ujiIndex, elemenIndex, kukIndex)"></v-radio>
                                </v-radio-group>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-row>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn color="blue darken-3 mt-5 px-10" dark rounded @click="asesmenMandiri">Kirim Asesmen</v-btn>
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
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      tambahDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      ujikompetensi_id: this.$route.params.id,
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
    }
  },
  mounted() {
    this.getJadwal()
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
    async getJadwal() {
      // this.alert.show = false;
      const id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        // this.peserta = data.peserta;
        this.ujikompetensi = data.peserta.ujiKompetensi
        console.log(data.peserta.ujiKompetensi.length)
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
    async asesmenMandiri() {
      const { state: { loading } } = this
      const ujiData = Object.values(this.input)
      if (!state.loading) {
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
}

</script>
<style lang="scss" scoped>
</style>
