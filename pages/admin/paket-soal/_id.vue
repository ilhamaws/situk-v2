<template>
  <v-layout
    column
    wrap
  >
    <v-snackbar
      v-model="alert.show"
      :color="alert.type"
      :timeout="0"
      top
      dense
    >
      {{ alert.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          fab
          v-bind="attrs"
          @click="alert.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card class="rounded-lg mb-5">
      <v-card-subtitle class="font-weight-bold">
        Tambah section ujian
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-row v-if="!state.skeleton">
        <v-col>
          <v-card-text>
            <v-simple-table>
              <tbody>
                <tr>
                  <td width="10%"><b>Kode Paket:</b></td>
                  <td>{{ paket_ujian.paket }}</td>
                </tr>
                <tr>
                  <td width="10%"><b>Deskripsi:</b></td>
                  <td>{{ paket_ujian.deskripsi }}</td>
                </tr>
                <tr>
                  <td width="10%"><b>Passing Grade:</b></td>
                  <td>{{ paket_ujian.passing_grade }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="rounded-lg mb-5">
      <v-card-text>
        <div class="px-5 py-5">
          <v-form ref="form">
            <v-row class="mb-3">
              <v-dialog v-model="tambahSyaratDialog" persistent max-width="800px">
                <template #activator="{ on }">
                  <v-btn color="primary" outlined dark v-on="on">Tambah syarat ujian</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="subtitle">Tambah section ujian</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="create_syarat_ujian.syarat"
                            outlined
                            dense
                            label="Syarat Paket"
                          >
                          </v-text-field>
                          <v-textarea
                            v-model="create_syarat_ujian.keterangan"
                            outlined
                            dense
                            label="keterangan Syarat"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*Wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="reset">Batal</v-btn>
                    <v-btn color="blue darken-1" text @click="createSyaratUjian">Tambah soal</v-btn>
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
          <v-dialog v-model="editSyaratDialog" persistent max-width="800px">
            <v-card>
              <v-card-title>
                <span class="subtitle">Update section soal</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="update_syarat_ujian.syarat"
                        outlined
                        dense
                        label="Syarat Paket"
                      >
                      </v-text-field>
                      <v-textarea
                        v-model="update_syarat_ujian.keterangan"
                        outlined
                        dense
                        label="keterangan Syarat"
                      ></v-textarea>
                      <v-radio-group
                        v-model="update_syarat_ujian.flag"
                        row
                        class="mt-0"
                      >
                        <v-radio
                          label="Non Aktif"
                          :value="-1"
                        ></v-radio>
                        <v-radio
                          label="Aktif"
                          :value="1"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Wajib diisi</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="reset">Batal</v-btn>
                <v-btn :disabled="state.loading" color="primary" text @click="updateSyaratUjian">Update syarat</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteSyaratDialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

              <v-card-text>
                Peringatan! Data yang telah dihapus tidak dapat kembali lagi.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="deleteSyaratDialog = false">Batal</v-btn>
                <v-btn :disabled="state.loading" color="red darken-1" text @click="deleteSyaratUjian">Delete syarat</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-data-table
            v-if="!state.skeleton"
            :headers="header_syarats"
            :items="paket_ujian.syaratUjian"
            :search="search_syarat"
            :items-per-page="5"
            :line-numbers="true"
            :width="header_syarats.width"
          >
            <!-- <template #item.status="{ item }">
              <v-chip v-if="item.flag != 0" small color="success">Aktif</v-chip>
              <v-chip v-else small color="red darken-1" dark>Non Aktif</v-chip>
            </template> -->
            <template #item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editSyaratItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                class="mr-2"
                @click="deleteSyaratItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="soalDialog" persistent max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="subtitle">Tambah soal</span>
              </v-card-title>
              <v-card-text>
                <v-autocomplete
                  v-model="create_section_ujian.soal"
                  :items="bank_soals"
                  dense
                  outlined
                  label="Pilih soal"
                  return-object
                  item-text="soal"
                  :menu-props="{ top: false, offsetY: true}"
                  multiple
                ></v-autocomplete>
                <small>*Wajib diisi</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="soalDialog = false">Batal</v-btn>
                <v-btn :disabled="state.loading" color="primary" text>Update section</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="rounded-lg">
      <v-card-text>
        <div class="px-5 py-5">
          <v-form ref="form">
            <v-row class="mb-3">
              <v-dialog v-model="tambahDialog" persistent max-width="800px">
                <template #activator="{ on }">
                  <v-btn color="primary" outlined dark v-on="on">Tambah section ujian</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="subtitle">Tambah section ujian</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="create_section_ujian.title"
                            outlined
                            dense
                            label="Judul section"
                          >
                          </v-text-field>
                          <v-textarea
                            v-model="create_section_ujian.deskripsi"
                            outlined
                            dense
                            label="Deskripsi tentang section"
                          ></v-textarea>
                          <v-text-field
                            v-model="create_section_ujian.max_time"
                            outlined
                            dense
                            type="number"
                            label="Durasi pengerjaan (dalam menit)"
                          >
                          </v-text-field>
                          <v-autocomplete
                            v-model="create_section_ujian.soal"
                            :items="bank_soals"
                            dense
                            outlined
                            label="Pilih soal"
                            item-value="id"
                            item-text="soal"
                            :menu-props="{ top: false, offsetY: true}"
                            multiple
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*Wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" text @click="reset">Batal</v-btn>
                    <v-btn color="blue darken-1" text @click="createSectionUjian">Tambah soal</v-btn>
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
          <v-expansion-panels v-if="!state.skeleton" accordion>
            <v-expansion-panel
              v-for="(section, i) in paket_ujian.sectionUjian"
              :key="i"
            >
              <v-expansion-panel-header>
                <div>
                  <b class="mr-2">{{section.title}}</b>
                  <span>{{ section.max_time }} Menit</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                <v-data-table
                  class="mt-3"
                  v-if="!state.skeleton"
                  :headers="headers"
                  :items="section.soal"
                  :search="search"
                  :items-per-page="5"
                  :line-numbers="true"
                  :width="headers.width"
                  hide-default-footer
                >
                </v-data-table>
                <div class="mt-2 d-flex">
                  <v-spacer></v-spacer>
                  <v-btn color="error" class="mr-3" outlined>Hapus</v-btn>
                  <v-btn @click="editSection(section)" color="primary" outlined>Update section</v-btn>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-dialog v-model="editDialog" persistent max-width="800px">
            <v-card>
              <v-card-title>
                <span class="subtitle">Update section soal</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="update_section_ujian.title"
                        outlined
                        dense
                        label="Judul section"
                      >
                      </v-text-field>
                      <v-textarea
                        v-model="update_section_ujian.deskripsi"
                        outlined
                        dense
                        label="Deskripsi tentang section"
                      ></v-textarea>
                      <v-text-field
                        v-model="update_section_ujian.max_time"
                        outlined
                        dense
                        type="number"
                        label="Durasi pengerjaan (dalam menit)"
                      >
                      </v-text-field>
                      <v-data-table
                        class="mt-3"
                        v-if="!state.skeleton"
                        :headers="header_soal"
                        :items="update_section_ujian.soal"
                        :search="search"
                        :line-numbers="true"
                        :width="headers.width"
                        hide-default-footer
                        hide-default-header
                      >
                        <template #item.actions="{ item }">
                          <v-btn small outlined color="error">Hapus</v-btn>
                        </template>
                      </v-data-table>
                      <v-btn @click="soalDialog = true" class="mt-3" small outlined color="primary">Tambah soal</v-btn>
                      <!-- <v-autocomplete
                        v-model="update_section_ujian.soal"
                        :items="bank_soals"
                        dense
                        outlined
                        label="Pilih soal"
                        item-value="id"
                        item-text="soal"
                        :menu-props="{ top: false, offsetY: true}"
                        multiple
                      ></v-autocomplete> -->
                    </v-col>
                  </v-row>
                </v-container>
                <small>*Wajib diisi</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="reset">Batal</v-btn>
                <v-btn :disabled="state.loading" color="primary" text @click="updateSectionUjian">Update section</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="soalDialog" persistent max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="subtitle">Tambah soal</span>
              </v-card-title>
              <v-card-text>
                <v-autocomplete
                  v-model="create_section_ujian.soal"
                  :items="bank_soals"
                  dense
                  outlined
                  label="Pilih soal"
                  return-object
                  item-text="soal"
                  :menu-props="{ top: false, offsetY: true}"
                  multiple
                ></v-autocomplete>
                <small>*Wajib diisi</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" text @click="soalDialog = false">Batal</v-btn>
                <v-btn :disabled="state.loading" color="primary" text>Update section</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <v-data-table
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
          </v-data-table> -->
        </div>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script>
import { GET_BANKSOALS, CREATE_SECTION_UJIAN_MUTATION, GET_PAKET_UJIAN, UPDATE_SECTION_UJIAN_MUTATION, DELETE_SECTION_UJIAN_MUTATION,
  CREATE_SYARAT_UJIAN_MUTATION, UPDATE_SYARAT_UJIAN_MUTATION, DELETE_SYARAT_UJIAN_MUTATION
} from '@/constants/soal'
import moment from 'moment'
import 'moment/locale/id' // without this line it didn't work
moment.locale('id')

export default {
  name: 'Jadwal',
  layout: 'App_admin',
  data() {
    return {
      select_jawaban: [1,2,3,4],
      image_preview: null,
      soal_type: 0,
      id: this.$route.params.id,
      with_image: true,
      create_section_ujian: {
        title: null,
        deskripsi: null,
        max_time: null,
        soal: []
      },
      update_section_ujian: {
        title: null,
        deskripsi: null,
        max_time: null,
        soal: []
      },
      delete_section_ujian: {
        title: null,
        deskripsi: null,
        max_time: null,
        soal: []
      },
      create_syarat_ujian: {
        syarat: null,
        keterangan: null,
      },
      update_syarat_ujian: {
        id: null,
        syarat: null,
        keterangan: null,
        flag: null
      },
      delete_syarat_ujian: {
        id: null,
        syarat: null,
        keterangan: null,
        flag: null
      },
      paket_ujian: [],
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
      search_syarat: '',
      deleteDialog: false,
      tambahDialog: false,
      editDialog: false,
      soalDialog: false,
      tambahSyaratDialog: false,
      editSyaratDialog: false,
      deleteSyaratDialog: false,
      header_soal: [
        { text: 'Id Soal', value: 'id', width: '25%' },
        { text: 'Soal', value: 'soal' },
        { text: 'Aksi', value: 'actions' },
      ],
      headers: [
        { text: 'Id Soal', value: 'id', width: '10%' },
        { text: 'Soal', value: 'soal' },
        // { text: 'Aksi', value: 'actions' },
      ],
      header_syarats: [
        { text: 'Syarat', value: 'syarat', width: '10%' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Aksi', value: 'actions' },
      ],
    }
  },
  created() {
    this.getPaketUjian()
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
      if (this.tambahSyaratDialog = true) {
        this.tambahSyaratDialog = false
      }
      if (this.editSyaratDialog = true) {
        this.editSyaratDialog = false
      }
      this.$refs.form.reset()
    },
    convertDate(item) {
      return moment().minutes(item)
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
    editSection(item) {
      this.update_section_ujian = Object.assign({}, { ...item, add_soal: [], delete_soal: []})
      console.log(this.update_section_ujian)
      this.editDialog = true
    },
    deletePaket(item) {
      this.delete_paket_ujian = Object.assign({}, item)
      this.deleteDialog = true
    },
    editSyaratItem(item) {
      this.update_syarat_ujian = Object.assign({}, { ...item})
      this.editSyaratDialog = true
    },
    deleteSyaratItem(item) {
      this.delete_syarat_ujian = Object.assign({}, {...item})
      this.deleteSyaratDialog = true
    },
    async getPaketUjian() {
      const id = this.id
      const result = await this.$apollo.mutate({
        mutation: GET_PAKET_UJIAN,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.paket_ujian = data.paketUjian
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async createSectionUjian() {
      this.state.loading = true
      const paket_id = this.id
      let { create_section_ujian: { title, deskripsi, max_time, passing_grade, soal } } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_SECTION_UJIAN_MUTATION,
        variables: {
          paket_id, title, deskripsi, max_time, passing_grade, soal
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Soal baru berhasil dibuat')
        this.getPaketUjian()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
        this.state.loading = false
      })
    },
    async updateSectionUjian() {
      this.state.loading = true
      const paket_id = this.id
      let { update_section_ujian: { id, title, deskripsi, max_time, passing_grade, soal } } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_SECTION_UJIAN_MUTATION,
        variables: {
          paket_id, title, deskripsi, max_time, passing_grade, soal
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Soal baru berhasil dibuat')
        this.getPaketUjian()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahDialog = false
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
    async createSyaratUjian() {
      this.state.loading = true
      const paket_id = this.id
      let { create_syarat_ujian: { syarat, keterangan } } = this.$data
      const result = await this.$apollo.mutate({
        mutation: CREATE_SYARAT_UJIAN_MUTATION,
        variables: {
          paket_id, syarat, keterangan
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Soal baru berhasil dibuat')
        this.getPaketUjian()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.tambahSyaratDialog = false
        this.state.loading = false
      })
    },
    async updateSyaratUjian() {
      this.state.loading = true
      let { update_syarat_ujian: { id, syarat, keterangan, flag } } = this.$data
      const result = await this.$apollo.mutate({
        mutation: UPDATE_SYARAT_UJIAN_MUTATION,
        variables: {
          id, syarat, keterangan, flag
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Syarat berhasil di update')
        this.getPaketUjian()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.editSyaratDialog = false
        this.state.loading = false
      })
    },
    async deleteSyaratUjian() {
      this.alert.show = false
      const id = this.delete_syarat_ujian.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_SYARAT_UJIAN_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data syarat berhasil dihapus')
        this.getPaketUjian()
        this.$refs.form.reset()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteSyaratDialog = false
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
