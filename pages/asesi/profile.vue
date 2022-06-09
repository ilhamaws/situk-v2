<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        v-if="!state.skeleton"
        column
        wrap
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <div class="d-flex flex-no-wrap">
                  <!-- <v-avatar
                    class="mx-auto mt-10"
                    size="125"
                    circle
                  >
                  </v-avatar> -->
                  <div class="mx-auto pt-5">
                    <v-img class="rounded-lg" width="150" height="200" aspect-ratio="3/4" :src="profile.image"></v-img>
                  </div>
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
                  <v-chip class="mx-auto" text small color="primary">{{ profile.user.role.role }}</v-chip>
                </div>
                <!-- <v-divider></v-divider> -->
                <v-card-text class="px-5">
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="20%"><b>Nama:</b></td>
                        <td>{{ profile.nama }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>NIK:</b></td>
                        <td>{{ profile.nik }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Email:</b></td>
                        <td>{{ profile.user.email }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Telepon:</b></td>
                        <td>{{ profile.telepon }}</td>
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
            <!-- <div class="col-md-12 col-xs-12 pt-0">
              <v-card class="mb-3">
                <v-list-item three-line class="px-5">
                  <v-list-item-avatar
                    size="80"
                  >
                    <v-img :src="profile.image"></v-img>
                    <v-skeleton-loader
                      v-if="state.skeleton"
                      ref="skeleton"
                      type="avatar"
                      class="mx-auto skeleton-avatar"
                    ></v-skeleton-loader>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{ profile.nama }}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip class="px-10" color="indigo" outlined dark>{{ profile.user.role.role }}</v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list class="px-5">
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="20%"><b>Nama:</b></td>
                        <td>{{ profile.nama }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>NIK:</b></td>
                        <td>{{ profile.nik }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Email:</b></td>
                        <td>{{ profile.user.email }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Telepon:</b></td>
                        <td>{{ profile.telepon }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-list>
              </v-card>
            </div> -->

            <div class="col-md-8 col-xs-12">
              <v-card
                class="mx-auto"
              >
                <v-card-title>
                  <span class="font-weight-bold">Informasi Profil</span>

                  <v-spacer></v-spacer>

                  <v-btn
                    to="/asesi/edit-profile"
                    outlined
                    color="primary"
                  >
                    <v-icon small class="mr-2">edit</v-icon>
                    Edit profil
                  </v-btn>

                <!-- <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      outlined
                      color="primary"
                    >
                      <v-icon small class="mr-2">edit</v-icon>
                      Edit profil
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
                </v-menu> -->
                </v-card-title>

                <v-divider></v-divider>
                <v-row>
                  <v-col md="12" class="px-10">
                    <div class="px-5 py-5">
                      <div v-if="alert.show">
                        <v-alert :type="alert.type" dismissible class="mb-10">
                          <div class="white--text">
                            {{ alert.message }}
                          </div>
                        </v-alert>
                      </div>
                      <v-form>
                        <v-row>
                          <v-col md="12" class="pb-0">
                            <label for=""><b>Nama Lengkap</b></label>
                            <v-text-field
                              v-model="profile.nama"
                              class="mt-2"
                              label="Nama Lengkap"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="12" class="py-0">
                            <label for=""><b>NIK</b></label>
                            <v-text-field
                              v-model="profile.nik"
                              class="mt-2"
                              label="NIK"
                              type="number"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="12" class="py-0">
                            <label for=""><b>No. Telepon</b></label>
                            <v-text-field
                              v-model="profile.telepon"
                              class="mt-2"
                              label="No. Telepon"
                              type="number"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Tempat Lahir</b></label>
                            <v-text-field
                              v-model="profile.tempat_lahir"
                              class="mt-2"
                              label="Tempat Lahir"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Tanggal Lahir</b></label>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template #activator="{ on }">
                                <v-text-field
                                  v-model="profile.tanggal_lahir"
                                  class="mt-2"
                                  label="Tanggal lahir"
                                  solo
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Jenis Kelamin</b></label>
                            <v-select
                              v-model="profile.jenis_kelamin"
                              class="mt-2"
                              :items="gender"
                              item-text="jk"
                              item-value="kode"
                              label="Jenis Kelamin"
                              solo
                              readonly
                              append-icon
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="12" class="py-0">
                            <label for=""><b>Alamat</b></label>
                            <v-text-field
                              v-model="profile.alamat"
                              class="mt-2"
                              label="Alamat"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Kota</b></label>
                            <v-text-field
                              v-model="profile.kota.kota"
                              class="mt-2"
                              label="Alamat"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Kode Pos</b></label>
                            <v-text-field
                              v-model="profile.kodepos"
                              class="mt-2"
                              label="Kodepos"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Kebangsaan</b></label>
                            <v-text-field
                              v-model="profile.kebangsaan"
                              class="mt-2"
                              label="Kebangsaan"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Pekerjaan</b></label>
                            <v-text-field
                              v-model="profile.pekerjaan.pekerjaan"
                              class="mt-2"
                              label="Pekerjaan"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                          <v-col md="4" class="py-0">
                            <label for=""><b>Pendidikan</b></label>
                            <v-text-field
                              v-model="profile.pendidikan.pendidikan"
                              class="mt-2"
                              label="Kodepos"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col md="12" class="py-0">
                            <label for=""><b>Lembaga</b></label>
                            <v-text-field
                              v-model="profile.lembaga.nama"
                              class="mt-2"
                              label="Kodepos"
                              type="text"
                              solo
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Foto</b></label>
                            <v-row>
                              <v-col md="7">
                                <v-img
                                  height="200"
                                  width="150"
                                  :src="profile.image"
                                  :lazy-src="profile.image"
                                  aspect-ratio="1"
                                  class="grey lighten-2 mt-2 rounded-lg"
                                ></v-img>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col md="6" class="pt-0">
                            <label for=""><b>Tanda tangan</b></label>
                            <v-row>
                              <v-col cols="12">
                                <v-card class="rounded-lg">
                                  <v-img
                                    height="200"
                                    width="full"
                                    :src="profile.ttd"
                                    :lazy-src="profile.ttd"
                                    aspect-ratio="1"
                                    class="white mt-2"
                                  ></v-img>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-form>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-row>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_SELF_ASESI } from '@/constants/graphql'

export default {
  name: 'Profile',
  layout: 'App_asesi',
  data() {
    return {
      items: [
        { title: 'Edit Profil' , icon: 'edit', link: 'edit-profile'},
        // { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      state:{
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
      // profile : [],
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
      profile: [],
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
    }
  },
  async mounted() {
    await this.checkAsesiData()
    // this.getLembagas();
    // this.getPekerjaans();
    // this.getPendidikans();
    // this.getProvinsis();
    // await this.getKotas();
  },
  methods: {
    onPhotoSelected(e) {
      const imgFile = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = (imgFile) => {
        this.image = reader.result
      }
      reader.readAsDataURL(imgFile)
    },
    onTtdSelected(e) {
      const ttdFile = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = (ttdFile) => {
        this.ttd = reader.result
      }
      reader.readAsDataURL(ttdFile)
    },

    async getLembagas() {
      const result = await this.$apollo.mutate({
        mutation: GET_LEMBAGAS
      }).then(({ data }) => {
        this.lembaga = data.lembagas
      }).catch((error) => {
        console.log(error)
      })
    },

    async getPekerjaans() {
      const result = await this.$apollo.mutate({
        mutation: GET_PEKERJAANS
      }).then(({ data }) => {
        this.pekerjaan = data.pekerjaans
      }).catch((error) => {
        console.log(error)
      })
    },

    async getPendidikans() {
      const result = await this.$apollo.mutate({
        mutation: GET_PENDIDIKANS
      }).then(({ data }) => {
        this.pendidikan = data.pendidikans
      }).catch((error) => {
        console.log(error)
      })
    },

    async getProvinsis() {
      const result = await this.$apollo.mutate({
        mutation: GET_PROVINSIS
      }).then(({ data }) => {
        this.province = data.provinsis
      }).catch((error) => {
        console.log(error)
      })
    },

    // async getKotas() {
    //   const id = this.profile.kota.provinsi.id;
    //   console.log(id);
    //   const result = await this.$apollo.mutate({
    //       mutation: GET_KOTAS,
    //       variables: {
    //           id
    //       }
    //   }).then(({ data }) => {
    //     this.kota = data.provinsi.kota;
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // },
      
    async selectKotas() {
      const id = this.profile.provinsi
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_KOTAS,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.kota = data.provinsi.kota
      }).catch((error) => {
        console.log(error)
      })
    },

    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async checkAsesiData() {
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        this.profile = data.checkselfAsesi
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    // async checkAsesiData() {
    //   const user_id = localStorage.getItem('lsp-user-id');
    //   const result = await this.$apollo.mutate({
    //       mutation: GET_USERDATA,
    //       variables: {
    //           user_id
    //       }
    //   }).then(({ data }) => {
    //       this.profile.nama = data.user.asesi.nama;
    //       this.profile.jenis_kelamin = data.user.asesi.jenis_kelamin;
    //       this.profile.nik = data.user.asesi.nik;
    //       this.profile.tempat_lahir = data.user.asesi.tempat_lahir;
    //       this.profile.tanggal_lahir = data.user.asesi.tanggal_lahir;
    //       this.profile.kebangsaan = data.user.asesi.kebangsaan;
    //       this.profile.alamat = data.user.asesi.alamat;
    //       this.profile.kota = data.user.asesi.kota;
    //       this.profile.provinsi = data.user.asesi.kota.provinsi;
    //       this.profile.kodepos = data.user.asesi.kodepos;
    //       this.profile.telepon = data.user.asesi.telepon;
    //       this.profile.lembaga = data.user.asesi.lembaga;
    //       this.profile.pekerjaan = data.user.asesi.pekerjaan;
    //       this.profile.pendidikan = data.user.asesi.pendidikan;
    //       this.profile.image = data.user.asesi.image;
    //       this.profile.ttd = data.user.asesi.ttd;
    //       this.profile.email = data.user.email;
    //       this.profile.role = data.user.role.role;
    //       console.log(data);
    //   }).catch((error) => {
    //       alert(error);
    //   });
    // },
  }
}

</script>
<style lang="scss" scoped>
</style>
