<template>
  <body v-if="!state.skeleton">
    <h3>FR.APL.01. PERMOHONAN SERTIFIKASI KOMPETENSI</h3>
    <p><b>Bagian 1 : Rincian Data Pemohon Sertifikasi</b></p>
    Pada bagian ini, cantumkan data pribadi, data pendidikan formal serta data
    pekerjaan anda pada saat ini.
    <br /><br />
    <table class="table-form">
      <tr>
        <th rowspan="12" style="vertical-align: top">a.</th>
        <th colspan="10" align="start">Data Pribadi</th>
      </tr>
      <tr>
        <td>Nama Lengkap</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.nama }}</td>
      </tr>
      <tr>
        <td>No. KTP/NIK/Paspor</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.nik }}</td>
      </tr>
      <tr>
        <td>Tempat / Tanggal Lahir</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.tempat_lahir }} {{ peserta.asesi.tanggal_lahir }}</td>
      </tr>
      <tr>
        <td>Jenis Kelamin</td>
        <td>:</td>
        <td colspan="7">
          <span :style="peserta.asesi.jenis_kelamin == 'L' ? '' : 'text-decoration: line-through'">Laki-laki</span>
          /
          <span :style="peserta.asesi.jenis_kelamin == 'P' ? '' : 'text-decoration: line-through'">Perempuan</span>
          *)
        </td>
      </tr>
      <tr>
        <td>Kebangsaan</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.kebangsaan }}</td>
      </tr>
      <tr>
        <td rowspan="2" style="vertical-align: top">Alamat Rumah</td>
        <td rowspan="2" style="vertical-align: top">:</td>
        <td colspan="7">{{ peserta.asesi.alamat }}</td>
      </tr>
      <tr>
        <td colspan="3">____________________</td>
        <td>Kode Pos</td>
        <td>:</td>
        <td>{{ peserta.asesi.kodepos }}</td>
      </tr>
      <tr>
        <td rowspan="2" style="vertical-align: top">No. Telepon/E-mail</td>
        <td rowspan="2" style="vertical-align: top">:</td>
        <td>Rumah</td>
        <td>:</td>
        <td>____________</td>
        <td>Kantor</td>
        <td>:</td>
        <td>____________</td>
      </tr>
      <tr>
        <td>HP</td>
        <td>:</td>
        <td>{{ peserta.asesi.telepon }}</td>
        <td>E-mail</td>
        <td>:</td>
        <td>{{ peserta.asesi.user.email }}</td>
      </tr>
      <tr>
        <td>Kualifikasi Pendidikan</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.pendidikan.pendidikan }}</td>
      </tr>
      <tr>
        <td colspan="10" align="start">*Coret yang tidak perlu</td>
      </tr>
      <tr>
        <td></td>
      </tr>
      <tr>
        <th rowspan="7" style="vertical-align: top">b.</th>
        <th colspan="10" align="start">Data Pekerjaan Sekarang</th>
      </tr>
      <tr>
        <td>Nama Institusi / Perusahaan</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.lembaga.nama }}</td>
      </tr>
      <tr>
        <td>Jabatan</td>
        <td>:</td>
        <td colspan="7">{{ peserta.asesi.pekerjaan.pekerjaan }}</td>
      </tr>
      <tr>
        <td rowspan="2" style="vertical-align: top">Alamat Kantor</td>
        <td rowspan="2" style="vertical-align: top">:</td>
        <td colspan="7">{{ peserta.asesi.lembaga.alamat }}</td>
      </tr>
      <tr>
        <td colspan="3">____________________</td>
        <td>Kode Pos</td>
        <td>:</td>
        <td>{{ peserta.asesi.lembaga.kodepos }}</td>
      </tr>
      <tr>
        <td rowspan="2" style="vertical-align: top">No. Telp / Fax / E-mail</td>
        <td rowspan="2" style="vertical-align: top">:</td>
        <td>Telp</td>
        <td>:</td>
        <td>{{ peserta.asesi.lembaga.telepon }}</td>
        <td>Fax</td>
        <td>:</td>
        <td>____________</td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>:</td>
        <td colspan="4">{{ peserta.asesi.lembaga.email }}</td>
      </tr>
    </table>

    <p><b>Bagian 2 : Data Sertifikasi</b></p>
    Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar
    Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan
    pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta
    pengalaman kerja yang anda miliki.
    <br /><br />

    <table class="table-border">
      <tr>
        <td rowspan="2">
          Skema Sertifikasi
          <br />
          (KKNI/Okupasi/Klaster)
        </td>
        <td>Judul</td>
        <td>:</td>
        <th align="start">Ahli K3 Madya</th>
      </tr>
      <tr>
        <td>Nomor</td>
        <td>:</td>
        <td align="start">SS.LSPUPNVJT.FT.02.1</td>
      </tr>
      <tr>
        <td colspan="2">Tujuan Asesmen</td>
        <td>:</td>
        <td>
          <input
            type="checkbox"
            id="sertifikasi"
            name="sertifikasi"
            value="Sertifikasi"
            :checked="peserta.tujuan == 'Sertifikasi' ? true : false"
          />
          <label for="sertifikasi">Sertifikasi</label>
        </td>
      </tr>
      <tr>
        <td colspan="2" rowspan="4"></td>
        <td></td>
        <td>
          <input
            type="checkbox"
            id="sertifikasiUlang"
            name="sertifikasiUlang"
            value="Sertifikasi Ulang"
            :checked="peserta.tujuan == 'Sertifikasi ulang' ? true : false"
          />
          <label for="sertifikasiUlang">Sertifikasi Ulang</label>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input
            type="checkbox"
            id="pkt"
            name="pkt"
            value="Pengakuan Kompetensi Terkini"
            :checked="peserta.tujuan == 'PKT' ? true : false"
          />
          <label for="pkt">Pengakuan Kompetensi Terkini (PKT)</label>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input
            type="checkbox"
            id="rpl"
            name="rpl"
            value="Rekognisi Pembelajaran Lampau"
            :checked="peserta.tujuan == 'RPL' ? true : false"
          />
          <label for="rpl">Rekognisi Pembelajaran Lampau</label>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input 
            type="checkbox"
            id="lainnya"
            name="lainnya"
            value="Lainnya"
            :checked="peserta.tujuan == 'lainnya' ? true : false"
          />
          <label for="lainnya">Lainnya</label>
        </td>
      </tr>
    </table>

    <p><b>Daftar Unit Kompetensi sesuai kemasan:</b></p>

    <table class="table-border">
      <tr style="background-color: #fabf8f">
        <th>No.</th>
        <th>Kode Unit</th>
        <th>Judul Unit</th>
        <th>Jenis Standar (Standar Khusus/Standar Internasional/SKKNI)</th>
      </tr>
      <tr v-for="(unit, i) in peserta.ujiKompetensi" :key="i">
        <td>{{ i+1 }}.</td>
        <td>{{ unit.unitKompetensi.kode }}</td>
        <td>{{ unit.unitKompetensi.unit }}</td>
        <td v-if="i == 0" :rowspan="peserta.ujiKompetensi.length">
          KEPUTUSAN MENTERI TENAGA KERJA DAN TRANSMIGRASI REPUBLIK INDONESIA
          NOMOR : KEP. 42/MEN/III/2008 TENTANG PENETAPAN STANDAR KOMPETENSI
          KERJA NASIONAL INDONESIA SEKTOR KETENAGAKERJAAN BIDANG KESELAMATAN DAN
          KESEHATAN KERJA
        </td>
      </tr>
      <!-- <tr>
        <td>2.</td>
        <td>KKK.00.01.002.01</td>
        <td>Membantu penyelesaian masalah K3 di tempat kerja</td>
      </tr> -->
    </table>

    <p>
      <b>
        Bagian 3 : Bukti Kelengkapan Pemohon <br />
        Bukti Persyaratan Dasar Pemohon
      </b>
    </p>

    <table class="table-border">
      <tr style="background-color: #fabf8f">
        <th rowspan="2">No.</th>
        <th rowspan="2">Bukti Persyaratan Dasar</th>
        <th colspan="2">Ada</th>
        <th rowspan="2">Tidak Ada</th>
      </tr>
      <tr style="background-color: #fabf8f">
        <th>Memenuhi Syarat</th>
        <th>Tidak Memenuhi Syarat</th>
      </tr>
      <tr v-for="(syarat, i) in peserta.syaratPeserta" :key="i">
        <td>{{i+1}}.</td>
        <td>{{syarat.syarat.syarat}}</td>
        <td align="center">
          <input
            type="checkbox"
            id="memenuhi"
            name="memenuhi"
            value="memenuhi"
            :checked="syarat.status == 1"
          />
        </td>
        <td align="center">
          <input
            type="checkbox"
            id="tidakMemenuhi"
            name="tidakMemenuhi"
            value="tidakMemenuhi"
            :checked="syarat.status == -1"
          />
        </td>
        <td></td>
      </tr>
    </table>

    <br /><br />
    <table class="table-border">
      <tr>
        <td width="50%" rowspan="3">
          Rekomendasi (diisi oleh LSP): <br />
          Berdasarkan ketentuan persyaratan dasar, maka pemohon: <br />
          <b>Diterima/ Tidak diterima *)</b> sebagai peserta sertifikasi <br />
          * coret yang tidak sesuai
        </td>
        <th colspan="2" align="start">Pemohon/ Kandidat :</th>
      </tr>
      <tr>
        <td>Nama</td>
        <td>{{peserta.asesi.nama}}</td>
      </tr>
      <tr>
        <td>Tanda tangan / Tanggal</td>
        <td>
          <img style="max-height: 160px" :src="peserta.asesi.ttd" alt="">
        </td>
      </tr>
      <tr>
        <th rowspan="4" align="start" style="vertical-align: top">Catatan :</th>
        <th colspan="2" align="start">Admin LSP :</th>
      </tr>
      <tr>
        <td width="25%">Nama</td>
        <td width="25%"></td>
      </tr>
      <tr>
        <td>No. Reg</td>
        <td></td>
      </tr>
      <tr>
        <td>Tanda tangan / Tanggal</td>
        <td></td>
      </tr>
    </table>
  </body>
</template>

<style>
  .table-border,
  .table-border th,
  .table-border td {
    border: 1px solid black;
    border-collapse: collapse;
  }

  .table-border th,
  .table-border td {
    padding: 10px;
  }

  .table-form th,
  .table-form td {
    padding: 5px;
  }

  .table-border {
    width: 100%;
  }
</style>

<script>
import { ASESMEN_MANDIRI_MUTATION, OBSERVASI_MUTATION, GET_REPORT_DETAIL } from '@/constants/graphql'

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
<style lang="css" scoped>
  *, *::before, *::after {
    box-sizing: content-box;
  }
</style>
