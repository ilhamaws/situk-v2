<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-flex xs12>
          <v-container>
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
                        <v-img :src="profile.image"></v-img>
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
                    <span class="headline px-5">Edit Profil</span>

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
                          v-for="(page, i) in pages"
                          :key="i"
                          :to="page.link"
                          click=""
                        >
                          <v-list-item-icon class="mr-3">
                            <v-icon>{{ page.icon }}</v-icon>
                          </v-list-item-icon>
                          <v-list-item-title>{{ page.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-card-title>
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
                            />

                            <v-row>
                              <v-col cols="5">
                                <v-select
                                @input='selectKotas'
                                v-model="profile.provinsi"
                                :items="province"
                                label="Provinsi"
                                item-value="id" item-text="provinsi"
                                outlined
                                dense
                                />
                              </v-col>
                              <v-col cols="5">
                                <v-select
                                v-model="profile.kota"
                                :items="kota"
                                label="Kota"
                                item-value="id" item-text="kota"
                                outlined
                                dense
                                />
                              </v-col>
                              <v-col cols="2">
                                <v-text-field
                                v-model="profile.kodepos"
                                label="Kode Pos"
                                type="text"
                                outlined
                                dense
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
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-select
                                v-model="profile.lembaga"
                                :items="lembaga"
                                label="Lembaga"
                                item-value="id" item-text="nama"
                                outlined
                                dense
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
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="profile.telepon"
                                  label="Telepon"
                                  type="number"
                                  outlined
                                  dense
                                />
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="6">
                                <v-select
                                v-model="profile.pekerjaan"
                                :items="pekerjaan"
                                label="Pekerjaan"
                                item-value="id" item-text="pekerjaan"
                                outlined
                                dense
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-select
                                v-model="profile.pendidikan"
                                :items="pendidikan"
                                label="Pendidikan"
                                item-value="id" item-text="pendidikan"
                                outlined
                                dense
                                />
                              </v-col>
                            </v-row>

                            <v-text-field label="Pilih Foto" v-model='image.imageName' @click='pickImage' prepend-icon='mdi-camera'></v-text-field>
                            <input
                                type="file"
                                style="display: none"
                                ref="image"
                                accept="image/png, image/jpeg"
                                @change="onPhotoSelected"
                            >

                            <v-text-field label="Upload Tanda Tangan" v-model='ttd.ttdName' @click='pickTtd' prepend-icon='attach_file'></v-text-field>
                            <input
                                type="file"
                                style="display: none"
                                ref="ttd"
                                accept="image/png, image/jpeg"
                                @change="onTtdSelected"
                            >

                            <!-- <v-file-input
                                :rules="rules"
                                @change="onPhotoSelected"
                                accept="image/png, image/jpeg"
                                placeholder="Upload foto anda"
                                prepend-icon="mdi-camera"
                                label="Foto"
                                counter
                                show-size
                            ></v-file-input> -->



                            <!-- <div class="form-group pb-5" >
                              <label for="formImage" class="mr-5">Upload Foto</label>
                              <input type="file" @change="onPhotoSelected" name="image" id="formImage">
                            </div>

                            <div class="form-group">
                              <label for="formTtd" class="mr-5">Upload Scan TTD</label>
                              <input type="file" @change="onTtdSelected" name="ttd" id="formTtd">
                            </div> -->

                            <v-row>
                              <v-spacer></v-spacer>
                              <v-btn
                                @click='updateAsesi'
                                class="mt-5"
                                width="200"
                                large
                                rounded
                                color="primary"
                                dark>
                                <v-progress-circular
                                  :size="20"
                                  :width="2"
                                  indeterminate
                                  color="white"
                                  v-if="state.loading"
                                  class="mr-2"
                                ></v-progress-circular>
                                Simpan
                              </v-btn>
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
          </v-container>
        </v-flex>
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
        state:{
          loading: false
        },
        pages: [
          { title: 'Informasi Profil' , icon: 'person', link: '/profile'},
          { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
          { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
        ],
        alert:{
          show: false,
          type: '',
          message: '',
        },
        rules: [
          value => !value || value.size < 1000000 || 'Ukuran image harus kurang dari 1 MB!',
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
            email: '',
            role: ''
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
        // image: null,
        image: {
            imageName: '',
            imageUrl: null,
            imageFile: ''
        },
        ttd: {
            ttdName: '',
            ttdUrl: null,
            ttdFile: ''
        },
        selectedImage: '',
        // ttd: null,
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
    },
    async mounted() {
        await this.checkAsesiData();
        this.getLembagas();
        this.getPekerjaans();
        this.getPendidikans();
        this.getProvinsis();
        this.getKotas();
        // await this.checkAsesiData();
    },
    methods: {
      onPhotoSelected(e) {
        const files = e.target.files;
        // const reader = new FileReader();

        if(files[0] !== undefined) {
            this.image.imageName = files[0].name;
            if(this.image.imageName.lastIndexOf('.') <= 0) {
                return;
            }
            const fr = new FileReader ();
            fr.readAsDataURL(files[0]);
            fr.addEventListener('load', () => {
                this.image.imageUrl = fr.result;
                this.image.imageFile = files[0]; // this is an image file that can be sent to server...
            });
        } else {
            this.image.imageName = '';
            this.image.imageFile = '';
            this.image.imageUrl = '';
        }

        // reader.onloadend = (imgFile) => {
        //   this.image = reader.result;
        // };
        // reader.readAsDataURL(imgFile);
      },
      pickImage() {
            this.$refs.image.click();
      },
      pickTtd() {
            this.$refs.ttd.click();
      },
      onTtdSelected(e) {
        const ttdFile = e.target.files;

        if(ttdFile[0] !== undefined) {
            this.ttd.ttdName = ttdFile[0].name;
            if(this.ttd.ttdName.lastIndexOf('.') <= 0) {
                return;
            }
            const fr = new FileReader ();
            fr.readAsDataURL(ttdFile[0]);
            fr.addEventListener('load', () => {
                this.ttd.ttdUrl = fr.result;
                this.ttd.ttdFile = ttdFile[0]; // this is an ttd file that can be sent to server...
            });
        } else {
            this.ttd.ttdName = '';
            this.ttd.ttdFile = '';
            this.ttd.ttdUrl = '';
        }
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
          const { profile: { lembaga, pendidikan, pekerjaan, kota, nik
          , nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon}, image: { imageUrl }, ttd: { ttdUrl }} = this.$data;
          const result = await this.$apollo.mutate({
            mutation: UPDATE_ASESI_MUTATION,
            variables: {
                lembaga, pendidikan, pekerjaan, kota, nik,
                nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon,
                imageUrl, ttdUrl
            }
          }).then(({ data }) => {
              this.showAlert('success', 'Data berhasil diubah');
              location.href = 'edit-profile';
            console.log(data);
          }).catch(({error}) => {
            this.showAlert('error', error);
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
            this.profile.kota = data.user.asesi.kota.id;
            this.profile.provinsi = data.user.asesi.kota.provinsi.id;
            this.profile.kodepos = data.user.asesi.kodepos;
            this.profile.telepon = data.user.asesi.telepon;
            this.profile.lembaga = data.user.asesi.lembaga.id;
            this.profile.pekerjaan = data.user.asesi.pekerjaan.id;
            this.profile.pendidikan = data.user.asesi.pendidikan.id;
            this.profile.image = data.user.asesi.image;
            this.profile.ttd = data.user.asesi.ttd;
            this.profile.email = data.user.email;
            this.profile.role = data.user.role.role;
            console.log(data);
        }).catch((error) => {
            alert(error);
        });
      },
      gotoPage(page) {
          this.$router.push(page);
      },
    }
  };

</script>
<style lang="scss" scoped>
</style>
