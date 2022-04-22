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
                        <v-btn color="blue darken-1" text @click="createBankSoal">Tambah soal</v-btn>
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
                :items="bank_soals"
                :search="search"
                :items-per-page="5"
                :line-numbers="true"
                :width="headers.width"
              >
                <template #top>
                  <!-- <v-dialog v-model="editDialog" persistent max-width="800px">
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Update bank soal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
															<v-text-field
																v-model="edit_bank_soal.kategori"
																outlined
																dense
																label="Kode Paket"
															>
															</v-text-field>
                              <v-textarea
																v-model="edit_bank_soal.soal"
                                outlined
                                dense
                                label="Deskripsi tentang paket"
                              ></v-textarea>
                              <v-text-field
																v-model="edit_bank_soal.kategori"
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
                        <v-btn color="blue darken-1" text @click="updateBankSoal">Update soal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog> -->
                  <v-dialog v-model="deleteDialog" persistent max-width="600px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

                      <v-card-text>
                        Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" text @click="deleteDialog = false">Batal</v-btn>
                        <v-btn color="red darken-1" text @click="deleteBankSoal">Delete bank soal</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template #item.actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editSoal(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    class="mr-2"
                    @click="deleteSoal(item)"
                  >
                    mdi-delete
                  </v-icon>
                <!-- <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                  <v-btn rounded x-small color="primary">Detail</v-btn>
                </nuxt-link> -->
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
import { CREATE_BANK_SOAL_MUTATION, GET_PAKET_UJIANS, UPDATE_BANK_SOAL_MUTATION, DELETE_BANK_SOAL_MUTATION } from '@/constants/soal'

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
        { text: 'Kode Soal', value: 'id', width: '10%' },
        { text: 'Passing Grade', value: 'soal' },
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
    editSoal(item) {
      this.edit_bank_soal = Object.assign({}, item)
      this.editDialog = true
    },
    deleteSoal(item) {
      this.delete_bank_soal = Object.assign({}, item)
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
    async createBankSoal() {
      let { create_bank_soal: { soal, kategori, image, type, jawaban, kunci_jawaban} } = this.$data
      jawaban = JSON.stringify(jawaban)
      const result = await this.$apollo.mutate({
        mutation: CREATE_BANK_SOAL_MUTATION,
        variables: {
          soal, kategori, image, type, jawaban, kunci_jawaban
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Soal baru berhasil dibuat')
        this.getBankSoals()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
      })
    },
    async updateBankSoal() {
      let { edit_bank_soal: { id, soal, kategori, image, type, jawaban, kunci_jawaban} } = this.$data
      jawaban = JSON.stringify(jawaban)
      const result = await this.$apollo.mutate({
        mutation: UPDATE_BANK_SOAL_MUTATION,
        variables: {
          id, soal, kategori, image, type, jawaban, kunci_jawaban
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Bank soal berhasil diperbarui')
        this.getBankSoals()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editDialog = false
      })
    },
    async deleteBankSoal() {
      this.alert.show = false
      const id = this.delete_bank_soal.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_BANK_SOAL_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data Soal berhasil dihapus')
        this.getBankSoals()
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
