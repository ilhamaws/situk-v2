<template>
  <div class="page-content-wrapper-inner">
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
            <span class="headline px-5">Unit Kompetensi</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-card-text class="px-10">
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
            </v-col>
            <v-col cols="12" class="px-10 pb-5">
              <div class="px-5">
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
                      <v-btn color="primary" outlined rounded dark v-on="on">Tambah Unit</v-btn>
                    </template>
                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Unit Kompetensi</span>
                        </v-card-title>
                        <v-card-text>
                          <vue-csv-import v-model="csv" :map-fields="['name', 'age']"></vue-csv-import>
                        </v-card-text>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.unit" label="Nama Unit Kompetensi" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="form.kode" label="Kode Unit*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="3" md="3">
                                <v-select
                                  v-model="form.standar_id"
                                  :items="standars"
                                  label="Standar*"
                                  item-value="id" item-text="standar"
                                />
                              </v-col>
                              <v-col cols="12" sm="3" md="3">
                                <v-text-field v-model="form.tahun" type="number" label="Tahun*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                            <!-- <v-col cols="12" sm="12" md="12">
                                <v-select
                                    disabled
                                    v-model="form.skema_id"
                                    :items="skemas"
                                    label="Skema*"
                                    item-value="id" item-text="skema"
                                />
                            </v-col> -->
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="createUnitKompetensi">Tambah Unit</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
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
                    rounded
                    outlined
                    dense
                  ></v-text-field>
                </v-row>
                <v-skeleton-loader
                  v-if="state.skeleton"
                  ref="skeleton"
                  type="table-thead, table-tbody"
                  class="mx-auto"
                ></v-skeleton-loader>
                <v-data-table
                  v-if="!state.skeleton"
                  :headers="headers"
                  :items="unitkompetensis"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="editDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Unit</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedUnit.unit" label="Nama Unit Kompetensi" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedUnit.kode" label="Kode Unit*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="3" md="3">
                                <v-select
                                  v-model="editedUnit.standar.id"
                                  :items="standars"
                                  label="Standar*"
                                  item-value="id" item-text="standar"
                                />
                              </v-col>
                              <v-col cols="12" sm="3" md="3">
                                <v-text-field v-model="editedUnit.tahun" type="number" label="Tahun*" hint="example of helper text only on focus"></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12">
                                <v-select
                                  v-model="editedUnit.skema.id"
                                  :items="skemas"
                                  label="Skema*"
                                  item-value="id" item-text="skema"
                                />
                              </v-col>
                              <v-col cols="6" sm="6" md="6">
                                <v-select
                                  v-model="editedUnit.flag"
                                  :items="flags"
                                  label="Status*"
                                  item-value="value" item-text="text"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateUnitKompetensi">Edit Unit</v-btn>
                        </v-card-actions>
                      </v-card>
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
                    <v-chip v-if="item.flag != 0" small color="success">Aktif</v-chip>
                    <v-chip v-else small color="red darken-1" dark>Non Aktif</v-chip>
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
      <!-- csv -->
        <!-- <div class="form-group csv-import-file">
                    <input ref="csv" type="file" :class="inputClass" name="csv">
                    <slot name="error" v-if="showErrorMessage">
                        <div class="invalid-feedback d-block">
                            File type is invalid
                        </div>
                    </slot>
                </div>
              <vue-csv-import
                  v-model="csv"
                  :map-fields="['name', 'age']">
              
                  <template slot="hasHeaders" slot-scope="{headers, toggle}">
                      <label>
                          <input type="checkbox" id="hasHeaders" :value="headers" @change="toggle">
                          Headers?
                      </label>
                  </template>
              
                  <template slot="error">
                      File type is invalid
                  </template>
              
                  <template slot="thead">
                      <tr>
                          <th>My Fields</th>
                          <th>Column</th>
                      </tr>
                  </template>
              
                  <template slot="next" slot-scope="{load}">
                      <v-btn type="submit" @click.prevent="loadcsv" color="success">Load</v-btn>
                  </template>
              
                  <template slot="submit" slot-scope="{submit}">
                      <button @click.prevent="submit">send!</button>
                  </template>
              </vue-csv-import> -->
        <!-- end csv -->
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, GET_STANDARS, GET_UNIT_KOMPETENSIS_BYSKEMA, GET_SYARATS, DELETE_UNITKOMPETENSI_MUTATION, UPDATE_UNITKOMPETENSI_MUTATION, CREATE_UNITKOMPETENSI_MUTATION } from '@/constants/graphql'

export default {
  name: 'UnitKompetensi',
  layout: 'App_admin',
  // components: { VueCsvImport },
  data() {
    return {
      csv: null,
      skema_id: this.$route.params.skema,
      date: new Date().toISOString().substr(0, 10),
      state:{
        skeleton: true
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
        { text: 'Unit', value: 'unit' },
        { text: 'Kode', value: 'kode' },
        { text: 'Status', value: 'flag' },
        { text: 'Standar', value: 'standar.standar' },
        { text: 'Tahun', value: 'tahun' },
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
      dateMenu: false,
      deletedIndex: -1,
      deletedUnit: {},
      form: {
        kode: '',
        unit: '',
        tahun: '',
        skema_id: '',
        standar_id: ''
      },
      skema: [],
      skemas: [],
      unitkompetensis: [],
      standars: []
    }
  },
  mounted() {
    this.getunitKompetensis()
    this.getSkemas()
    this.getStandars()
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.unitkompetensis.indexOf(item)
      this.editedUnit = Object.assign({}, item)
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
    async getSkemas() {
      const result = await this.$apollo.mutate({
        mutation: GET_SKEMAS
      }).then(({ data }) => {
        this.skemas = data.skemas
      }).catch((error) => {
        console.log(error)
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
    async createUnitKompetensi() {
      this.alert.show = false
      const { form: {kode, unit, tahun, standar_id} } = this.$data
      const skema_id = this.skema.id
      const result = await this.$apollo.mutate({
        mutation: CREATE_UNITKOMPETENSI_MUTATION,
        variables: {
          kode, unit, tahun, skema_id, standar_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit baru berhasil dibuat')
        this.getunitKompetensis()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateUnitKompetensi() {
      this.alert.show = false
      const { editedUnit: {id, kode, unit, tahun, flag} } = this.$data
      const skema_id = this.editedUnit.skema.id
      const standar_id = this.editedUnit.standar.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_UNITKOMPETENSI_MUTATION,
        variables: {
          id, kode, unit, tahun, skema_id, standar_id, flag
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit berhasil dirubah')
        this.getunitKompetensis()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
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
