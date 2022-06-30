<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <div v-if="!state.skeleton">
            <v-snackbar
              v-model="alert.show"
              :color="alert.type"
              :timeout="0"
              top
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
            <!-- <div v-if="alert.show">
              <v-alert v-model="alert.show" :type="alert.type" dismissible class="mb-10">
                  <div class="white--text">
                  {{ alert.message }}
                  </div>
              </v-alert>
            </div> -->
            <v-row>
              <v-col cols="12" md="8">
                <v-row>
                  <v-col>
                    <v-card>
                      <v-card-title class="font-weight-bold">
                        Menu Uji Kompetensi
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :to="`/asesor/apl-1/${pesertas.id}`" dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Permohonan Sertifikasi</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.APL.01
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">1</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :to="`/asesor/asesmen-mandiri/${pesertas.id}`" dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Asesmen Mandiri</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.APL.02
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">2</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :to="`/asesor/soal-observasi/${pesertas.id}`" dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Pertanyaan Wawancara</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.IA.09
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">3</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card :to="`/asesor/hasil-observasi/${pesertas.id}`" link dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Ceklis Observasi</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.IA.01
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">4</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :to="`/asesor/verifikasi-portofolio/${pesertas.id}`" dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Ceklis Verifikasi Portofolio</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.IA.08
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">5</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col v-if="pesertas.status == 1" cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :to="`/asesor/rekaman-asesmen/${pesertas.id}`" dark color="error" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Lakukan Rekaman Asesmen</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.AK.02
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">6</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col v-if="pesertas.status == 2 || pesertas.status == -2" cols="12" class="col-md-4 col-xs-12 col-sm-6">
                        <v-card link :disabled="disabledMenu" :to="`/asesor/hasil-asesmen/${pesertas.id}`" dark color="primary" class="rounded-lg">
                          <v-card-title>
                            <p class="ma-0">Hasil Asesmen</p>
                          </v-card-title>
                          <v-card-subtitle>
                            FR.AK.02
                          </v-card-subtitle>
                          <v-card-text class="d-flex justify-end align-center">
                            <h1 class="font-weight-bold mt-0 px-5">6</h1>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- <v-col cols="12" class="pt-0">
                    <v-card>
                      <v-card-title class="px-8">
                        <span class="headline">
                          Menu Asesmen Peserta
                        </span>
                      </v-card-title>
                      <v-row>
                        <v-col v-if="pesertas.persetujuan == 0" cols="12" class="px-10 ">
                          <v-alert
                            class="mb-0"
                            icon="info"
                            text
                            type="info"
                          >
                            Silahkan menghubungi Asesi untuk menjelaskan mengenai Form FR.AK.01
                          </v-alert>
                        </v-col>
                        <v-col v-if="pesertas.persetujuan == 1" cols="12" class="px-10">
                          <v-alert
                            icon="info"
                            text
                            prominent
                            type="info"
                            class="mb-0"
                          >
                            <v-row align="center">
                              <v-col class="grow">Form APL-2 telah diverifikasi. Kirimkan FR.AK.01 persetujuan asesmen dan kerahasiaan</v-col>
                              <v-col class="shrink">
                                <v-dialog v-model="accDialog" persistent max-width="1000">
                                  <template #activator="{ on }">
                                    <v-btn color="primary" outlined v-on="on">Lihat Form</v-btn>
                                  </template>
                                  <v-form>
                                    <v-card>
                                      <v-card-title>
                                        <span>FR.AK.01 - PERSETUJUAN ASESMEN DAN KERAHASIAN</span>
                                      </v-card-title>
                                      <v-card-text>
                                        <v-simple-table>
                                          <tbody>
                                            <tr>
                                              <td colspan="5">
                                                Persetujuan Asesmen ini untuk menjamin bahwa Asesi telah diberi arahan secara rinci tentang perencanaan dan proses asesmen
                                              </td>
                                            </tr>
                                            <tr>
                                              <td rowspan="2" width="30%">Skema Sertifikasi <br> (KKNI/Okupasi/Klaster)</td>
                                              <td width="10%">Judul: </td>
                                              <td colspan="3">{{ pesertas.jadwal.skema.skema }}</td>
                                            </tr>
                                            <tr>
                                              <td>Nomor: </td>
                                              <td colspan="3">{{ pesertas.jadwal.skema.kode }}</td>
                                            </tr>
                                            <tr>
                                              <td colspan="2" class="text-right">Klaster teknisi (?)</td>
                                              <td>
                                                <v-checkbox v-model="value" label="Pratama" value="value"></v-checkbox>
                                              </td>
                                              <td>
                                                <v-checkbox v-model="value" label="Madya" value="value"></v-checkbox>
                                              </td>
                                              <td>
                                                <v-checkbox v-model="value" label="Ahli" value="value"></v-checkbox>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="2">TUK</td>
                                              <td colspan="3">Sewaktu/Tempat Kerja/Mandiri*</td>
                                            </tr>
                                            <tr>
                                              <td colspan="2">Nama Asesor</td>
                                              <td class="text-capitalize" colspan="3">{{ pesertas.asesor.nama }}</td>
                                            </tr>
                                            <tr>
                                              <td colspan="2">Nama Asesi</td>
                                              <td class="text-capitalize" colspan="3">{{ pesertas.asesi.nama }}</td>
                                            </tr>
                                            <tr>
                                              <td rowspan="2" colspan="2" width="30%">Bukti yang akan dikumpulkan</td>
                                              <td colspan="3">
                                                <v-row>
                                                  <v-col cols="6">
                                                    <v-checkbox v-model="value" label="TL : Verifikasi Portofolio" value="value"></v-checkbox>
                                                  </v-col>
                                                  <v-col cols="6">
                                                    <v-checkbox v-model="value" label="L : Observasi Langsung" value="value"></v-checkbox>
                                                  </v-col>
                                                </v-row>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="3">
                                                <v-checkbox v-model="form.tulis" readonly class="py-0" label="T: Hasil Tes Tulis" value="1"></v-checkbox><br>
                                                <v-checkbox v-model="form.lisan" readonly class="my-0 py-0" label="T: Hasil Tes Lisan" value="1"></v-checkbox><br>
                                                <v-checkbox class="my-0 py-0" input-value="true" label="T: Hasil Wawancara" value disabled></v-checkbox>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td rowspan="3" colspan="2">Pelaksanaan asesmen disepakati pada:</td>
                                              <td>Hari/ Tanggal</td>
                                              <td colspan="2">{{ pesertas.asesmen_date }}</td>
                                            </tr>
                                            <tr>
                                              <td>Waktu</td>
                                              <td colspan="2">07:00 - Selesai</td>
                                            </tr>
                                            <tr>
                                              <td>TUK</td>
                                              <td colspan="2"></td>
                                            </tr>
                                            <tr>
                                              <td class="py-2" colspan="5">
                                                <b>Asesi:</b><br>
                                                Bahwa Saya Sudah Mendapatkan Penjelasan hak dan Prosedur Banding Oleh Asesor.
                                              </td>
                                            </tr>
                                            <tr>
                                              <td class="py-2 text-justify" colspan="5">
                                                <b>Asesor:</b><br>
                                                Menyatakan tidak akan membuka hasil pekerjaan yang saya peroleh karena penugasan saya sebagai Asesor 
                                                dalam pekerjaan Asesmen kepada siapapun atau organisasi apapun selain kepada pihak yang berwenang sehubungan 
                                                dengan kewajiban saya sebagai Asesor yang ditugaskan oleh LSP.
                                              </td>
                                            </tr>
                                          </tbody>
                                        </v-simple-table>
                                        <v-container>
                                        </v-container>
                                      </v-card-text>
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="grey" text @click="accDialog = false">Batal</v-btn>
                                        <v-btn color="blue darken-1" text @click="accPersetujuanAsesor">Verifikasi</v-btn>
                                      </v-card-actions>
                                    </v-card>
                                  </v-form>
                                </v-dialog>
                              </v-col>
                            </v-row>
                          </v-alert>
                        </v-col>
                        <v-col cols="12" class="px-10">
                          <v-row>
                            <v-col md="3">
                              <v-card :to="`/asesor/apl-1/${pesertas.id}`" text link>
                                <v-card-actions class="justify-center fill-height">
                                  <v-list-item two-line>
                                    <v-list-item-content class="text-center">
                                      <v-list-item-title class="headline mb-2">
                                        <v-icon size="30" color="primary">person</v-icon>
                                      </v-list-item-title>
                                      <v-list-item-title>Detil APL 1</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                            <v-col md="3">
                              <v-card :to="`/asesor/asesmen-mandiri/${pesertas.id}`" text link>
                                <v-card-actions class="justify-center fill-height">
                                  <v-list-item two-line>
                                    <v-list-item-content class="text-center">
                                      <v-list-item-title class="headline mb-2">
                                        <v-icon size="30" color="warning">subject</v-icon>
                                      </v-list-item-title>
                                      <v-list-item-title>Asesmen Mandiri</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                            <v-col md="3">
                              <v-card :to="`/asesor/soal-observasi/${pesertas.id}`" text link>
                                <v-card-actions class="justify-center fill-height">
                                  <v-list-item two-line>
                                    <v-list-item-content class="text-center">
                                      <v-list-item-title class="headline mb-2">
                                        <v-icon size="30" color="indigo">edit</v-icon>
                                      </v-list-item-title>
                                      <v-list-item-title>Hasil observasi</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                            <v-col md="3">
                              <v-card :to="`/asesor/hasil-observasi/${pesertas.id}`" text link>
                                <v-card-actions class="justify-center fill-height">
                                  <v-list-item two-line>
                                    <v-list-item-content class="text-center">
                                      <v-list-item-title class="headline mb-2">
                                        <v-icon size="30" color="error">wrap_text</v-icon>
                                      </v-list-item-title>
                                      <v-list-item-title>Hasil observasi</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                            <v-col v-if="pesertas.status == 1" md="3">
                              <nuxt-link :to="`/asesor/rekaman-asesmen/${pesertas.id}`">
                                <v-card text link>
                                  <v-card-actions class="justify-center fill-height">
                                    <v-list-item two-line>
                                      <v-list-item-content class="text-center">
                                        <v-list-item-title class="headline mb-2">
                                          <v-icon size="30" color="primary">toc</v-icon>
                                        </v-list-item-title>
                                        <v-list-item-title>Rekaman Asesmen</v-list-item-title>
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-card-actions>
                                </v-card>
                              </nuxt-link>
                            </v-col>
                            <v-col md="3">
                              <v-card :disabled="disabledMenu" :to="`/asesor/hasil-asesmen/${pesertas.id}`" text link>
                                <v-card-actions class="justify-center fill-height">
                                  <v-list-item two-line>
                                    <v-list-item-content class="text-center">
                                      <v-list-item-title class="headline mb-2">
                                        <v-icon size="30" color="success">playlist_add_check</v-icon>
                                      </v-list-item-title>
                                      <v-list-item-title>Rekaman Asesmen</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-card-actions>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col> -->
                  <v-col cols="12">
                    <v-card>
                      <v-card-title class="px-8">
                        <span class="headline">
                          Informasi Sertifikasi
                        </span>
                      </v-card-title>
                      <v-card-text>
                      
                        <v-row>
                          <v-col cols="12" class="px-5">
                            <v-alert
                              icon="info"
                              text
                              type="info"
                            >
                              Setelah proses verifikasi APL-2, silahkan tekan tombol konfirmasi jadwal untuk menginfokan Asesi mengenai jadwal Asesmen Online!
                            </v-alert>
                            <label for="">Tanggal Asesmen</label>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              :disabled="pesertas.asesmen_date != null"
                              min-width="290px"
                            >
                              <template #activator="{ on }">
                                <v-text-field
                                  v-model="input.asesmen_date"
                                  class="mt-2"
                                  label="Pilih tanggal asesmen untuk peserta"
                                  solo
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="input.asesmen_date" :readonly="pesertas.asesmen_date != null" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="grey" @click="menu = false">Cancel</v-btn>
                                <v-btn v-if="pesertas.asesmen_date == null" text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="d-flex justify-end pt-0">
                            <v-btn
                              v-if="pesertas.asesmen_date == null"
                              width="200"
                              large
                              rounded
                              color="primary"
                              dark
                              @click="updateDatePeserta">
                              <v-progress-circular
                                v-if="state.loading"
                                :size="20"
                                :width="2"
                                indeterminate
                                color="white"
                                class="mr-2"
                              ></v-progress-circular>
                              Konfirmasi Jadwal
                            </v-btn>
                          <!-- <v-btn @click="updateDatePeserta" color="blue darken-3 mt-5 px-10" dark rounded>Tentukan tanggal</v-btn> -->
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col v-show="false" cols="12">
                    <v-card>
                      <v-card-title class="px-8">
                        <span class="headline">
                          Portofolio
                        </span>
                      </v-card-title>
                      <v-card-text>
                        <v-data-table
                          v-if="!state.skeleton"
                          :headers="portofoliosHeaders"
                          :items="pesertas.portofolio"
                          :items-per-page="5"
                          :line-numbers="true"
                          hide-default-footer
                        >
                          <template #top>
                            <v-dialog v-model="portofolioDialog" persistent max-width="600px">
                              <v-card>
                                <v-card-title>
                                  <span class="headline">Verifikasi Portofolio</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <label for="">Unit Kompetensi</label>
                                        <v-text-field
                                          v-if="verifiedPortofolio.ujiKompetensi != null"
                                          v-model="verifiedPortofolio.ujiKompetensi.unitKompetensi.unit"
                                          class="mt-2"
                                          label="Pilih tanggal asesmen untuk peserta"
                                          readonly
                                          solo
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-select
                                          v-model="verifiedPortofolio.valid"
                                          :items="status"
                                          label="Data Valid"
                                          item-value="id" item-text="status"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-select
                                          v-model="verifiedPortofolio.memadai"
                                          :items="status"
                                          label="Data Memadai"
                                          item-value="id" item-text="status"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-select
                                          v-model="verifiedPortofolio.asli"
                                          :items="status"
                                          label="Data Asli"
                                          item-value="id" item-text="status"
                                        />
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12">
                                        <v-select
                                          v-model="verifiedPortofolio.terkini"
                                          :items="status"
                                          label="Data Terkini"
                                          item-value="id" item-text="status"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="grey" text @click="portofolioDialog = false">Batal</v-btn>
                                  <v-btn color="blue darken-1" text @click="verifikasiPortofolio">Simpan</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </template>
                          <template #item.valid="{ item }">
                            <v-chip v-if="item.valid == -1" small color="red darken-1" dark>tidak</v-chip>
                            <v-chip v-if="item.valid == 0" small color="grey" dark>-</v-chip>
                            <v-chip v-if="item.valid == 1" small color="primary" dark>Ya</v-chip>
                          </template>
                          <template #item.memadai="{ item }">
                            <v-chip v-if="item.memadai == -1" small color="red darken-1" dark>tidak</v-chip>
                            <v-chip v-if="item.memadai == 0" small color="grey" dark>-</v-chip>
                            <v-chip v-if="item.memadai == 1" small color="primary" dark>Ya</v-chip>
                          </template>
                          <template #item.asli="{ item }">
                            <v-chip v-if="item.asli == -1" small color="red darken-1" dark>tidak</v-chip>
                            <v-chip v-if="item.asli == 0" small color="grey" dark>-</v-chip>
                            <v-chip v-if="item.asli == 1" small color="primary" dark>Ya</v-chip>
                          </template>
                          <template #item.terkini="{ item }">
                            <v-chip v-if="item.terkini == -1" small color="red darken-1" dark>tidak</v-chip>
                            <v-chip v-if="item.terkini == 0" small color="grey" dark>-</v-chip>
                            <v-chip v-if="item.terkini == 1" small color="primary" dark>Ya</v-chip>
                          </template>
                          <template #item.actions="{ item }">
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="primary" :href="item.file" v-on="on">
                                  <v-icon>
                                    cloud_download
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Download file</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="orange lightern-1" :href="item.file" target="_blank" v-on="on">
                                  <v-icon>
                                    remove_red_eye
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Lihat file</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <v-btn class="mr-2" icon color="pink darken-3" target="_blank" v-on="on" @click="editItemPortofolio(item)">
                                  <v-icon>
                                    edit
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Verifikasi file</span>
                            </v-tooltip>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col v-show="false" cols="12">
                    <v-card>
                      <v-card-title class="px-8 ">
                        <span class="headline">Syarat Peserta</span>
                        <v-spacer></v-spacer>
                      <!-- <v-menu bottom left>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            icon
                            v-on="on"
                          >
                            <v-icon>settings</v-icon>
                          </v-btn>
                        </template>

                        <v-list>
                          <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            @click="show = item.show"
                            link
                          >
                            <v-list-item-icon class="mr-3">
                              <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu> -->
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text v-show="false" v-if="show === 'informasi'" class="px-8 py-8"> 
                        <div>
                          <v-data-table
                            v-if="!state.skeleton"
                            :headers="headers"
                            :items="pesertas.syaratPeserta"
                            :items-per-page="5"
                            :line-numbers="true"
                            :width="headers.width"
                          >
                            <template #top>
                              <v-dialog v-model="syaratDialog" persistent max-width="600px">
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">Verifikasi Syarat</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                          <v-select
                                            v-model="verifiedSyarat.status"
                                            :items="status"
                                            label="Pilih Status"
                                            item-value="id" item-text="status"
                                          />
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="syaratDialog = false">Batal</v-btn>
                                    <v-btn color="blue darken-1" text @click="verifikasiSyarat">Simpan</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </template>
                            <template #item.file="{ item }">
                              <span>{{ item.file.substr(item.file.lastIndexOf('/') + 1) }}</span>
                            </template>
                            <template #item.status="{ item }">
                              <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                              <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                              <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                              <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                            </template>
                            <template #item.actions="{ item }">
                              <v-tooltip bottom>
                                <template #activator="{ on }">
                                  <v-btn class="mr-2" icon color="primary" :href="item.file" v-on="on">
                                    <v-icon>
                                      cloud_download
                                    </v-icon>
                                  </v-btn>
                                </template>
                                <span>Download file</span>
                              </v-tooltip>
                              <v-tooltip bottom>
                                <template #activator="{ on }">
                                  <v-btn class="mr-2" icon color="orange lightern-1" :href="item.file" target="_blank" v-on="on">
                                    <v-icon>
                                      remove_red_eye
                                    </v-icon>
                                  </v-btn>
                                </template>
                                <span>Lihat file</span>
                              </v-tooltip>
                              <!-- <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                      <v-btn class="mr-2" v-on="on" icon color="pink darken-3" @click="editItem(item)" target="_blank">
                                        <v-icon>
                                          edit
                                        </v-icon>
                                      </v-btn>
                                    </template>
                                    <span>Verifikasi file</span>
                                  </v-tooltip> -->
                              <!-- <v-btn color="success" target="_blank" outlined rounded x-small :href="item.file">Download</v-btn> -->
                            </template>
                          </v-data-table>
                        </div>
                      </v-card-text>
                      <v-card-text v-show="false" v-if="show === 'asesmen-mandiri'" class="px-8 py-8">
                        <v-alert
                          icon="info"
                          text
                          type="info"
                        >
                          Berikut adalah hasil asesmen mandiri.
                        </v-alert>
                        <div class="pt-5">
                          <v-expansion-panels multiple accordion>
                            <v-expansion-panel
                              v-for="(uji, ujiIndex) in ujikompetensi"
                              :key="uji.id"
                            >
                              <v-expansion-panel-header>{{ uji.unitKompetensi.kode }} {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}</v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-simple-table>
                                  <template #default>
                                    <thead>
                                      <tr>
                                        <th width="20"><b>No</b></th>
                                        <th width="60%"><b>Apakah saya dapat?</b></th>
                                        <th width="20%" class="text-center"><b>Kompeten</b></th>
                                        <th width="20%" class="text-center"><b>Belum Kompeten</b></th>
                                      </tr>
                                    </thead>
                                    <tbody v-for="(elemen, elemenIndex) in uji.unitKompetensi.element" :key="elemen.id">
                                      <tr>
                                        <th>{{ elemenIndex+1 }}</th>
                                        <th colspan="4">Elemen: {{ elemen.elemen }}</th>
                                      </tr>
                                      <tr>
                                        <td></td>
                                        <td colspan="4" width="20">Kriteria Unjuk Kerja :</td>
                                      </tr>
                                      <tr v-for="(kuk, kukIndex) in uji.asesmen" :key="kuk.id">
                                        <td width="5%">{{ ujiIndex+1 }}.{{ kukIndex+1 }}</td>
                                        <td>{{ kuk.kriteriaUk.kriteria }}</td>
                                        <td class="text-center">
                                          <v-radio-group v-model="ujikompetensi[ujiIndex].asesmen[kukIndex].asesmen_mandiri">
                                            <v-radio readonly class="justify-center" :value="1"></v-radio>
                                          </v-radio-group>
                                        </td>
                                        <td class="text-center">
                                          <v-radio-group v-model="ujikompetensi[ujiIndex].asesmen[kukIndex].asesmen_mandiri">
                                            <v-radio readonly class="justify-center" :value="-1"></v-radio>
                                          </v-radio-group>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                                <v-row>
                                  <v-col cols="6 d-flex align-center">
                                    <nuxt-link :to="`/asesor/ujikompetensi/${ujikompetensi[ujiIndex].id}`">
                                      <v-btn
                                        depressed
                                        tile
                                        color="primary"
                                        class="px-5">
                                        Observasi
                                      </v-btn>
                                    </nuxt-link>
                                  </v-col>
                                  <v-spacer></v-spacer>
                                  <v-col cols="6" class="d-flex justify-end">
                                    <v-text-field
                                      v-model="ujikompetensi[ujiIndex].rekomendasi_am"
                                      label="Rekomendasi Asesmen"
                                      color="primary"
                                      @keypress.enter="verifikasiAsesmenMandiri(ujiIndex)">
                                      <template #append>
                                        <v-btn
                                          depressed
                                          tile
                                          color="primary"
                                          class="mt-0 px-5"
                                          @click="verifikasiAsesmenMandiri(ujiIndex)">
                                          Verifikasi
                                        </v-btn>
                                      </template>
                                    </v-text-field>
                                  </v-col>
                                </v-row>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col v-show="false" cols="12">
                    <v-card>
                      <v-card-title class="px-8">
                        <span class="headline">
                          Unit Kompetensi
                        </span>
                      </v-card-title>
                      <v-card-text>
                        <v-expansion-panels multiple accordion>
                          <v-expansion-panel
                            v-for="(uji, ujiIndex) in ujikompetensi"
                            :key="uji.id"
                          >
                            <v-expansion-panel-header>
                              {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}
                              <div v-if="ujikompetensi[ujiIndex].observasi_date == null" class="blobs-container">
                                <div class="blob orange"></div>
                              </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-alert
                                icon="info"
                                text
                                type="info"
                              >
                                Hasil asesmen mandiri
                              </v-alert>
                              <v-simple-table> 
                                <tbody>
                                  <tr>
                                    <td width="10%"><b>Verifikasi:</b></td>
                                    <td v-if="ujikompetensi[ujiIndex].verifikasi_am != null" class="success--text">Selesai</td>
                                    <td v-if="ujikompetensi[ujiIndex].verifikasi_am == null" class="error--text">Belum</td>
                                  </tr>
                                  <tr>
                                    <td width="10%"><b>Rekomendasi:</b></td>
                                    <td>{{ ujikompetensi[ujiIndex].rekomendasi_am }}</td>
                                  </tr>
                                  <tr>
                                    <td width="10%"><b>Observasi:</b></td>
                                    <td v-if="ujikompetensi[ujiIndex].observasi_date != null" class="success--text">Selesai</td>
                                    <td v-if="ujikompetensi[ujiIndex].observasi_date == null" class="error--text">Belum</td>
                                  </tr>
                                  <tr>
                                    <td width="10%"><b>Umpan balik:</b></td>
                                    <td>{{ ujikompetensi[ujiIndex].umpan_balik_observasi }}</td>
                                  </tr>
                                </tbody>
                              </v-simple-table>
                              <v-simple-table>
                                <template #default>
                                  <thead>
                                    <tr>
                                      <th width="20"><b>No</b></th>
                                      <th width="60%" colspan="2"><b>Apakah saya dapat?</b></th>
                                      <th width="20%" class="text-center"><b>Kompeten</b></th>
                                      <th width="20%" class="text-center"><b>Belum Kompeten</b></th>
                                    </tr>
                                  </thead>
                                  <tbody v-for="(elemen, elemenIndex) in uji.unitKompetensi.element" :key="elemen.id">
                                    <tr>
                                      <th>{{ elemenIndex+1 }}</th>
                                      <th colspan="2">Elemen: {{ elemen.elemen }}</th>
                                      <td class="text-center">
                                        <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].asesmen_mandiri">
                                          <v-radio class="justify-center" value="1"></v-radio>
                                        </v-radio-group>
                                      </td>
                                      <td class="text-center">
                                        <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].asesmen_mandiri">
                                          <v-radio class="justify-center" value="-1"></v-radio>
                                        </v-radio-group>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td></td>
                                      <td colspan="4" width="20">Kriteria Unjuk Kerja :</td>
                                    </tr>
                                    <tr v-for="(kuk, kukIndex) in elemen.kriteriaUk" :key="kuk.id">
                                      <td></td>
                                      <td width="5%">{{ ujiIndex+1 }}.{{ kukIndex+1 }}</td>
                                      <td>{{ kuk.kriteria }}</td>
                                      <td colspan="2"></td>
                                      <!-- <td class="text-center">
                                            <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri">
                                              <v-radio readonly class="justify-center" :value = "1"></v-radio>
                                            </v-radio-group>
                                          </td>
                                          <td class="text-center">
                                            <v-radio-group v-model="ujikompetensi[ujiIndex].unitKompetensi.element[elemenIndex].kriteriaUk[kukIndex].asesmen_mandiri">
                                              <v-radio readonly class="justify-center" :value = "-1"></v-radio>
                                            </v-radio-group>
                                          </td> -->
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                              <v-row>
                                <v-col v-if="ujikompetensi[ujiIndex].observasi_date == null" cols="6 d-flex align-center">
                                  <nuxt-link :to="`/asesor/observasi/${ujikompetensi[ujiIndex].id}`">
                                    <v-btn
                                      depressed
                                      tile
                                      color="primary"
                                      class="px-5">
                                      Observasi
                                    </v-btn>
                                  </nuxt-link>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="6" class="d-flex justify-end">
                                  <v-text-field
                                    v-if="ujikompetensi[ujiIndex].verifikasi_am == null"
                                    v-model="ujikompetensi[ujiIndex].rekomendasi_am"
                                    label="Rekomendasi Asesmen"
                                    color="primary"
                                    @keypress.enter="verifikasiAsesmenMandiri(ujiIndex)">
                                    <template #append>
                                      <v-btn
                                        depressed
                                        tile
                                        color="primary"
                                        class="mt-0 px-5"
                                        @click="verifikasiAsesmenMandiri(ujiIndex)">
                                        Verifikasi
                                      </v-btn>
                                    </template>
                                  </v-text-field>
                                </v-col>
                              </v-row>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4">
                <v-card>
                  <div class="d-flex flex-no-wrap">
                    <v-avatar
                      class="mx-auto mt-10"
                      size="125"
                      circle
                    >
                      <v-img :src="pesertas.asesi.image"></v-img>
                    </v-avatar>
                    <!-- <div>
                      <v-card-title
                        class="headline"
                        v-text="pesertas.asesi.nama"
                      ></v-card-title>
                      <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                        <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                        <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                        <v-btn v-if="pesertas.status == 2" text color="success">Lulus Sertifikasi</v-btn>
                      </v-card-actions>
                    </div> -->
                  </div>
                  <div class="d-flex flex-no-wrap mt-5">
                    <v-chip class="mx-auto" v-if="pesertas.status == -2" text small color="error">Belum Kompeten</v-chip>
                    <v-chip class="mx-auto" v-if="pesertas.status == -1" text small color="danger">Ditolak</v-chip>
                    <v-chip class="mx-auto" v-if="pesertas.status == 0" text small color="grey">Belum</v-chip>
                    <v-chip class="mx-auto" v-if="pesertas.status == 1" text small color="primary">Disetujui</v-chip>
                    <v-chip class="mx-auto" v-if="pesertas.status == 2" text small color="success">Kompeten</v-chip>
                  </div>
                  <!-- <v-divider></v-divider> -->
                  <v-card-text class="px-5">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td width="20%"><b>Nama:</b></td>
                          <td>{{ pesertas.asesi.nama }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Skema:</b></td>
                          <td>{{ pesertas.jadwal.skema.skema }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Tanggal:</b></td>
                          <td>{{ pesertas.jadwal.tanggal }}</td>
                        </tr>
                        <tr>
                          <td width="10%"><b>Asesor:</b></td>
                          <td v-if="pesertas.asesor != null">{{ pesertas.asesor.nama }}</td>
                          <td v-if="pesertas.asesor == null">Belum Ditentukan</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                  <!-- <v-card-actions v-if="pesertas.status == 2 || pesertas.status == -2" class="d-flex justify-center pb-8 pt-0">
                    <nuxt-link :to="`/admin/hasil-asesmen/${pesertas.id}`">
                      <v-btn color="success" rounded>Lihat Hasil Sertifikasi</v-btn>
                    </nuxt-link>
                  </v-card-actions> -->
                </v-card>
              </v-col>
              <!-- <div class="col-md-4 col-xs-12 pt-0">
                <v-card>
                  <div class="d-flex flex-no-wrap">
                    <v-avatar
                      class="ml-5 mt-5"
                      size="125"
                      style="border-radius: .42rem;"
                      tile
                    >
                      <v-img :src="pesertas.asesi.image"></v-img>
                    </v-avatar>
                    <div>
                      <v-card-title
                        color="primary"
                        class="headline"
                        v-text="pesertas.asesi.nama"
                      ></v-card-title>
                      <v-card-subtitle class="py-0">status asesi:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn v-if="pesertas.status == -2" text color="error">Tidak lulus sertifikasi</v-btn>
                        <v-btn v-if="pesertas.status == -1" text color="danger">Ditolak</v-btn>
                        <v-btn v-if="pesertas.status == 0" text color="grey">Belum</v-btn>
                        <v-btn v-if="pesertas.status == 1" text color="primary">Disetujui</v-btn>
                        <v-btn v-if="pesertas.status == 2" text color="success">Lulus sertifikasi</v-btn>
                      </v-card-actions>
                    </div>
                  </div>
                  <v-card-text class="px-5">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td width="20%"><b>Nama:</b></td>
                          <td>{{ pesertas.asesi.nama }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Skema:</b></td>
                          <td>{{ pesertas.jadwal.skema.skema }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Tanggal:</b></td>
                          <td>{{ pesertas.jadwal.tanggal }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Asesor:</b></td>
                          <td>{{ pesertas.asesor.nama }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </div> -->
            </v-row>
          </div>
        </v-container>
      </v-layout>
    </section>
  </div>    
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { ACC_PERSETUJUAN_ASESOR_MUTATION, UPDATE_ASESI_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, UPDATE_DATE_PESERTA, GET_PROVINSIS, GET_KOTAS, GET_PESERTAS_DETAIL, VERIFIKASI_FILEINPUT_MUTATION, EVALUASI_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { VERIFIKASI_PESERTA_MUTATION, VERIFIKASI_ASESMEN_MANDIRI_MUTATION } from '../../../constants/graphql'

export default {
  name: 'DetailPeserta',
  layout: 'App_asesor',
  data() {
    return {
      show: 'informasi',
      syaratDialog: false,
      portofolioDialog: false,
      peserta_id: this.$route.params.id,
      headers: [
        { text: 'Syarat', value: 'syarat.syarat' },
        { text: 'File', value: 'file'},
        { text: 'Status', value: 'status', width: '20%' },
        { text: 'Aksi', value: 'actions', width: '30%' },
      ],
      portofoliosHeaders: [
        { text: 'ID', value: 'id' },
        { text: 'Nama', value: 'nama'},
        { text: 'Valid', value: 'valid' },
        { text: 'Memadai', value: 'memadai' },
        { text: 'Keaslian', value: 'asli' },
        { text: 'terkini', value: 'terkini' },
        { text: 'Aksi', value: 'actions', width: '30%' },
      ],
      form: {
        tulis: null,
        lisan: null
      },
      editDialog: false,
      accDialog: false,
      items: [
        { title: 'Informasi Profil' , icon: 'person', show: 'informasi'},
        { title: 'Asesmen Mandiri' , icon: 'lock', show: 'asesmen-mandiri'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      status: [
        {
          id: -1,
          status: 'Ditolak'
        },
        {
          id: 0,
          status: 'Belum'
        },
        {
          id: 1,
          status: 'Disetujui'
        }
      ],
      state: {
        skeleton: true,
        loading: false
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      rules: [
        value => !value || value.size < 1000000 || 'Ukuran gambar harus kurang dari 1 MB!',
      ],
      disabledMenu: true,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      verifiedSyarat: {},
      verifiedPortofolio: {},
      gender: [
        {
          kode: "L",
          jk: "Laki-laki"
        },
        {
          kode: "P",
          jk: "Perempuan"
        }
      ],
      pesertas: {
        asesi: {
          image: null
        }
      },
      input: [],
      ujikompetensi: []
    }
  },  
  async mounted() {
    await this.getpesertaDetails()
  },
  methods: {
    editItem(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedSyarat = Object.assign({}, item)
      this.syaratDialog = true
    },
    editItemPortofolio(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedPortofolio = Object.assign({}, item)
      this.portofolioDialog = true
    },
    //  get peserta
    async verifikasiPeserta() {
      this.alert.show = false
      const { pesertas: {id, status} } = this.$data
      const note = this.pesertas.note_apl1
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_PESERTA_MUTATION,
        variables: {
          id, status, note
        }
      }).then(({ data }) => {
        // this.showAlert('success', 'Peserta berhasil diverifikasi');
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        // this.showAlert('error', graphQLErrors[0].message);
      }).finally(() => {
        this.editDialog = false
      })
    },
    async verifikasiSyarat() {
      this.alert.show = false
      const { verifiedSyarat: {id} } = this.$data
      const status = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_FILEINPUT_MUTATION,
        variables: {
          id, status
        }
      }).then(({ data }) => {
        // this.showAlert('success', 'Peserta berhasil diverifikasi');
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        // this.showAlert('error', graphQLErrors[0].message);
      }).finally(() => {
        this.editDialog = false
      })
    },
    async verifikasiPortofolio() {
      this.alert.show = false
      const { verifiedPortofolio: {id, valid, memadai, asli, terkini} } = this.$data
      const hasil = this.verifiedSyarat.status
      const result = await this.$apollo.mutate({
        mutation: EVALUASI_PORTOFOLIO_MUTATION,
        variables: {
          id, valid, memadai, asli, terkini
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Portofolio berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.portofolioDialog = false
      })
    },
    async getpesertaDetails() {
      const id = this.peserta_id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        if (data.peserta.status == 2 || data.peserta.status == -2) {
          this.disabledMenu = false
        }
        this.pesertas = data.peserta
        if (this.pesertas.jenis_tes == 1) {
          this.form.tulis = '1'
        }
        if (this.pesertas.jenis_tes == 2) {
          this.form.lisan = '1'
        }
        if (this.pesertas.jenis_tes == 3) {
          console.log('hello')
          this.form.lisan = '1'
          this.form.tulis = '1'
        }
        this.input = {...this.pesertas}
        this.input.asesmen_date = this.pesertas.jadwal.tanggal
        this.ujikompetensi = data.peserta.ujiKompetensi
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.element.length; i++) {
            const element = this.ujikompetensi[x].unitKompetensi.element[i]
            for (let k = 0; k < this.ujikompetensi[x].asesmen.length; k++) {
              if (this.ujikompetensi[x].asesmen[k].element.id == element.id) {
                this.ujikompetensi[x].unitKompetensi.element[i] = Object.assign({}, this.ujikompetensi[x].unitKompetensi.element[i], { asesmen_mandiri: `${this.ujikompetensi[x].asesmen[k].asesmen_mandiri}` })
                console.log(element.id)
              }
            }
          }
        }
        console.log(data.peserta)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async updateDatePeserta() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        const { pesertas: {id} } = this.$data
        const date = this.input.asesmen_date
        const result = await this.$apollo.mutate({
          mutation: UPDATE_DATE_PESERTA,
          variables: {
            id, date
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Tanggal asesmen berhasil ditentukan')
          this.getpesertaDetails()
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.skeleton = false
          this.state.loading = false
        })
      }
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async accPersetujuanAsesor() {
      const peserta_id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: ACC_PERSETUJUAN_ASESOR_MUTATION,
        variables: {
          peserta_id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Form FR.AK.01 berhasil dikirim')
        console.log(data)
        this.getpesertaDetails()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
        this.accDialog = false
      })
      // console.log(jenis_tes);
    },
    async verifikasiAsesmenMandiri(ujiIndex) {
      console.log(this.ujikompetensi[ujiIndex].asesmen.length)
      const asesmenData = this.ujikompetensi[ujiIndex].asesmen
      const uji_kompetensi_id = this.ujikompetensi[ujiIndex].id
      let rekomendasi_am = this.ujikompetensi[ujiIndex].rekomendasi_am
      if (rekomendasi_am === undefined) {
        rekomendasi_am = null
      }
      const asesmen = []
      for (let indexAsesmen = 0; indexAsesmen < asesmenData.length; indexAsesmen++) {
        const element = Object.assign({}, {asesmen_mandiri: asesmenData[indexAsesmen].asesmen_mandiri, kuk_id: asesmenData[indexAsesmen].kriteriaUk.id})
        // console.log(element);
        // const element = this.ujikompetensi[ujiIndex].asesmen[indexAsesmen].kriteriaUk.id;
        asesmen.push(element)
      }
      console.log(rekomendasi_am)
      const result = await this.$apollo.mutate({
        mutation: VERIFIKASI_ASESMEN_MANDIRI_MUTATION,
        variables: {
          uji_kompetensi_id, rekomendasi_am, asesmen
        }
      }).then(({ data }) => {
        this.showAlert('success', 'peserta berhasil diverifikasi')
        this.getpesertaDetails()
        console.log(data)
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.state.skeleton = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
