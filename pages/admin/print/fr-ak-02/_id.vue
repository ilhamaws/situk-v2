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
  <div class="page-content-wrapper-inner fill-height">
    <v-card-title>FR.AK.02. FORMULIR REKAMAN ASESMEN KOMPETENSI</v-card-title>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th align="start" class="text-top">Nama Asesi</th>
            <td align="start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
              impedit nostrum neque tempora, reiciendis natus blanditiis,
              facilis iusto, eius autem quae aperiam sed ea quo libero dicta
              doloribus harum enim.
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Nama Asesor</th>
            <td align="start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
              impedit nostrum neque tempora, reiciendis natus blanditiis,
              facilis iusto, eius autem quae aperiam sed ea quo libero dicta
              doloribus harum enim.
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">
              Skema sertifikasi (bila tersedia)
            </th>
            <td align="start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
              impedit nostrum neque tempora, reiciendis natus blanditiis,
              facilis iusto, eius autem quae aperiam sed ea quo libero dicta
              doloribus harum enim.
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Unit Kompetensi</th>
            <td>
              <table class="table-nested">
                <tr>
                  <td class="nowrap text-top" style="padding-right: 10px">
                    1.
                  </td>
                  <td>
                    KKK.00.02.001.01 Memberikan Konstribusi dalam Penerapan
                    Sistem Manajemen K3
                  </td>
                </tr>
                <tr>
                  <td class="nowrap text-top" style="padding-right: 10px">
                    2.
                  </td>
                  <td>
                    KKK.00.02.002.01 Memberikan Kontribusi untuk implementasi
                    proses konsultasi K3
                  </td>
                </tr>
                <tr>
                  <td class="nowrap text-top" style="padding-right: 10px">
                    3.
                  </td>
                  <td>
                    KKK.00.02.003.01 Melakukan dentifikasi bahaya dan risiko K3
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Tanggal mulainya asesmen</th>
            <td align="start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
              impedit nostrum neque tempora, reiciendis natus blanditiis,
              facilis iusto, eius autem quae aperiam sed ea quo libero dicta
              doloribus harum enim.
            </td>
          </tr>
          <tr>
            <th align="start" class="text-top">Tanggal selesainya asesmen</th>
            <td align="start">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
              impedit nostrum neque tempora, reiciendis natus blanditiis,
              facilis iusto, eius autem quae aperiam sed ea quo libero dicta
              doloribus harum enim.
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle>
      Beri tanda centang (&#10004;) di kolom yang sesuai untuk mencerminkan
      bukti yang diperoleh untuk menentukan Kompetensi asesi untuk setiap Unit
      Kompetensi.
    </v-card-subtitle>
    <v-card-text>
      <table>
        <thead>
          <tr class="with-bg">
            <th>Unit Kompetensi</th>
            <th>Observasi Demonstrasi</th>
            <th>Portofolio</th>
            <th>Pernyataan Pihak Ketiga Pertanyaan Wawancara</th>
            <th>Pertanyaan Lisan</th>
            <th>Pertanyaan Tertulis</th>
            <th>Proyek Kerja</th>
            <th>Lainnya</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              KKK.00.02.004.01
              <br />
              Memberikan Dukungan Terhadap Pelaksanaan Strategi Pengendalian
              Resiko K3
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly v-model="valid"></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly v-model="valid"></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly v-model="valid"></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox></v-checkbox>
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Velit impedit nostrum neque tempora, reiciendis natus
                      blanditiis, facilis iusto, eius autem quae aperiam sed ea
                      quo libero dicta doloribus harum enim.
                    </td>
                  </tr>
                  <tr class="text-top">
                    <td class="nowarp no-border-left" align="start">
                      <b> Tindak lanjut yang dibutuhkan </b> <br />
                      (Masukkan pekerjaan tambahan dan asesmen yang diperlukan
                      untuk mencapai kompetensi)
                    </td>
                    <td class="no-border-right">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Velit impedit nostrum neque tempora, reiciendis natus
                      blanditiis, facilis iusto, eius autem quae aperiam sed ea
                      quo libero dicta doloribus harum enim.
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Velit impedit nostrum neque tempora, reiciendis natus
                      blanditiis, facilis iusto, eius autem quae aperiam sed ea
                      quo libero dicta doloribus harum enim.
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
                      <div
                        style="
                          width: 150px;
                          height: 150px;
                          background-color: aquamarine;
                        "
                      ></div>
                    </td>
                    <th class="nowrap no-border-top" align="start">
                      Tanggal :
                    </th>
                    <td class="no-border-top no-border-right">
                      Lorem ipsum dolor si amet
                    </td>
                  </tr>
                  <tr class="text-top">
                    <th
                      class="nowrap no-border-bottom no-border-left"
                      align="start"
                    >
                      Tanda tangan asesor :
                    </th>
                    <td class="no-border-bottom"></td>
                    <th class="nowrap no-border-bottom" align="start">
                      Tanggal :
                    </th>
                    <td class="no-border-bottom no-border-right"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </div>
</template>

<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION, REKAM_ASESMEN_KOMPETENSI_MUTATION } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App',
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
