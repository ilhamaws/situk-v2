<style>
table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black !important;
}

@media print {
    #printarea * {
        font-size: 12px
    }
    #hide * {
        display: none;
    }
}
</style>
<template>
  <div class="page-content-wrapper-inner">
    <div v-if="alert.show">
      <v-alert v-model="alert.show" :type="alert.type" dismissible class="mb-10">
        <div class="white--text">
          {{ alert.message }}
        </div>
      </v-alert>
    </div>
    <section>
      <v-layout
        column
        wrap
      > 
        <div id="printarea">
          <v-card-text id="hide">
            <v-row>
              <v-col class="d-flex justify-end">
                <v-btn color="primary" outlined dark @click="printWindow()"><v-icon left>print</v-icon>Print</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-title>
            FR.AI.01. Ceklis Observasi Untuk Aktivitas di Tempat Kerja Simulasi
          </v-card-title>
          <v-card-text>
            <v-list v-if="ujikompetensi != null">
              <v-simple-table>
                <tbody>
                  <tr>
                    <td width="20%"><b>Nama:</b></td>
                    <td>{{ ujikompetensi.peserta.asesi.nama }}</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Unit kompetensi:</b></td>
                    <td>{{ ujikompetensi.unitKompetensi.unit }}</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Nama asesor:</b></td>
                    <td>{{ ujikompetensi.peserta.asesor.nama }}</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Tempat Uji Kompetensi:</b></td>
                    <td>{{ ujikompetensi.peserta.jadwal.tempatUk.nama }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-list>
            <div v-if="ujikompetensi != null" class="pt-5">
              <v-simple-table>
                <template #default>
                  <thead>
                    <tr>
                      <th width="10"><b>No</b></th>
                      <th><b>Elemen</b></th>
                      <th width="40%"><b>Kriteria Unjuk Kerja</b></th>
                      <th width="10%" class="text-center"><b>Kompeten</b></th>
                      <th width="10%" class="text-center"><b>Belum Kompeten</b></th>
                    </tr>
                  </thead>
                  <tbody v-for="(elemen, elemenIndex) in ujikompetensi.unitKompetensi.element" :key="elemen.id">
                    <td :rowspan="elemen.kriteriaUk.length + 1">{{ elemenIndex+1 }}</td>
                    <td :rowspan="elemen.kriteriaUk.length + 1">{{ elemen.elemen }}</td>
                    <tr v-for="(kuk, kukIndex) in elemen.kriteriaUk" :key="kuk.id">
                      <!-- <td width="5%">{{elemenIndex+1}}.{{kukIndex+1}}</td> -->
                      <td>{{ kuk.kriteria }}</td>
                      <td>
                        <div class="d-flex justify-center">
                          <v-checkbox v-model="ujikompetensi.unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri" readonly :value="1"></v-checkbox>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex justify-center">
                          <v-checkbox v-model="ujikompetensi.unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri" readonly :value="-1"></v-checkbox>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                <!-- <tbody>
                    <tr>
                    <td colspan="2" width="20%"><b>Rekomendasi:</b></td>
                    <td colspan="5">{{ ujikompetensi.rekomendasi_am }}</td>
                    </tr>
                    <tr>
                    <td colspan="2" width="20%"><b>Tanda Tangan Asesi:</b></td>
                    <td colspan="5">{{ ujikompetensi.peserta.asesi.nama }}</td>
                    </tr>
                    <tr>
                    <td colspan="2" width="20%"><b>Tanda Tangan Asesor:</b></td>
                    <td colspan="5">{{ ujikompetensi.peserta.asesi.nama }}</td>
                    </tr>
                </tbody> -->
                </template>
              </v-simple-table>
            </div>
            <v-list v-if="ujikompetensi != null" class="pt-5">
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Nama Asesi/ Kandidat:</th>
                    <th>Tanggal:</th>
                    <th>Tanda Tangan Asesi:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ ujikompetensi.peserta.asesi.nama }}</td>
                    <td>{{ ujikompetensi.am_date }}</td>
                    <td>
                      <v-img
                        :src="ujikompetensi.peserta.asesi.ttd"
                        :lazy-src="ujikompetensi.peserta.asesi.ttd"
                        aspect-ratio="1"
                        width="100"
                        class="my-5"
                      >
                      </v-img>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-list>
            <v-list v-if="ujikompetensi != null" class="pt-5">
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Nama Asesor/ Pelatih:</th>
                    <th>Rekomendasi:</th>
                    <th>Tanggal:</th>
                    <th>Tanda Tangan Asesor:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ ujikompetensi.peserta.asesor.nama }}</td>
                    <td>{{ ujikompetensi.rekomendasi_am }}</td>
                    <td>{{ ujikompetensi.verifikasi_am }}</td>
                    <td>
                      <v-img
                        :src="ujikompetensi.peserta.asesor.ttd"
                        :lazy-src="ujikompetensi.peserta.asesor.ttd"
                        aspect-ratio="1"
                        width="100"
                        class="my-5"
                      >
                      </v-img>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-list>
          </v-card-text>
        </div>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_blank',
  data() {
    return {
      asesmen: [],
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
      if (val === this.ujikompetensi.unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag) {
        return this.ujikompetensi.unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = "0"
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
      return this.ujikompetensi.unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].flag = `${value}`
    },
    printWindow(){
      window.print()
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
        this.ujikompetensi = data.ujikompetensi
        for (let i = 0; i < this.ujikompetensi.unitKompetensi.element.length; i++) {
          const element = this.ujikompetensi.unitKompetensi.element[i]
          for (let k = 0; k < this.ujikompetensi.asesmen.length; k++) {
            if (this.ujikompetensi.asesmen[k].element.id == element.id) {
              this.ujikompetensi.unitKompetensi.element[i].asesmen_mandiri = this.ujikompetensi.asesmen[k].asesmen_mandiri
            }
          }
        }
        console.log(data)
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
    async observasi(){
      // console.log(this.ujikompetensi[ujiIndex].asesmen.length);
      // const asesmenData = this.ujikompetensi[ujiIndex].asesmen;
      // const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id;
      // let rekomendasi_am = this.ujikompetensi[ujiIndex].rekomendasi_am;
      // if (rekomendasi_am === undefined) {
      //   rekomendasi_am = null;
      // }
      const asesmenData = this.ujikompetensi.asesmen
      const observasi = []
      // const asesmen = [];
      // for (let indexAsesmen = 0; indexAsesmen < asesmenData.length; indexAsesmen++) {
      //   const element = Object.assign({}, {kuk_id: asesmenData[indexAsesmen].kriteriaUk.id, observasi: asesmenData[indexAsesmen].observasi, penelitian_lanjut: asesmenData[indexAsesmen].penelitian_lanjut});
      //   observasi.push(element);
      // }
      for (let i = 0; i < this.ujikompetensi.unitKompetensi.element.length; i++) {
        for (let j = 0; j < this.ujikompetensi.unitKompetensi.element[i].kriteriaUk.length; j++) {
          const element = Object.assign({}, {kuk_id: this.ujikompetensi.unitKompetensi.element[i].kriteriaUk[j].id, observasi: this.ujikompetensi.unitKompetensi.element[i].kriteriaUk[j].observasi, penelitian_lanjut: this.ujikompetensi.unitKompetensi.element[i].kriteriaUk[j].penelitian_lanjut})
          observasi.push(element)
        }
      }
      console.log(observasi)
      const uji_kompetensi_id = this.ujikompetensi.id
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
