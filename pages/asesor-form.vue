<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
      >
        <v-flex xs12>
          <v-container grid-list-xl>
            <div class="col-lg-12 col-xs-12">
              <v-toolbar class="transparent mb-5" flat>
                <v-avatar size="60" tile color="warning lighten-2">
                  <span class="white--text"><b>APL.1</b></span>
                </v-avatar>
                <v-toolbar-title class="px-10">
                  <b>Form Asesor</b>
                </v-toolbar-title>
              </v-toolbar>
              <v-card
                class="mx-auto"
              >
                <v-row>
                  <v-col md="12" class="px-10 py-10">
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
                      <v-form>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Nama Lengkap</b></label>
                            <v-text-field
                              v-model="form.name"
                              class="mt-2"
                              label="Nama lengkap"
                              type="text"
                              solo
                            />
                          </v-col>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Skema</b></label>
                            <v-select
                              v-model="form.skema_id"
                              class="mt-2"
                              :items="skemas"
                              label="Pilih skema"
                              item-value="id" item-text="skema"
                              solo
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Nomor Registrasi</b></label>
                            <v-text-field
                              v-model="form.no_registrasi"
                              class="mt-2"
                              label="Nomor Registrasi"
                              type="text"
                              solo
                            />
                          </v-col>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Nomor Blanko</b></label>
                            <v-text-field
                              v-model="form.no_blanko"
                              class="mt-2"
                              label="Nomor Blanko"
                              type="text"
                              solo
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="12" class="py-0">
                            <label for=""><b>Alamat</b></label>
                            <v-text-field
                              v-model="form.alamat"
                              class="mt-2"
                              label="Alamat"
                              type="text"
                              solo
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for=""><b>Nomor Sertifikat</b></label>
                            <v-text-field
                              v-model="form.no_sertifikat"
                              class="mt-2"
                              label="Nomor Sertifikat"
                              type="text"
                              solo
                            />
                          </v-col>
                          <v-col md="6" class="py-0">
                            <label for="">Exp. Sertifikat</label>
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
                                  v-model="form.exp_sertifikat"
                                  class="mt-2"
                                  label="Exp. Sertifikat"
                                  solo
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="form.exp_sertifikat" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col md="6" class="py-0">
                            <label for="">Foto</label>
                            <v-row v-if="form.image != null">
                              <v-col md="7">
                                <v-card>
                                  <v-img
                                    :src="form.image"
                                    :lazy-src="form.image"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                                  ></v-img>
                                </v-card>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col md="7">
                                <v-text-field v-model="image.imageName" readonly label="Edit Foto" prepend-icon="mdi-camera" solo @click="pickImage"></v-text-field>
                                <input
                                  ref="image"
                                  type="file"
                                  style="display: none"
                                  accept="image/png, image/jpeg"
                                  @change="onImageSelected"
                                >
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col md="6" class="py-0">
                            <label for="">Tanda tangan</label>
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
                                      height="200px"
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
                                  <v-btn color="primary" text @click="save">Simpan Ttd</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-btn
                            class="mt-5"
                            width="200"
                            large
                            rounded
                            color="primary"
                            dark
                            @click="createAsesor">
                            <v-progress-circular
                              v-if="state.loading"
                              :size="20"
                              :width="2"
                              indeterminate
                              color="white"
                              class="mr-2"
                            ></v-progress-circular>
                            Simpan
                          </v-btn>
                        </v-row>
                      </v-form>
                      <!-- <v-form>
                        <v-text-field
                          v-model="form.name"
                          label="Nama Lengkap"
                          type="text"
                        />

                        <v-select
                            v-model="form.skema_id"
                            :items="skemas"
                            label="Skema*"
                            item-value="id" item-text="skema"
                        />

                        <v-text-field
                          v-model="form.no_registrasi"
                          label="No. Registrasi"
                          type="number"
                        />

                        <v-text-field
                          v-model="form.no_sertifikat"
                          label="No. Sertifikat"
                          type="number"
                        />

                        <v-text-field
                          v-model="form.no_blanko"
                          label="No. Blanko"
                          type="number"
                        />

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
                              v-model="form.exp_sertifikat"
                              label="Exp. Sertifikat"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="form.exp_sertifikat" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>

                        <v-text-field
                          v-model="form.alamat"
                          label="Alamat"
                          type="text"
                        />

                        <div class="form-group pb-5" >
                          <label for="formImage" class="mr-5">Upload Foto</label>
                          <input type="file" @change="onPhotoSelected" name="image" id="formImage">
                        </div>

                        <div class="form-group">
                          <label for="formTtd" class="mr-5">Upload Scan TTD</label>
                          <input type="file" @change="onTtdSelected" name="ttd" id="formTtd">
                        </div>

                        <v-row>
                          <v-spacer></v-spacer>
                          <v-btn
                            @click='createAsesor'
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
                      </v-form> -->
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN } from '@/constants/settings'
import { CREATE_ASESI_MUTATION, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, CREATE_ASESOR_MUTATION } from '@/constants/graphql'
import { GET_SKEMAS } from '../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_blank',
  data() {
    return {
      state:{
        loading: false
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      rules: [
        value => !value || value.size < 2000000 || 'Ukuran gambar harus kurang dari 2 MB!',
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
        name: '',
        skema_id: '',
        no_registrasi: '',
        no_sertifikat: '',
        no_blanko: '',
        exp_sertifikat: new Date().toISOString().substr(0, 10),
        alamat: '',
        image: null,
        ttd: null,
      },
      selectedImage: "",
      selectedTtd: "",
      city: [],
      province: [],
      lembaga: [],
      pekerjaan: [],
      pendidikan: [],
      skemas: [],
      editDialog : false,
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
    }
  },
  mounted() {
    this.getSkemas()
  },
  methods: {
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

    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.form.ttd = data
      this.ttd.ttdUrl = data
      this.editDialog = false
      // alert("Open DevTools see the save data.");
      // console.log(isEmpty);
      // console.log(data);
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    pickImage() {
      this.$refs.image.click()
    },
    onImageSelected(e) {
      const imageFile = e.target.files

      if(imageFile[0] !== undefined) {
        this.image.imageName = imageFile[0].name
        if(this.image.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(imageFile[0])
        fr.addEventListener('load', () => {
          this.image.imageUrl = fr.result
          this.form.image = fr.result
          this.image.imageFile = imageFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.form.image = null
        this.image.imageName = ''
        this.image.imageFile = ''
        this.image.imageUrl = null
      }
    },
    pickTtd() {
      // this.$refs.ttd.click();
      this.editDialog = true
    },

    async getSkemas() {
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMAS
      }).then(({ data }) => {
        this.skemas = data.skemas
      }).catch((error) => {
        console.log(error)
      })
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

    async getKotas() {
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

    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },

    async createAsesor(e) {
      e.preventDefault()
      const { state: { loading } } = this

      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const { form: {name, skema_id, no_registrasi, no_sertifikat, no_blanko, exp_sertifikat, alamat, image, ttd} } = this.$data
        const user_id = null
        const result = await this.$apollo.mutate({
          mutation: CREATE_ASESOR_MUTATION,
          variables: {
            user_id, name, skema_id, no_registrasi, no_sertifikat, no_blanko, exp_sertifikat, alamat, image, ttd
          }
        }).then(({ data }) => {
          console.log(data)
          this.showAlert('success', 'Data berhasil dibuat')
          this.gotoPage('asesor')
        }).catch(({graphQLErrors}) => {
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
