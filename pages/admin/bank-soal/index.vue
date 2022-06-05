<template>
  <v-layout
    column
    wrap
  >
    <v-card class="rounded-lg">
      <v-card-subtitle class="font-weight-bold">
        Bank soal ujian
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
                      <v-btn color="primary" outlined dark v-on="on">Tambah bank soal</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Tambah bank soal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
															<v-img
																v-if="with_image"
																class="mb-5 rounded-lg grey"
																:src="create_bank_soal.image"
																:aspect-ratio="16/9"
															></v-img>
                              <v-file-input
																v-if="with_image"
																v-model="image_preview"
																dense
																outlined
																type="file"
																@change="toBase64"
																accept="image/*"
																label="Upload gambar soal"
																clearable
																truncate-length="15"
															></v-file-input>
															<v-radio-group row class="mt-0" v-model="with_image">
																<v-radio
																	label="Dengan gambar"
																	:value="true"
																></v-radio>
																<v-radio
																	label="Tanpa gambar"
																	:value="false"
																></v-radio>
															</v-radio-group>
															<v-text-field
																v-model="create_bank_soal.kategori"
																outlined
																dense
																label="Kategori"
															>
															</v-text-field>
                              <v-textarea
																v-model="create_bank_soal.soal"
                                outlined
                                dense
                                label="Soal"
                              ></v-textarea>
															<template v-if="soal_type == 0">
																<v-radio-group class="mt-0" v-model="create_bank_soal.kunci_jawaban">
																	<v-radio readonly v-for="(item, i) in create_bank_soal.jawaban" :key="i" :value="i+1" class="d-flex pb-3">
																		<template slot="label">
																			<v-text-field
																				v-model="create_bank_soal.jawaban[i]"
																				outlined
																				dense
																				hide-details
																				label="Jawaban"
																			>
																			</v-text-field>
																		</template>
																	</v-radio>
																</v-radio-group>
																<v-select
																	dense
																	outlined
																	:items="select_jawaban"
																	v-model="create_bank_soal.kunci_jawaban"
																	label="Kunci jawaban"
																></v-select>
															</template>
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
                  <v-dialog v-model="editDialog" persistent max-width="800px">
                    <v-card>
                      <v-card-title>
                        <span class="subtitle">Update bank soal</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="12" md="12">
															<v-img
																v-if="with_image"
																class="mb-5 rounded-lg grey"
																:src="edit_bank_soal.image"
																:aspect-ratio="16/9"
															></v-img>
                              <v-file-input
																v-if="with_image"
																v-model="image_preview"
																dense
																outlined
																type="file"
																@change="toBase64"
																accept="image/*"
																label="Upload gambar soal"
																clearable
																truncate-length="15"
															></v-file-input>
															<v-radio-group row class="mt-0" v-model="with_image">
																<v-radio
																	label="Dengan gambar"
																	:value="true"
																></v-radio>
																<v-radio
																	label="Tanpa gambar"
																	:value="false"
																></v-radio>
															</v-radio-group>
															<v-text-field
																v-model="edit_bank_soal.kategori"
																outlined
																dense
																label="Kategori"
															>
															</v-text-field>
                              <v-textarea
																v-model="edit_bank_soal.soal"
                                outlined
                                dense
                                label="Soal"
                              ></v-textarea>
															<template v-if="soal_type == 0">
																<v-radio-group class="mt-0" v-model="edit_bank_soal.kunci_jawaban">
																	<v-radio readonly v-for="(item, i) in edit_bank_soal.jawaban" :key="i" :value="i+1" class="d-flex pb-3">
																		<template slot="label">
																			<v-text-field
																				v-model="edit_bank_soal.jawaban[i]"
																				outlined
																				dense
																				hide-details
																				label="Jawaban"
																			>
																			</v-text-field>
																		</template>
																	</v-radio>
																</v-radio-group>
																<v-select
																	dense
																	outlined
																	:items="select_jawaban"
																	v-model="edit_bank_soal.kunci_jawaban"
																	label="Kunci jawaban"
																></v-select>
															</template>
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
import { GET_SKEMAS, GET_ALL_JURUSANS, GET_JURUSANS, GET_FAKULTASS, GET_TUKS, GET_JADWALS, GET_ANGGARANS } from '@/constants/graphql'
import { CREATE_BANK_SOAL_MUTATION, GET_BANKSOALS, UPDATE_BANK_SOAL_MUTATION, DELETE_BANK_SOAL_MUTATION } from '@/constants/soal'
import { CREATE_JADWAL_NO_JURUSAN_MUTATION, UPDATE_JADWAL_MUTATION, DELETE_JADWAL_MUTATION, CANCEL_JADWAL_MUTATION } from '@/constants/jadwal'

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      select_jawaban: [1,2,3,4],
      image_preview: null,
      soal_type: 0,
      with_image: true,
      create_bank_soal: {
        soal: null,
        kategori: '',
        image: '',
        type: false,
        jawaban: ['','','',''],
        kunci_jawaban: ''
      },
      edit_bank_soal: {
        id: '',
        soal: null,
        kategori: '',
        image: '',
        type: false,
        jawaban: ['','','',''],
        kunci_jawaban: ''
      },
      delete_bank_soal: {
        id: '',
        soal: null,
        kategori: '',
        image: '',
        type: false,
        jawaban: ['','','',''],
        kunci_jawaban: ''
      },
      bank_soals: [],
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
        { text: 'ID', value: 'id', width: '10%' },
        { text: 'Soal', value: 'soal' },
        { text: 'Kategori', value: 'kategori' },
        { text: 'Aksi', value: 'actions' },
      ],
    }
  },
  created() {
    this.getBankSoals()
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
      this.edit_bank_soal.jawaban = JSON.parse(item.jawaban)
      this.edit_bank_soal.kunci_jawaban = parseInt(item.kunci_jawaban)
      this.editDialog = true
    },
    deleteSoal(item) {
      this.delete_bank_soal = Object.assign({}, item)
      this.delete_bank_soal.jawaban = JSON.parse(item.jawaban)
      this.delete_bank_soal.kunci_jawaban = parseInt(item.kunci_jawaban)
      this.deleteDialog = true
    },
    async getBankSoals() {
      const result = await this.$apollo.mutate({
        mutation: GET_BANKSOALS
      }).then(({ data }) => {
        this.bank_soals = data.bankSoals
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
