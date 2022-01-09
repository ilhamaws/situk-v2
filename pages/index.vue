<template>

  <div class="">
    <section>
      <v-carousel>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
          <v-layout column align-center justify-center class="white--text fill-height">
            <h1 class="white--text mb-2 display-1 text-center">Lembaga Sertifikasi Profesi</h1>
            <div class="subheading mb-4 text-center">Powered by UPN</div>
            <!-- <v-btn class="mt-12" color="blue lighten-2" dark large href="/pre-made-themes">
              Daftar
            </v-btn> -->
          </v-layout>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- Start -->
    <section>
      <v-layout
        column
        wrap
        class="my-12"
        align-center
      >
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline">Tentang LSP TIFA</h2>
            <span class="subheading">
              berikut ini adalah skema dari LSP TIFA
            </span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">show_chart</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Info Grafis</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">work_outline</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Lembaga Sertifikasi Profesi (LSP)</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">calendar_today</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Agenda</div>
                  </v-card-title>
                  <v-card-text>
                    Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax :src="require('@/assets/img/hero.jpeg')" height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-4 text-center">Informasi Lebih Lanjut</div>
          <em>Daftar sekarang untuk mendapatkan informasi lebih lanjut</em>
          <v-btn
            class="mt-12"
            color="blue lighten-2"
            dark
            large
            href="/pre-made-themes"
          >
            Get Started
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>
    <!-- Start news -->
    <section class="my-12">
      <!-- End card -->
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <!-- card 1 -->
              <v-card class="mx-auto" max-width="400">
                <v-img class="white--text align-end" height="200px" :src="require('@/assets/img/hero.jpeg')">
                  <v-card-title>Berita terbaru</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">01 Januari 2020</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>John Doe</div>
                  <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange" text>Selengkapnya</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <!-- card 1 -->
              <v-card class="mx-auto" max-width="400">
                <v-img class="white--text align-end" height="200px" :src="require('@/assets/img/hero.jpeg')">
                  <v-card-title>Berita terbaru</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">01 Januari 2020</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>John Doe</div>
                  <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange" text>Selengkapnya</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <!-- card 1 -->
              <v-card class="mx-auto" max-width="400">
                <v-img class="white--text align-end" height="200px" :src="require('@/assets/img/hero.jpeg')">
                  <v-card-title>Berita terbaru</v-card-title>
                </v-img>
                <v-card-subtitle class="pb-0">01 Januari 2020</v-card-subtitle>

                <v-card-text class="text--primary">
                  <div>John Doe</div>
                  <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn color="orange" text>Selengkapnya</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </section>
    <!-- End News -->

    <section>
      <v-container grid-list-xl>
        <v-layout row wrap justify-center class="my-12">
          <v-flex xs12 sm4>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Tentang LSP</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm4 offset-sm1>
            <v-card flat class="transparent">
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Hubungi kami</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              </v-card-text>
              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>+62 (031) 870 6369</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>Jl. Rungkut Madya No.1</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>lsp@upnjatim.com</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>

  </div>

</template>
<script>

export default {
  name: 'Index',
  layout: 'App',
  data() {
    return {
      items: [
        {
          src: '',
        }
      ]
    }
  },
  async created() {
    this.$router.push('/signin')
  },
}

</script>
<style lang="scss" scoped>
</style>
