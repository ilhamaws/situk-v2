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
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-data-table
                  :headers="headers"
                  :items="asesors"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                >
                  <template #item.actions="{ item }">
                    <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                      <v-btn rounded x-small color="primary">Detail</v-btn>
                    </nuxt-link>
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
import { GET_USERS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '@/constants/graphql'
import { GET_ASESORS } from '../../constants/graphql'

export default {
  name: 'Users',
  layout: 'App_admin',
  data() {
    return {
      search: '',
      profile: {
        username: ''
      },
      headers: [
        { text: 'id', value: 'id' },
        { text: 'Nama', value: 'name' },
        { text: 'Email', value: 'email' },
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
    async getAsesors() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_ASESORS
      }).then(({ data }) => {
        this.asesors = data.asesors
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
