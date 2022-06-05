<template>
  <v-layout
    column
    wrap
  >
    <v-card class="rounded-lg">
      <v-card-subtitle class="font-weight-bold">
        Paket soal ujian
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
                  <v-dialog v-model="tambahDialog" persistent max-width="800px">
                    <template #activator="{ on }">
                      <v-btn color="primary" outlined dark v-on="on">Tambah paket soal</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Tambah paket soal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
															<v-text-field
																v-model="create_paket_ujian.paket"
																outlined
																dense
																label="Kode Paket"
															>
															</v-text-field>
                              <v-textarea
																v-model="create_paket_ujian.deskripsi"
                                outlined
                                dense
                                label="Deskripsi tentang paket"
                              ></v-textarea>
                              <v-text-field
																v-model="create_paket_ujian.passing_grade"
																outlined
																dense
                                type="number"
																label="Passing grade"
															>
															</v-text-field>
														</v-col>
                          </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="reset">Batal</v-btn>
                        <v-btn color="blue darken-1" text @click="createPaketUjian">Tambah soal</v-btn>
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
                :items="paket_ujians"
                :search="search"
                :items-per-page="5"
                :line-numbers="true"
                :width="headers.width"
              >
                <template #top>
                  <v-dialog v-model="editDialog" persistent max-width="800px">
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Update paket soal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
															<v-text-field
																v-model="edit_paket_ujian.paket"
																outlined
																dense
																label="Kode Paket"
															>
															</v-text-field>
                              <v-textarea
																v-model="edit_paket_ujian.deskripsi"
                                outlined
                                dense
                                label="Deskripsi tentang paket"
                              ></v-textarea>
                              <v-text-field
																v-model="edit_paket_ujian.passing_grade"
																outlined
																dense
                                type="number"
																label="Passing grade"
															>
															</v-text-field>
														</v-col>
                          </v-row>
                        </v-container>
                        <small>*Wajib diisi</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="reset">Batal</v-btn>
                        <v-btn :disabled="state.loading" color="blue darken-1" text @click="updatePaketUjian">Update soal</v-btn>
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
                        <v-btn :disabled="state.loading" color="red darken-1" text @click="deletePaketUjian">Delete bank soal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template #item.actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editPaket(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    class="mr-2"
                    @click="deletePaket(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <template #item.paket="{ item }">
                  <nuxt-link :to="`/admin/paket-soal/${item.id}`">
                    <span>{{ item.paket }}</span>
                  </nuxt-link>
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
import { CREATE_PAKET_UJIAN_MUTATION, GET_PAKET_UJIANS, UPDATE_PAKET_UJIAN_MUTATION, DELETE_PAKET_UJIAN_MUTATION } from '@/constants/soal'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      select_jawaban: [1,2,3,4],
      image_preview: null,
      soal_type: 0,
      with_image: true,
      create_paket_ujian: {
        paket: null,
        deskripsi: null,
        passing_grade: null
      },
      edit_paket_ujian: {
        paket: null,
        deskripsi: null,
        passing_grade: null
      },
      delete_paket_ujian: {
        paket: null,
        deskripsi: null,
        passing_grade: null
      },
      paket_ujians: [],
      rules: [
        random => !!random || 'Required.',
      ],
      date: new Date().toISOString().substr(0, 10),
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
      headers: [
        { text: 'Kode Soal', value: 'paket', width: '10%' },
        { text: 'Passing Grade', value: 'passing_grade' },
        { text: 'Aksi', value: 'actions' },
      ],
    }
  },
  created() {
    this.getPaketUjians()
  },
  methods: {
    toBase64(file) {
      if(file == undefined) {
        return this.create_bank_soal.image = ''
      }
      const imageFile = file

      if(imageFile !== undefined) {
        const fr = new FileReader ()
        fr.readAsDataURL(imageFile)
        fr.addEventListener('load', () => {
          this.create_bank_soal.image = fr.result // this is an ttd file that can be sent to server...
        })
      }
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
    reset() {
      if (this.tambahDialog = true) {
        this.tambahDialog = false
      }
      if (this.editDialog = true) {
        this.editDialog = false
      }
      this.$refs.form.reset()
    },
    editPaket(item) {
      this.edit_paket_ujian = Object.assign({}, item)
      this.editDialog = true
    },
    deletePaket(item) {
      this.delete_paket_ujian = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getPaketUjians() {
      const result = await this.$apollo.mutate({
        mutation: GET_PAKET_UJIANS
      }).then(({ data }) => {
        this.paket_ujians = data.paketUjians
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async createPaketUjian() {
      this.state.loading = true
      let { create_paket_ujian: { paket, deskripsi, passing_grade} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_PAKET_UJIAN_MUTATION,
        variables: {
          paket, deskripsi, passing_grade
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Soal baru berhasil dibuat')
        this.getPaketUjians()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
        this.state.loading = false
      })
    },
    async updatePaketUjian() {
      this.state.loading = true
      let { edit_paket_ujian: { id, paket, deskripsi, passing_grade} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_PAKET_UJIAN_MUTATION,
        variables: {
          id, paket, deskripsi, passing_grade
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Bank soal berhasil diperbarui')
        this.getPaketUjians()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
        this.state.loading = false
      })
    },
    async deletePaketUjian() {
      this.alert.show = false
      const id = this.delete_paket_ujian.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_PAKET_UJIAN_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Soal berhasil dihapus')
        this.getPaketUjians()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
