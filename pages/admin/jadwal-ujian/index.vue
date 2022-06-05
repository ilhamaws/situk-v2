<template>
  <v-layout
    column
    wrap
  >
    <v-card class="rounded-lg">
      <v-card-subtitle class="font-weight-bold">
        <!-- <v-avatar size="30" color="warning lighten-2">
          <span class="white--text">APL.1</span>
        </v-avatar> -->
        Informasi Jadwal Ujian
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12">
          <v-card-text>
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
              <v-form ref="form">
                <v-row class="mb-3">
                  <v-dialog v-model="tambahDialog" persistent max-width="600px">
                    <template #activator="{ on }">
                      <v-btn color="primary" outlined dark v-on="on">Tambah jadwal ujian</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Tambah Jadwal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                outlined
                                dense
                                v-model="create_jadwal_ujian.paket_id"
                                :items="paket_ujians"
                                label="Paket Ujian"
                                item-value="id" item-text="paket"
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                id="id"
                                v-model="create_jadwal_ujian.name"
                                name="Nama"
                                label="Nama jadwal"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                id="id"
                                v-model="create_jadwal_ujian.keterangan"
                                name="Keterangan"
                                label="Keterangan"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                type="number"
                                v-model="create_jadwal_ujian.price"
                                name="Biaya Pendaftaran"
                                label="Biaya pendaftaran"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="create_jadwal_ujian.kuota"
                                label="Kuota"
                                type="number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="create_jadwal_ujian.tempat_ujian"
                                label="Tempat ujian"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <!-- date -->
                              <v-menu
                                ref="menu"
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="create_jadwal_ujian.tanggal"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template #activator="{ on }">
                                  <v-text-field
                                    outlined
                                    dense
                                    v-model="create_jadwal_ujian.tanggal"
                                    label="Tanggal ujian"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                              <!-- date -->
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="reset">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="createJadwalUjian">Tambah Jadwal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
              </v-form>
              <v-skeleton-loader
                v-if="state.skeleton"
                ref="skeleton"
                type="table-thead, table-tbody"
                class="mx-auto"
              ></v-skeleton-loader>
              <v-data-table
                v-if="!state.skeleton"
                :headers="headers"
                :items="jadwal_ujians"
                :search="search"
                :items-per-page="5"
                :line-numbers="true"
                :width="headers.width"
              >
                <template #top>
                  <v-dialog v-model="editDialog" persistent max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit Jadwal Ujian</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
                              <v-select
                                outlined
                                dense
                                v-model="update_jadwal_ujian.paket_id"
                                :items="paket_ujians"
                                label="Paket Ujian"
                                item-value="id" item-text="paket"
                              />
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                id="id"
                                v-model="update_jadwal_ujian.name"
                                name="Nama"
                                label="Nama jadwal"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                              <v-text-field
                                outlined
                                dense
                                id="id"
                                v-model="update_jadwal_ujian.keterangan"
                                name="Keterangan"
                                label="Keterangan"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="update_jadwal_ujian.kuota"
                                label="Kuota"
                                type="number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="update_jadwal_ujian.price"
                                label="Biaya pendaftaran"
                                type="number"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                outlined
                                dense
                                v-model="update_jadwal_ujian.tempat_ujian"
                                label="Tempat ujian"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <!-- date -->
                              <v-menu
                                ref="menu"
                                v-model="dateMenu2"
                                :close-on-content-click="false"
                                :return-value.sync="update_jadwal_ujian.tanggal"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template #activator="{ on }">
                                  <v-text-field
                                    outlined
                                    dense
                                    readonly
                                    v-model="update_jadwal_ujian.tanggal"
                                    label="Tanggal Uji Kompetensi"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="grey" @click="dateMenu2 = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                              <!-- date -->
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="updateJadwalUjian">Edit Jadwal</v-btn>
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
                        <v-btn color="red darken-1" text @click="deleteJadwalUjian">Delete Jadwal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template #item.name="{ item }">
                  <nuxt-link :to="`/admin/jadwal-ujian/${item.id}`">
                    <span>{{ item.name }}</span>
                  </nuxt-link>
                </template>
                <template #item.tempatUk.nama="{ item }">
                  <span v-if="item.tempatUk == null">-</span>
                  <span v-else>{{ item.tempatUk.nama }}</span>
                </template>
                <template #item.status="{ item }">
                  <v-chip v-if="item.status == 0" small color="red darken-1" dark>Batal</v-chip>
                  <v-chip v-if="item.status == 1" small color="primary">Aktif</v-chip>
                  <v-chip v-if="item.status == 2" small color="success" dark>Selesai</v-chip>
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
                </template>
                <template #item.skema.skema="{ item }">
                  <nuxt-link :to="`/admin/jadwal/${item.id}`">
                    <span>{{ item.skema.skema }}</span>
                  </nuxt-link>
                </template>
                <!-- <template #item.sisa="{ item }">
                  <v-chip v-if="countVerified(item) == 0" small color="red darken-1" dark>Penuh</v-chip>
                  <span v-else>{{ countVerified(item) }}</span>
                </template> -->
                <template #item.peserta="{ item }">
                  <span>{{ item.peserta.length }}</span>
                </template>
                <template #item.jurusan.jurusan="{ item }">
                  <ul>
                    <li v-for="(jurusan, i) in item.jurusan" :key="i">
                      <span>{{ jurusan.jurusan }}</span>
                    </li>
                  </ul>
                </template>
              </v-data-table>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-layout>
</template>
<script>
import { GET_SKEMAS, GET_ALL_JURUSANS, GET_JURUSANS, GET_FAKULTASS, GET_TUKS, GET_JADWALS, GET_ANGGARANS } from '@/constants/graphql'
import { CREATE_JADWAL_NO_JURUSAN_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/jadwal'
import { GET_PAKET_UJIANS } from '@/constants/soal'
import { CREATE_JADWAL_UJIAN_MUTATION, GET_JADWAL_UJIANS, UPDATE_JADWAL_UJIAN_MUTATION, DELETE_JADWAL_UJIAN_MUTATION } from '@/constants/ujian'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      paket_ujians: [],
      jadwal_ujians: [],
      create_jadwal_ujian: {
        paket_id: null,
        name: null,
        keterangan: null,
        kuota: null,
        price: null,
        tanggal: null,
        tempat_ujian: null
      },
      update_jadwal_ujian: {
        id: null,
        name: null,
        keterangan: null,
        kuota: null,
        price: null,
        tanggal: null,
        tempat_ujian: null
      },
      delete_jadwal_ujian: {
        id: null,
        name: null,
        keterangan: null,
        kuota: null,
        price: null,
        tanggal: null,
        tempat_ujian: null
      },
      rules: [
        random => !!random || 'Required.',
      ],
      date: new Date().toISOString().substr(0, 10),
      dateMenu: false,
      dateMenu2: false,
      state: {
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      search: '',
      deleteDialog: false,
      tambahDialog: false,
      editDialog: false,
      random: [],
      headers: [
        { text: 'Nama Jadwal', value: 'name', width: '30%' },
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Tempat Ujian', value: 'tempat_ujian' },
        { text: 'Status', value: 'status' },
        { text: 'Kuota', value: 'kuota' },
        { text: 'Aksi', value: 'actions' },
      ],
      status: [
        {
          id: 0,
          status: 'Batal'
        },
        {
          id: 1,
          status: 'Aktif'
        }
      ],
    }
  },
  created() {
    this.getPaketUjians()
    this.getJadwalUjians()
  },
  methods: {
    async getPaketUjians() {
      const result = await this.$apollo.mutate({
        mutation: GET_PAKET_UJIANS
      }).then(({ data }) => {
        this.paket_ujians = data.paketUjians
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async getJadwalUjians() {
      const result = await this.$apollo.mutate({
        mutation: GET_JADWAL_UJIANS
      }).then(({ data }) => {
        this.jadwal_ujians = data.jadwalUjians
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    countVerified(item){
      var verified = 0
      for (var x of item.peserta) {
        if (x.status > 0) {
          verified++
        }
      }
      var count = item.kuota - verified
      if ( count > 0) {
        return count
      }
      return 0
    },
    reset(dialog) {
      if (this.tambahDialog = true) {
        this.tambahDialog = false
      }
      if (this.editDialog = true) {
        this.editDialog = false
      }
      this.$refs.form.reset()
    },
    editItem(item) {
      this.update_jadwal_ujian = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item){
      this.delete_jadwal_ujian = Object.assign({}, item)
      this.deleteDialog = true
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async createJadwalUjian() {
      this.alert.show = false
      const { create_jadwal_ujian: {paket_id, name, keterangan, kuota, tanggal, tempat_ujian, price} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_JADWAL_UJIAN_MUTATION,
        variables: {
          paket_id, name, keterangan, kuota, tanggal, tempat_ujian, price
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Jadwal baru berhasil dibuat')
        this.getJadwalUjians()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateJadwalUjian() {
      this.alert.show = false
      const { update_jadwal_ujian: {id, name, keterangan, kuota, tanggal, tempat_ujian, price} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_JADWAL_UJIAN_MUTATION,
        variables: {
          id, name, keterangan, kuota, tanggal, tempat_ujian, price
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Jadwal baru berhasil diupdate')
        this.getJadwalUjians()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteJadwalUjian() {
      this.alert.show = false
      const { delete_jadwal_ujian: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_JADWAL_UJIAN_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Jadwal baru berhasil dihapus')
        this.getJadwalUjians()
      }).catch(({graphQLErrors}) => {
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
