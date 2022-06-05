<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <template v-if="!state.skeleton">
          <v-card>
            <v-card-title primary-title>
              Halaman Peserta Ujian
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <tbody>
                  <tr>
                    <td width="20%"><b>Nama Peserta</b></td>
                    <td width="5%">:</td>
                    <td>{{ peserta_ujian.asesi.nama }}</td>
                  </tr>
                  <tr>
                    <td><b>NIK</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.asesi.nik }}</td>
                  </tr>
                  <tr>
                    <td><b>Telepon</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.asesi.telepon }}</td>
                  </tr>
                  <tr>
                    <td><b>Ujian yang diikuti</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.jadwalUjian.name }}</td>
                  </tr>
                  <tr>
                    <td><b>Kuota Pendaftar</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.jadwalUjian.kuota }}</td>
                  </tr>
                  <tr>
                    <td><b>Keterangan</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.jadwalUjian.keterangan }}</td>
                  </tr>
                  <tr>
                    <td><b>Tanggal Ujian</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.jadwalUjian.tanggal }}</td>
                  </tr>
                  <tr>
                    <td><b>Tempat Ujian</b></td>
                    <td>:</td>
                    <td>{{ peserta_ujian.jadwalUjian.tempat_ujian }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <v-card class="mt-5">
            <v-card-title primary-title>
              Syarat Peserta Ujian
            </v-card-title>
            <v-card-text>
              
            </v-card-text>
          </v-card>
        </template>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_PESERTAS_DETAIL, VERIFIKASI_FILEINPUT_MUTATION, EVALUASI_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { GET_UJIAN_DETAIL } from '@/constants/ujian'
import { VERIFIKASI_PESERTA_MUTATION, VERIFIKASI_ASESMEN_MANDIRI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'peserta-ujian',
  layout: 'App_admin',
  data() {
    return {
      show: 'informasi',
      syaratDialog: false,
      portofolioDialog: false,
      peserta_id: this.$route.params.id,
      headers: [
        { text: 'Syarat', value: 'syarat.syarat' },
        { text: 'File', value: 'file' },
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
      peserta_ujian: {},
      ujikompetensi: []
    }
  },  
  mounted() {
    this.getPesertaUjian()
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
          window.scrollTo(0,0)
          this.showAlert('success', 'Peserta berhasil diverifikasi')
          this.state.skeleton = true
          this.getpesertaDetails()
        }).catch(({graphQLErrors}) => {
          window.scrollTo(0,0)
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
        window.scrollTo(0,0)
        this.showAlert('success', 'Peserta berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        window.scrollTo(0,0)
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.syaratDialog = false
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
    async getPesertaUjian() {
      const id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: GET_UJIAN_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta_ujian = data.pesertaUjian
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
