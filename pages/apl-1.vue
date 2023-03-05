<template>
  <v-layout
    column
    wrap
  >
    <v-flex xs12>
      <v-container style="max-width: 1050px!important">
        <div class="col-lg-12 col-xs-12">
          <v-toolbar class="transparent mb-5" flat>
            <!-- <v-avatar size="60" tile color="warning lighten-2">
              <span class="white--text"><b>APL.1</b></span>
            </v-avatar> -->
            <v-toolbar-title class="font-weight-bold">
              FR.APL.01 Form APL 1
            </v-toolbar-title>
          </v-toolbar>
          <v-card
            class="mx-auto"
          >
            <v-row>
              <v-col cols="12" class="px-10 py-10">
                <div class="px-7">
                  <!-- Alert section -->
                  <div v-if="alert.show">
                    <v-alert :type="alert.type" dismissible>
                      <div class="white--text">
                        {{ alert.message }}
                      </div>
                    </v-alert>
                  </div>
                  <!-- End alert section -->
                  <v-form ref="form">
                    <v-row>
                      <v-col md="12" class="py-0">
                        <v-alert class="my-6" type="primary" dense :value="true" text>
                          Data Pribadi
                        </v-alert>
                        <label for=""><b>Nama Lengkap</b></label>
                        <v-text-field
                          v-model="form.nama"
                          class="mt-2"
                          label="Nama Lengkap"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="py-0">
                        <label for=""><b>NIK</b></label>
                        <v-text-field
                          v-model="form.nik"
                          class="mt-2"
                          label="NIK"
                          type="number"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="py-0">
                        <label for=""><b>No. Telepon</b></label>
                        <v-text-field
                          v-model="form.telepon"
                          class="mt-2"
                          label="No. Telepon"
                          type="number"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Tempat Lahir</b></label>
                        <v-text-field
                          v-model="form.tempat_lahir"
                          class="mt-2"
                          label="Tempat Lahir"
                          type="text"
                          outlined
                          dense
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
                              v-model="form.tanggal_lahir"
                              class="mt-2"
                              label="Tanggal lahir"
                              outlined
                              dense
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="form.tanggal_lahir" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Jenis Kelamin</b></label>
                        <v-select
                          v-model="form.jenis_kelamin"
                          class="mt-2"
                          :items="gender"
                          item-text="jk"
                          item-value="kode"
                          label="Jenis Kelamin"
                          outlined
                          dense
                          append-icon
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="8" class="py-0">
                        <label for=""><b>Alamat</b></label>
                        <v-text-field
                          v-model="form.alamat"
                          class="mt-2"
                          label="Alamat"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Kode Pos</b></label>
                        <v-text-field
                          v-model="form.kodepos"
                          class="mt-2"
                          label="Kodepos"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6" class="py-0">
                        <label for=""><b>Provinsi</b></label>
                        <v-select
                          outlined
                          dense
                          v-model="form.provinsi_id"
                          class="mt-2"
                          :items="province"
                          label="Provinsi"
                          item-value="id"
                          item-text="provinsi"
                          @input="getKotas"
                        />
                      </v-col>
                      <v-col md="6" class="py-0">
                        <label for=""><b>Kota</b></label>
                        <v-select
                          v-model="form.kota_id"
                          class="mt-2"
                          :items="city"
                          label="Kota"
                          item-value="id" item-text="kota"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Kebangsaan</b></label>
                        <v-text-field
                          v-model="form.kebangsaan"
                          class="mt-2"
                          label="Kebangsaan"
                          type="text"
                          outlined
                          disabled
                          dense
                        />
                      </v-col>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Pekerjaan</b></label>
                        <v-select
                          v-model="form.pekerjaan_id"
                          class="mt-2"
                          :items="pekerjaan"
                          label="Pekerjaan"
                          item-value="id" item-text="pekerjaan"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col md="4" class="py-0">
                        <label for=""><b>Pendidikan Terakhir</b></label>
                        <v-select
                          v-model="form.pendidikan_id"
                          class="mt-2"
                          :items="pendidikan"
                          label="Pendidikan"
                          item-value="id" item-text="pendidikan"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>

                    <v-row v-if="form.pekerjaan_id == 3">
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>NPM</b></label>
                        <v-text-field
                          v-model="form.npm"
                          class="mt-2"
                          label="NPM Mahasiswa"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Fakultas</b></label>
                        <!-- <v-select
                          v-model="form.fakultas_id"
                          class="mt-2"
                          :items="fakultass"
                          label="Fakultas"
                          item-value="id"
                          item-text="fakultas"
                          outlined
                          dense
                          @input="getJurusans"
                        /> -->
                        <v-text-field
                          outlined
                          dense
                          v-model="form.fakultas"
                          name="fakultas"
                          label="Fakultas"
                        ></v-text-field>
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Jurusan</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.jurusan"
                          name="jurusan"
                          label="Jurusan"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="py-0">
                        <label for=""><b>Asal Universitas</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.universitas"
                          name="universitas"
                          label="Universitas"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="py-0">
                        <v-alert class="my-6" type="primary" dense :value="true" text>
                          Data Pekerjaan/ Instansi/ Lembaga
                        </v-alert>
                        <label for=""><b>Lembaga</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.nama_lembaga"
                          name="lembaga"
                          label="Lembaga"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12" class="py-0">
                        <label for=""><b>Alamat Lembaga</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.alamat_lembaga"
                          name="alamat-lembaga"
                          label="Alamat Lembaga"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Email Lembaga</b></label>
                        <v-text-field
                          v-model="form.email_lembaga"
                          class="mt-2"
                          label="Email Lembaga"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Kodepos Lembaga</b></label>
                        <v-text-field
                          outlined
                          dense
                          type="number"
                          v-model="form.kodepos_lembaga"
                          name="kodepos_lembaga"
                          label="Kodepos Lembaga"
                        ></v-text-field>
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Telepon Lembaga</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.telepon_lembaga"
                          name="telepon_lembaga"
                          label="Telepon Lembaga"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Instagram</b></label>
                        <v-text-field
                          v-model="form.instagram"
                          class="mt-2"
                          label="Akun Instagram"
                          type="text"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Twitter</b></label>
                        <v-text-field
                          outlined
                          dense
                          type="number"
                          v-model="form.twitter"
                          name="Twitter"
                          label="Akun Twitter"
                        ></v-text-field>
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Linkedin</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.linkedin"
                          name="linkedin"
                          label="Linkedin"
                        ></v-text-field>
                      </v-col>
                      <v-col md="4" xs="12" class="py-0">
                        <label for=""><b>Facebook</b></label>
                        <v-text-field
                          outlined
                          dense
                          v-model="form.facebook"
                          name="facebook"
                          label="Facebook"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6" class="py-0">
                        <label for=""><b>Foto</b></label>
                        <v-row class="mt-3" v-if="form.image != null">
                          <v-col md="7">
                            <v-img
                              :src="form.image"
                              :lazy-src="form.image"
                              width="300"
                              height="400"
                              aspect-ratio="3/4"
                              class="grey lighten-2 rounded-lg"
                            ></v-img>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="7">
                            <v-text-field dense v-model="image.imageName" readonly label="Upload pas foto (Maks 2MB)" prepend-icon="mdi-camera" outlined @click="pickImage"></v-text-field>
                            <input
                              ref="image"
                              type="file"
                              style="display: none"
                              accept="image/png, image/jpeg"
                              @change="onPhotoSelected"
                            >
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col md="6" class="py-0">
                        <label for=""><b>Tanda tangan</b></label>
                        <v-row v-if="form.ttd != null">
                          <v-col md="7">
                            <v-card>
                              <v-img
                                :src="form.ttd"
                                :lazy-src="form.ttd"
                                aspect-ratio="1"
                                class="white"
                              ></v-img>
                            </v-card>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="7">
                            <v-btn block large color="primary" outlined dark @click="pickTtd"><v-icon left>edit</v-icon>Edit Ttd</v-btn>
                          </v-col>
                        </v-row>
                        <v-dialog v-model="editDialog" persistent max-width="600px">
                          <v-card>
                            <v-card-title class="headline">Edit Tanda Tangan</v-card-title>
                            <v-card-text>
                              <v-card>
                                <VueSignaturePad
                                  id="signature"
                                  ref="signaturePad"
                                  width="100%"
                                  height="450px"
                                  :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}"
                                />
                              </v-card>
                            </v-card-text>
                            <v-card-text>
                              <v-btn color="primary" class="mr-2" outlined dark @click="undo()"><v-icon left>undo</v-icon>Undo</v-btn>
                              <v-btn color="primary" outlined dark @click="clear()"><v-icon left>clear</v-icon>Clear</v-btn>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                              <v-btn color="primary" text @click="saveTtd">Simpan Ttd</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-row> 
                      <v-col md="12" class="justify-end d-flex">
                        <!-- <v-spacer></v-spacer>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn class="mr-2" v-on="on" large rounded color="grey" text @click="resetForm()" target="_blank">
                                Reset form
                              </v-btn>
                            </template>
                            <span>Reset form ke awal</span>
                          </v-tooltip> -->
                        <v-btn
                          large
                          rounded
                          color="primary"
                          dark
                          @click="createAsesi">
                          <v-progress-circular
                            v-if="state.loading"
                            :size="20"
                            :width="2"
                            indeterminate
                            color="white"
                            class="mr-2"
                          ></v-progress-circular>
                          Simpan Perubahan
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>

import { LSP_USER_ID, LSP_AUTH_TOKEN } from '@/constants/settings'
import { CREATE_ASESI_MUTATION, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_JURUSANS, GET_FAKULTASS } from '@/constants/graphql'
import { CREATE_ASESI_MANUAL_MUTATION } from '@/constants/asesi'

export default {
  name: 'Index',
  layout: 'App_blank',
  data() {
    return {
      strokeOptions: {
        size: 16,
        thinning: 0.75,
        smoothing: 0.5,
        streamline: 0.5
      },
      editDialog: false,
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
      form: {
        nama: '',
        nik: '',
        tempat_lahir: '',
        kebangsaan: 'indonesia',
        alamat: '',
        kodepos: '',
        telepon: '',
        fakultas: null,
        jurusan: null,
        universitas: null,
        image: null,
        ttd: null,
        jenis_kelamin: null,
        kota_id: null,
        npm: null,
        provinsi_id: null,
        nama_lembaga: null,
        alamat_lembaga: null,
        kodepos_lembaga: null,
        telepon_lembaga: null,
        email_lembaga: null,
        pekerjaan_id: '3',
        pendidikan_id: null,
        instagram: null,
        linkedin: null,
        facebook: null,
        twitter: null,
      },
      selectedImage: "",
      selectedTtd: "",
      city: [],
      province: [],
      lembaga: [],
      pekerjaan: [],
      pendidikan: [],
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
      fakultass: [],
      jurusans: []
    }
  },
  mounted() {
    this.getLembagas()
    this.getPekerjaans()
    this.getPendidikans()
    this.getProvinsis()
    this.getFakultass()
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
    saveTtd() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.form.ttd = data
      this.ttd.ttdUrl = data
      this.editDialog = false
      // alert("Open DevTools see the save data.");
      // console.log(isEmpty);
      // console.log(data);
    },
    onPhotoSelected(e) {
      const files = e.target.files
      // const reader = new FileReader();

      if(files[0] !== undefined) {
        this.image.imageName = files[0].name
        if(this.image.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.image.imageUrl = fr.result
          this.form.image = fr.result
          this.image.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.image.imageName = ''
        this.image.imageFile = ''
        this.image.imageUrl = ''
      }

      // reader.onloadend = (imgFile) => {
      //   this.image = reader.result;
      // };
      // reader.readAsDataURL(imgFile);
    },
    pickImage() {
      this.$refs.image.click()
    },
    pickTtd() {
      // this.$nextTick(() => {
      //   this.$refs.signaturePad.resizeCanvas()
      // })
      this.editDialog = true
      // this.$refs.ttd.click();
    },
    // onPhotoSelected(e) {
    //   const imgFile = e.target.files[0];
    //   const reader = new FileReader();

    //   reader.onloadend = (imgFile) => {
    //     this.form.image = reader.result;
    //   };
    //   reader.readAsDataURL(imgFile);
    // },

    // onTtdSelected(e) {
    //   const ttdFile = e.target.files[0];
    //   const reader = new FileReader();

    //   reader.onloadend = (ttdFile) => {
    //     this.form.ttd = reader.result;
    //   };
    //   reader.readAsDataURL(ttdFile);
    // },

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

    async getKotas() {
      // const { selectedProvince } = this.$data;
      const id = this.form.provinsi_id
      const result = await this.$apollo.mutate({
        mutation: GET_KOTAS,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.city = data.provinsi.kota
      }).catch((error) => {
        console.log(error)
      })
    },

    async getFakultass() {
      const result = await this.$apollo.mutate({
        mutation: GET_FAKULTASS
      }).then(({ data }) => {
        console.log(data)
        this.fakultass = data.fakultass
      }).catch((error) => {
        console.log(error)
      })
    },

    async getJurusans() {
      const id = this.form.fakultas_id
      const result = await this.$apollo.mutate({
        mutation: GET_JURUSANS,
        variables: {
          id
        }
      }).then(({ data }) => {
        console.log(data)
        this.jurusans = data.fakultas.jurusan
      }).catch((error) => {
        console.log(error)
      })
    },

    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },

    async createAsesi(e) {
      e.preventDefault()
      const { state: { loading } } = this

      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const { form: {nama_lembaga, alamat_lembaga, email_lembaga, telepon_lembaga, kodepos_lembaga,
          jurusan, fakultas, universitas, npm, pendidikan_id, pekerjaan_id, kota_id, nik, 
          nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon, image, ttd,
          instagram, facebook, twitter, linkedin
        } } = this.$data
        const result = await this.$apollo.mutate({
          mutation: CREATE_ASESI_MANUAL_MUTATION,
          variables: {
            nama_lembaga, alamat_lembaga, email_lembaga, telepon_lembaga, kodepos_lembaga,
            jurusan, fakultas, universitas, npm, pendidikan_id, pekerjaan_id, kota_id, nik, 
            nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon, image, ttd,
            instagram, facebook, twitter, linkedin
          }
        }).then(({ data }) => {
          // console.log(data);
          window.scrollTo(0,0)
          this.showAlert('success', 'Data berhasil dibuat')
          this.gotoPage('asesi')
        }).catch(({graphQLErrors}) => {
          window.scrollTo(0,0)
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    gotoPage(page) {
      this.$router.push(page)
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
