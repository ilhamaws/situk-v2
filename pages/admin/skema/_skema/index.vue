<template>
  <v-layout
    column
    wrap
  >
    <v-card class="mb-5">
      <v-card-title class="font-weight-bold">
        Menu Skema
      </v-card-title>
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td width="10%"><b>Skema:</b></td>
                  <td>{{ skemas.skema }}</td>
                </tr>
                <tr>
                  <td width="10%"><b>Kode:</b></td>
                  <td>{{ skemas.kode }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col v-for="(menu, i) in menus" :key="i" cols="12" class="col-md-3 col-xs-12 col-sm-6">
        <v-card link dark :to="`/admin/skema/${skema_id}/${menu.link}`" color="primary" class="rounded-lg">
          <v-card-title>
            <p class="ma-0">{{ menu.menu }}</p>
          </v-card-title>
          <v-card-subtitle>
            {{ menu.desc }}
          </v-card-subtitle>
          <v-card-text class="d-flex justify-end align-center">
            <v-icon size="80">{{ menu.icon }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import { GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, DELETE_KRITERIAUK_MUTATION, UPDATE_KRITERIAUK_MUTATION, CREATE_KRITERIAUK_MUTATION } from '@/constants/graphql'
import { GET_ELEMENTS, GET_UNIT_KOMPETENSIS, GET_STANDARS, GET_KRITERIAUKS, GET_JADWALS_BYSKEMA } from '@/constants/graphql'

export default {
  name: 'Element',
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
      menus: [
        {menu:'Syarat', link:'syarat', desc:'Persyaratan wajib skema', icon:'fact_check', color:'primary'},
        {menu:'Jadwal', link:'jadwal', desc:'Jadwal uji skema', icon:'date_range', color:'warning'},
        {menu:'Unit Kompetensi', link:'unit-kompetensi', desc:'Daftar unit pada skema', icon:'toc', color:'success'},
        {menu:'Asesor', link:'asesor', desc:'Daftar asesor pada skema', icon:'people', color:'error'},
        {menu:'Bank Soal Observasi', link:'bank-soal', desc:'Kumpulan bank soal', icon:'inventory_2', color:'indigo'},
        {menu:'Soal Ujian Observasi', link:'soal-observasi', desc:'Soal yang akan dikerjakan', icon:'edit', color:'indigo'},
        {menu:'Dokumen Skema', link:'dokumen-skema', desc:'Dokumen yang akan dicetak offline', icon:'description', color:'indigo'},
      ],
      elements: [],
      skemas: [],
      unitkompetensis: [],
      kriteriauks: []
    }
  },
  mounted() {
    this.getElements()
    this.getkriteriauks()
    this.getSkemas()
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
      const id = this.skema_id
      const result = await this.$apollo.mutate({
        mutation: GET_JADWALS_BYSKEMA,
        variables: {
          id
        }
      }).then(({ data }) => {
        console.log(data)
        this.skemas = data.skema
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
