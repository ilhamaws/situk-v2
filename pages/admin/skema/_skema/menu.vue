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
            <span class="headline px-5">Kriteria Uji Kompetensi</span>
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
                <v-row justify="center">
                  <div class="col-lg-3">
                    <v-card color="blue darken-3" style="height: 200px; width: 200px;" to="/admin" link elevation="5">
                      <v-card-actions class="justify-center fill-height">
                        <v-list-item two-line dark>
                          <v-list-item-content class="text-center">
                            <v-list-item-title class="headline mb-2">
                              <v-icon size="50">date_range</v-icon>
                            </v-list-item-title>
                            <v-list-item-title>Jadwal</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </div>
                  <div class="col-lg-3">
                    <v-card color="orange lighten-1" style="height: 200px; width: 200px;" link elevation="5">
                      <v-card-actions class="justify-center fill-height">
                        <v-list-item two-line dark>
                          <v-list-item-content class="text-center">
                            <v-list-item-title class="headline mb-2">
                              <v-icon size="50">date_range</v-icon>
                            </v-list-item-title>
                            <v-list-item-title>Jadwal</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </div>
                  <div class="col-lg-3">
                    <v-card color="pink darken-3" style="height: 200px; width: 200px;" link elevation="5">
                      <v-card-actions class="justify-center fill-height">
                        <v-list-item two-line dark>
                          <v-list-item-content class="text-center">
                            <v-list-item-title class="headline mb-2">
                              <v-icon size="50">date_range</v-icon>
                            </v-list-item-title>
                            <v-list-item-title>Jadwal</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card-actions>
                    </v-card>
                  </div>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_SKEMAS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, DELETE_KRITERIAUK_MUTATION, UPDATE_KRITERIAUK_MUTATION, CREATE_KRITERIAUK_MUTATION } from '@/constants/graphql'
import { GET_ELEMENTS, GET_UNIT_KOMPETENSIS, GET_STANDARS, GET_KRITERIAUKS } from '@/constants/graphql'

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
        { text: 'Kriteria', value: 'kriteria' },
        { text: 'Elemen', value: 'element.elemen' }, 
        { text: 'Aksi', value: 'actions' },
      ],
      editedIndex: -1,
      editedKriteriaUk: {
        id: '',
        kriteria: '',
        flag: '',
        element: {
          id: ''
        }
      },
      dateMenu: false,
      deletedIndex: -1,
      deletedUnit: {},
      deletedKriteriaUk: {},
      form: {
        kriteria: '',
        element_id: ''
      },
      elements: [],
      skemas: [],
      unitkompetensis: [],
      kriteriauks: []
    }
  },
  mounted() {
    this.getElements()
    this.getkriteriauks()
    //   this.getStandars();
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.kriteriauks.indexOf(item)
      this.editedKriteriaUk = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.deletedIndex = this.kriteriauks.indexOf(item)
      this.deletedKriteriaUk = Object.assign({}, item)
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
    async getkriteriauks() {
      const result = await this.$apollo.mutate({
        mutation: GET_KRITERIAUKS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.kriteriauks = data.kriteriauks
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
    async createdKriteriaUk() {
      this.alert.show = false
      const { form: {kriteria, element_id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_KRITERIAUK_MUTATION,
        variables: {
          kriteria, element_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Kriteria baru berhasil dibuat')
        this.getkriteriauks()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateKriteriaUk() {
      this.alert.show = false
      const { editedKriteriaUk: {kriteria, id, flag} } = this.$data
      const element_id = this.editedKriteriaUk.element.id
      const result = await this.$apollo.mutate({
        mutation: UPDATE_KRITERIAUK_MUTATION,
        variables: {
          id, kriteria, element_id, flag
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Unit berhasil dirubah')
        this.state.skeleton = true
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.getkriteriauks()
        this.state.skeleton = false
        this.editDialog = false
      })
    },
    async deleteElement() {
      this.alert.show = false
      const { deletedKriteriaUk: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_KRITERIAUK_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Kriteria berhasil dihapus')
        this.state.skeleton = true
        this.getkriteriauks()
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
