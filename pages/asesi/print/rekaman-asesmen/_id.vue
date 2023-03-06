
<style>
table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

@media print {
    #printarea * {}
    #hide * {
        display: none;
    }
}
</style>
<template>
  <div class="page-content-wrapper-inner">
    <section v-if="!state.skeleton">
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
            FR.AC.01. Formulir Rekaman Asesmen Kompetensi
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td width="30%"><b>Nama asesi</b></td>
                  <td>{{ pesertas.asesi.nama }}</td>
                </tr>
                <tr>
                  <td width="30%"><b>Nama Asesor</b></td>
                  <td>{{ pesertas.asesor.nama }}</td>
                </tr>
                <tr>
                  <td width="30%"><b>Skema sertifikasi/ Standar/ Perangkat
                    ketrampilan/ Okupasi/ Kualifikasi/ Klaster</b></td>
                  <td>{{ pesertas.jadwal.skema.skema }}</td>
                </tr>
                <tr>
                  <td width="20%"><b>Tanggal mulainya asesmen:</b></td>
                  <td>{{ pesertas.jadwal.tanggal }}</td>
                </tr>
                <tr>
                  <td width="20%"><b>Tanggal selesainya asesmen:</b></td>
                  <td>{{ pesertas.asesmen_date }}</td>
                </tr>
                <tr>
                  <td width="20%"><b>Keputusan asesmen:</b></td>
                  <td v-if="pesertas.status == 2">Direkomendasi Kompeten</td>
                  <td v-if="pesertas.status == -2">Belum Kompeten</td>
                </tr>
                <tr>
                  <td width="20%"><b>Tindak lanjut yang dibutuhkan:</b></td>
                  <td v-if="pesertas.tindak_lanjut != null">{{ pesertas.tindak_lanjut }}</td>
                  <td v-if="pesertas.tindak_lanjut == null">-</td>
                </tr>
                <tr>
                  <td width="20%"><b>Komentar/ Observasi oleh asesor:</b></td>
                  <td v-if="pesertas.komentar_observasi != null">{{ pesertas.komentar_observasi }}/ {{ pesertas.asesor.nama }}</td>
                  <td v-if="pesertas.komentar_observasi == null">- / {{ pesertas.asesor.nama }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-subtitle>
            Beri tanda centang 	&#10004; di kolom yang sesuai untuk mencerminkan bukti yang diperoleh untuk menentukan Kompetensi siswa untuk setiap Unit Kompetensi.
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th><b>Unit Kompetensi</b></th>
                  <th class="text-center"><b>Observasi demonstrasi</b></th>
                  <th class="text-center"><b>Portofolio</b></th>
                  <th class="text-center"><b>Pernyataan pihak ketiga</b></th>
                  <th class="text-center"><b>Pertanyaan lisan</b></th>
                  <th class="text-center"><b>Pertanyaan tertulis</b></th>
                  <th class="text-center"><b>Proyek kerja</b></th>
                  <th class="text-center"><b>Lainnya</b></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(unit, index) in pesertas.ujiKompetensi" :key="unit.id">
                  <td><b>{{ unit.unitKompetensi.unit }}</b></td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.observasi" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.portofolio" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pihak_ketiga" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_lisan" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_tertulis" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.proyek_kerja" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex justify-center">
                      <v-checkbox v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.lainnya" readonly class="justify-center"></v-checkbox>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </div>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION, REKAM_ASESMEN_KOMPETENSI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_blank',
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
      skema: [],
      syarat: [],
      syaratUpload: [],
      input: [],
      rekaman_asesmen: {
        keputusan: false,
        tindak_lanjut: null,
        komentar_observasi: null
      },
      items: [
      ],
      pesertas: [],
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
        // mutation: GET_UJIKOMPETENSI_DETAIL,
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        // this.pesertas = data.peserta;
        this.pesertas = data.peserta
        for (let index = 0; index < this.pesertas.ujiKompetensi.length; index++) {
          this.input.push({
            id: this.pesertas.ujiKompetensi[index].id,
            observasi: false,
            portofolio: false,
            pihak_ketiga: false,
            pertanyaan_lisan: false,
            pertanyaan_tertulis: false,
            proyek_kerja: false,
            lainnya: false
          })
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
    async rekamamAsesmenKompetensi(){
      const { rekaman_asesmen: {keputusan, tindak_lanjut, komentar_observasi} } = this.$data
      const peserta_id = this.peserta_id
      const uji_kompetensi = this.input
      const result = await this.$apollo.mutate({
        mutation: REKAM_ASESMEN_KOMPETENSI_MUTATION,
        variables: {
          peserta_id, keputusan, tindak_lanjut, komentar_observasi, uji_kompetensi
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
