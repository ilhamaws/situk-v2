<template>
  <v-layout column wrap>
    <v-snackbar
      v-model="alert.show"
      :color="alert.type"
      :timeout="0"
      top
      dense
    >
      {{ alert.message }}
      <v-btn
        dark
        text
        fab
        @click="alert.show = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-row>
      <v-col>
        <v-card class="mb-5">
          <v-card-subtitle class="font-weight-bold">
            Bank Soal Observasi
          </v-card-subtitle>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-row>
            <v-col>
              <v-card-text>
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <v-dialog
                      v-model="tambahDialog"
                      persistent
                      max-width="800px"
                    >
                      <template #activator="{ on }">
                        <v-btn color="primary" outlined dark v-on="on"
                        >Tambah Soal</v-btn
                        >
                      </template>
                      <v-form>
                        <v-card>
                          <v-card-subtitle class="font-weight-bold">
                            Tambah soal observasi
                          </v-card-subtitle>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-autocomplete
                              v-model="
                                create_bank_soal_observasi.unit_kompetensi_id
                              "
                              :items="skemas.unitKompetensi"
                              outlined
                              dense
                              item-text="unit"
                              item-value="id"
                              label="Unit kompetensi"
                            ></v-autocomplete>
                            <v-textarea
                              v-model="create_bank_soal_observasi.soal"
                              label="Soal observasi"
                              placeholder="Isilah dengan soal untuk pertanyaan observasi"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                            <v-alert text dense color="primary" :value="true">
                              Isian dibawah ini adalah jawaban yang diharapkan
                              untuk membantu asesor menentukan kompeten
                            </v-alert>
                            <v-textarea
                              v-model="create_bank_soal_observasi.opsi_k"
                              label="Jawaban kompeten"
                              placeholder="Jawaban yang diharapkan oleh penguji"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                            <v-alert text dense color="error" :value="true">
                              Isian dibawah ini adalah jawaban yang tidak
                              diharapkan untuk membantu asesor menentukan
                              kompeten
                            </v-alert>
                            <v-textarea
                              v-model="create_bank_soal_observasi.opsi_bk"
                              label="Jawaban belum kompeten"
                              placeholder="Jawaban yang tidak diharapkan oleh penguji"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="grey"
                              text
                              @click="tambahDialog = false"
                            >Batal</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="createBankSoalObservasi"
                            >Tambah soal</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-form>
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
                  </v-col>
                </v-row>
                <download-excel
                    :title="`Bank Soal`"
                    :data="bank_soal"
                    :fields="json_fields"
                    worksheet="LSP TIFA"
                    name="bank-soal"
                    type="xlsx"
                >
                    <v-btn color="success">Download Excel</v-btn>
                </download-excel>
                <v-data-table
                  v-if="!state.skeleton"
                  :headers="headers"
                  :width="width"
                  :items="bank_soal"
                  :search="search"
                  :items-per-page="10"
                  :line-numbers="true"
                >
                  <template #top>
                    <v-dialog
                      v-model="editDialog"
                      persistent
                      max-width="800px"
                    >
                      <v-form>
                        <v-card>
                          <v-card-subtitle class="font-weight-bold">
                            Edit soal observasi
                          </v-card-subtitle>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-autocomplete
                              v-model="
                                editedSoalObservasi.unitKompetensi.id
                              "
                              :items="skemas.unitKompetensi"
                              outlined
                              dense
                              item-text="unit"
                              item-value="id"
                              label="Unit kompetensi"
                            ></v-autocomplete>
                            <v-textarea
                              v-model="editedSoalObservasi.soal"
                              label="Soal observasi"
                              placeholder="Isilah dengan soal untuk pertanyaan observasi"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                            <v-alert text dense color="primary" :value="true">
                              Isian dibawah ini adalah jawaban yang diharapkan
                              untuk membantu asesor menentukan kompeten
                            </v-alert>
                            <v-textarea
                              v-model="editedSoalObservasi.opsi_k"
                              label="Jawaban kompeten"
                              placeholder="Jawaban yang diharapkan oleh penguji"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                            <v-alert text dense color="error" :value="true">
                              Isian dibawah ini adalah jawaban yang tidak
                              diharapkan untuk membantu asesor menentukan
                              kompeten
                            </v-alert>
                            <v-textarea
                              v-model="editedSoalObservasi.opsi_bk"
                              label="Jawaban belum kompeten"
                              placeholder="Jawaban yang tidak diharapkan oleh penguji"
                              dense
                              outlined
                              textarea
                            ></v-textarea>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="grey"
                              text
                              @click="editDialog = false"
                            >Batal</v-btn
                            >
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="updateBankSoalObservasi"
                            >Edit soal</v-btn
                            >
                          </v-card-actions>
                        </v-card>
                      </v-form>
                    </v-dialog>
                    <v-dialog
                      v-model="deleteDialog"
                      persistent
                      max-width="600px"
                    >
                      <v-card>
                        <v-card-title class="subtitle"
                        >Apakah anda yakin menghapus Data?</v-card-title
                        >

                        <v-card-text>
                          Peringatan! Data yang telah dihapus tidak dapat
                          kembali lagi.
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="grey" text @click="deleteDialog = false"
                          >Batal</v-btn
                          >
                          <v-btn
                            color="red darken-1"
                            text
                            @click="deleteBankSoalObservasi"
                          >Delete Soal</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                  <template #item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>
<script>
import { GET_SKEMA_BYID } from "@/constants/graphql"
import { CREATE_BANK_SOAL_OBSERVASI_MUTATION, UPDATE_BANK_SOAL_OBSERVASI_MUTATION, DELETE_BANK_SOAL_OBSERVASI_MUTATION } from "@/constants/observasi"

import Vue from "vue"
import JsonExcel from "vue-json-excel"

Vue.component("downloadExcel", JsonExcel)

export default {
  name: "bank-soal",
  layout: "App_admin",
  data() {
    return {
      skema_id: this.$route.params.skema,
      date: new Date().toISOString().substr(0, 10),
      state: {
        skeleton: true,
      },
      alert: {
        show: false,
        type: "",
        message: "",
      },
      search: "",
      tambahDialog: false,
      editDialog: false,
      deleteDialog: false,
      headers: [
        { text: "Soal", value: "soal", width: "35%" },
        { text: "Unit Kompetensi", value: "unitKompetensi.unit", width: "25%" },
        { text: "Kode Unit", value: "unitKompetensi.kode", width: "25%" },
        { text: "Aksi", value: "actions", width: "15%" },
      ],
      editedIndex: -1,
      editedSoalObservasi: {
        unitKompetensi: {}
      },
      json_fields: {
        "Kode": "unitKompetensi.kode",
        "Unit": "unitKompetensi.unit",
        "Soal": "soal",
        "Opsi Kompeten": "opsi_k",
      },
      dateMenu: false,
      deletedIndex: -1,
      deletedSoalObservasi: {},
      elements: [],
      skemas: [],
      unitkompetensis: [],
      bank_soal: [],
      create_bank_soal_observasi: {
        unit_kompetensi_id: "",
        soal: "",
        opsi_k: "",
        opsi_bk: "",
      },
    }
  },
  mounted() {
    this.getSkemas()
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    editItem(item) {
      this.editedIndex = this.bank_soal.indexOf(item)
      this.editedSoalObservasi = Object.assign({}, item)
      this.editDialog = true
    },
    deleteItem(item) {
      this.deletedIndex = this.bank_soal.indexOf(item)
      this.deletedSoalObservasi = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getSkemas() {
      const id = this.skema_id
      const result = await this.$apollo
        .mutate({
          mutation: GET_SKEMA_BYID,
          variables: {
            id,
          },
        })
        .then(({ data }) => {
          this.skemas = data.skema
          const map_soal = data.skema.unitKompetensi.map(unit => {return unit.bankSoalObservasi.map(soal => { return soal })})
          this.bank_soal = map_soal.flat()
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.state.skeleton = false
        })
    },
    async createBankSoalObservasi() {
      this.alert.show = false
      const {
        create_bank_soal_observasi: {
          unit_kompetensi_id,
          soal,
          opsi_k,
          opsi_bk,
        },
      } = this.$data
      const result = await this.$apollo
        .mutate({
          mutation: CREATE_BANK_SOAL_OBSERVASI_MUTATION,
          variables: {
            unit_kompetensi_id,
            soal,
            opsi_k,
            opsi_bk,
          },
        })
        .then(({ data }) => {
          console.log(data)
          this.showAlert("success", "Bank soal berhasil dibuat")
        })
        .catch(({ graphQLErrors }) => {
          console.log(graphQLError)
          this.showAlert("error", graphQLErrors[0].message)
        })
        .finally(() => {
          this.tambahDialog = false
          this.getSkemas()
        })
    },
    async updateBankSoalObservasi() {
      this.alert.show = false
      const {
        editedSoalObservasi: {
          id,
          soal,
          opsi_k,
          opsi_bk,
        },
      } = this.$data
      const result = await this.$apollo
        .mutate({
          mutation: UPDATE_BANK_SOAL_OBSERVASI_MUTATION,
          variables: {
            id,
            soal,
            opsi_k,
            opsi_bk,
          },
        })
        .then(({ data }) => {
          console.log(data)
          this.showAlert("success", "Bank soal berhasil diedit")
        })
        .catch(({ graphQLErrors }) => {
          this.showAlert("error", graphQLErrors[0].message)
        })
        .finally(() => {
          this.editDialog = false
          this.getSkemas()
        })
    },
    async deleteBankSoalObservasi() {
      this.alert.show = false
      const id = this.deletedSoalObservasi.id
      const result = await this.$apollo.mutate({
        mutation: DELETE_BANK_SOAL_OBSERVASI_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Data soal berhasil dihapus')
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
        this.getSkemas()
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
