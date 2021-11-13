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
                type="info"
                >
                Isilah asesmen mandiri dibawah ini, usahakan telah menguasai bidang yang diujikan
              </v-alert>
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
                              <template v-slot:default>
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
                                      <v-radio-group row v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].asesmen_mandiri">
                                        <v-col cols="6">
                                          <v-radio class="justify-center" value= "1"></v-radio>
                                        </v-col>
                                        <v-col cols="6">
                                          <v-radio class="justify-center" value= "-1"></v-radio>
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
                                    <td width="5%">{{elemenIndex+1}}.{{kukIndex+1}}</td>
                                    <td>{{ kuk.kriteria}}</td>
                                    <td colspan="2"></td>
                                    <!-- <td colspan="2" class="text-center">
                                      <v-radio-group row v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri">
                                        <v-col cols="6">
                                          <v-radio class="justify-center" value= "1"></v-radio>
                                        </v-col>
                                        <v-col cols="6">
                                          <v-radio class="justify-center" value= "-1"></v-radio>
                                        </v-col>
                                      </v-radio-group>
                                    </td> -->
                                  </tr>
                              </tbody>
                              </template>
                          </v-simple-table>
                          <v-row>
                              <v-col v-if="uji.am_date == null" class="d-flex justify-end">
                                  <v-btn @click="asesmenMandiriUnit(ujiIndex)" color="primary" outlined dark ><v-icon left>send</v-icon>Kirimkan asesmen</v-btn>
                              </v-col>
                              <v-col v-if="uji.am_date != null" class="d-flex justify-end">
                                  <v-btn @click="asesmenMandiriUnit(ujiIndex)" color="warning" outlined dark ><v-icon left>send</v-icon>Kirim ulang asesmen</v-btn>
                              </v-col>
                          </v-row>
                      </v-expansion-panel-content>
                  </v-expansion-panel>
                  </v-expansion-panels>
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
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL } from '@/constants/graphql';
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql';

  export default {
    name: 'index',
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
      };
    },
    mounted() {
      this.getpesertasDetail();
      // this.getAsesi();
    },
    methods: {
      radioasesmen(uji, kuk, value, ujiIndex, elemenIndex, kukIndex){
        const val = `${value}`;
        // const val = value;
        // console.log(val);
        if (val === this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri) {
          return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = "0";
        }
        // console.log(this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri);
        return this.input[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri = val;
      },
      asesmenkuk(uji, kuk, value, ujiIndex, elemenIndex, kukIndex ) {
        const val = `${value}`;
        if (val === this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag) {
          return this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = "0";
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
        let kukData = (this.input[uji.id] || {}).asesmen;
        if (kukData == null) {
            kukData = {};
        }
        this.input = { 
          ...this.input, 
          [uji.id]: {
            uji_kompetensi_id: uji.id,
            asesmen: {
             ...kukData,
              [kuk.id]:{
              kuk_id: kuk.id,   asesmen_mandiri: value
              }
            }
          }};
        return this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = `${value}`;


        //benar
        // this.input = Object.assign(this.input, {[kuk.id]:{kuk_id: kuk.id, asesmen_mandiri: value}});
        // this.input.asesmen = Object.assign(this.ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex], {asesmen: `${value}`});
      },
      showAlert(type, message) {
        this.alert = { show: true, type, message };
      },
      async getpesertasDetail() {
          // this.alert.show = false;
          const id = this.peserta_id;
          const result = await this.$apollo.mutate({
              mutation: GET_PESERTAS_DETAIL,
              variables: {
                  id
              }
        }).then(({ data }) => {
            this.peserta = data.peserta;
            this.ujikompetensi = data.peserta.ujiKompetensi;
            for (let x = 0; x < this.ujikompetensi.length; x++) {
              for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
                const element = this.ujikompetensi[x].unitKompetensi.element[i];
                for (let k = 0; k < this.ujikompetensi[x].asesmen.length; k++) {
                  if (this.ujikompetensi[x].asesmen[k].element.id == element.id) {
                    this.ujikompetensi[x].unitKompetensi.element[i] = Object.assign({}, this.ujikompetensi[x].unitKompetensi.element[i], { asesmen_mandiri: `${this.ujikompetensi[x].asesmen[k].asesmen_mandiri}` });
                    // console.log(element.id);
                  }
                }
                // for (let j = 0; j < this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk.length; j++) {
                //   const kuk = this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j];
                //   for (let k = 0; k < this.ujikompetensi[x].asesmen.length; k++) {
                //     if (this.ujikompetensi[x].asesmen[k].kriteriaUk.id == kuk.id) {
                //       this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j] = Object.assign({}, this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j], { asesmen_mandiri: `${this.ujikompetensi[x].asesmen[k].asesmen_mandiri}` });
                //     }
                //   }
                // }
              }
            }
            this.input = {...this.ujikompetensi};
            // console.log(data.peserta.ujiKompetensi.length);
            // this.input.asesmen = data.peserta.ujiKompetensi.ujikompetensi.unitKompetensi.element;
        }).catch((error) => {
          // console.log(error);
        }).finally(() => {
          this.state.skeleton = false;
        });
      },
      async getSyarat() {
          const { id } = this.$data;
          const result = await this.$apollo.mutate({
              mutation: GET_REPORT_DETAIL
        }).then(({ data }) => {
            this.peserta = data.peserta;
            this.items = data.peserta.syaratPeserta;
            // console.log(data);
        }).catch((error) => {
          // console.log(error);
        });
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
      async asesmenMandiri(e) {
        const { state: { loading } } = this;
        // const ujiData = Object.values(this.input);
        if (!loading) {
          this.state.loading = true;
          // if (ujiData.length > 0) {
            // console.log(this.ujikompetensi.length);
            for (let x = 0; x < this.ujikompetensi.length; x++) {
              const asesmen = [];
              const uji_kompetensi_id = this.ujikompetensi[x].id;
              for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
                const element = Object.assign({}, {element_id: this.ujikompetensi[x].unitKompetensi.element[i].id, asesmen_mandiri: this.ujikompetensi[x].unitKompetensi.element[i].asesmen_mandiri});
                asesmen.push(element);
                // for (let j = 0; j < this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk.length; j++) {
                //   const element = Object.assign({}, {kuk_id: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].id, asesmen_mandiri: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].asesmen_mandiri});
                //   asesmen.push(element);
                // }
              }
              const result = await this.$apollo.mutate({
                mutation: ASESMEN_MANDIRI_MUTATION,
                variables: {
                  asesmen, uji_kompetensi_id
                }
              }).then(({ data }) => {
                window.scrollTo(0,0);
                this.showAlert('success', 'Asesmen mandiri berhasil terkirim');
              }).catch(({graphQLErrors}) => {
                window.scrollTo(0,0);
                this.showAlert('error', graphQLErrors[0].message);
              }).finally(() => {
                this.state.loading = false;
              });
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
        const { state: { loading } } = this;
        // const ujiData = Object.values(this.input);
        if (!loading) {
          this.state.loading = true;
          // if (ujiData.length > 0) {
            const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id;
            const asesmen = [];
            // console.log(this.ujikompetensi.length);
            for (let i = 0; i < this.ujikompetensi[ujiIndex].unitKompetensi.element.length; i++) {
              const element = Object.assign({}, {element_id: this.ujikompetensi[ujiIndex].unitKompetensi.element[i].id, asesmen_mandiri: this.ujikompetensi[ujiIndex].unitKompetensi.element[i].asesmen_mandiri});
              asesmen.push(element);
              // for (let j = 0; j < this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk.length; j++) {
              //   const element = Object.assign({}, {kuk_id: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].id, asesmen_mandiri: this.ujikompetensi[x].unitKompetensi.element[i].kriteriaUk[j].asesmen_mandiri});
              //   asesmen.push(element);
              // }
            }
            const result = await this.$apollo.mutate({
              mutation: ASESMEN_MANDIRI_MUTATION,
              variables: {
                asesmen, uji_kompetensi_id
              }
            }).then(({ data }) => {
              // window.scrollTo(0,0);
              this.showAlert('success', 'Asesmen mandiri berhasil terkirim');
              this.getpesertasDetail();
            }).catch(({graphQLErrors}) => {
              // window.scrollTo(0,0);
              this.showAlert('error', graphQLErrors[0].message);
            }).finally(() => {
              this.state.loading = false;
            });
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
</style>