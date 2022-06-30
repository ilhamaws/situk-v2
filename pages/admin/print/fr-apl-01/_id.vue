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

.no-border,
.no-border th,
.no-border td {
  border: none;
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
  <v-container v-if="!state.skeleton" grid-list-xs style="width: 1110px!important">
    <div class="page-content-wrapper-inner fill-height">
      <v-card-subtitle class="font-weight-bold pb-0"> FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI </v-card-subtitle>
      <v-card-subtitle>
        <b>Bagian 1 : Rincian Data Pemohon Sertifikasi</b>
      </v-card-subtitle>
      <v-card-text>
        <div>Pada bagian ini, cantumkan data pribadi, data pendidikan formal serta data
          pekerjaan anda pada saat ini.</div>
        <table class="no-border">
          <tbody>
            <tr>
              <th rowspan="12" class="text-top nowrap">a.</th>
              <th colspan="10" align="start">Data Pribadi</th>
            </tr>
            <tr>
              <td class="nowrap text-top">Nama Lengkap</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.nama}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">No. KTP/NIK/Paspor</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.nik}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">Tempat / Tanggal Lahir</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.tanggal_lahir}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">Jenis Kelamin</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">
                <span :class="peserta.asesi.jenis_kelamin == 'L' ? '' : 'text-line'">Laki-laki</span>
                /
                <span :class="peserta.asesi.jenis_kelamin == 'P' ? '' : 'text-line'">Perempuan</span>
                *)
              </td>
            </tr>
            <tr>
              <td class="nowrap text-top">Kebangsaan</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.kebangsaan}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="nowrap text-top">Alamat Rumah</td>
              <td rowspan="2" class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.alamat}}</td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td class="nowrap text-top">Kode Pos</td>
              <td class="nowrap text-top">:</td>
              <td>{{peserta.asesi.kodepos}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="nowrap text-top">No. Telepon/E-mail</td>
              <td rowspan="2" class="nowrap text-top">:</td>
              <td class="nowrap text-top">Rumah</td>
              <td class="nowrap text-top">:</td>
              <td>____________</td>
              <td class="nowrap text-top">Kantor</td>
              <td class="nowrap text-top">:</td>
              <td>____________</td>
            </tr>
            <tr>
              <td class="nowrap text-top">HP</td>
              <td class="nowrap text-top">:</td>
              <td>{{peserta.asesi.telepon}}</td>
              <td class="nowrap text-top">E-mail</td>
              <td class="nowrap text-top">:</td>
              <td>{{peserta.asesi.user.email}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">Kualifikasi Pendidikan</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.pendidikan.pendidikan}}</td>
            </tr>
            <tr>
              <td colspan="10" align="start">*Coret yang tidak perlu</td>
            </tr>
            <tr>
              <th rowspan="7" class="text-top">b.</th>
              <th colspan="10" align="start">Data Pekerjaan Sekarang</th>
            </tr>
            <tr>
              <td class="nowrap text-top">Nama Institusi / Perusahaan</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.lembaga.nama}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">Jabatan</td>
              <td class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.pekerjaan.pekerjaan}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="nowrap text-top">Alamat Kantor</td>
              <td rowspan="2" class="nowrap text-top">:</td>
              <td colspan="7">{{peserta.asesi.lembaga.alamat}}</td>
            </tr>
            <tr>
              <td colspan="3">____________________</td>
              <td class="nowrap text-top">Kode Pos</td>
              <td class="nowrap text-top">:</td>
              <td>{{peserta.asesi.lembaga.kodepos}}</td>
            </tr>
            <tr>
              <td rowspan="2" class="nowrap text-top">No. Telp / Fax / E-mail</td>
              <td rowspan="2" class="nowrap text-top">:</td>
              <td class="nowrap text-top">Telp</td>
              <td class="nowrap text-top">:</td>
              <td>{{peserta.asesi.lembaga.telepon}}</td>
              <td class="nowrap text-top">Fax</td>
              <td class="nowrap text-top">:</td>
              <td>____________</td>
            </tr>
            <tr>
              <td class="nowrap text-top">E-mail</td>
              <td class="nowrap text-top">:</td>
              <td colspan="4">{{peserta.asesi.lembaga.email}}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-subtitle class="pb-2">
        <b>Bagian 2 : Data Sertifikasi</b>
      </v-card-subtitle>
      <v-card-text>
        <div class="pb-3">Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar
        Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan
        pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta
        pengalaman kerja yang anda miliki.</div>
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
              <th align="start">{{peserta.jadwal.skema.skema}}</th>
            </tr>
            <tr>
              <td class="nowrap">Nomor</td>
              <td class="nowrap">:</td>
              <td align="start">SS.LSPUPNVJT.FT.02.1</td>
            </tr>
            <tr>
              <td colspan="2" class="nowrap">Tujuan Asesmen</td>
              <td class="nowrap">:</td>
              <td>
                <v-checkbox :input-value="peserta.tujuan == 'Sertifikasi' ? true : false" class="mt-0" hide-details label="Sertifikasi" readonly></v-checkbox>
              </td>
            </tr>
            <tr>
              <td colspan="2" rowspan="4"></td>
              <td></td>
              <td>
                <v-checkbox class="mt-0" hide-details label="Sertifikasi Ulang" readonly></v-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-checkbox
                  class="mt-0" hide-details
                  label="Pengakuan Kompetensi Terkini (PKT)"
                  readonly
                ></v-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-checkbox
                  class="mt-0"
                  hide-details
                  label="Pengakuan Kompetensi Terkini (PKT)"
                  readonly
                ></v-checkbox>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-checkbox class="mt-0" hide-details label="Lainnya" readonly></v-checkbox>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-subtitle>
        <b>Daftar Unit Kompetensi sesuai kemasan:</b>
      </v-card-subtitle>
      <v-card-text>
        <table>
          <thead>
            <tr class="with-bg">
              <th class="nowrap">No.</th>
              <th>Kode Unit</th>
              <th>Judul Unit</th>
              <th width="20%">Jenis Standar (Standar Khusus/Standar Internasional/SKKNI)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(unit, index) in peserta.ujiKompetensi" :key="unit.id">
              <td class="nowrap text-top">{{index+1}}</td>
              <td class="text-top">{{ unit.unitKompetensi.kode }}</td>
              <td>{{ unit.unitKompetensi.unit }}</td>
              <td>
                SKK
              </td>
            </tr>
            <!-- <tr>
              <td class="nowrap text-top">2.</td>
              <td class="text-top">KKK.00.01.002.01</td>
              <td>Membantu penyelesaian masalah K3 di tempat kerja</td>
            </tr> -->
          </tbody>
        </table>
      </v-card-text>
      <v-card-subtitle>
        <b>
          Bagian 3 : Bukti Kelengkapan Pemohon <br />
          Bukti Persyaratan Dasar Pemohon
        </b>
      </v-card-subtitle>
      <v-card-text>
        <table>
          <thead>
            <tr class="with-bg">
              <th rowspan="2" class="nowrap">No.</th>
              <th rowspan="2">Bukti Persyaratan Dasar</th>
              <th colspan="2" width="30%">Ada</th>
              <th rowspan="2" width="15%">Tidak Ada</th>
            </tr>
            <tr class="with-bg">
              <th width="15%">Memenuhi Syarat</th>
              <th width="15%">Tidak Memenuhi Syarat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(syarat, index) in peserta.syaratPeserta" :key="index">
              <td class="nowrap text-top">{{index+1}}</td>
              <td class="text-top">
                {{syarat.syarat.syarat}}
              </td>
              <td align="center">
                <div class="d-flex justify-center">
                  <v-checkbox :input-value="syarat.status == 1 ? true : false" hide-details class="mt-0" readonly></v-checkbox>
                </div>
              </td>
              <td align="center">
                <div class="d-flex justify-center">
                  <v-checkbox :input-value="syarat.status != 1 ? true : false" hide-details class="mt-0" readonly></v-checkbox>
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-text>
        <table>
          <tbody>
            <tr>
              <td width="40%" rowspan="3" class="nowrap text-top">
                <b>Rekomendasi (diisi oleh LSP):</b> <br />
                Berdasarkan ketentuan persyaratan dasar, maka pemohon: <br />
                <b>Diterima/ Tidak diterima *)</b> sebagai peserta sertifikasi
                <br />
                * coret yang tidak sesuai
              </td>
              <th width="60%" colspan="2" align="start">Pemohon/ Kandidat :</th>
            </tr>
            <tr>
              <td class="nowrap text-top">Nama</td>
              <td>{{peserta.asesi.nama}}</td>
            </tr>
            <tr>
              <td class="nowrap text-top">Tanda tangan / Tanggal</td>
              <td></td>
            </tr>
            <tr>
              <th rowspan="4" align="start" class="nowrap text-top">Catatan :</th>
              <th colspan="2" align="start">Admin LSP :</th>
            </tr>
            <tr>
              <td class="nowrap text-top">Nama</td>
              <td>
              </td>
            </tr>
            <tr>
              <td class="nowrap text-top">No. Reg</td>
              <td></td>
            </tr>
            <tr>
              <td class="nowrap text-top">Tanda tangan / Tanggal</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
    </div>
  </v-container>
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