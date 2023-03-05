<template>
    <div class="page-content-wrapper-inner">
        <v-snackbar
        v-model="alert.show"
        :color="alert.type"
        :timeout="0"
        top
        dense
        >
        {{ alert.message }}
        <template v-slot:action="{ attrs }">
            <v-btn
            dark
            text
            fab
            v-bind="attrs"
            @click="alert.show = false"
            >
            <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
        </v-snackbar>
      <section>
        <v-layout
          column
          wrap
        >
          <v-card>
            <v-card-title>
              <!-- <v-avatar size="30" color="warning lighten-2">
              <span class="white--text">APL.1</span>
            </v-avatar> -->
              <span class="font-weight-bold">Dokumen Skema</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-simple-table>
                    <tbody>
                      <tr>
                        <td width="10%"><b>Skema:</b></td>
                        <td>{{ skema.skema }}</td>
                      </tr>
                      <tr>
                        <td width="10%"><b>Kode:</b></td>
                        <td>{{ skema.kode }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
            </v-card-text>
            <v-card-text>
                <v-dialog v-model="tambahDialog" persistent max-width="600px">
                    <template #activator="{ on }">
                        <v-btn color="primary" outlined dark v-on="on">Tambah dokumen</v-btn>
                    </template>
                    <v-form ref="add_dokumen_form">
                    <v-card>
                        <v-card-title>
                            <b>Tambah Dokumen Skema</b>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field outlined dense v-model="form.name" label="Nama Dokumen" required></v-text-field>
                                <v-text-field outlined dense v-model="form.keterangan" label="Keterangan" required></v-text-field>
                                <v-text-field outlined dense :label="'Upload Dokumen .pdf'" :value="dokumen.dokumenName" prepend-icon="attach_file" @click="pickDokumen"></v-text-field>
                                <input
                                  ref="dokumen"
                                  type="file"
                                  style="display: none"
                                  accept="application/pdf"
                                  @change="function (e) { onDokumenSelected(type = 'tambah', e) }"
                                >
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                        <v-btn :disabled="state.loading" color="blue darken-1" text @click="createDokumenSkema">Tambah dokumen</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-form>
                </v-dialog>
                <v-skeleton-loader
                    v-if="state.skeleton"
                    ref="skeleton"
                    type="table-thead, table-tbody"
                    class="mx-auto"
                  ></v-skeleton-loader>
                  <v-data-table
                    v-if="!state.skeleton"
                    :headers="headers"
                    :items="skema.dokumenSkema"
                    :search="search"
                    :items-per-page="5"
                    :line-numbers="true"
                  >
                    <template #top>
                      <v-dialog v-model="editDialog" persistent max-width="600px">
                        <v-form ref="update_dokumen_form">
                          <v-card>
                            <v-card-title>
                              <span class="text-weight-bold">Edit Dokumen Skema</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="editedDokumen.name" outlined label="Nama Dokumen" required></v-text-field>
                                    <v-text-field v-model="editedDokumen.keterangan" outlined label="Nama Dokumen" required></v-text-field>
                                    <v-text-field outlined dense :label="'Upload Dokumen .pdf'" :value="dokumen.dokumenName" prepend-icon="attach_file" @click="pickDokumen"></v-text-field>
                                    <input
                                      ref="dokumen"
                                      type="file"
                                      style="display: none"
                                      accept="application/pdf"
                                      @change="function (e) { onDokumenSelected(type = 'edit', e) }"
                                    >
                                  </v-col>
                                  <v-col cols="12" sm="12" md="12" class="pt-0">
                                    <label>Status</label>
                                    <v-radio-group v-model="editedDokumen.flag" row>
                                      <v-radio label="Aktif" :value="1"></v-radio>
                                      <v-radio label="Non Aktif" :value="0"></v-radio>
                                    </v-radio-group>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <small>*Wajib diisi</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                              <v-btn :disabled="state.loading" color="blue darken-1" text @click="updateDokumenSkema">Edit Syarat</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-form>
                      </v-dialog>
                      <v-dialog v-model="deleteDialog" persistent max-width="600px">
                        <v-card>
                          <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>
  
                          <v-card-text>
                            Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
                          </v-card-text>
  
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="grey" text @click="deleteDialog = false">Batal</v-btn>
                            <v-btn color="red darken-1" text @click="deleteUnitKompetensi">Delete Unit</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </template>
                    <template #item.unit="{ item }">
                      <nuxt-link :to="`/admin/unit-kompetensi/${item.id}`">
                        <span>{{ item.unit }}</span>
                      </nuxt-link>
                    </template>
                    <template #item.flag="{ item }">
                      <v-chip v-if="item.status != 0" small color="success">Aktif</v-chip>
                      <v-chip v-else small color="red darken-1" dark>Non Aktif</v-chip>
                    </template>
                    <template #item.actions="{ item }">
                      <v-btn class="mr-2" icon small :href="item.file" v-on="on">
                        <v-icon small>
                          cloud_download
                        </v-icon>
                      </v-btn>
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
                    </template>
                </v-data-table>
            </v-card-text>
          </v-card>
        </v-layout>
      </section>
    </div>
  
  </template>
<script>
import { GET_SKEMAS, GET_USERDATA, GET_STANDARS, GET_SKEMA_BYID, GET_SYARATS, DELETE_UNITKOMPETENSI_MUTATION, UPDATE_SYARAT_MUTATION, CREATE_SYARAT_MUTATION } from '@/constants/graphql'
import { CREATE_DOKUMEN_SKEMA_MUTATION, UPDATE_DOKUMEN_SKEMA_MUTATION } from '../../../../../constants/graphql'
  
export default {
  name: 'UnitKompetensi',
  layout: 'App_admin',
  data() {
    return {
      skema_id: this.$route.params.skema,
      date: new Date().toISOString().substr(0, 10),
      state:{
        skeleton: true,
        loading: false,
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      tambahDialog: false,
      editDialog: false,
      deleteDialog: false,
      profile: {
        username: ''
      },
      headers: [
        { text: 'Nama Dokumen', value: 'name' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Status', value: 'flag' },
        { text: 'Aksi', value: 'actions' },
      ],
      flags: [
        { text: 'Aktif', value: 1 },
        { text: 'Non-Aktif', value: 0 },
      ],
      editedIndex: -1,
      editedUnit: {
        id: '',
        kode: '',
        unit: '',
        tahun: '',
        skema: {
          id: ''
        },
        standar: {
          id: ''
        }
      },
      editedDokumen: {
        name: '',
        keterangan: '',
        flag: 1
      },
      dateMenu: false,
      deletedIndex: -1,
      deletedUnit: {},
      form: {
        syarat: ''
      },
      skema: [],
      skemas: [],
      unitkompetensis: [],
      standars: [],
      dokumen: {
        dokumenName: '',
        dokumenFile: '',
        dokumenUrl: null
      },
      form: {
        skema_id : this.$route.params.skema,
        name: null,
        keterangan: null,
        file: '',
        flag: 1,
      },
    }
  },
  mounted() {
    //   this.getunitKompetensis();
    this.getSkema()
    //   this.getStandars();
  },
  methods: {
    pickDokumen() {
      this.$refs.dokumen.click()
    },
    onDokumenSelected(type, e) {
      const dokumenFile = e.target.files

      if(dokumenFile[0] !== undefined) {
        this.dokumen.dokumenName = dokumenFile[0].name
        if(this.dokumen.dokumenName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(dokumenFile[0])
        fr.addEventListener('load', () => {
          if (type == 'tambah') {
            this.form.file = fr.result
          } 
          if (type == 'edit'){
            this.dokumen.dokumenUrl = fr.result
          }
          this.dokumen.dokumenFile = dokumenFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.dokumen.dokumenName = ''
        this.dokumen.dokumenFile = ''
        this.dokumen.dokumenUrl = ''
      }
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.skema.syarat.indexOf(item)
      this.editedDokumen = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.deletedIndex = this.unitkompetensis.indexOf(item)
      this.deletedUnit = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getTuks() {
      const result = await this.$apollo.mutate({
        mutation: GET_TUKS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.tuks = data.tempatuks
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getunitKompetensis() {
      const id = this.skema_id
      const result = await this.$apollo.mutate({
        mutation: GET_UNIT_KOMPETENSIS_BYSKEMA,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.unitkompetensis = data.skema.unitKompetensi
        this.skema = data.skema
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getSkema() {
      const id = this.skema_id
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMA_BYID,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.skema = data.skema
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
        this.state.loading = false
      })
    },
    async getStandars() {
      const result = await this.$apollo.mutate({
        mutation: GET_STANDARS
      }).then(({ data }) => {
        this.standars = data.standars
      }).catch((error) => {
        console.log(error)
      })
    },
    async createDokumenSkema() {
      this.state.loading = true
      this.$refs.add_dokumen_form.validate()
      if (!this.$refs.add_dokumen_form.validate()) {
        this.state.loading = false
        return 
      }
      this.alert.show = false
      const { form: {skema_id, name, keterangan, flag, file} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_DOKUMEN_SKEMA_MUTATION,
        variables: {
          skema_id, name, keterangan, flag, file
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Dokumen baru berhasil ditambahkan')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async createSyarat() {
      this.alert.show = false
      const skema_id = this.skema.id
      const { form: {syarat} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_SYARAT_MUTATION,
        variables: {
          syarat, skema_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Syarat baru berhasil dibuat')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
        this.state.loading = false
      })
    },
    async updateSyarat() {
      this.alert.show = false
      // const skema_id = this.skema.id;
      const { editedSyarat: {syarat, status, id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_SYARAT_MUTATION,
        variables: {
          syarat, id, status
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Syarat berhasil diupdate')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async updateDokumenSkema() {
      this.state.loading = true
      this.$refs.update_dokumen_form.validate()
      if (!this.$refs.update_dokumen_form.validate()) {
        this.state.loading = false
        return 
      }
      this.alert.show = false
      const { editedDokumen: {id, name, keterangan, flag} } = this.$data
      const skema_id = this.skema_id
      const file = this.dokumen.dokumenUrl
      const result = await this.$apollo.mutate({
        mutation: UPDATE_DOKUMEN_SKEMA_MUTATION,
        variables: {
          id, skema_id, file, name, keterangan, flag
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data dokumen berhasil diperbarui')
        this.getSkema()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
        this.state.loading = false
      })
    },
    async deleteUnitKompetensi() {
      this.alert.show = false
      const { deletedUnit: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_UNITKOMPETENSI_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit berhasil dihapus')
        this.getunitKompetensis()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
  }
}
  
</script>
  <style lang="scss" scoped>
  </style>
  