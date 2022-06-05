<template>
  <v-layout>
    <v-container fluid>
      <v-alert
        class="px-10"
        border="left"
        colored-border
        color="orange lighten-2"
        elevation="2"
      >
        <h3 class="mt-0"><strong>Selamat Datang</strong></h3>
        Hai <strong>{{ profile.username }}</strong>, selamat datang di halaman LSP TIFA Assesmen Online. Silahkan klik menu untuk mengelola website.
      </v-alert>
      <v-row class="pt-5">
        <v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
					<v-card to="/asesi/uji-sertifikasi/" link dark color="primary" class="rounded-lg">
						<v-card-title>
							<p class="ma-0">Uji Sertifikasi (BNSP)</p>
							</v-card-title>
							<v-card-subtitle>
							Daftar uji kompetensi standar BNSP
							</v-card-subtitle>
							<v-card-text class="d-flex justify-end align-center">
							<v-icon size="80">group</v-icon>
						</v-card-text>
					</v-card>
        </v-col>
				<v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
					<v-card to="/asesi/" link dark color="primary" class="rounded-lg">
						<v-card-title>
							<p class="ma-0">Uji Sertifikasi (KAN)</p>
							</v-card-title>
							<v-card-subtitle>
							Daftar uji kompetensi standar KAN
							</v-card-subtitle>
							<v-card-text class="d-flex justify-end align-center">
							<v-icon size="80">person</v-icon>
						</v-card-text>
					</v-card>
        </v-col>
				<v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
					<v-card to="/asesi/uji-kan" disabled link dark color="primary" class="rounded-lg">
						<v-card-title>
							<p class="ma-0">Pelatihan</p>
							</v-card-title>
							<v-card-subtitle>
							Daftar pelatihan untuk berbagai bidang keahlian
							</v-card-subtitle>
							<v-card-text class="d-flex justify-end align-center">
							<v-icon size="80">assignment</v-icon>
						</v-card-text>
					</v-card>
        </v-col>
				<v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
					<v-card disabled link dark color="primary" class="rounded-lg">
						<v-card-title>
							<p class="ma-0">Alumni</p>
							</v-card-title>
							<v-card-subtitle>
							Histori alumni pelatihan
							</v-card-subtitle>
							<v-card-text class="d-flex justify-end align-center">
							<v-icon size="80">assignment_ind</v-icon>
						</v-card-text>
					</v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
<script>
import { GET_SELF_ASESI } from '@/constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      state: {
        skeleton: true
      },
      headers: [
        { text: 'Skema', value: 'jadwal.skema.skema' },
        { text: 'TUK', value: 'jadwal.tempatUk.nama' },
        { text: 'Tanggal Asesmen', value: 'jadwal.tanggal' },
        { text: 'Status', value: 'status' },
      ],
      profile: {
        username: ''
      },
      items: [
      ]
    }
  },
  created() {
    this.getReport()
  },
  methods: {
    async getReport() {
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        this.items = data.checkselfAsesi.peserta
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    checkAsesiData() {
      this.profile.username = localStorage.getItem('lsp-username')
    },
    gotoPage(page) {
      this.$router.push(page)
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
