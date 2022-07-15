<style lang="scss" scoped>
* {
  font-family: Calibri, sans-serif !important;
}

@page {
  size: A4;
  margin: 0;
}

@media print
{
  html, body {
    width: 210mm;
    height: 297mm;
  }
  table { page-break-after:auto }
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto }
  thead { display:table-header-group }
  tfoot { display:table-footer-group }
}

ol {
  margin: 0;
  padding-left: 20px;
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
  border: 0 solid white;
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
  <v-container v-if="!state.skeleton" class="page-content-wrapper-inner fill-height" style="width: 1110px!important">
    <v-card-subtitle class="font-weight-bold">FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI</v-card-subtitle>
    <v-card-text style="padding-bottom: 0">
      <table>
        <tbody>
          <tr>
            <td rowspan="2" class="nowrap">
              Skema Sertifikasi
              <br />
              (KKNI/Okupasi/Klaster)
            </td>
            <td class="nowrap">Judul</td>
            <td class="nowrap">:</td>
            <td>Ahli K3 Madya</td>
          </tr>
          <tr>
            <td class="nowrap">Nomor</td>
            <td class="nowrap">:</td>
            <td>SS.LSPUPNVJT.FT.02.1</td>
          </tr>
          <tr>
            <td colspan="2">TUK</td>
            <td>:</td>
            <td>
              <span>Sewaktu</span> /
              <span>Tempat Kerja</span> / <span>Mandiri</span>*
            </td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesor</td>
            <td>:</td>
            <td>{{peserta.asesor.nama}}</td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesi</td>
            <td>:</td>
            <td>{{peserta.asesi.nama}}</td>
          </tr>
          <tr>
            <td colspan="2">Tanggal</td>
            <td>:</td>
            <td>{{peserta.asesmen_date}}</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle style="padding-top: 0"
      >*Coret yang tidak perlu</v-card-subtitle
    >
    <v-card-text>
      <table>
        <thead>
          <tr>
            <th align="start" class="with-bg">PANDUAN BAGI ASESOR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul style="margin: 0; padding-left: 20px">
                <li>
                  Formulir ini diisi pada saat asesor akan melakukan asesmen
                  dengan metode observasi demonstrasi.
                </li>
                <li>
                  Pertanyaan dibuat dengan tujuan untuk menggali, dapat berisi
                  pertanyaan yang berkaitan dengan dimensi kompetensi, batasan
                  variabel dan aspek kritis.
                </li>
                <li>
                  Tanggapan asesi dapat ditulis oleh asesor dikolom tanggapan,
                  dan apabila tanggapan sesuai maka beri tanda centrang pada
                  kolom (K) dan apabila belum sesuai beri tanda centrang pada
                  kolom (BK).
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <td rowspan="2" class="nowrap">Unit Kompetensi</td>
            <td class="nowrap">Kode Unit</td>
            <td class="nowrap">:</td>
            <td></td>
          </tr>
          <tr>
            <td class="nowrap">Judul Unit</td>
            <td class="nowrap">:</td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text v-if="ujikompetensi != null">
      <table>
        <thead>
          <tr>
            <td width="50%" rowspan="2" colspan="3" align="center">Pertanyaan</td>
            <td rowspan="2"  align="center">Kesimpulan Jawaban Asesi</td>
            <td colspan="2" align="center">Rekomendasi</td>
          </tr>
          <tr>
            <td align="center">K</td>
            <td align="center">BK</td>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="uji in ujikompetensi"
          >
            <tr v-for="(soal, j) in uji.unitKompetensi.SoalObservasi" :key="j">
              <td v-if="j == 0" class="with-bg" :rowspan="uji.unitKompetensi.SoalObservasi.length">1.</td>
              <th class="text-top">{{j+1}}</th>
              <td class="text-top">
                <template v-if="j==0">
                <b>{{uji.unitKompetensi.kode}}</b>
                <br>
                </template>
                {{ soal.soal }}
              </td>
              <td>
                {{ soal.tanggapan }}
              </td>
              <td>
                <div class="d-flex justify-center">
                  <v-checkbox :input-value="soal.hasil == 1 ? true : false" readonly></v-checkbox>
                </div>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <v-checkbox :input-value="soal.hasil == 0 ? true : false" readonly></v-checkbox>
                </div>
              </td>
            </tr>
          </template>
          
          <!-- <tr>
            <td colspan="2" align="start" class="no-border-bottom">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <th class="nowrap text-top" style="padding-right: 10px">
                      Tanggapan :
                    </th>
                    <td>
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th class="with-bg text-top">2.</th>
            <td>
              Misalnya, muncul insiden kecelakaan ringan di tempat kerja anda
              dengan frekuensi tinggi namun pemangku kepentingan di tempat kerja
              anda tidak berkenan untuk merevisi sistem manajemen K3. Apa
              tindakan anda?
              <b>(JRES)</b>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="start" class="no-border-bottom">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <th class="nowrap text-top" style="padding-right: 10px">
                      Tanggapan :
                    </th>
                    <td>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quisquam deserunt similique, consequuntur est, iste
                      excepturi fugiat accusamus delectus eius dolorum quaerat!
                      Odit enim nesciunt voluptates ratione. Consequatur
                      reprehenderit laborum amet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
            <td></td>
          </tr> -->
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th align="start" class="nowrap text-top">
              Umpan balik untuk asesi :
            </th>
            <td align="start">
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th rowspan="2" class="nowrap text-top" align="start">Nama</th>
            <th width="40%" align="start" class="no-border-bottom">Asesi :</th>
            <th width="40%" align="start" class="no-border-bottom">Asesor :</th>
          </tr>
          <tr>
            <td class="no-border-top" style="padding-top: 0">{{peserta.asesi.nama}}</td>
            <td class="no-border-top" style="padding-top: 0">{{peserta.asesor.nama}}</td>
          </tr>
          <tr>
            <th class="nowrap text-top" align="start">
              Tanda Tangan
            </th>
            <td style="height: 100px"></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-container>
</template>

<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, GET_PESERTAS_DETAIL } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'
import { UJIOBSERVASI_MUTATION } from '@/constants/observasi'

export default {
  name: 'Index',
  layout: 'App',
  data() {
    return {
      umpan_balik_observasi: '',
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
      soal_preview: {},
      soal_preview_dialog: false,
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
      umpan_balik_uji: null,
      e11: {},
    }
  },
  mounted() {
    this.getpesertasDetail()
  },
  methods: {
    showSoalDetail(item) {
      this.soal_preview = item
      this.soal_preview_dialog = true
    },
    async submitPenilaian(id, items, umpan_balik) {
      const { state: { loading } } = this
      if (!loading) { 
        this.state.loading = true

        let uji_kompetensi_id = id
        let umpan_balik_uji = umpan_balik
        let uji_observasi = []

        uji_observasi = await items.SoalObservasi.map((item) => {
          return {
            soal_observasi_id: item.id,
            hasil: item.score > 50 ? 1 : -1, //todo
            // score: item.score,
            tanggapan: item.tanggapan
          }
        })

        const result = await this.$apollo.mutate({
          mutation: UJIOBSERVASI_MUTATION,
          variables: {
            uji_kompetensi_id, umpan_balik_uji, uji_observasi
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Observasi telah tersimpan')
          this.getpesertasDetail()
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async getpesertasDetail() {
      const id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta = data.peserta
        console.log(data)
        this.ujikompetensi = data.peserta.ujiKompetensi
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          this.ujikompetensi[x].unitKompetensi = Object.assign(this.ujikompetensi[x].unitKompetensi, {umpan_balik_uji: null})
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.SoalObservasi.length; i++) {
            this.ujikompetensi[x].unitKompetensi.SoalObservasi[i] = Object.assign(this.ujikompetensi[x].unitKompetensi.SoalObservasi[i], {hasil: '', tanggapan: '', status: null , score: ''})
            for (let k = 0; k < this.ujikompetensi[x].ujiObservasi.length; k++) {
              if (this.ujikompetensi[x].ujiObservasi[k].soalObservasi.id == this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].id) {
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].hasil = this.ujikompetensi[x].ujiObservasi[k].hasil
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].tanggapan = this.ujikompetensi[x].ujiObservasi[k].tanggapan
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].score = this.ujikompetensi[x].ujiObservasi[k].score
              }
            }
          }
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
  }
}

</script>