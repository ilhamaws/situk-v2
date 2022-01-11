<style>
table {
  border-collapse: collapse;
}

/* table, th, td {
  border: 1px solid black !important;
} */

.data-pribadi.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:last-child, .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:last-child {
    border-bottom: none !important;
}

.data-pribadi.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: none !important;
}

.table-border.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:last-child, .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > th:last-child {
    border: 1px solid black !important;
}

.table-border.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > th:not(.v-data-table__mobile-row) {
    border: 1px solid black !important;
}

.table-noborder  {
    border-bottom: none;
}

.v-card__title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.0125em;
    line-height: 2rem;
    word-break: break-all;
}

.card__text {
    padding-top: 0;
    font-size: 11px !important;
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
          <v-card flat>
            <v-card-title>
              FR.AI.01. Ceklis Observasi Untuk Aktivitas di Tempat Kerja Simulasi
            </v-card-title>
            <v-card-title class="pt-1 pb-0">
              Bagian 1 :  Rincian Data Pemohon Sertifikasi
            </v-card-title>
            <v-card-text>
              <span>Pada bagian ini,  cantumlan data pribadi, data pendidikan formal serta data pekerjaan anda pada saat ini.</span>
              <v-card-title class="pa-0">a. Data Pribadi</v-card-title>
              <v-list v-if="ujikompetensi != null">
                <v-simple-table dense class="data-pribadi">
                  <tbody>
                    <tr>
                      <td width="20%">Nama Lengkap</td>
                      <td width="20px">:</td>
                      <td colspan="4" class="text-capitalize"> 
                        {{ ujikompetensi.asesi.nama }}
                      </td>
                    </tr>
                    <tr>
                      <td width="20%">No. KTP/NIK/Paspor</td>
                      <td width="20px">:</td>
                      <td colspan="4">
                        {{ ujikompetensi.asesi.nik }}
                      </td>
                    </tr>
                    <tr>
                      <td width="20%">Tempat / tgl. Lahir</td>
                      <td width="20px">:</td>
                      <td colspan="4">
                        <span class="text-capitalize">{{ ujikompetensi.asesi.tempat_lahir }}</span>, 
                        {{ ujikompetensi.asesi.tanggal_lahir }}
                      </td>
                    </tr>
                    <tr>
                      <td width="20%">Jenis kelamin</td>
                      <td width="20px">:</td>
                      <td v-if="ujikompetensi.asesi.jenis_kelamin == 'L'" colspan="4">
                        Laki-Laki / <del>Wanita</del>
                      </td>
                      <td v-if="ujikompetensi.asesi.jenis_kelamin == 'P'" colspan="4">
                        Laki-Laki / <del>Wanita</del>
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2" width="20%">Alamat rumah</td>
                      <td rowspan="2">:</td>
                      <td colspan="4">
                        {{ ujikompetensi.asesi.alamat }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td width="150">
                        <div class="d-flex justify-space-between">
                          <span>Kodepos</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td>{{ ujikompetensi.asesi.kodepos }}</td>
                    </tr>
                    <tr>
                      <td rowspan="2" width="20%">No. Telepon/E-mail</td>
                      <td rowspan="2">:</td>
                      <td width="100">
                        <div class="d-flex justify-space-between">
                          <span>Rumah</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td></td>
                      <td width="150">
                        <div class="d-flex justify-space-between">
                          <span>Kantor</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td width="100">
                        <div class="d-flex justify-space-between">
                          <span>HP</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td>{{ ujikompetensi.asesi.telepon }}</td>
                      <td width="150">
                        <div class="d-flex justify-space-between">
                          <span>E-mail</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td>{{ ujikompetensi.asesi.user.email }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>            
              </v-list>
              <v-card-title class="pa-0">b. Data Pekerjaan Sekarang</v-card-title>
              <v-list v-if="ujikompetensi != null">
                <v-simple-table dense class="data-pribadi">
                  <tbody>
                    <tr>
                      <td width="20%">Nama Institusi / Perusahaan </td>
                      <td width="20px">:</td>
                      <td colspan="4"> 
                        {{ ujikompetensi.asesi.lembaga.nama }}
                      </td>
                    </tr>
                    <tr>
                      <td width="20%">Jabatan </td>
                      <td width="20px">:</td>
                      <td>
                        {{ ujikompetensi.asesi.pekerjaan.pekerjaan }}
                      </td>
                    </tr>
                    <tr>
                      <td width="20%">No. Telp/Fax/E-mail</td>
                      <td width="20px">:</td>
                      <td colspan="4">
                        {{ ujikompetensi.asesi.lembaga.telepon }}
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2" width="20%">Alamat Kantor </td>
                      <td rowspan="2">:</td>
                      <td colspan="4">
                        {{ ujikompetensi.asesi.lembaga.alamat }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td width="120">
                        <div class="d-flex justify-space-between">
                          <span>Kodepos</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td>
                        {{ ujikompetensi.asesi.lembaga.kodepos }}
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="2" width="20%">No. Telp/Fax/E-mail</td>
                      <td rowspan="2">:</td>
                      <td width="100">
                        <div class="d-flex justify-space-between">
                          <span>Telp</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td></td>
                      <td width="150">
                        <div class="d-flex justify-space-between">
                          <span>Fax</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td width="150">
                        <div class="d-flex justify-space-between">
                          <span>E-mail</span>
                          <span>:</span>
                        </div>
                      </td>
                      <td colspan="3">{{ ujikompetensi.asesi.user.email }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>            
              </v-list>
              <v-card-title class="pa-0">Bagian  2 :  Data Sertifikasi</v-card-title>
              <span>Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda miliki.</span>
              <v-list v-if="ujikompetensi != null">
                <v-simple-table class="table-border">
                  <tbody>
                    <tr>
                      <td rowspan="2" width="20%">Skema Sertifikasi   (KKNI/Okupasi/Klaster) </td>
                      <td width="10%">Judul</td>
                      <td width="50">:</td>
                      <td>
                        {{ ujikompetensi.jadwal.skema.skema }}
                      </td>
                    </tr>
                    <tr>
                      <td>Nomor</td>
                      <td>:</td>
                      <td>
                        {{ ujikompetensi.jadwal.skema.kode }}
                      </td>
                    </tr>
                    <tr>
                      <td rowspan="5" colspan="2" width="20%">
                        <div class="d-flex align-start fill-height pt-5">
                          <span>Tujuan Asesmen</span>
                        </div>
                      </td>
                      <td>:</td>
                      <td>
                        <v-checkbox v-model="ujikompetensi.tujuan" hide-details class="my-1" readonly label="Sertifikasi" value="Sertifikasi"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>:</td>
                      <td>
                        <v-checkbox v-model="ujikompetensi.tujuan" hide-details class="my-1" readonly label="Sertifikasi Ulang" value="Sertifikasi ulang"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>:</td>
                      <td>
                        <v-checkbox v-model="ujikompetensi.tujuan" hide-details class="my-1" readonly label="Pengakuan Kompetensi Terkini (PKT)" value="PKT"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>:</td>
                      <td>
                        <v-checkbox v-model="ujikompetensi.tujuan" hide-details class="my-1" readonly label="Rekognisi Pembelajaran Lampau" value="RPL"></v-checkbox>
                      </td>
                    </tr>
                    <tr>
                      <td>:</td>
                      <td>
                        <v-checkbox v-model="ujikompetensi.tujuan" hide-details class="my-1" readonly label="Lainnya" value="Lainnya"></v-checkbox>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>            
              </v-list>
              <v-card-title class="pa-0">Daftar Unit Kompetensi sesuai kemasan: </v-card-title>
              <v-list v-if="ujikompetensi != null">
                <v-simple-table dense class="table-border">
                  <tbody>
                    <tr>
                      <th class="text-center" width="5%">No.</th>
                      <th class="text-center">Kode Unit</th>
                      <th class="text-center">Judul Unit</th>
                      <th width="20%">Jenis Standar (Standar Khusus/Standar Internasional/SKKNI)</th>
                    </tr>
                    <tr v-for="(unit, index) in ujikompetensi.jadwal.skema.unitKompetensi" :key="unit.id">
                      <td class="text-center">{{ index+1 }}</td>
                      <td>{{ unit.kode }}</td>
                      <td>{{ unit.unit }}</td>
                      <td>{{ unit.standar.standar }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>            
              </v-list>
              <div v-if="ujikompetensi != null" class="pt-5">
                <v-card-title class="pa-0">
                  Bagian  3  :  Bukti Kelengkapan Pemohon <br>
                  Bukti Persyaratan Dasar Pemohon
                </v-card-title>
                <v-list>
                  <v-simple-table dense class="table-border">
                    <template #default>
                      <tbody>
                        <tr>
                          <th class="text-center" rowspan="2" width="10%">No</th>
                          <th class="text-center" rowspan="2" width="40%">Bukti Persyaratan Dasar</th>
                          <th class="text-center" colspan="2">Ada</th>
                          <th rowspan="2" width="20%" class="text-center">Tidak Ada</th>
                        </tr>
                        <tr>
                          <th width="10%" class="text-center">Memenuhi Syarat</th>
                          <th width="10%" class="text-center">Tidak Memenuhi Syarat </th>
                        </tr>
                        <tr v-for="(syarat, index) in ujikompetensi.syaratPeserta" :key="syarat.id">
                          <td class="text-center">{{ index+1 }}</td>
                          <td>{{ syarat.syarat.syarat }}</td>
                          <td>
                            <div class="d-flex justify-center">
                              <v-checkbox v-model="ujikompetensi.syaratPeserta[index].status" hide-details class="my-1" readonly :value="1"></v-checkbox>
                            </div>
                          </td>
                          <td>
                            <div class="d-flex justify-center">
                              <v-checkbox v-model="ujikompetensi.syaratPeserta[index].status" hide-details class="my-1" readonly :value="-1"></v-checkbox>
                            </div>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-list>
              </div>
              <div v-if="ujikompetensi != null" class="pt-5">
                <v-list>
                  <v-simple-table dense class="table-border">
                    <template #default>
                      <tbody>
                        <tr>
                          <td style="vertical-align: top; text-align: left;" class="pt-3" width="50%" rowspan="3">
                            <b>Rekomendasi (diisi oleh LSP):</b><br>
                            Berdasarkan ketentuan persyaratan dasar, maka pemohon: <br>
                            <b>(Diterima/ Tidak diterima *)</b> sebagai peserta  sertifikasi <br>
                            *Coret yang tidak sesuai
                          </td>
                          <td width="30%" colspan="2"><b>Pemohon/ Kandidat :</b></td>
                        </tr>
                        <tr>
                          <td>Nama</td>
                          <td width="180"></td>
                        </tr>
                        <tr>
                          <td>Tanda tangan/ <br> Tanggal <br><br><br><br></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td style="vertical-align: top; text-align: left;" class="pt-3" width="50%" rowspan="4">
                            <b>Catatan:</b>
                          </td>
                          <td width="30%" colspan="2"><b>Admin LSP :</b></td>
                        </tr>
                        <tr>
                          <td>Nama</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>No. Reg</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Tanda tangan/ <br> Tanggal <br><br><br><br></td>
                          <td></td>
                        </tr>
                        <!-- <tr>
                            <td></td>
                            <td colspan="5" width="20">Kriteria Unjuk Kerja :</td>
                        </tr> -->
                        <!-- <tr v-for="(kuk, kukIndex) in ujikompetensi.asesmen" :key="kuk.id">
                            <td width="5%">{{kukIndex+1}}</td>
                            <td>{{ kuk.kriteriaUk.kriteria}}</td>
                            <td class="text-center">
                            <v-radio-group v-model="ujikompetensi.asesmen[kukIndex].observasi">
                                <v-radio class="justify-center" :value = "1"></v-radio>
                            </v-radio-group>
                            </td>
                            <td class="text-center">
                            <v-radio-group v-model="ujikompetensi.asesmen[kukIndex].observasi">
                                <v-radio class="justify-center" :value = "-1"></v-radio>
                            </v-radio-group>
                            </td>
                            <td>
                            <v-text-field
                                class="mt-5"
                                v-model="ujikompetensi.asesmen[kukIndex].penelitian_lanjut"
                                label="penelitian lanjut"
                                type="text"
                                solo
                            />
                            </td>
                        </tr> -->
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-list>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { ASESMEN_MANDIRI_MUTATION, OBSERVASI_MUTATION } from '@/constants/graphql'

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
<style lang="scss" scoped>
</style>
