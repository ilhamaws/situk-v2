<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <div v-if="!state.skeleton">
          <v-row>
            <!-- <div class="col-md-4 col-xs-12 pt-0">
              <v-card>
                <div class="d-flex flex-no-wrap">
                  <v-avatar
                    class="ml-5 mt-5"
                    size="125"
                    style="border-radius: .42rem;"
                    tile
                  >
                    <v-img :src="pesertas.asesi.image"></v-img>
                  </v-avatar>
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="pesertas.asesi.nama"
                    ></v-card-title>
                    <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                    <v-card-actions>
                      <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                      <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                      <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                      <v-btn v-if="pesertas.status == 2" text color="success">Lulus Sertifikasi</v-btn>
                    </v-card-actions>
                  </div>
                </div>
                <v-card-text class="px-5">
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="20%"><b>Nama:</b></td>
                        <td>{{ pesertas.asesi.nama }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Skema:</b></td>
                        <td>{{ pesertas.jadwal.skema.skema }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Tanggal:</b></td>
                        <td>{{ pesertas.jadwal.tanggal }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Tempat Uji Kompetensi:</b></td>
                        <td>{{ pesertas.jadwal.tempatUk.nama }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
                <v-card-actions v-if="pesertas.status == 2 || pesertas.status == -2" class="d-flex justify-center pb-8 pt-0">
                  <nuxt-link :to="`/admin/hasil-asesmen/${pesertas.id}`">
                    <v-btn color="success" rounded>Lihat Hasil Sertifikasi</v-btn>
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </div> -->
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12" class="pt-0">
                  <v-card>
                    <v-card-title class="px-8 ">
                      <span class="font-weight-bold">FR-APL-01. Formulir Permohonan Sertifikasi Kompetensi</span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="px-5">
                      <v-alert type="primary" text dense>
                        Data Pribadi
                      </v-alert>
                      <v-simple-table class="mb-5">
                        <tbody>
                          <tr>
                            <td width="30%"><b>Nama lengkap:</b></td>
                            <td colspan="5">{{ pesertas.asesi.nama }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>NIK:</b></td>
                            <td colspan="5">{{ pesertas.asesi.nik }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Tempat/ tgl. lahir:</b></td>
                            <td colspan="5">{{ pesertas.asesi.tempat_lahir }}, {{ pesertas.asesi.tanggal_lahir }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Jenis kelamin:</b></td>
                            <td v-if="pesertas.asesi.jenis_kelamin == 'L'" colspan="5">Laki-laki</td>
                            <td v-if="pesertas.asesi.jenis_kelamin == 'P'" colspan="5">Perempuan</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Alamat rumah:</b></td>
                            <td colspan="5">{{ pesertas.asesi.alamat }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Kota:</b></td>
                            <td colspan="5">{{ pesertas.asesi.kota.kota }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Provinsi:</b></td>
                            <td colspan="5">{{ pesertas.asesi.kota.provinsi.provinsi }}</td>
                          </tr>
                          <tr>
                            <td colspan="2"></td>
                            <td width="10%"><b>Kodepos:</b></td>
                            <td colspan="2">{{ pesertas.asesi.kodepos }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>No Telepon:</b></td>
                            <td>{{ pesertas.asesi.telepon }}</td>
                            <td width="10%"><b>Email:</b></td>
                            <td colspan="2">{{ pesertas.asesi.user.email }}</td>
                          </tr>
                          <tr>
                            <td width="30%"><b>Pendidikan terakhir:</b></td>
                            <td colspan="">{{ pesertas.asesi.pendidikan.pendidikan }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-alert type="primary" text dense>
                        Data Pekerjaan
                      </v-alert>
                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td width="30%"><b>Nama lembaga/ Perusahaan:</b></td>
                            <td>{{ pesertas.asesi.lembaga.nama }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>Alamat:</b></td>
                            <td>{{ pesertas.asesi.lembaga.alamat }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>Kodepos:</b></td>
                            <td>{{ pesertas.asesi.lembaga.kodepos }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>No Telpon:</b></td>
                            <td>{{ pesertas.asesi.lembaga.telepon }}</td>
                          </tr>
                          <tr>
                            <td width="20%"><b>Email:</b></td>
                            <td>{{ pesertas.asesi.lembaga.email }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-row v-if="pesertas.status != 0">
                        <v-col class="d-flex justify-end">
                          <v-btn :to="`/admin/print/fr-apl-01/${pesertas.id}`" color="primary" outlined dark><v-icon left>print</v-icon>Cetak APL 1</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="4" class="pt-0">
              <v-card>
                <div class="d-flex flex-no-wrap">
                  <v-avatar
                    class="mx-auto mt-10"
                    size="125"
                    circle
                  >
                    <v-img :src="pesertas.asesi.image"></v-img>
                  </v-avatar>
                  <!-- <div>
                    <v-card-title
                      class="headline"
                      v-text="pesertas.asesi.nama"
                    ></v-card-title>
                    <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                    <v-card-actions>
                      <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                      <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                      <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                      <v-btn v-if="pesertas.status == 2" text color="success">Lulus Sertifikasi</v-btn>
                    </v-card-actions>
                  </div> -->
                </div>
                <div class="d-flex flex-no-wrap mt-5">
                  <v-chip class="mx-auto" v-if="pesertas.status == -1" text small color="danger">Ditolak</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 0" text small color="grey">Belum</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 1" text small color="primary">Disetujui</v-chip>
                  <v-chip class="mx-auto" v-if="pesertas.status == 2" text small color="success">Lulus Sertifikasi</v-chip>
                </div>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="px-5">
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="20%"><b>Nama:</b></td>
                        <td>{{ pesertas.asesi.nama }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Skema:</b></td>
                        <td>{{ pesertas.jadwal.skema.skema }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Tanggal:</b></td>
                        <td>{{ pesertas.jadwal.tanggal }}</td>
                      </tr>
                      <tr>
                        <td width="10%"><b>Asesor:</b></td>
                        <td v-if="pesertas.asesor != null">{{ pesertas.asesor.nama }}</td>
                        <td v-if="pesertas.asesor == null">Belum Ditentukan</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
                <!-- <v-card-actions v-if="pesertas.status == 2 || pesertas.status == -2" class="d-flex justify-center pb-8 pt-0">
                  <nuxt-link :to="`/admin/hasil-asesmen/${pesertas.id}`">
                    <v-btn color="success" rounded>Lihat Hasil Sertifikasi</v-btn>
                  </nuxt-link>
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_PESERTAS_DETAIL, VERIFIKASI_FILEINPUT_MUTATION, EVALUASI_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { VERIFIKASI_PESERTA_MUTATION, VERIFIKASI_ASESMEN_MANDIRI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'DetailPeserta',
  layout: 'App_admin',
  data() {
    return {
      show: 'informasi',
      syaratDialog: false,
      portofolioDialog: false,
      peserta_id: this.$route.params.id,
      headers: [
        { text: 'Syarat', value: 'syarat' },
        { text: 'Status', value: 'status', width: '20%' },
        { text: 'Aksi', value: 'actions', width: '30%' },
      ],
      portofoliosHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Valid', value: 'valid' },
        { text: 'Memadai', value: 'memadai' },
        { text: 'Keaslian', value: 'asli' },
        { text: 'terkini', value: 'terkini' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      editDialog: false,
      items: [
        { title: 'Informasi Profil' , icon: 'person', show: 'informasi'},
        { title: 'Asesmen Mandiri' , icon: 'lock', show: 'asesmen-mandiri'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      input: [],
      disabledMenu: true,
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
      state: {
        loading: false,
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      rules: [
        value => !value || value.size < 1000000 || 'Ukuran gambar harus kurang dari 1 MB!',
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      verifiedSyarat: {},
      verifiedPortofolio: {},
      gender: [
        {
          kode: "L",
          jk: "Laki-laki"
        },
        {
          kode: "P",
          jk: "Perempuan"
        }
      ],
      pesertas: {
        asesi: {
          image: null
        }
      },
      ujikompetensi: []
    }
  },  
  async mounted() {
    await this.getpesertaDetails()
  },
  methods: {
    editItem(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedSyarat = Object.assign({}, item)
      this.syaratDialog = true
    },
    editItemPortofolio(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedPortofolio = Object.assign({}, item)
      this.portofolioDialog = true
    },
    //  get peserta
    async verifikasiPeserta() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        this.alert.show = false
        const { input: {id, status} } = this.$data
        const note = this.pesertas.note_apl1
        const result = await this.$apollo.mutate({
          mutation: VERIFIKASI_PESERTA_MUTATION,
          variables: {
            id, status, note
          }
        }).then(({ data }) => {
          // this.showAlert('success', 'Peserta berhasil diverifikasi');
          this.state.skeleton = true
          this.getpesertaDetails()
        }).catch(({graphQLErrors}) => {
          console.log(graphQLErrors)
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    async verifikasiSyarat() {
      this.alert.show = false
      const { verifiedSyarat: {id} } = this.$data
      const status = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_FILEINPUT_MUTATION,
        variables: {
          id, status
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Peserta berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async verifikasiPortofolio() {
      this.alert.show = false
      const { verifiedPortofolio: {id, valid, memadai, asli, terkini} } = this.$data
      const hasil = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: EVALUASI_PORTOFOLIO_MUTATION,
        variables: {
          id, valid, memadai, asli, terkini
        }
      }).then(({ data }) => {
        // this.showAlert('success', 'Peserta berhasil diverifikasi');
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.portofolioDialog = false
      })
    },
    async getpesertaDetails() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        if (data.peserta.status == 2 || data.peserta.status == -2) {
          this.disabledMenu = false
        }
        this.pesertas = data.peserta
        this.input = {...this.pesertas}
        this.ujikompetensi = data.peserta.ujiKompetensi
        console.log(data.peserta)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async verifikasiAsesmenMandiri(ujiIndex) {
      console.log(this.ujikompetensi[ujiIndex].asesmen.length)
      const asesmenData = this.ujikompetensi[ujiIndex].asesmen
      const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id
      let rekomendasi_am = this.ujikompetensi[ujiIndex].rekomendasi_am
      if (rekomendasi_am === undefined) {
        rekomendasi_am = null
      }
      const asesmen = []
      for (let indexAsesmen = 0; indexAsesmen < asesmenData.length; indexAsesmen++) {
        const element = Object.assign({}, {asesmen_mandiri: asesmenData[indexAsesmen].asesmen_mandiri, kuk_id: asesmenData[indexAsesmen].kriteriaUk.id})
        // console.log(element);
        // const element = this.ujikompetensi[ujiIndex].asesmen[indexAsesmen].kriteriaUk.id;
        asesmen.push(element)
      }
      console.log(rekomendasi_am)
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_ASESMEN_MANDIRI_MUTATION,
        variables: {
          uji_kompetensi_id, rekomendasi_am, asesmen
        }
      }).then(({ data }) => {
        this.showAlert('success', 'peserta berhasil diverifikasi')
        console.log(data)
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
