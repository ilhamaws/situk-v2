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
            <span class="font-weight-bold">Syarat Wajib Skema</span>
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
                      <v-btn color="primary" outlined dark v-on="on">Tambah Syarat</v-btn>
                    </template>
                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Syarat</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="form.syarat" label="Syarat Skema" required></v-text-field>
                              </v-col>
                            <!-- <v-col cols="12" sm="6" md="6">
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
                            </v-col> -->
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
                          <v-btn color="blue darken-1" text @click="createSyarat">Tambah Syarat</v-btn>
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
                  :items="skema.syarat"
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
                                <v-text-field v-model="editedSyarat.syarat" label="Syarat Skema" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" class="pt-0">
                                <label>Status</label>
                                <v-radio-group v-model="editedSyarat.status" row>
                                  <v-radio label="Aktif" :value="1"></v-radio>
                                  <v-radio label="Non Aktif" :value="0"></v-radio>
                                </v-radio-group>
                              </v-col>
                              <!-- <v-col cols="12" sm="6" md="6">
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
                          </v-col> -->
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateSyarat">Edit Syarat</v-btn>
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
                  <template #item.status="{ item }">
                    <v-chip v-if="item.status != 0" small color="success">Aktif</v-chip>
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
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, GET_STANDARS, GET_SKEMA_BYID, GET_SYARATS, DELETE_UNITKOMPETENSI_MUTATION, UPDATE_SYARAT_MUTATION, CREATE_SYARAT_MUTATION } from '@/constants/graphql'

export default {
  name: 'UnitKompetensi',
  layout: 'App_admin',
  data() {
    return {
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
        { text: 'Syarat', value: 'syarat' },
        { text: 'Status', value: 'status' },
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
      editedSyarat: {
        syarat: '',
        status: ''
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
      standars: []
    }
  },
  mounted() {
    //   this.getunitKompetensis();
    this.getSkema()
    //   this.getStandars();
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.skema.syarat.indexOf(item)
      this.editedSyarat = Object.assign({}, item)
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
