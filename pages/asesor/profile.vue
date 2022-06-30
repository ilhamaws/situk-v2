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
                    <a :href="asesor.image" target="_blank">
                      <v-avatar
                        class="mt-5 ml-5"
                        size="125"
                        style="border-radius: .42rem;"
                        tile
                      >
                        <v-img v-if="asesor.image != null" :src="asesor.image"></v-img>
                      </v-avatar>
                    </a>
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
                    <span class="headline px-5">Informasi Profil</span>

                    <v-spacer></v-spacer>

                    <v-btn
                      to="/asesor/edit-profile"
                      outlined
                      color="primary"
                    >
                      <v-icon small class="mr-2">edit</v-icon>
                      Edit profil
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
                                v-model="asesor.nama"
                                class="mt-2"
                                label="Nama lengkap"
                                type="text"
                                solo
                                readonly
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Skema</b></label>
                              <v-text-field
                                v-model="asesor.skema.skema"
                                class="mt-2"
                                label="Nama Skema"
                                type="text"
                                solo
                                readonly
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Nomor Registrasi</b></label>
                              <v-text-field
                                v-model="asesor.no_registrasi"
                                class="mt-2"
                                label="Nomor Registrasi"
                                type="text"
                                solo
                                readonly
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Nomor Blanko</b></label>
                              <v-text-field
                                v-model="asesor.no_blanko"
                                class="mt-2"
                                label="Nomor Blanko"
                                type="text"
                                solo
                                readonly
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="12" class="py-0">
                              <label for=""><b>Alamat</b></label>
                              <v-text-field
                                v-model="asesor.alamat"
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
                              <label for=""><b>Nomor Sertifikat</b></label>
                              <v-text-field
                                v-model="asesor.no_sertifikat"
                                class="mt-2"
                                label="Nomor Sertifikat"
                                type="text"
                                solo
                                readonly
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Exp. Sertifikat</b></label>
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
                                    v-model="asesor.exp_sertifikat"
                                    class="mt-2"
                                    label="Exp. Sertifikat"
                                    solo
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="asesor.exp_sertifikat" no-title scrollable>
                                  <v-spacer></v-spacer>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Foto</b></label>
                              <v-row>
                                <v-col md="7">
                                  <v-card>
                                    <v-img
                                      v-if="asesor.image != null"
                                      :src="asesor.image"
                                      :lazy-src="asesor.image"
                                      aspect-ratio="1"
                                      class="grey lighten-2"
                                    ></v-img>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Tanda tangan</b></label>
                              <v-row>
                                <v-col md="7">
                                  <v-card>
                                    <v-img
                                      v-if="asesor.image != null"
                                      :src="asesor.ttd"
                                      :lazy-src="asesor.ttd"
                                      aspect-ratio="1"
                                      class="white"
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
          </div>
        </v-container>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { VERIFIKASI_PESERTA_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_SELF_ASESOR } from '@/constants/graphql'

export default {
  name: 'ProfileAsesor',
  layout: 'App_asesor',
  data() {
    return {
      peserta_id: this.$route.params.peserta,
      headers: [
        { text: 'Syarat', value: 'syarat' },
        { text: 'Aksi', value: 'actions' },
      ],
      editDialog: false,
      items: [
        { title: 'Edit Profil' , icon: 'edit', link: '/asesor/edit-profile'},
        // { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
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
      asesor: {}
    }
  },  
  async mounted() {
    await this.getSelfAsesor()
  },
  methods: {
    //  get peserta
    async verifikasiPeserta() {
      this.alert.show = false
      const { pesertas: {id, status} } = this.$data
      const note = this.pesertas.note_apl1
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_PESERTA_MUTATION,
        variables: {
          id, status, note
        }
      }).then(({ data }) => {
        // this.showAlert('success', 'Peserta berhasil diverifikasi');
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        // this.showAlert('error', graphQLErrors[0].message);
      }).finally(() => {
        this.editDialog = false
      })
    },
    async getSelfAsesor() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESOR
      }).then(({ data }) => {
        this.asesor = data.checkselfAsesor
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
