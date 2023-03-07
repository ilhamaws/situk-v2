<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <v-snackbar
            v-model="alert.show"
            :color="alert.type"
            :timeout="-1"
            bottom
          >
            {{ alert.message }}
            <v-btn
              dark
              text
              @click="alert.show = false"
            >
              Close
            </v-btn>
          </v-snackbar>
          <div v-if="!state.skeleton">
            <v-row>
              <v-col cols="12">
                <v-card class="rounded-lg"> 
                  <div class="d-flex flex-no-wrap">
                    <!-- <v-avatar
                      class="mt-5 ml-5"
                      size="125"
                      style="border-radius: .42rem;"
                      tile
                    >
                      <v-img :src="peserta.asesi.image"></v-img>
                    </v-avatar> -->
                    <!-- <div>
                      <v-card-title
                        class="headline"
                      >{{ peserta.asesi.nama }}</v-card-title>
                      <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn v-if="peserta.status == -2" text color="error">Belum Kompeten</v-btn>
                        <v-btn v-if="peserta.status == -1" text color="danger">Ditolak</v-btn>
                        <v-btn v-if="peserta.status == 0" text color="grey">Belum Diverifikasi</v-btn>
                        <v-btn v-if="peserta.status == 1" text color="primary">Disetujui</v-btn>
                        <v-btn v-if="peserta.status == 2" text color="success">Direkomendasi Kompeten</v-btn>
                      </v-card-actions>
                    </div> -->
                  </div>
                  <v-card-text class="px-5">
                    <v-row>
                        <div class="pa-5">
                          <v-img class="rounded-lg" width="150" height="200" aspect-ratio="3/4" :src="peserta.asesi.image"></v-img>
                        </div>
                      <v-col cols="8">
                        <v-simple-table>
                          <tbody>
                            <tr>
                              <td width="10%"><b>Nama:</b></td>
                              <td>{{ peserta.asesi.nama }}</td>
                            </tr>
                            <tr>
                              <td width="10%"><b>Skema:</b></td>
                              <td>{{ peserta.jadwal.skema.skema }}</td>
                            </tr>
                            <tr>
                              <td width="10%"><b>Jadwal Pelaksanaan:</b></td>
                              <td>{{ peserta.asesmen_date != null ? peserta.asesmen_date : peserta.jadwal.tanggal }}</td>
                            </tr>
                            <!-- <tr>
                              <td width="10%"><b>Pelaksanaan:</b></td>
                              <td v-if="peserta.asesmen_date != null">{{ peserta.asesmen_date }}</td>
                              <td v-if="peserta.asesmen_date == null">Belum Ditentukan</td>
                            </tr> -->
                            <tr>
                              <td width="10%"><b>Asesor:</b></td>
                              <td v-if="peserta.asesor != null">{{ peserta.asesor.nama }}</td>
                              <td v-if="peserta.asesor == null">Belum Ditentukan</td>
                            </tr>
                            <tr>
                              <td><b>Status Peserta</b></td>
                              <td>
                                <v-chip v-if="peserta.status == -2" class="px-5" color="error">Belum Kompeten</v-chip>
                                <v-chip v-if="peserta.status == -1" class="px-5" color="danger">Ditolak</v-chip>
                                <v-chip v-if="peserta.status == 0" class="px-5" color="grey">Belum Diverifikasi</v-chip>
                                <v-chip v-if="peserta.status == 1" class="px-5" color="indigo lighten-2" dark>Disetujui</v-chip>
                                <v-chip v-if="peserta.status == 2" class="px-5" color="success">Direkomendasi Kompeten</v-chip>
                              </td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <!-- <v-card-actions v-if="peserta.status == 2 || peserta.status == -2" class="d-flex justify-center pb-8 pt-0">
                    <nuxt-link :to="`/asesi/hasil-asesmen/${peserta.id}`">
                      <v-btn color="success">Lihat Hasil Sertifikasi</v-btn>
                    </nuxt-link>
                  </v-card-actions>
                  <v-card-actions v-if="peserta.status == 1" class="d-flex justify-center pb-8 pt-0">
                    <nuxt-link :to="`/asesi/asesmen-mandiri/${peserta.id}`">
                      <v-btn color="warning">Menuju Asesmen Mandiri</v-btn>
                    </nuxt-link>
                  </v-card-actions> -->
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <nuxt-link v-if="peserta.status == 2 || peserta.status == -2" :to="`/asesi/hasil-asesmen/${peserta.id}`">
                  <v-btn class="pa-6 rounded-lg" block color="success">Lihat Hasil Sertifikasi</v-btn>
                </nuxt-link>
                <nuxt-link v-if="peserta.status == 1" :to="`/asesi/asesmen-mandiri/${peserta.id}`">
                  <v-btn class="pa-6 rounded-lg" block color="warning">Menuju Asesmen Mandiri</v-btn>
                </nuxt-link>
                <!-- <v-card-actions v-if="peserta.status == 2 || peserta.status == -2" class="d-flex justify-center pb-8 pt-0">
                    
                  </v-card-actions>
                  <v-card-actions v-if="peserta.status == 1" class="d-flex justify-center pb-8 pt-0">
                    <nuxt-link :to="`/asesi/asesmen-mandiri/${peserta.id}`">
                      <v-btn color="warning">Menuju Asesmen Mandiri</v-btn>
                    </nuxt-link>
                  </v-card-actions> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="col-md-4 col-lg-3 col-xs-12 col-sm-6">
                <v-card :to="`/asesi/apl-1/${peserta.id}`" link dark color="primary" class="rounded-lg">
                  <v-card-title>
                    <p class="ma-0">APL 1</p>
                  </v-card-title>
                  <v-card-subtitle>
                    Detail profile peserta
                  </v-card-subtitle>
                  <v-card-text class="d-flex justify-end align-center">
                    <v-icon size="80">person</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="col-md-4 col-lg-3 col-xs-12 col-sm-6">
                <v-card :disabled="!peserta.ujiKompetensi.length" :to="`/asesi/asesmen-mandiri/hasil/${peserta.id}`" link dark color="primary" class="rounded-lg">
                  <v-card-title>
                    <p class="ma-0">Asesmen Mandiri</p>
                  </v-card-title>
                  <v-card-subtitle>
                    Form dan hasil asesmen mandiri
                  </v-card-subtitle>
                  <v-card-text class="d-flex justify-end align-center">
                    <v-icon size="80">subject</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="col-md-4 col-lg-3 col-xs-12 col-sm-6">
                <v-card :disabled="peserta.asesor == null" :to="`/asesi/hasil-observasi/${peserta.id}`" link dark color="primary" class="rounded-lg">
                  <v-card-title>
                    <p class="ma-0">Hasil observasi</p>
                  </v-card-title>
                  <v-card-subtitle>
                    Hasil observasi dengan asesor
                  </v-card-subtitle>
                  <v-card-text class="d-flex justify-end align-center">
                    <v-icon size="80">wrap_text</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" class="col-md-4 col-lg-3 col-xs-12 col-sm-6">
                <v-card :disabled="disabledMenu" :to="`/asesi/hasil-asesmen/${peserta.id}`" link dark color="primary" class="rounded-lg">
                  <v-card-title>
                    <p class="ma-0">Rekaman Asesmen</p>
                  </v-card-title>
                  <v-card-subtitle>
                    Hasil akhir uji kompetensi
                  </v-card-subtitle>
                  <v-card-text class="d-flex justify-end align-center">
                    <v-icon size="80">playlist_add_check</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="peserta.status >= 1" cols="12">
                <v-card class="rounded-lg">
                  <v-toolbar flat color="primary" dark>
                    <v-icon class="white--text" left color="orange lighten-2">book</v-icon>
                    <span>
                      <h4>Portofolio</h4>
                    </span>
                  </v-toolbar>
                  <!-- <v-card-title>
                    <span class="">Portofolio</span>
                    <v-spacer></v-spacer>
                  </v-card-title> -->
                  <v-card-text>
                      <v-alert
                        icon="info"
                        text
                        type="primary"
                      >
                        Upload portofolio yang berkaitan dengan skema ini. <b>Dilakukan saat proses asesmen bersama Asesor!</b>
                      </v-alert>
                      <div class="px-5 pt-5">
                        <v-row>
                          <v-dialog v-model="portofolioDialog" persistent max-width="600px">
                            <template #activator="{ on }">
                              <v-btn color="primary" outlined dark v-on="on">Upload Portofolio</v-btn>
                            </template>
                            <v-form>
                              <v-card>
                                <v-card-title>
                                  <span>Upload Portofolio</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-form ref="form" lazy-validation v-model="valid">
                                      <v-row>
                                        <v-col md="12" xs="12" class="py-0">
                                          <v-text-field
                                            v-model="portofolios.nama"
                                            class="mt-2"
                                            label="Nama Berkas"
                                            type="text"
                                            :rules="required"
                                            required
                                            outlined
                                            dense
                                          />
                                        </v-col>
                                        <v-col md="12">
                                          <v-text-field v-model="portofolios.portofolioName"
                                            outlined
                                            dense
                                            required
                                            :rules="required"
                                            readonly label="Pilih Portofolio" hint="Ukuran file Maks. 2MB (PDF)" persistent-hint prepend-icon="attach_file" @click="pickPortofolio"></v-text-field>
                                          <input
                                            required
                                            ref="portofolio"
                                            type="file"
                                            style="display: none"
                                            accept="application/pdf"
                                            @change="onPortofolioSelected"
                                          >
                                        </v-col>
                                        <v-col md="12" xs="12" class="py-0">
                                          <v-autocomplete
                                            dense
                                            outlined
                                            v-model="portofolios.uji_kompetensi_id"
                                            :items="peserta.ujiKompetensi"
                                            item-text="unitKompetensi.unit"
                                            item-value="unitKompetensi.id"
                                            label="Pilih unit yang berkesesuaian"
                                          ></v-autocomplete>
                                        </v-col>
                                      </v-row>
                                    </v-form>
                                  </v-container>
                                  <small>*Wajib diisi</small>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="grey" text @click="portofolioDialog = false">Batal</v-btn>
                                    <v-btn color="primary" @click="uploadPortofolio">Upload portofolio</v-btn>
                                  </v-card-actions>
                                </v-card-text>
                              </v-card>
                            </v-form>
                          </v-dialog>
                          <v-spacer></v-spacer>
                          <v-text-field
                            v-model="searchPortofolio"
                            append-icon="search"
                            label="Search"
                            class="shrink"
                            outlined
                            dense
                          ></v-text-field>
                        </v-row>
                      </div>
                      <v-skeleton-loader
                        v-if="state.skeleton"
                        ref="skeleton"
                        type="table-thead, table-tbody"
                        class="mx-auto"
                      >
                      </v-skeleton-loader>
                      <v-data-table
                        v-if="!state.skeleton"
                        :headers="portofoliosHeaders"
                        :items="peserta.portofolio"
                        :search="searchPortofolio"
                        :items-per-page="5"
                        :line-numbers="true"
                        hide-default-footer
                      >
                        <template #top>
                          <v-dialog v-model="deleteportofolioDialog" persistent max-width="600px">
                            <v-card>
                              <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

                              <v-card-text>
                                Peringatan! Portofolio yang telah dihapus tidak dapat kembali lagi.
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="deleteportofolioDialog = false">Batal</v-btn>
                                <v-btn color="error" text @click="deletePortofolio">Delete Portofolio</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </template>
                        <template #item.ujiKompetensi="{ item }">
                          {{ ujiKompetensi ? ujiKompetensi.unitKompetensi.unit : '-'}}
                        </template>
                        <template #item.valid="{ item }">
                          <v-chip v-if="item.valid == -1" small color="error" dark>tidak</v-chip>
                          <v-chip v-if="item.valid == 0" small color="grey" dark>-</v-chip>
                          <v-chip v-if="item.valid == 1" small color="primary" dark>Ya</v-chip>
                        </template>
                        <template #item.memadai="{ item }">
                          <v-chip v-if="item.memadai == -1" small color="error" dark>tidak</v-chip>
                          <v-chip v-if="item.memadai == 0" small color="grey" dark>-</v-chip>
                          <v-chip v-if="item.memadai == 1" small color="primary" dark>Ya</v-chip>
                        </template>
                        <template #item.asli="{ item }">
                          <v-chip v-if="item.asli == -1" small color="error" dark>tidak</v-chip>
                          <v-chip v-if="item.asli == 0" small color="grey" dark>-</v-chip>
                          <v-chip v-if="item.asli == 1" small color="primary" dark>Ya</v-chip>
                        </template>
                        <template #item.terkini="{ item }">
                          <v-chip v-if="item.terkini == -1" small color="error" dark>tidak</v-chip>
                          <v-chip v-if="item.terkini == 0" small color="grey" dark>-</v-chip>
                          <v-chip v-if="item.terkini == 1" small color="primary" dark>Ya</v-chip>
                        </template>
                        <template #item.actions="{ item }">
                          <v-btn icon color="indigo lighten-2" :to="item.file" download target="_blank">
                            <v-icon
                              class="mr-2"
                            >
                              cloud_download
                            </v-icon>
                          </v-btn>
                          <v-btn icon color="orange lighten-1" :href="item.file" target="_blank">
                            <v-icon
                              class="mr-2"
                            >
                              remove_red_eye
                            </v-icon>
                          </v-btn>
                          <v-icon
                            color="error"
                            class="mr-2"
                            @click="deletePortofolioDialog(item)"
                          >
                            mdi-delete
                          </v-icon>
                        </template>
                      </v-data-table>
                  </v-card-text>
                  <v-row>
                    <v-col cols="12" class="px-10 py-5">
                      
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-6">
              <v-col cols="12">
                <v-card class="rounded-lg">
                  <v-toolbar flat color="primary" dark>
                    <v-icon class="white--text" left color="orange lighten-2">checklist</v-icon>
                    <span>
                      <h4>Syarat Sertifikasi</h4>
                    </span>
                  </v-toolbar>
                  <!-- <v-card-title>
                    <span class="headline px-5">Syarat</span>
                    <v-spacer></v-spacer>
                  </v-card-title> -->
                  <v-card-text>
                    <v-alert
                      v-if="peserta.status == 0 || peserta.status == -1"
                      icon="info"
                      text
                      type="info"
                    >
                      Isi syarat sesuai dengan panduan yang tersedia, dan tunggu persetujuan dari admin
                    </v-alert>
                    <div>
                      <v-row class="d-flex justify-end">
                        <v-col cols="12" md="4">
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
                    </div>
                    <v-skeleton-loader
                      v-if="state.skeleton"
                      ref="skeleton"
                      type="table-thead, table-tbody"
                      class="mx-auto"
                    >
                    </v-skeleton-loader>
                    <v-data-table
                      v-if="!state.skeleton"
                      :headers="headers"
                      :items="peserta.syaratPeserta"
                      :search="search"
                      :items-per-page="5"
                      :line-numbers="true"
                      hide-default-footer
                    >
                      <template #top>
                        <v-dialog v-model="syaratDialog" persistent max-width="600px">
                          <v-form ref="form">
                            <v-card>
                              <v-card-title>
                                Upload Syarat
                              </v-card-title>
                              <v-card-text>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                      <label for=""><b>Jenis Syarat*</b></label>
                                      <v-text-field v-model="editedSyarat.syarat.syarat" class="mt-2" solo disabled label="Masukkan Jenis Syarat yang sesuai" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="12" class="pt-0">
                                      <label for=""><b>File Syarat*</b></label>
                                      <v-text-field v-model="syarats.syaratName" persistent-hint hint="PDF (maks 2MB)" class="mt-2" solo readonly label="Pilih Syarat" prepend-icon="attach_file" @click="pickSyarat"></v-text-field>
                                      <input
                                        ref="syarat"
                                        type="file"
                                        style="display: none"
                                        accept="application/pdf"
                                        @change="onSyaratSelected"
                                      >
                                    </v-col>
                                  </v-row>
                                </v-container>
                                <small>*Wajib diisi</small>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="grey" text @click="syaratDialog = false">Close</v-btn>
                                <v-btn color="blue darken-1" text @click="uploadSyarat">Upload Syarat</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-form>
                        </v-dialog>
                        <v-dialog v-model="deletesyaratDialog" persistent max-width="600px">
                          <v-card>
                            <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

                            <v-card-text>
                              Peringatan! Syarat yang telah dihapus tidak dapat kembali lagi.
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="grey" text @click="deletesyaratDialog = false">Batal</v-btn>
                              <v-btn color="error" text @click="deleteSyarat">Delete Syarat</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </template>
                      <template #item.file="{ item }">
                        <span v-if="item.file != null">
                          <v-chip small color="indigo lighten-2" dark>Terupload</v-chip>
                        </span>
                      </template>
                      <template #item.status="{ item }">
                        <v-chip v-if="item.status == -2" small color="error" dark>Tidak Lulus</v-chip>
                        <v-chip v-if="item.status == -1" small color="error" dark>Ditolak</v-chip>
                        <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                        <v-chip v-if="item.status == 1" small color="indigo lighten-2" dark>Disetujui</v-chip>
                        <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                      </template>
                      <template #item.actions="{ item }">
                        <v-tooltip bottom>
                          <template #activator="{ on }">
                            <v-btn class="mr-2" icon color="indigo lighten-2" target="_blank" v-on="on" @click="editedSyaratDialog(item)">
                              <v-icon>
                                upload
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Upload Syarat</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template #activator="{ on }">
                            <v-btn class="mr-2" icon color="indigo lighten-2" :href="item.file" v-on="on">
                              <v-icon>
                                download
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Download file</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template #activator="{ on }">
                            <v-btn class="mr-2" icon color="orange lighten-1" :href="item.file" target="_blank" v-on="on">
                              <v-icon>
                                remove_red_eye
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Lihat file</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template #activator="{ on }">
                            <v-btn class="mr-2" icon color="error" target="_blank" v-on="on" @click="deleteSyaratDialog(item)">
                              <v-icon>
                                mdi-delete
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Delete</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { ACC_PERSETUJUAN_PESERTA_MUTATION, CREATE_UMPAN_BALIK_PESERTA_MUTATION, GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, UPLOAD_PORTOFOLIO, DELETE_SYARAT_PESERTA_MUTATION, DELETE_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { GET_UMPAN_BALIKS, } from '../../../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      umpanDialog: false,
      tambahDialog: false,
      portofolioDialog: false,
      deleteportofolioDialog: false,
      deletesyaratDialog: false,
      search: '',
      searchPortofolio: '',
      headers: [
        { text: 'Syarat', value: 'syarat.syarat' },
        { text: 'File', value: 'file'},
        { text: 'Status', value: 'status'},
        { text: 'Aksi', value: 'actions' },
      ],
      valid: true,
      portofoliosHeaders: [ 
        { text: 'Nama', value: 'nama' },
        { text: 'Unit Berkaitan', value: 'ujiKompetensi' },
        { text: 'Aksi', value: 'actions' },
      ],
      catatan: null,
      editedSyarat: {
        id: '',
        file: null,
        syarat: {
          syarat: null
        }
      },
      syarats: {
        syarat: '',
        syaratName: '',
        syaratUrl: null,
        syaratFile: ''
      },
      syaratDialog: false,
      portofolios: {
        nama: null,
        portofolioName: '',
        portofolioUrl: null,
        portofolioFile: '',
        uji_kompetensi_id: null
      },
      id: this.$route.params.id,
      deletedPortofolio:{},
      deletedSyarat:{},
      state:{
        loading: false,
        skeleton: true
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      valid: true,
      e1: 1,
      profile: {
        username: ''
      },
      checkbox: null,
      disabledMenu: true,
      skema: [],
      syarat: [],
      syaratUpload: [],
      portofolio: [],
      portofolioUpload: [],
      form: {
        tulis: null,
        lisan: null
      },
      items: [
      ],
      required: [
        value => !!value || 'Wajib diisi.',
      ],
      umpan_balik: [],
      umpanBaliks: [],
      peserta: [],
      asesi: [],
      e11: {},
    }
  },
  mounted() {
    this.getJadwal()
  },
  methods: {
    deleteSyaratDialog(item){
      // this.deletedIndex = this.kriteriauks.indexOf(item);
      this.deletedSyarat = Object.assign({}, item)
      this.deletesyaratDialog = true
    },
    deletePortofolioDialog(item){
      // this.deletedIndex = this.kriteriauks.indexOf(item);
      this.deletedPortofolio = Object.assign({}, item)
      this.deleteportofolioDialog = true
    },
    getIndex(list, id) {
      return list.findIndex((e) => e.id == id)
    },
    pickSyarat() {
      this.$refs.syarat.click()
    },
    pickPortofolio() {
      this.$refs.portofolio.click()
    },
    editedSyaratDialog(item) {
      console.log('hello')
      this.editedSyarat = Object.assign({}, item)
      this.syaratDialog = true
    },
    onSyaratSelected(e) {
      const syaratFile = e.target.files

      if(syaratFile[0] !== undefined) {
        this.syarats.syaratName = syaratFile[0].name
        if(this.syarats.syaratName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(syaratFile[0])
        fr.addEventListener('load', () => {
          this.syarats.syaratUrl = fr.result
          this.syarats.syaratFile = syaratFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.syarats.syaratName = ''
        this.syarats.syaratFile = ''
        this.syarats.syaratUrl = ''
      }
    },
    onPortofolioSelected(e) {
      const portofolioFile = e.target.files

      if(portofolioFile[0] !== undefined) {
        this.portofolios.portofolioName = portofolioFile[0].name
        if(this.portofolios.portofolioName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(portofolioFile[0])
        fr.addEventListener('load', () => {
          this.portofolios.portofolioUrl = fr.result
          this.portofolios.portofolioFile = portofolioFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.portofolios.portofolioName = ''
        this.portofolios.portofolioFile = ''
        this.portofolios.portofolioUrl = ''
      }
    },
    async getumpanBaliks () {
      const result = await this.$apollo.mutate({
        mutation: GET_UMPAN_BALIKS
      }).then(({ data }) => {
        this.umpanBaliks = data.umpanBaliks
        for (let i = 0; i < data.umpanBaliks.length; i++) {
          this.umpan_balik.push({
            umpan_balik_id: data.umpanBaliks[i].id,
            hasil: null,
            catatan: null
          })
        }
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    pickImage() {
      this.$refs.image.click()
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async getJadwal() {
      // this.alert.show = false;
      const { id } = this.$data
      const result = await this.$apollo.mutate({
        mutation: GET_REPORT_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        if (data.peserta.status == 2 || data.peserta.status == -2) {
          this.disabledMenu = false
        }
        this.peserta = data.peserta
        // this.items = data.peserta.syaratPeserta;
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
        this.getumpanBaliks()
      })
    },
    async accPersetujuanPeserta() {
      // const jenis_tes = '';
      if (this.form.tulis != null) {
        this.jenis_tes = '1'
      }
      if (this.form.lisan != null) {
        this.jenis_tes = '2'
      }
      if (this.form.lisan && this.form.tulis != null) {
        this.jenis_tes = '3'
      }
      const jenis_tes = this.jenis_tes
      const peserta_id = this.$route.params.id
      const result = await this.$apollo.mutate({
        mutation: ACC_PERSETUJUAN_PESERTA_MUTATION,
        variables: {
          peserta_id, jenis_tes
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Form FR.AK.01 berhasil dikirim')
        console.log(data)
        this.getJadwal()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.tambahDialog = false
      })
      // console.log(jenis_tes);
    },
    async createUmpanBalikPeserta() {
      const peserta_id = this.$route.params.id
      const catatan = this.catatan
      const umpan_balik = this.umpan_balik
      const result = await this.$apollo.mutate({
        mutation:  CREATE_UMPAN_BALIK_PESERTA_MUTATION,
        variables: {
          peserta_id, umpan_balik, catatan
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Form FR.AK.03 berhasil dikirim')
        console.log(data)
        this.getJadwal()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.umpanDialog = false
      })
      // console.log(jenis_tes);
    },
    async getSyarat() {
      const { id } = this.$data
      const result = await this.$apollo.mutate({
        mutation: GET_REPORT_DETAIL
      }).then(({ data }) => {
        this.peserta = data.peserta
        this.items = data.peserta.syaratPeserta
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async uploadSyarat() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        console.log(this.items.length)
          
        const id = this.editedSyarat.id
        // const syarat = this.syarats.syarat;
        const file = this.syarats.syaratUrl

        const result = await this.$apollo.mutate({
          mutation: UPLOAD_SYARAT,
          variables: {
            id,
            file
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data anda telah berhasil diupload')
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
          this.syaratDialog = false
          this.$refs.form.reset()
          this.getJadwal()
        })
      }
    },
    async uploadPortofolio() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        this.$refs.form.validate()
        if (!this.$refs.form.validate()) {
          this.state.loading = false
          return 
        }         
        const peserta_id = this.peserta.id
        const { portofolios: {nama, uji_kompetensi_id} } = this.$data
        const file = this.portofolios.portofolioUrl

        const result = await this.$apollo.mutate({
          mutation: UPLOAD_PORTOFOLIO,
          variables: {
            nama,
            peserta_id,
            file,
            uji_kompetensi_id
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data anda telah berhasil diupload')
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
          this.portofolioDialog = false
          this.$refs.form.reset()
          this.getJadwal()
        })
      }
    },
    async deleteSyarat() {
      this.alert.show = false
      const { deletedSyarat: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_SYARAT_PESERTA_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Syarat berhasil dihapus')
        this.state.skeleton = true
        this.getJadwal()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.deletesyaratDialog = false
      })
    },
    async deletePortofolio() {
      this.alert.show = false
      const { deletedPortofolio: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_PORTOFOLIO_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Portofolio berhasil dihapus')
        this.state.skeleton = true
        this.getJadwal()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.deleteportofolioDialog = false
      })
    },
    // async uploadSyarat() {
    //   const { state: { loading } } = this;
    //   if (!loading) {
    //     this.state.loading = true;
    //     console.log(this.items.length);
    //     if (this.items.length >= 1) {
    //       for (let index = 0; index < this.items.length; index++) {
    //         const id = this.items[index].id;
    //         const file = this.syarats[index].syaratUrl;

    //         const result = await this.$apollo.mutate({
    //         mutation: UPLOAD_SYARAT,
    //         variables: {
    //             id,
    //             file
    //         }
    //         }).then(({ data }) => {
    //             this.showAlert('success', 'Data anda telah berhasil diupload');
    //             console.log(data);
    //         }).catch(({graphQLErrors}) => {
    //             this.showAlert('error', graphQLErrors[0].message);
    //             console.log(graphQLErrors);
    //         }).finally(() => {
    //           this.state.loading = false;
    //         });
    //       }
    //     }
    //   }
    // }
  }
}

</script>
<style lang="scss" scoped>
</style>
