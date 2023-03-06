<style lang="scss" scoped>
* {
  font-family: Calibri, sans-serif !important;
}

@page {
  size: A4;
  margin: 1rem;
}

@media print
{
  html, body {
    width: 210mm;
    height: 297mm;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
  table { page-break-before:auto !important }
  tr    { page-break-inside:avoid !important; page-break-after:auto !important}
  td    { page-break-inside:avoid !important; page-break-after:auto !important}
  thead .no-thead { display: table-row-group}
  thead .hidden-table { display: table-header-group !important}
  tfoot { display:table-footer-group !important }
  .page-break {
     page-break-inside: avoid;
     page-break-before: always;
  }
}

.no-border{
  border: none !important;
}

table {
  width: 100%;
}

th,
td {
  padding: 10px;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.table-nested,
.table-nested th,
.table-nested td {
  border: 0;
  border-collapse: collapse;
}

.table-nested th,
.table-nested td {
  padding: 0;
}

.nowrap {
  white-space: nowrap;
  width: 1px;
}

.text-top {
  vertical-align: top;
}

.with-bg {
  background-color: #fabf8f;
}

.no-border-top {
  border-top: 0;
}

.no-border-left {
  border-left: 0;
}

.no-border-right {
  border-right: 0;
}

.no-border-bottom {
  border-bottom: 0;
}

.text-line {
  text-decoration: line-through;
}
</style>

<template>
  <v-container v-if="!state.skeleton" class="page-content">
    <v-card-subtitle class="font-weight-bold">FR.AK.02. FORMULIR REKAMAN ASESMEN KOMPETENSI</v-card-subtitle>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th align="start" class="text-top">Nama Asesi</th>
            <td align="start">
              {{ pesertas.asesi.nama }}
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Nama Asesor</th>
            <td align="start">
              {{ pesertas.asesor.nama }}
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">
              Skema sertifikasi (bila tersedia)
            </th>
            <td align="start">
              {{ pesertas.jadwal.skema.skema }}
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Unit Kompetensi</th>
            <td>
              <table class="table-nested">
                <tr v-for="(unit, i) in pesertas.ujiKompetensi" :key="i">
                  <td class="nowrap text-top" style="padding-right: 10px">
                    {{i+1}}.
                  </td>
                  <td>
                    <b>{{unit.unitKompetensi.kode }}</b> 
                    {{ unit.unitKompetensi.unit}}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Tanggal mulainya asesmen</th>
            <td align="start">
              {{ convertDate(pesertas.jadwal.tanggal) }}
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Tanggal selesainya asesmen</th>
            <td align="start">
              {{ convertDate(pesertas.jadwal.tanggal) }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <div class="page-break">
      <v-card-subtitle class="pb-0">
        Beri tanda centang (&#10004;) di kolom yang sesuai untuk mencerminkan
        bukti yang diperoleh untuk menentukan Kompetensi asesi untuk setiap Unit
        Kompetensi.
      </v-card-subtitle>
      <v-card-text>
        <table class="no-border">
          <thead class="hidden-table">
            <tr class="no-border-top no-border-left no-border-right">
              <td class="no-border-top no-border-left no-border-right" colspan="8">&nbsp;</td>
            </tr>
          </thead>
          <thead class="no-thead">
            <tr class="with-bg">
              <th width="50%">Unit Kompetensi</th>
              <th width="5%">Observasi Demonstrasi</th>
              <th width="5%">Portofolio</th>
              <th width="5%">Pernyataan Pihak Ketiga Pertanyaan Wawancara</th>
              <th width="5%">Pertanyaan Lisan</th>
              <th width="5%">Pertanyaan Tertulis</th>
              <th width="5%">Proyek Kerja</th>
              <th width="5%">Lainnya</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in pesertas.ujiKompetensi" :key="unit.id">
              <td width="20%">
                <b>{{ unit.unitKompetensi.kode }}</b><br>
                {{ unit.unitKompetensi.unit }}</td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.observasi" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.observasi ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.portofolio" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.portofolio ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pihak_ketiga" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.pihak_ketiga ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_lisan" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_lisan ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_tertulis" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.pertanyaan_tertulis ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <!-- <input type="checkbox" v-model="pesertas.ujiKompetensi[index].rekamanAsesmen.proyek_kerja" readonly class="justify-center"/> -->
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.proyek_kerja ? `&#10004;` : ''}}
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  {{pesertas.ujiKompetensi[index].rekamanAsesmen.lainnya ? `&#10004;` : ''}}
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8" style="padding: 0">
                <table style="border: 0">
                  <tbody>
                    <tr class="text-top">
                      <th
                        class="nowrap no-border-top no-border-left"
                        align="start"
                      >
                        Rekomendasi hasil asesmen
                      </th>
                      <td class="no-border-top no-border-right">
                        <span v-if="pesertas.status == 2">Kompeten</span>
                        <span v-if="pesertas.status == -2">Belum Kompeten</span>
                      </td>
                    </tr>
                    <tr class="text-top">
                      <td class="nowarp no-border-left" align="start">
                        <b> Tindak lanjut yang dibutuhkan </b> <br />
                        (Masukkan pekerjaan tambahan dan asesmen yang diperlukan
                        untuk mencapai kompetensi)
                      </td>
                      <td class="no-border-right">
                        <span v-if="pesertas.tindak_lanjut != null">{{ pesertas.tindak_lanjut }}</span>
                        <span v-if="pesertas.tindak_lanjut == null">-</span>
                      </td>
                    </tr>
                    <tr class="text-top">
                      <th
                        class="nowrap no-border-left no-border-bottom"
                        align="start"
                      >
                        Komentar / Observasi oleh asesor
                      </th>
                      <td class="no-border-right no-border-bottom">
                        <span v-if="pesertas.komentar_observasi != null">{{ pesertas.komentar_observasi }}</span>
                        <span v-if="pesertas.komentar_observasi == null">-</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="8" style="padding: 0">
                <table style="border: 0">
                  <tbody>
                    <tr class="text-top">
                      <th
                        class="nowrap no-border-top no-border-left"
                        align="start"
                      >
                        Tanda tangan asesi :
                      </th>
                      <td class="no-border-top">
                        <img
                          style="max-height: 80px;"
                          contain
                          :src="pesertas.asesi.ttd"
                        />
                      </td>
                      <th class="nowrap no-border-top" align="start">
                        Tanggal :
                      </th>
                      <td class="no-border-top no-border-right">
                        {{ convertDate(pesertas.jadwal.tanggal) }}
                      </td>
                    </tr>
                    <tr class="text-top">
                      <th
                        class="nowrap no-border-bottom no-border-left"
                        align="start"
                      >
                        Tanda tangan asesor :
                      </th>
                      <td width="30%" class="no-border-bottom">
                        <img
                          style="max-height: 80px;"
                          contain
                          :src="pesertas.asesor.ttd"
                        />
                      </td>
                      <th class="nowrap no-border-bottom" align="start">
                        Tanggal :
                      </th>
                      <td class="no-border-bottom no-border-right">
                        {{ convertDate(pesertas.jadwal.tanggal) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="no-border">
              <td class="no-border" colspan="8">&nbsp;</td>
            </tr>
          </tfoot>
          <tfoot>
            <tr class="no-border">
              <td class="no-border" colspan="8">&nbsp;</td>
            </tr>
          </tfoot>
        </table>
      </v-card-text>
    </div>
  </v-container>
</template>

<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION, REKAM_ASESMEN_KOMPETENSI_MUTATION } from '@/constants/graphql'
import moment from 'moment'
import 'moment/locale/id' // without this line it didn't work
moment.locale('id')

export default {
  name: 'Index',
  layout: 'App',
  head: {
    title: 'FR.AK.02',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  },
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
    convertDate(item) {
      return moment(item).format('DD MMMM YYYY')
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
    async observasi(){
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
