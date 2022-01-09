<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-flex xs12>
          <v-alert
            class="px-10"
            border="left"
            colored-border
            color="primary accent-4"
            elevation="2"
          >
          <h3 class="mt-0"><strong>Selamat Datang</strong></h3>
          Hai <strong>{{ this.profile.username }}</strong>, selamat datang di halaman LSP TIFA Assesmen Online. Silahkan klik menu untuk mengelola website.
          </v-alert>
          <v-row>
          <div class="col-lg-6 col-xs-12">
            <v-card>
              <v-toolbar flat style="background: rgb(7, 71, 166);">
                <v-card-title class="white--text">
                  <v-icon class="white--text" left>brightness_5</v-icon>
                  <span>
                    <h4>Pendaftaran Asesmen</h4>
                  </span>
                </v-card-title>
              </v-toolbar>
              <div class="px-5">
                <v-card-text>
                  Untuk dapat mengikuti Uji Kompetensi LSP TIFA Anda harus mendaftar uji dengan klik tombol <strong>Daftar Uji</strong>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="orange" v-on:click="gotoPage('/daftar-asesmen')" text right >Daftar Uji</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </div>
          <div class="col-lg-6 col-xs-12">
            <v-card>
              <v-toolbar flat style="background: rgb(7, 71, 166);">
                <v-card-title class="white--text">
                  <v-icon class="white--text" left>check</v-icon>
                  <span>
                    <h4>Asesmen yang diikuti</h4>
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
                  <template v-slot:item.status="{ item }">
                      <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                      <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                      <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                      <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <!-- <v-btn color="orange" v-on:click="gotoPage('/report-asesmen')" text right >Lihat Detil</v-btn> -->
                  <v-btn color="orange" v-on:click="gotoPage('/report-asesmen')" text right >Menuju Asesmen Mandiri</v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </div>
          </v-row>
        </v-flex>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_REPORTS } from '../constants/graphql';

  export default {
    name: 'index',
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
      };
    },
    created() {
      this.getReport();
    },
    methods: {
      async getReport() {
          const result = await this.$apollo.mutate({
              mutation: GET_REPORTS
        }).then(({ data }) => {
            this.items = data.checkselfAsesi.peserta;
            console.log(data);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
          this.state.skeleton = false;
        });
      },
      checkAsesiData() {
        this.profile.username = localStorage.getItem('lsp-username');
      },
      gotoPage(page) {
        this.$router.push(page);
      },
    }
  };

</script>
<style lang="scss" scoped>
</style>
