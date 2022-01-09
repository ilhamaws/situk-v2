<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
        class="my-4"
      >
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-card>
              <v-card-title>
                <!-- <v-avatar size="30" color="warning lighten-2">
                  <span class="white--text">APL.1</span>
                </v-avatar> -->
                <span class="headline px-5">Informasi Asesis</span>
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
                      :items="asesis"
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
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_USERS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '@/constants/graphql'
import { GET_ASESIS } from '../../constants/graphql'

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
        { text: 'NIK', value: 'nik' },
        { text: 'Nama', value: 'nama' },
        { text: 'Telepon', value: 'telepon' },
        { text: 'Alamat', value: 'alamat' },
        { text: 'Aksi', value: 'actions' },
      ],
      asesis: [
      ]
    }
  },
  mounted() {
    this.getTuks()
  },
  methods: {
    async getTuks() {
      const user_id = localStorage.getItem('lsp-user-id')
      const result = await this.$apollo.mutate({
        mutation: GET_ASESIS
      }).then(({ data }) => {
        // this.items = data.checkselfAsesi.peserta;
        this.asesis = data.asesis
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
