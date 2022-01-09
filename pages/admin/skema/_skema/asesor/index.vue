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
            <span class="headline px-5">Informasi Asesors</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" class="px-10 py-5">
              <div class="px-5 py-5">
                <v-form ref="form">
                  <v-row>
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
                </v-form>
                <v-data-table
                  :headers="headers"
                  :items="asesors.asesor"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog v-model="asesorDialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Edit Asesor</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="6">
                                <v-select
                                  v-model="editedAsesors.jadwal_id"
                                  :items="asesors.jadwal"
                                  label="Pilih Asesor*"
                                  item-value="id" item-text="tanggal"
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="asesorDialog = false">Batal</v-btn>
                          <v-btn color="blue darken-1" text @click="randomAsesor">Simpan</v-btn> 
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.actions="{ item }">
                    <v-btn rounded x-small color="primary" @click="editAsesor(item)">Detail</v-btn>
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
// import { GET_USERS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '@/constants/graphql';
import { GET_ASESORS_BYSKEMA, RANDOM_ASESOR_MUTATION } from '@/constants/graphql'

export default {
  name: 'Users',
  layout: 'App_admin',
  data() {
    return {
      asesorDialog: false,
      id: this.$route.params.skema,
      search: '',
      profile: {
        username: ''
      },
      editedIndex: -1,
      editedAsesors: {
        id: '',
        jadwal_id: null
      },
      headers: [
        { text: 'id', value: 'id' },
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'user.email' },
        { text: 'no_registrasi', value: 'no_registrasi' },
        { text: 'Alamat', value: 'alamat' },
        { text: 'Aksi', value: 'actions' },
      ],
      form: {
      },
      asesors: [
      ]
    }
  },
  mounted() {
    this.getAsesors()
  },
  methods: {
    editAsesor(item) {
      this.editedIndex = this.asesors.jadwal.indexOf(item)
      this.editedAsesors= Object.assign({}, item)
      this.asesorDialog = true
    },
    async randomAsesor() {
      const asesors = this.asesors.asesor
      const asesor_id = Object.keys(asesors).map(function(key) {
        return asesors[key].id
      })
      console.log(asesor_id)
      const jadwal_id = this.editedAsesors.jadwal_id
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: RANDOM_ASESOR_MUTATION,
        variables: {
          jadwal_id, asesor_id
        }
      }).then(({ data }) => {
        console.log(data)
        this.asesorDialog = false
      }).catch((error) => {
        console.log(error)
      })
    },
    async getAsesors() {
      const id = this.id
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_ASESORS_BYSKEMA,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.asesors = data.skema
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
