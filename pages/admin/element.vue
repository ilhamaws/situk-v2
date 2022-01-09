<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
        class="container container--fluid px-10 py-10"
      >
        <v-card>
          <v-card-title>
            <!-- <v-avatar size="30" color="warning lighten-2">
            <span class="white--text">APL.1</span>
          </v-avatar> -->
            <span class="headline px-5">Element</span>
            <v-spacer></v-spacer>
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
                      <v-btn color="primary" outlined rounded dark v-on="on">Tambah</v-btn>
                    </template>
                    <v-form>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Tambah Elemen</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="form.elemen" label="Nama Element" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="form.unit_kompetensi_id"
                                  :items="unitkompetensis"
                                  label="Unit Kompetensi*"
                                  item-value="id" item-text="unit"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="tambahDialog = false">Close</v-btn>
                          <v-btn color="blue darken-1" text @click="createElement">Tambah Elemen</v-btn>
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
                  :items="elements"
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
                              <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedElement.elemen" label="Nama Element" required></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="editedElement.unitKompetensi.id"
                                  :items="unitkompetensis"
                                  label="Unit Kompetensi*"
                                  item-value="id" item-text="unit"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*Wajib diisi</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="updateElement">Edit Unit</v-btn>
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
                          <v-btn color="red darken-1" text @click="deleteElement">Delete Elemen</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.kriteriaUk="{ item }">
                    <span v-for="kriteria in item.kriteriaUk" :key="kriteria.kriteria">{{ kriteria.kriteria }}, </span>
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
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, DELETE_ELEMENT_MUTATION, UPDATE_ELEMENT_MUTATION, CREATE_ELEMENT_MUTATION } from '@/constants/graphql'
import { GET_ELEMENTS, GET_UNIT_KOMPETENSIS, GET_STANDARS } from '../../constants/graphql'

export default {
  name: 'Element',
  layout: 'App_admin',
  data() {
    return {
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
        { text: 'Elemen', value: 'elemen' },
        { text: 'Unit', value: 'unitKompetensi.unit' }, 
        { text: 'Aksi', value: 'actions' },
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
      editedElement: {
        id: '',
        elemen: '',
        flag: '',
        unitKompetensi: {
          id: ''
        }
      },
      dateMenu: false,
      deletedIndex: -1,
      deletedUnit: {},
      deletedElement: {},
      form: {
        elemen: '',
        unit_kompetensi_id: ''
      },
      elements: [],
      skemas: [],
      unitkompetensis: [],
      standars: []
    }
  },
  mounted() {
    this.getunitKompetensis()
    this.getElements()
    //   this.getSkemas();
    //   this.getStandars();
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.elements.indexOf(item)
      this.editedElement = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.deletedIndex = this.elements.indexOf(item)
      this.deletedElement = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getElements() {
      const result = await this.$apollo.mutate({
        mutation: GET_ELEMENTS
      }).then(({ data }) => {
        this.elements = data.elements
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async getunitKompetensis() {
      const result = await this.$apollo.mutate({
        mutation: GET_UNIT_KOMPETENSIS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.unitkompetensis = data.unitkompetensis
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
    async getStandars() {
      const result = await this.$apollo.mutate({
        mutation: GET_STANDARS
      }).then(({ data }) => {
        this.standars = data.standars
      }).catch((error) => {
        console.log(error)
      })
    },
    async createElement() {
      this.alert.show = false
      const { form: {elemen, unit_kompetensi_id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_ELEMENT_MUTATION,
        variables: {
          elemen, unit_kompetensi_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Elemen baru berhasil dibuat')
        this.getElements()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateElement() {
      this.alert.show = false
      const { editedElement: {id, elemen, flag} } = this.$data
      const unit_kompetensi_id = this.editedElement.unitKompetensi.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_ELEMENT_MUTATION,
        variables: {
          id, elemen, unit_kompetensi_id, flag
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit berhasil dirubah')
        this.state.skeleton = true
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.getElements()
        this.state.skeleton = false
        this.editDialog = false
      })
    },
    async deleteElement() {
      this.alert.show = false
      const { deletedElement: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_ELEMENT_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit berhasil dihapus')
        this.state.skeleton = true
        this.getElements()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.deleteDialog = false
      })
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
