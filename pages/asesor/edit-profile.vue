<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <div v-if="!state.skeleton" class="">
            <v-row>
              <div class="col-md-4 col-xs-12 pt-0">
                <v-card>
                  <div class="d-flex flex-no-wrap">
                    <v-avatar
                      class="mt-5 ml-5"
                      size="125"
                      style="border-radius: .42rem;"
                      tile
                    >
                      <v-img v-if="asesor.image != null" :src="asesor.image"></v-img>
                    </v-avatar>
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="asesor.nama"
                      ></v-card-title>
                      <v-card-subtitle class="py-0">status user:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn text color="primary">
                          <span class="text-capitalize">
                            {{ asesor.user.role.role }}
                          </span>
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </div>
                  <v-card-text class="px-5">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td width="20%"><b>Nama:</b></td>
                          <td>{{ asesor.nama }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Skema:</b></td>
                          <td>{{ asesor.skema != null ? asesor.skema.skema : '' }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Email:</b></td>
                          <td>{{ asesor.user.email }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>No Sertifikat:</b></td>
                          <td>{{ asesor.no_sertifikat }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </div>
              <div class="col-lg-8 col-xs-12 pt-md-0">
                <v-card
                  class="mx-auto"
                >
                  <v-card-title>
                    <span class="headline px-5">Edit Profil</span>

                    <v-spacer></v-spacer>
                    <v-btn
                      to="/asesor/profile"
                      outlined
                      color="primary"
                    >
                      <v-icon small class="mr-2">person</v-icon>
                      Informasi profil
                    </v-btn>
                    <!-- <v-menu bottom left>
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
                    </v-menu> -->
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col md="12" class="px-10 py-5">
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
                            <v-col md="6" class="py-0">
                              <label for=""><b>Nama Lengkap</b></label>
                              <v-text-field
                                v-model="input.nama"
                                class="mt-2"
                                label="Nama lengkap"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Skema</b></label>
                              <v-select
                                v-if="input.skema != null"
                                v-model="input.skema.id"
                                class="mt-2"
                                :items="skemas"
                                label="Pilih skema"
                                item-value="id" item-text="skema"
                                solo
                              />
                              <v-select
                                v-if="input.skema == null"
                                v-model="skema_id"
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
                                v-model="input.no_registrasi"
                                class="mt-2"
                                label="Nomor Registrasi"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Nomor Blanko</b></label>
                              <v-text-field
                                v-model="input.no_blanko"
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
                                v-model="input.alamat"
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
                                v-model="input.no_sertifikat"
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
                                    v-model="input.exp_sertifikat"
                                    class="mt-2"
                                    label="Exp. Sertifikat"
                                    solo
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="input.exp_sertifikat" no-title scrollable>
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
                              <v-row>
                                <v-col md="7">
                                  <v-card>
                                    <v-img
                                      v-if="input.image != null"
                                      :src="input.image"
                                      :lazy-src="input.image"
                                      aspect-ratio="1"
                                      class="grey lighten-2"
                                    ></v-img>
                                  </v-card>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col md="7">
                                  <v-text-field v-model="image.imageName" readonly label="Edit Foto" persistent-hint="PNG, JPG dengan maksimal 2MB" prepend-icon="mdi-camera" solo @click="pickImage"></v-text-field>
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
                              <v-row>
                                <v-col md="7">
                                  <v-card>
                                    <v-img
                                      v-if="input.ttd != null"
                                      :src="input.ttd"
                                      :lazy-src="input.ttd"
                                      aspect-ratio="1"
                                      class="white"
                                    ></v-img>
                                  </v-card>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col md="7">
                                  <v-btn block large color="primary" outlined dark @click="pickTtd"><v-icon left>edit</v-icon>Edit tanda tangan</v-btn>
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
                              @click="updateAsesor">
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
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </v-row>
          </div>
        </v-container>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { VERIFIKASI_PESERTA_MUTATION, UPDATE_ASESOR_MUTATION, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_SELF_ASESOR, GET_SKEMAS } from '@/constants/graphql'

export default {
  name: 'EditProfileAsesor',
  layout: 'App_asesor',
  data() {
    return {
      // peserta_id: this.$route.params.peserta,
      // headers: [
      //   { text: 'Syarat', value: 'syarat' },
      //   { text: 'Aksi', value: 'actions' },
      // ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      editDialog : false,
      items: [
        { title: 'Informasi Profil' , icon: 'person', link: '/asesor/profile'},
        //   { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
        //   { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      status: [
        {
          id: -1,
          status: 'Ditolak'
        },
        {
          id: 0,
          status: 'Belum'
        },
        {
          id: 1,
          status: 'Disetujui'
        }
      ],
      state: {
        skeleton: true,
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
      pesertas: {
        asesi: {
          image: null
        }
      },
      asesor: {},
      input: {},
      skemas: [],
      skema_id: null
    }
  },  
  async mounted() {
    await this.getselfAsesor()
    await this.getSkemas()
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.input.ttd = data
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
          this.input.image = fr.result
          this.image.imageFile = imageFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.input.image = null
        this.image.imageName = ''
        this.image.imageFile = ''
        this.image.imageUrl = null
      }
    },
    pickTtd() {
      // this.$refs.ttd.click();
      this.editDialog = true
    },
    onTtdSelected(e) {
      const ttdFile = e.target.files

      if(ttdFile[0] !== undefined) {
        this.ttd.ttdName = ttdFile[0].name
        if(this.ttd.ttdName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(ttdFile[0])
        fr.addEventListener('load', () => {
          this.ttd.ttdUrl = fr.result
          this.input.ttd = fr.result
          this.ttd.ttdFile = ttdFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.input.ttd = null
        this.ttd.ttdName = ''
        this.ttd.ttdFile = ''
        this.ttd.ttdUrl = null
      }
    },
    async updateAsesor(e) {
      const { state: { loading } } = this

      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const { input: {nama, no_registrasi, no_sertifikat, no_blanko, exp_sertifikat, alamat} } = this.$data
        const user_id = null
        const skema_id = this.input.skema != null ? this.input.skema.id : this.skema_id
        const image = this.image.imageUrl
        const ttd = this.ttd.ttdUrl
        const result = await this.$apollo.mutate({
          mutation: UPDATE_ASESOR_MUTATION ,
          variables: {
            user_id, nama, skema_id, no_registrasi, no_sertifikat, no_blanko, exp_sertifikat, alamat, image, ttd
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data berhasil diubah')
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
          this.getselfAsesor
        })
      }
    },
    async getselfAsesor() {
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESOR
      }).then(({ data }) => {
        this.asesor = data.checkselfAsesor
        this.input = { ...this.asesor }
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
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
  }
}

</script>
<style lang="scss" scoped>
</style>
