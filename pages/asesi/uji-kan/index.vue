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
      <v-row>
        <div class="col-lg-6 col-xs-12">
          <v-card>
            <v-toolbar flat color="indigo">
              <v-card-title class="white--text">
                <v-icon class="white--text" color="orange lighten-2" left>brightness_5</v-icon>
                <span>
                  <h4>Pendaftaran Ujian KAN</h4>
                </span>
              </v-card-title>
            </v-toolbar>
            <div class="px-5">
              <v-card-text>
                Untuk dapat mengikuti Ujian Anda harus mendaftar uji dengan klik tombol <strong>Daftar Uji</strong>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" text right @click="gotoPage('/asesi/uji-kan/daftar')">Daftar Ujian</v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </div>
        <div class="col-lg-6 col-xs-12">
          <v-card>
            <v-toolbar flat color="indigo">
              <v-card-title class="white--text">
                <v-icon class="white--text" left color="orange lighten-2">check</v-icon>
                <span>
                  <h4>Sertifikasi yang sedang diikuti</h4>
                </span>
              </v-card-title>
            </v-toolbar>
            <div class="px-5">
              <v-skeleton-loader
                v-if="state.skeleton"
                ref="skeleton"
                type="table-thead, table-row-divider@3"
                class="mx-auto"
              >
              </v-skeleton-loader>
              <v-data-table
                v-if="!state.skeleton"
                :headers="headers"
                :items="items"
                :items-per-page="5"
                :line-numbers="true"
              >
                <template #item.jadwalUjian.name="{ item }">
                  <!-- <nuxt-link v-if="item.status == 1" :to="`/asesi/informasi-asesmen/${item.id}`"> -->
                  <nuxt-link :to="`/asesi/uji-kan/${item.id}`">
                    <span>{{ item.jadwalUjian.name }}</span>
                  </nuxt-link>
                  <!-- <span v-else>{{ item.jadwal.skema.skema }}</span> -->
                </template>
                <template #item.status="{ item }">
                  <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                  <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                  <v-chip v-if="item.status == 1" small color="blue lighten-1" dark>Disetujui</v-chip>
                  <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                </template>
              </v-data-table>
              <!-- <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" v-on:click="gotoPage('/asesi/asesmen-mandiri')" text right >Menuju Asesmen Mandiri</v-btn>
              </v-card-actions> -->
            </div>
          </v-card>
        </div>
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
        { text: 'Nama', value: 'jadwalUjian.name' },
        { text: 'Tempat Ujian', value: 'jadwalUjian.tempat_ujian' },
        { text: 'Tanggal Ujian', value: 'jadwalUjian.tanggal' },
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
        this.items = data.checkselfAsesi.pesertaUjian
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
