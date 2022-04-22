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
    <v-card-title>FR.APL.02. ASESMEN MANDIRI</v-card-title>
    <v-card-text>
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
            <th align="start">Ahli K3 Madya</th>
          </tr>
          <tr>
            <td class="nowrap">Nomor</td>
            <td class="nowrap">:</td>
            <th align="start">SS.LSPUPNVJT.FT.02.1</th>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <th align="start" class="with-bg">PANDUAN ASESMEN MANDIRI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Instruksi:</b>
              <ul style="margin: 0; padding-left: 20px">
                <li>Baca setiap pertanyaan di kolom sebelah kiri.</li>
                <li>
                  Beri tanda centang (&#10004;) pada kotak jika Anda yakin dapat
                  melakukan tugas yang dijelaskan.
                </li>
                <li>
                  Isi kolom di sebelah kanan dengan mendaftar bukti yang Anda
                  miliki untuk menunjukkan bahwa Anda melakukan tugas-tugas ini.
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
            <td colspan="4" style="padding: 0">
              <table class="table-nested">
                <tr>
                  <th
                    align="start"
                    style="border-right: 1px solid black; padding: 10px"
                    class="nowrap"
                  >
                    Unit Kompetensi :
                  </th>
                  <th align="start" colspan="3" style="padding: 10px">
                    Dukungan Terhadap Pelaksanaan Strategi Pengendalian Risiko
                    K3
                  </th>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th align="start">Dapatkah Saya ... ?</th>
            <th class="nowrap">K</th>
            <th class="nowrap">BK</th>
            <th class="nowrap">Bukti yang Relevan</th>
          </tr>
          <tr>
            <td class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td rowspan="4" style="padding-right: 5px" class="text-top">
                      1.
                    </td>
                    <td colspan="2">
                      Elemen: <b>Mengembangkan pilihan pengendalian risiko.</b>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">Kriteria Unjuk Kerja :</td>
                  </tr>
                  <tr class="text-top">
                    <td style="padding-right: 5px">1.1</td>
                    <td>
                      Meninjau ulang hasil-hasil investigasi suatu insiden dan
                      penilaian risiko untuk mengidentifikasi bahaya yang
                      memerlukan tindakan pengendalian.
                    </td>
                  </tr>
                  <tr class="text-top">
                    <td style="padding-right: 5px">1.2</td>
                    <td>
                      Menerapkan pengetahuan perundang-undangan dan standar
                      terhadap pengembangan sebuah kisaran opsi untuk
                      mengendalikan risiko-risiko khusus di tempat kerja.
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <td class="text-top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              magnam labore aliquam dolor officia! Vel autem laboriosam maiores,
              numquam adipisci accusamus, nisi error corrupti dolorem eius velit
              molestias aspernatur omnis.
            </td>
          </tr>
          <tr>
            <td class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td rowspan="4" style="padding-right: 5px" class="text-top">
                      1.
                    </td>
                    <td colspan="2">
                      Elemen: <b>Mengembangkan pilihan pengendalian risiko.</b>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">Kriteria Unjuk Kerja :</td>
                  </tr>
                  <tr class="text-top">
                    <td style="padding-right: 5px">1.1</td>
                    <td>
                      Meninjau ulang hasil-hasil investigasi suatu insiden dan
                      penilaian risiko untuk mengidentifikasi bahaya yang
                      memerlukan tindakan pengendalian.
                    </td>
                  </tr>
                  <tr class="text-top">
                    <td style="padding-right: 5px">1.2</td>
                    <td>
                      Menerapkan pengetahuan perundang-undangan dan standar
                      terhadap pengembangan sebuah kisaran opsi untuk
                      mengendalikan risiko-risiko khusus di tempat kerja.
                    </td>
                  </tr>
                </tbody>
              </table>
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
            <td class="text-top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              magnam labore aliquam dolor officia! Vel autem laboriosam maiores,
              numquam adipisci accusamus, nisi error corrupti dolorem eius velit
              molestias aspernatur omnis.
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text style="padding-bottom: 0">
      <table>
        <tbody>
          <tr>
            <td class="no-border-bottom">Nama Asesi:</td>
            <td class="no-border-bottom">Tanggal:</td>
            <td class="no-border-bottom">Tanda Tangan Asesi:</td>
          </tr>
          <tr>
            <td class="no-border-top" style="padding-top: 0">Namaaa</td>
            <td class="no-border-top" style="padding-top: 0">Tanggaaal</td>
            <td class="no-border-top" style="padding-top: 0">TTDDD</td>
          </tr>
          <tr>
            <th align="start" colspan="3" class="with-bg">
              Ditinjau oleh Asesor:
            </th>
          </tr>
          <tr>
            <th align="start" class="no-border-bottom">Nama Asesor:</th>
            <th align="start" class="no-border-bottom">Rekomendasi:</th>
            <th align="start" class="no-border-bottom">
              Tanda Tangan dan Tanggal:
            </th>
          </tr>
          <tr>
            <td class="no-border-top" style="padding-top: 0">Namaaaa</td>
            <td class="no-border-top" style="padding-top: 0">
              Asesmen dapat dilanjutkan / tidak dapat dilanjutkan
            </td>
            <td class="no-border-top" style="padding-top: 0">TTD Tanggal</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle style="padding-top: 0">
      <i>
        Diadaptasi dari template yang disediakan di Departemen Pendidikan dan
        Pelatihan,
        <br />
        Australia. Merancang instrumen asesmen dalam VET. 2008
      </i>
    </v-card-subtitle>
  </div>
</template>

<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'

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
          for (let j = 0; j < this.ujikompetensi.unitKompetensi.element[i].kriteriaUk.length; j++) {
            const kuk = this.ujikompetensi.unitKompetensi.element[i].kriteriaUk[j]
            for (let k = 0; k < this.ujikompetensi.asesmen.length; k++) {
              if (this.ujikompetensi.asesmen[k].kriteriaUk.id == kuk.id) {
                this.ujikompetensi.unitKompetensi.element[i].kriteriaUk[j].asesmen_mandiri = this.ujikompetensi.asesmen[k].asesmen_mandiri
              }
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