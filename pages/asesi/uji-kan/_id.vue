<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container v-if="!state.skeleton" fluid>
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
          <v-card>
            <v-card-title primary-title>
                Halaman Peserta Ujian
            </v-card-title>
            <v-card-text>
							<v-simple-table>
								<tbody>
									<tr>
										<td width="20%"><b>Nama Jadwal</b></td>
										<td width="2%">:</td>
										<td>{{ peserta_ujian.jadwalUjian.name }}</td>
									</tr>
									<tr>
										<td><b>Tanggal Pelaksanaan</b></td>
										<td>:</td>
										<td>{{ peserta_ujian.jadwalUjian.tanggal }}</td>
									</tr>
									<tr>
										<td><b>Biaya Pendaftaran</b></td>
										<td>:</td>
										<td>{{ peserta_ujian.jadwalUjian.price }}</td>
									</tr>
									<tr>
										<td><b>Tempat Ujian</b></td>
										<td>:</td>
										<td>{{ peserta_ujian.jadwalUjian.tempat_ujian }}</td>
									</tr>
									<tr>
										<td><b>Kuota Pendaftar</b></td>
										<td>:</td>
										<td>{{ peserta_ujian.jadwalUjian.kuota }}</td>
									</tr>
									<tr>
										<td><b>Keterangan</b></td>
										<td>:</td>
										<td>{{ peserta_ujian.jadwalUjian.keterangan }}</td>
									</tr>
                  <tr>
										<td><b>Status Peserta</b></td>
										<td>:</td>
										<td>
                      <v-btn v-if="peserta_ujian.status == -1" small color="error">Ditolak</v-btn>
                      <v-btn v-if="peserta_ujian.status == 0" small color="grey">Belum diverifikasi</v-btn>
                      <v-btn v-if="peserta_ujian.status == 1" small color="success">Sudah Diverifikasi</v-btn>
                    </td>
									</tr>
								</tbody>
							</v-simple-table>
            </v-card-text>
          </v-card>
					<v-row class="mt-5">
						<v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
							<v-card disabled link dark color="warning" class="rounded-lg">
								<v-card-title>
									<p class="ma-0">Ujian</p>
								</v-card-title>
								<v-card-subtitle>
									Lakukan ujian disini
								</v-card-subtitle>
								<v-card-text class="d-flex justify-end align-center">
									<v-icon size="80">subject</v-icon>
								</v-card-text>
							</v-card>
						</v-col>
						<v-col cols="12" class="col-md-3 col-xs-12 col-sm-6">
							<v-card disabled link dark color="warning" class="rounded-lg">
								<v-card-title>
									<p class="ma-0">Hasil Ujian</p>
								</v-card-title>
								<v-card-subtitle>
									Lihat hasil akhir ujian
								</v-card-subtitle>
								<v-card-text class="d-flex justify-end align-center">
									<v-icon size="80">playlist_add_check</v-icon>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>
					<v-card class="rounded-lg mt-8">
						<v-card-title>
							Syarat Ujian KAN
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text>
							<v-row>
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
								:items="peserta_ujian.syaratPesertaUjian"
								:search="search"
								:items-per-page="5"
								:line-numbers="true"
								hide-default-footer
							>
								<template #top>
									<v-dialog v-model="syaratDialog" persistent max-width="600px">
										<v-form>
											<v-card>
												<v-card-title>
													<span class="headline">Upload Syarat</span>
												</v-card-title>
												<v-card-text>
													<v-container>
														<v-row>
															<v-col cols="12" sm="12" md="12" class="pt-0">
																<label for=""><b>Nama Syarat</b></label>
																<v-text-field v-model="editedSyarat.syaratUjian.syarat" class="mt-2" outlined dense disabled required></v-text-field>
                                <label for=""><b>Keterangan</b></label>
																<v-textarea v-model="editedSyarat.syaratUjian.keterangan" class="mt-2" outlined dense disabled required></v-textarea>
                                <v-file-input
                                  v-model="file_preview"
                                  dense
                                  outlined
                                  type="file"
                                  @change="toBase64"
                                  accept="application/pdf"
                                  label="Upload file syarat (Maks 2MB)"
                                  clearable
                                  truncate-length="15"
                                ></v-file-input>
																<!-- <label for=""><b>File Syarat*</b></label> -->
																<!-- <v-text-field v-model="syarats.syaratName" persistent-hint hint="PDF (maks 2MB)" class="mt-2" solo readonly label="Pilih Syarat" prepend-icon="attach_file" @click="pickSyarat"></v-text-field>
																<input
																	ref="syarat"
																	type="file"
																	style="display: none"
																	accept="application/pdf"
																	@change="onSyaratSelected"
																> -->
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
												<v-btn color="red darken-1" text @click="deleteSyarat">Delete Syarat</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</template>
								<template #item.path="{ item }">
									<span v-if="item.path != null">
										<v-chip small color="primary" dark>Terupload</v-chip>
									</span>
									<span v-if="item.path == null">
										<v-chip small color="grey" dark>Belum</v-chip>
									</span>
								</template>
								<template #item.status="{ item }">
									<v-chip v-if="item.status == -2" small color="red darken-1" dark>Tidak Lulus</v-chip>
									<v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
									<v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
									<v-chip v-if="item.status == 1" small color="blue lighten-2" dark>Disetujui</v-chip>
									<v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
								</template>
								<template #item.actions="{ item }">
									<v-tooltip bottom>
										<template #activator="{ on }">
											<v-btn class="mr-2" icon color="primary" target="_blank" v-on="on" @click="editedSyaratDialog(item)">
												<v-icon>
													mdi-upload
												</v-icon>
											</v-btn>
										</template>
										<span>Upload Syarat</span>
									</v-tooltip>
									<v-tooltip bottom>
										<template #activator="{ on }">
											<v-btn class="mr-2" icon color="primary" :href="item.path" v-on="on">
												<v-icon>
													cloud_download
												</v-icon>
											</v-btn>
										</template>
										<span>Download file</span>
									</v-tooltip>
									<v-tooltip bottom>
										<template #activator="{ on }">
											<v-btn class="mr-2" icon color="primary" :href="item.file" target="_blank" v-on="on">
												<v-icon>
													remove_red_eye
												</v-icon>
											</v-btn>
										</template>
										<span>Lihat file</span>
									</v-tooltip>
									<!-- <v-tooltip bottom>
										<template #activator="{ on }">
											<v-btn class="mr-2" icon color="pink darken-3" target="_blank" v-on="on" @click="deleteSyaratDialog(item)">
												<v-icon>
													mdi-delete
												</v-icon>
											</v-btn>
										</template>
										<span>Delete</span>
									</v-tooltip> -->
								</template>
							</v-data-table>
						</v-card-text>
					</v-card>
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { ACC_PERSETUJUAN_PESERTA_MUTATION, CREATE_UMPAN_BALIK_PESERTA_MUTATION, GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT, UPLOAD_PORTOFOLIO, DELETE_SYARAT_PESERTA_MUTATION, DELETE_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { GET_UJIAN_DETAIL, CREATE_SYARAT_PESERTA_UJIAN_MUTATION } from '@/constants/ujian'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      peserta_ujian: null,
      umpanDialog: false,
      tambahDialog: false,
      portofolioDialog: false,
      deleteportofolioDialog: false,
      deletesyaratDialog: false,
      search: '',
      searchPortofolio: '',
      headers: [
        { text: 'Syarat', value: 'syaratUjian.syarat' },
        { text: 'Keterangan', value: 'syaratUjian.keterangan' },
        { text: 'File', value: 'path'},
        { text: 'Status Verifikasi', value: 'status'},
        { text: 'Aksi', value: 'actions' },
      ],
      valid: true,
      portofoliosHeaders: [ 
        { text: 'Nama', value: 'nama' },
        { text: 'Aksi', value: 'actions' },
      ],
      catatan: null,
      editedSyarat: {
        id: '',
        path: null,
        file: null,
        syaratUjian: {
          syarat: null,
          keterangan: null
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
        portofolioFile: ''
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
      file_preview: null,
      umpan_balik: [],
      umpanBaliks: [],
      peserta: [],
      asesi: [],
      e11: {},
    }
  },
  mounted() {
    this.getPesertaUjian()
  },
  methods: {
    toBase64(file) {
      if(file == undefined) {
        return this.syarats.syaratUrl = ''
      }
      const imageFile = file

      if(imageFile !== undefined) {
        const fr = new FileReader ()
        fr.readAsDataURL(imageFile)
        fr.addEventListener('load', () => {
          this.syarats.syaratUrl = fr.result // this is an ttd file that can be sent to server...
        })
      }
    },
    deleteSyaratDialog(item){
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
    async getPesertaUjian() {
      this.alert.show = false
      const { id } = this.$data
      const result = await this.$apollo.mutate({
        mutation: GET_UJIAN_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta_ujian = data.pesertaUjian
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
        // this.getumpanBaliks()
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
          
        const id = this.editedSyarat.id
        // const syarat = this.syarats.syarat;
        const file = this.syarats.syaratUrl

        const result = await this.$apollo.mutate({
          mutation: CREATE_SYARAT_PESERTA_UJIAN_MUTATION,
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
          this.getPesertaUjian()
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
        const { portofolios: {nama} } = this.$data
        const file = this.portofolios.portofolioUrl

        const result = await this.$apollo.mutate({
          mutation: UPLOAD_PORTOFOLIO,
          variables: {
            nama,
            peserta_id,
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
          this.portofolioDialog = false
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
  }
}

</script>
<style lang="scss" scoped>
</style>
