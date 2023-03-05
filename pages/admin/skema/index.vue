<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-card>
          <v-card-title class="font-weight-bold">
            <!-- <v-avatar size="30" color="warning lighten-2">
              <span class="white--text">APL.1</span>
            </v-avatar> -->
            Informasi Skema
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
                <v-row>
                  <v-dialog v-model="tambahDialog" persistent max-width="600px">
                    <template #activator="{ on }">
                      <v-btn color="primary" outlined dark v-on="on">Tambah Skema</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="font-weight-bold">Tambah Skema</span>
                      </v-card-title>
                      <v-card-text>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field outlined dense v-model="form.skema" label="Nama Skema*" :rules="required" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field outlined dense v-model="form.kode" label="Kode*" :rules="required" hint="Masukkan kode skema"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field outlined dense v-model="form.kategori" label="Kategori*" :rules="required" hint="Masukkan Kategori skema"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field outlined dense v-model="form.bidang" label="Bidang*" :rules="required" hint="Masukkan vbidang skema"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  outlined
                                  dense
                                  v-model="form.mea"
                                  :rules="required"
                                  :items="meas"
                                  label="MEA*"
                                />
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  outlined
                                  dense
                                  v-model="form.default_tuk"
                                  :rules="required"
                                  :items="tuks"
                                  label="Tempat Uji Kompetensi (TUK)*"
                                  item-value="id" item-text="nama"
                                />
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field outlined dense :label="'Upload Panduan .pdf'" :value="panduan.panduanName" prepend-icon="attach_file" @click="pickPanduan"></v-text-field>
                                <input
                                  ref="panduan"
                                  type="file"
                                  style="display: none"
                                  accept="application/pdf"
                                  @change="function (e) { onPanduanSelected(type = 'tambah', e) }"
                                >
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-form>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="tambahDialog = false, panduan.panduanName = '', panduan.panduanFile = '', panduan.panduanUrl = null">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="createSkema">Tambah Skema</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <!-- <v-btn 
                    color="primary"
                    outlined
                    rounded
                  >Tambah Skema</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    class="shrink"
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
                <v-skeleton-loader
                  v-if="state.skeleton"
                  ref="skeleton"
                  type="table-thead, table-tbody"
                  class="mx-auto"
                >
                </v-skeleton-loader>
                <v-data-table
                  v-if="!state.skeleton"
                  :width="headers.width"
                  :headers="headers"
                  :items="skemas"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="font-weight-bold">Edit Skema</span>
                        </v-card-title>
                        <v-card-text>
                          <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                          >
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field outlined dense v-model="editedSkemas.skema" :rules="required" label="Nama Skema*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field outlined dense v-model="editedSkemas.kode" :rules="required" label="Kode*" hint="Masukkan kode sesuai skema"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-text-field outlined dense v-model="editedSkemas.kategori" :rules="required" label="Kategori*" hint="Masukkan kategori skema"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field outlined dense v-model="editedSkemas.bidang" :rules="required" label="Bidang*" hint="Masukkan bidang skema"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <v-select
                                    v-model="editedSkemas.mea"
                                    :rules="required"
                                    :items="meas"
                                    label="MEA*"
                                  />
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                  <div v-if="editedSkemas.tempatUk != null">
                                    <v-select
                                      outlined
                                      dense
                                      v-model="editedSkemas.tempatUk.id"
                                      :rules="required"
                                      :items="tuks"
                                      label="Tempat Uji Kompetensi (TUK)*"
                                      item-value="id" item-text="nama"
                                    />
                                  </div>
                                  <div v-else>
                                    <v-select
                                      outlined
                                      dense
                                      v-model="editedSkemas.tempatUk"
                                      :rules="required"
                                      :items="tuks"
                                      label="Tempat Uji Kompetensi (TUK)*"
                                      item-value="id" item-text="nama"
                                    />
                                  </div>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                  <v-text-field outlined dense :label="'Upload Panduan .pdf'" :value="panduan.panduanName" prepend-icon="attach_file" @click="pickPanduan"></v-text-field>
                                  <input
                                    ref="panduan"
                                    type="file"
                                    style="display: none"
                                    accept="application/pdf"
                                    @change="function (e) { onPanduanSelected(type = 'edit', e) }"
                                  >
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false, panduan.panduanName = '', panduan.panduanFile = '', panduan.panduanUrl = null">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateSkema">Edit Skema</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog v-model="deleteDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title class="font-weight-bold">Apakah anda yakin menghapus Data?</v-card-title>

                        <v-card-text>
                          Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="deleteDialog = false">Batal</v-btn>
                          <v-btn color="red darken-1" text @click="deleteSkema">Delete Skema</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.skema="{ item }">
                    <nuxt-link :to="`/admin/skema/${item.id}`">
                      <span>{{ item.skema }}</span>
                    </nuxt-link>
                  </template>
                  <template #item.actions="{ item }">
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  <!-- <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                    <v-btn rounded x-small color="primary">Detail</v-btn>
                  </nuxt-link> -->
                  </template>
                </v-data-table>
                <!-- <v-data-table
                      headers="headers"
                      items="items"
                      hide-actions
                      class="elevation-1"
                      select-all
                      :items-per-page="5"
                      item-key="id"
                      loading="true"
                      search="search"
                  >
                  </v-data-table> -->
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_TUKS, CREATE_SKEMA_MUTATION, UPDATE_SKEMA_MUTATION, DELETE_SKEMA_MUTATION } from '@/constants/graphql'

export default {
  name: 'Skemas',
  layout: 'App_admin',
  data() {
    return {
      state:{
        skeleton: true
      },
      valid: true,
      type: '',
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      deleteDialog: false,
      tambahDialog: false,
      editDialog: false,
      profile: {
        username: ''
      },
      editedIndex: -1,
      editedSkemas: {
        id: '',
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: null,
        tempatUk: [],
        mea: ''
      },
      deletedIndex: -1,
      deletedSkemas: {
        id: '',
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: null,
        tempatUk: [],
        mea: ''
      },
      defaultSkemas: {
        id: '',
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: '', 
        default_tuk: null, 
        mea: ''
      },
      form: {
        kode: '',
        skema: '', 
        kategori: '', 
        bidang: '', 
        panduan: '', 
        default_tuk: null, 
        mea: ''
      },
      panduan: {
        panduanName: '',
        panduanFile: '',
        panduanUrl: null
      },
      required: [
        value => !!value || 'Wajib diisi.',
      ],
      headers: [
        { text: 'Nama Skema', value: 'skema', width: '20%' },
        { text: 'Kode', value: 'kode', width: '10%' },
        { text: 'Kategori', value: 'kategori', width: '10%' },
        { text: 'Bidang', value: 'bidang', width: '10%' },
        { text: 'MEA', value: 'mea', width: '10%' },
        { text: 'Aksi', value: 'actions', width: '10%'},
      ],
      tuks: [],
      meas: ['Mea', 'None Mea'],
      skemas: [
      ]
    }
  },
  mounted() {
    this.getSkema()
    this.getTuks()
  },
  methods: {
    onPanduanSelected(type, e) {
      const panduanFile = e.target.files

      if(panduanFile[0] !== undefined) {
        this.panduan.panduanName = panduanFile[0].name
        if(this.panduan.panduanName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(panduanFile[0])
        fr.addEventListener('load', () => {
          if (type == 'tambah') {
            this.form.panduan = fr.result
          } 
          if (type == 'edit'){
            this.panduan.panduanUrl = fr.result
          }
          this.panduan.panduanFile = panduanFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.panduan.panduanName = ''
        this.panduan.panduanFile = ''
        this.panduan.panduanUrl = ''
      }
    },
    pickPanduan() {
      this.$refs.panduan.click()
    },
    editItem(item) {
      this.editedIndex = this.skemas.indexOf(item)
      this.editedSkemas = Object.assign({}, item)
      if (this.editedSkemas.tempatUk == null) {
        this.editedSkemas.tempatUk = Object.assign({}, {id: null})
      }
      this.editDialog = true
    },
    async deleteItem(item){
      this.deletedIndex = this.skemas.indexOf(item)
      this.deletedSkemas = Object.assign({}, item)
      if (this.deletedSkemas.tempatUk == null) {
        this.deletedSkemas.tempatUk = Object.assign({}, {id: ''})
      }
      this.deleteDialog = true
    },
    async getSkema() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMAS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.skemas = data.skemas
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getTuks() {
      const result = await this.$apollo.mutate({
        mutation: GET_TUKS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.tuks = data.tempatuks
      }).catch((error) => {
        console.log(error)
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async createSkema() {
      this.$refs.form.validate()
      if (!this.$refs.form.validate()) {
        this.state.loading = false
        return 
      }
      this.alert.show = false
      const { form: {kode, skema, kategori, bidang, panduan, default_tuk, mea} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_SKEMA_MUTATION,
        variables: {
          kode, skema, kategori, bidang, panduan, default_tuk, mea
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Skema baru berhasil dibuat')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateSkema() {
      this.$refs.form.validate()
      if (!this.$refs.form.validate()) {
        this.state.loading = false
        return 
      }
      this.alert.show = false
      const { editedSkemas: {id, kode, skema, kategori, bidang, mea} } = this.$data
      const panduan = this.panduan.panduanUrl
      const default_tuk = this.editedSkemas.tempatUk.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_SKEMA_MUTATION,
        variables: {
          id, kode, skema, kategori, bidang, panduan, default_tuk, mea
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data skema berhasil diperbarui')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteSkema() {
      this.alert.show = false
      const id = this.deletedSkemas.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_SKEMA_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data skema berhasil dihapus')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
