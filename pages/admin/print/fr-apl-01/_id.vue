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
  <div class="page-content-wrapper-inner fill-height">
    <v-card-title> FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI </v-card-title>
    <v-card-subtitle>
      <b>Bagian 1 : Rincian Data Pemohon Sertifikasi</b>
      Pada bagian ini, cantumkan data pribadi, data pendidikan formal serta data
      pekerjaan anda pada saat ini.
    </v-card-subtitle>
    <v-card-text>
      <table class="no-border">
        <tbody>
          <tr>
            <th rowspan="12" class="text-top nowrap">a.</th>
            <th colspan="10" align="start">Data Pribadi</th>
          </tr>
          <tr>
            <td class="nowrap text-top">Nama Lengkap</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">No. KTP/NIK/Paspor</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">Tempat / Tanggal Lahir</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">Jenis Kelamin</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">
              <span class="text-line">Laki-laki</span>
              /
              <span>Perempuan</span>
              *)
            </td>
          </tr>
          <tr>
            <td class="nowrap text-top">Kebangsaan</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td rowspan="2" class="nowrap text-top">Alamat Rumah</td>
            <td rowspan="2" class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td colspan="3">____________________</td>
            <td class="nowrap text-top">Kode Pos</td>
            <td class="nowrap text-top">:</td>
            <td>____________</td>
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
            <td>____________</td>
            <td class="nowrap text-top">E-mail</td>
            <td class="nowrap text-top">:</td>
            <td>____________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">Kualifikasi Pendidikan</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
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
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">Jabatan</td>
            <td class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td rowspan="2" class="nowrap text-top">Alamat Kantor</td>
            <td rowspan="2" class="nowrap text-top">:</td>
            <td colspan="7">___________________________________________</td>
          </tr>
          <tr>
            <td colspan="3">____________________</td>
            <td class="nowrap text-top">Kode Pos</td>
            <td class="nowrap text-top">:</td>
            <td>____________</td>
          </tr>
          <tr>
            <td rowspan="2" class="nowrap text-top">No. Telp / Fax / E-mail</td>
            <td rowspan="2" class="nowrap text-top">:</td>
            <td class="nowrap text-top">Telp</td>
            <td class="nowrap text-top">:</td>
            <td>____________</td>
            <td class="nowrap text-top">Fax</td>
            <td class="nowrap text-top">:</td>
            <td>____________</td>
          </tr>
          <tr>
            <td class="nowrap text-top">E-mail</td>
            <td class="nowrap text-top">:</td>
            <td colspan="4">___________________________________</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle>
      <b>Bagian 2 : Data Sertifikasi</b>
      Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar
      Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan
      pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta
      pengalaman kerja yang anda miliki.
    </v-card-subtitle>
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
            <td align="start">SS.LSPUPNVJT.FT.02.1</td>
          </tr>
          <tr>
            <td colspan="2" class="nowrap">Tujuan Asesmen</td>
            <td class="nowrap">:</td>
            <td>
              <v-checkbox label="Sertifikasi" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="4"></td>
            <td></td>
            <td>
              <v-checkbox label="Sertifikasi Ulang" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <v-checkbox
                label="Pengakuan Kompetensi Terkini (PKT)"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <v-checkbox
                label="Pengakuan Kompetensi Terkini (PKT)"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <v-checkbox label="Lainnya" readonly></v-checkbox>
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
            <th>Jenis Standar (Standar Khusus/Standar Internasional/SKKNI)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="nowrap text-top">1.</td>
            <td class="text-top">KKK.00.01.001.01</td>
            <td>Membantu pemenuhan perundangan K3 dan persyaratan lainnya</td>
            <td rowspan="2">
              KEPUTUSAN MENTERI TENAGA KERJA DAN TRANSMIGRASI REPUBLIK INDONESIA
              NOMOR : KEP. 42/MEN/III/2008 TENTANG PENETAPAN STANDAR KOMPETENSI
              KERJA NASIONAL INDONESIA SEKTOR KETENAGAKERJAAN BIDANG KESELAMATAN
              DAN KESEHATAN KERJA
            </td>
          </tr>
          <tr>
            <td class="nowrap text-top">2.</td>
            <td class="text-top">KKK.00.01.002.01</td>
            <td>Membantu penyelesaian masalah K3 di tempat kerja</td>
          </tr>
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
            <th colspan="2">Ada</th>
            <th rowspan="2">Tidak Ada</th>
          </tr>
          <tr class="with-bg">
            <th class="nowrap">Memenuhi Syarat</th>
            <th class="nowrap">Tidak Memenuhi Syarat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="nowrap text-top">1.</td>
            <td class="text-top">
              Kartu Mahasiswa/KHS Fakultas Teknik UPN “Veteran” Jawa Timur
            </td>
            <td align="center">
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td align="center">
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="nowrap text-top">2.</td>
            <td class="text-top">
              Sertifikat Pembekalan K3 dari UPNVJT/Surat Ket-erangan Kerja Ahli
              K3 Madya minimal 1 (satu) tahun dari Mitra UPN “Veteran” Jawa
              Timur
            </td>
            <td align="center">
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td align="center">
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
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
            <td rowspan="3" class="nowrap text-top">
              <b>Rekomendasi (diisi oleh LSP):</b> <br />
              Berdasarkan ketentuan persyaratan dasar, maka pemohon: <br />
              <b>Diterima/ Tidak diterima *)</b> sebagai peserta sertifikasi
              <br />
              * coret yang tidak sesuai
            </td>
            <th colspan="2" align="start">Pemohon/ Kandidat :</th>
          </tr>
          <tr>
            <td class="nowrap text-top">Nama</td>
            <td></td>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius id
              libero odit consequuntur maxime corrupti ipsa optio eveniet.
              Ratione suscipit dolores molestiae vero, optio tempora tempore
              officiis nihil ipsam amet.
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