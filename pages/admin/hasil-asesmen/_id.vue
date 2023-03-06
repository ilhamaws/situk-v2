<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-card>
          <v-card-title>
            <!-- <v-avatar size="30" color="warning lighten-2">
              <span class="white--text">APL.1</span>
            </v-avatar> -->
            <span class="font-weight-bold">FR.AK.02. FORMULIR REKAMAN ASESMEN KOMPETENSI</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text v-if="!state.skeleton">
            <div v-if="alert.show">
              <v-alert v-model="alert.show" :type="alert.type" dismissible class="mb-10">
                <div class="white--text">
                  {{ alert.message }}
                </div>
              </v-alert>
            </div>
            <v-list>
              <v-simple-table>
                <tbody>
                  <tr>
                    <td width="20%"><b>Nama:</b></td>
                    <td>{{ pesertas.asesi.nama }}</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Nama asesor:</b></td>
                    <td>{{ pesertas.asesor.nama }}</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Skema:</b></td>
                    <td>{{ pesertas.jadwal.skema.skema }}</td>
                  </tr>
                  <!-- <tr>
                    <td width="20%"><b>Unit kompetensi:</b></td>
                    <td>-</td>
                  </tr> -->
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
                    <td>
                      <v-radio-group v-model="pesertas.status" readonly row>
                        <v-radio :value="2" label="Direkomendasi Kompeten"></v-radio>
                        <v-radio :value="-2" label="Belum kompeten"></v-radio>
                      </v-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Tindak lanjut yang dibutuhkan:</b></td>
                    <td v-if="pesertas.tindak_lanjut != null">{{ pesertas.tindak_lanjut }}</td>
                    <td v-if="pesertas.tindak_lanjut == null">-</td>
                  </tr>
                  <tr>
                    <td width="20%"><b>Komentar/ Observasi oleh asesor:</b></td>
                    <td v-if="pesertas.komentar_observasi != null">{{ pesertas.komentar_observasi }}</td>
                    <td v-if="pesertas.komentar_observasi == null">-</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-list>
            <v-list>
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
                    <td width="20%"><b>{{ unit.unitKompetensi.unit }}</b></td>
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
              <v-row>
                <v-col class="d-flex justify-end mt-5">
                  <v-btn target="_blank" :href="`/admin/print/fr-ak-02/${pesertas.id}`" color="primary" outlined dark><v-icon left>print</v-icon>Print Dokumen</v-btn>
                </v-col>
              </v-row>
              <!-- <v-row>
                <v-col cols="12" class="d-flex justify-end pt-0">
                  <v-btn @click="rekamamAsesmenKompetensi" color="blue darken-3 mt-5 px-10" dark rounded>Simpan rekaman</v-btn>
                </v-col>
              </v-row> -->
            </v-list>
          </v-card-text>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, GET_PESERTAS_DETAIL, GET_UJIKOMPETENSI_DETAIL, OBSERVASI_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION, REKAM_ASESMEN_KOMPETENSI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_admin',
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
