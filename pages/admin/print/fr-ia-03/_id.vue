<style lang="scss" scoped>
* {
  font-family: Calibri, sans-serif !important;
}

@media print
{
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
  <div class="page-content-wrapper-inner fill-height">
    <v-card-title>FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI</v-card-title>
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
              <span class="text-line">Sewaktu</span> /
              <span>Tempat Kerja</span> / <span>Mandiri</span>*
            </td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesor</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesi</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Tanggal</td>
            <td>:</td>
            <td></td>
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
            <td>KKK.00.02.004.01</td>
          </tr>
          <tr>
            <td class="nowrap">Judul Unit</td>
            <td class="nowrap">:</td>
            <td>
              Dukungan Terhadap Pelaksanaan Strategi Pengendalian Risiko K3
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <td rowspan="2" colspan="2" align="center">Pertanyaan</td>
            <td colspan="2" align="center">Rekomendasi</td>
          </tr>
          <tr>
            <td align="center">K</td>
            <td align="center">BK</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="with-bg text-top">1.</th>
            <td>
              Jika anda sedang melakukan investigasi suatu insiden yang terjadi
              di tempat kerja anda kemudian anda menemukan potensi bahaya di
              satu lokasi yang belum teridentifikasi. Apa tindakan anda?
              <b>(CMS)</b>
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
          </tr>
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
              dignissimos nostrum provident! Earum totam similique, mollitia
              illo autem quas ex libero sunt aliquid cum, commodi delectus at!
              Unde, in est?
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
            <th align="start" class="no-border-bottom">Asesi :</th>
            <th align="start" class="no-border-bottom">Asesor :</th>
          </tr>
          <tr>
            <td class="no-border-top" style="padding-top: 0">Muhammad</td>
            <td class="no-border-top" style="padding-top: 0">Rifan</td>
          </tr>
          <tr>
            <th class="nowrap text-top" align="start">
              Tanda Tangan dan Tanggal
            </th>
            <td>TTD Asesi</td>
            <td>TTD Asesor</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </div>
</template>

<script>
import { ASESMEN_MANDIRI_MUTATION, OBSERVASI_MUTATION, GET_REPORT_DETAIL } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App',
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
  unmounted() {
    this.style.remove()
  },
  mounted() {
    this.getpesertaDetails()
  },
  methods: {
    printWindow(){
      document.title = 'apl-1_'+this.$route.params.id
      window.print()
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async getpesertaDetails() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_REPORT_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta = data.peserta
        this.ujikompetensi = data.peserta
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