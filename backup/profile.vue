<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
        class="container container--fluid px-10 py-10"
      >
            <div class="col-lg-12 col-xs-12">
              <v-row>
                <div class="col-lg-4 col-xs-12">
                  <v-card>
                    <!-- <div class="card-header border-bottom text-center">
                    </div> -->
                    <v-list-item three-line class="px-5 py-5">
                      <v-list-item-avatar
                        size="80"
                      >
                        <v-img v-if="!state.skeleton" :src="profile.image"></v-img>
                        <v-skeleton-loader
                          v-if="state.skeleton"
                          ref="skeleton"
                          type="avatar"
                          class="mx-auto skeleton-avatar"
                        ></v-skeleton-loader>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="headline mb-1">{{ profile.nama }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-chip class="px-10" color="purple" outlined dark>{{ profile.role }}</v-chip>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon class="mr-2">email</v-icon>Email :</v-list-item-title>
                      <v-list-item-subtitle class="text-right">
                        {{ profile.email }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon class="mr-2">phone</v-icon>Telepon :</v-list-item-title>
                      <v-list-item-subtitle class="text-right">
                        {{ profile.telepon }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-icon class="mr-2">person</v-icon>NIK :</v-list-item-title>
                      <v-list-item-subtitle class="text-right">
                        {{ profile.nik }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                  </v-card>
                </div>
                <div class="col-lg-8 col-xs-12">
                  <v-card
                    class="mx-auto"
                  >
                  <v-card-title>
                    <!-- <v-avatar size="30" color="warning lighten-2">
                      <span class="white--text">APL.1</span>
                    </v-avatar> -->
                    <span class="headline px-5">Informasi Profil</span>

                    <v-spacer></v-spacer>

                    <v-menu bottom left>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          v-on="on"
                        >
                          <v-icon>settings</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item
                          v-for="(item, i) in items"
                          :key="i"
                          :to="item.link"
                          link
                          click=""
                        >
                          <v-list-item-icon class="mr-3">
                            <v-icon>{{ item.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-title>


                  <!-- <v-toolbar flat class="py-3 mb-6">
                    <v-avatar size="60" color="warning lighten-2">
                      <span class="white--text"><b>APL.1</b></span>
                    </v-avatar>
                    <v-toolbar-title class="px-5">
                      <h3>Informasi Profil</h3>
                    </v-toolbar-title>
                  </v-toolbar> -->


                  <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" class="px-10 py-5">
                        <div class="px-5 py-5">
                          <!-- Alert section -->
                          <div v-if="alert.show">
                            <v-alert :type="alert.type" dismissible class="mb-10">
                              <div class="white--text">
                                {{ alert.message }}
                              </div>
                            </v-alert>
                          </div>
                          <!-- End alert section -->
                          <v-form>
                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.nama"
                                  label="Nama Lengkap"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-select
                                  v-model="profile.jenis_kelamin"
                                  :items="gender"
                                  item-text="jk"
                                  item-value="kode"
                                  label="Jenis Kelamin"
                                  outlined
                                  dense
                                  readonly
                                  append-icon
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.tempat_lahir"
                                  label="Tempat Lahir"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <!-- date -->
                                <v-menu
                                  ref="menu"
                                  v-model="menu"
                                  :close-on-content-click="false"
                                  :return-value.sync="date"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="profile.tanggal_lahir"
                                      label="Tanggal lahir"
                                      v-on="on"
                                      outlined
                                      dense
                                      readonly
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker v-model="date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                  </v-date-picker>
                                </v-menu>
                                <!-- date -->
                              </v-col>
                            </v-row>
                            <v-text-field
                              v-model="profile.alamat"
                              label="Alamat"
                              type="text"
                              outlined
                              dense
                              readonly
                            />
                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.kodepos"
                                  label="Kode pos"
                                  type="number"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.kota.kota"
                                  label="Kota"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.nik"
                                  label="NIK"
                                  type="number"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.lembaga.nama"
                                  label="Lembaga"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.kebangsaan"
                                  label="Kebangsaan"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.telepon"
                                  label="Telepon"
                                  type="number"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.pekerjaan.pekerjaan"
                                  label="Pekerjaan"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.pendidikan.pendidikan"
                                  label="Pendidikan"
                                  type="text"
                                  outlined
                                  dense
                                  readonly
                                />
                              </v-col>
                            </v-row>
                          </v-form>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-row>
            </div>
            <div class="col-lg-12 col-xs-12">

            </div>
      </v-layout>
    </section>
  </div>
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '../constants/settings';
import { UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS } from '../constants/graphql';

export default {
    name: 'profile',
    layout: 'App_asesi',
    data() {
      return {
        items: [
          { title: 'Edit Profil' , icon: 'edit', link: '/edit-profile'},
          { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
          { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
        ],
        state:{
          loading: false
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
        profile : {
            nama: '',
            nik: '',
            tempat_lahir: '',
            kebangsaan: '',
            alamat: '',
            kodepos: '',
            telepon: '',
            image: '',
            ttd: '',
            jenis_kelamin: '',
            kota: '',
            provinsi: '',
            lembaga: '',
            pekerjaan: '',
            pendidikan:'',
            role: '',
            email: ''
        },
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
        nama: '',
        nik: '',
        tempat_lahir: '',
        kebangsaan: '',
        alamat: '',
        kodepos: '',
        telepon: '',
        image: null,
        selectedImage: '',
        ttd: null,
        selectedTtd: '',
        selectedGender: null,
        kota: [],
        selectedCity: null,
        province: [],
        selectedProvince: null,
        lembaga: [],
        selectedLembaga: null,
        pekerjaan: [],
        selectedPekerjaan: null,
        pendidikan: [],
        selectedPendidikan:null,
      };
    },
    async created() {
      console.log(LSP_AUTH_TOKEN);
    },
    async mounted() {
        await this.checkAsesiData();
        this.getLembagas();
        this.getPekerjaans();
        this.getPendidikans();
        await this.getProvinsis();
        await this.getKotas();
    },
    methods: {
      onPhotoSelected(e) {
        const imgFile = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = (imgFile) => {
          this.image = reader.result;
        };
        reader.readAsDataURL(imgFile);
      },
      onTtdSelected(e) {
        const ttdFile = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = (ttdFile) => {
          this.ttd = reader.result;
        };
        reader.readAsDataURL(ttdFile);
      },

      async getLembagas() {
        const result = await this.$apollo.mutate({
            mutation: GET_LEMBAGAS
        }).then(({ data }) => {
          this.lembaga = data.lembagas;
        }).catch((error) => {
          console.log(error);
        });
      },

      async getPekerjaans() {
        const result = await this.$apollo.mutate({
            mutation: GET_PEKERJAANS
        }).then(({ data }) => {
          this.pekerjaan = data.pekerjaans;
        }).catch((error) => {
          console.log(error);
        });
      },

      async getPendidikans() {
        const result = await this.$apollo.mutate({
            mutation: GET_PENDIDIKANS
        }).then(({ data }) => {
          this.pendidikan = data.pendidikans;
        }).catch((error) => {
          console.log(error);
        });
      },

      async getProvinsis() {
        const result = await this.$apollo.mutate({
            mutation: GET_PROVINSIS
        }).then(({ data }) => {
          this.province = data.provinsis;
        }).catch((error) => {
          console.log(error);
        });
      },

      async getKotas() {
        const id = this.profile.provinsi.id;
        console.log(id);
        const result = await this.$apollo.mutate({
            mutation: GET_KOTAS,
            variables: {
                id
            }
        }).then(({ data }) => {
          this.kota = data.provinsi.kota;
        }).catch((error) => {
          console.log(error);
        });
      },
      
      async selectKotas() {
        const id = this.profile.provinsi;
        console.log(id);
        const result = await this.$apollo.mutate({
            mutation: GET_KOTAS,
            variables: {
                id
            }
        }).then(({ data }) => {
          this.kota = data.provinsi.kota;
        }).catch((error) => {
          console.log(error);
        });
      },

      showAlert(type, message) {
        this.alert = { show: true, type, message };
      },
      async updateAsesi(e) {
        e.preventDefault();
        const { state: { loading } } = this;

        if (!loading) {
          this.alert.show = false;
          this.state.loading = true;
          const { selectedLembaga, selectedPendidikan, selectedPekerjaan, selectedCity, nik
          , nama, selectedGender, tempat_lahir, date, kebangsaan, alamat, kodepos, telepon, image, ttd} = this.$data;
          const result = await this.$apollo.mutate({
            mutation: UPDATE_ASESI_MUTATION,
            variables: {
                selectedLembaga, selectedPendidikan, selectedPekerjaan, selectedCity, nik, 
                nama, selectedGender, tempat_lahir, date, kebangsaan, alamat, kodepos, telepon, image, ttd
            }
          }).then(({ data }) => {
            console.log(data);
          }).catch(({graphQLErrors}) => {
            this.showAlert('error', graphQLErrors[0].message);
          }).finally(() => {
            this.state.loading = false;
          });
        }
      },

      async checkAsesiData() {
        const user_id = localStorage.getItem('lsp-user-id');
        const result = await this.$apollo.mutate({
            mutation: GET_USERDATA,
            variables: {
                user_id
            }
        }).then(({ data }) => {
            this.profile.nama = data.user.asesi.nama;
            this.profile.jenis_kelamin = data.user.asesi.jenis_kelamin;
            this.profile.nik = data.user.asesi.nik;
            this.profile.tempat_lahir = data.user.asesi.tempat_lahir;
            this.profile.tanggal_lahir = data.user.asesi.tanggal_lahir;
            this.profile.kebangsaan = data.user.asesi.kebangsaan;
            this.profile.alamat = data.user.asesi.alamat;
            this.profile.kota = data.user.asesi.kota;
            this.profile.provinsi = data.user.asesi.kota.provinsi;
            this.profile.kodepos = data.user.asesi.kodepos;
            this.profile.telepon = data.user.asesi.telepon;
            this.profile.lembaga = data.user.asesi.lembaga;
            this.profile.pekerjaan = data.user.asesi.pekerjaan;
            this.profile.pendidikan = data.user.asesi.pendidikan;
            this.profile.image = data.user.asesi.image;
            this.profile.ttd = data.user.asesi.ttd;
            this.profile.email = data.user.email;
            this.profile.role = data.user.role.role;
            console.log(data);
        }).catch((error) => {
            alert(error);
        });
      },
    }
  };

</script>
<style lang="scss" scoped>
</style>
