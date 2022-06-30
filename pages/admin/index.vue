<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-alert
          class="px-10"
          border="left"
          colored-border
          color="primary accent-4"
          elevation="2"
        >
          <h3 class="font-weight-bold mt-0">Selamat Datang Admin</h3>
          Hai <strong>{{ profile.username }}</strong>, selamat datang di halaman LSP TIFA Penelitian Indonesia Internasional Assesmen Online. Silahkan klik menu untuk mengelola website.
        </v-alert>
        <!-- <div class="col-lg-6 col-xs-12">
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
                    <v-btn color="orange" text right>Daftar Uji</v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </div> -->
      </v-layout>
    </section>
  </div>

</template>
<script>

export default {
  name: 'Index',
  layout: 'App_admin',
  data() {
    return {
      profile: {
        username: ''
      },
      items: [
      ]
    }
  },
  mounted() {
    //   this.checkAsesiData();
  },
  methods: {
    checkAsesiData() {
      this.profile.username = localStorage.getItem('lsp-username')
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
