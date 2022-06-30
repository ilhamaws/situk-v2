<template>
  <v-layout
    column
    wrap
  >
    <v-container fluid>
      <v-card v-if="!state.skeleton">
        <v-card-title>
          <!-- <v-avatar size="30" color="warning lighten-2">
            <span class="white--text">APL.1</span>
          </v-avatar> -->
          <span class="font-weight-bold">FR.IA.08 Ceklis Verifikasi Portofolio</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-simple-table>
            <tbody>
              <tr>
                <td width="25%" rowspan="2"><b>Skema Sertifikasi:</b></td>
                <td width="10%">Judul</td>
                <td width="10px">:</td>
                <td>{{ peserta.jadwal.skema.skema}}</td>
              </tr>
              <tr>
                <td>Nomor</td>
                <td>:</td>
                <td>{{ peserta.jadwal.skema.kode}}</td>
              </tr>
              <tr>
                <td colspan="2"><b>TUK</b></td>
                <td>:</td>
                <td>{{ peserta.jadwal.tempatUk.nama}}</td>
              </tr>
              <tr>
                <td colspan="2"><b>Nama Asesor</b></td>
                <td>:</td>
                <td>{{ peserta.asesor.nama}}</td>
              </tr>
              <tr>
                <td colspan="2"><b>Nama Asesi</b></td>
                <td>:</td>
                <td>{{ peserta.asesi.nama}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-text>
          <v-alert text type="primary" :value="true">
            <v-card-title class="px-0 pt-0 pb-3 font-weight-bold">
              Panduan bagi asesor
            </v-card-title>
            <ul>
              <li>
                Isilah table ini sesuai dengan informasi sesuai pertanyaan/pernyataan dalam table dibawah ini.
              </li>
              <li>
                Beri tanda centang &#10004; pada hasil penilaian portfolio berdasarkan aturan bukti.
              </li>
            </ul>
          </v-alert>
          <!-- Alert section -->
          <v-snackbar
            v-model="alert.show"
            :color="alert.type"
            :timeout="-1"
            top
            dense
            multi-line
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
                <v-icon>close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
          <div v-if="ujikompetensi != null" class="pt-5">
            <v-simple-table>
              <tbody>
                <tr v-for="(uji, i) in ujikompetensi"
                :key="uji.id">
                  <td width="10%"><b>{{ uji.unitKompetensi.kode }}</b></td>
                  <td>{{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-card-text>
      </v-card>
			<v-card class="mt-5">
				<v-card-title>
					<span class="font-weight-bold">
						Dokumen Portofolio
					</span>
				</v-card-title>
				<v-card-text>
					<v-data-table
						v-if="!state.skeleton"
						:headers="portofoliosHeaders"
						:items="peserta.portofolio"
						:items-per-page="5"
						:line-numbers="true"
						hide-default-footer
					>
						<template #top>
							<v-dialog v-model="portofolioDialog" persistent max-width="600px">
								<v-card>
									<v-card-title>
										<span class="font-weight-bold">Verifikasi Portofolio</span>
									</v-card-title>
									<v-card-text class="pb-0">
										<v-container>
											<v-row>
												<v-col cols="12" sm="12" md="12">
													<v-text-field
														name="name"
														label="Dokumen Portofolio"
														readonly
														outlined
														dense
														v-model="verifiedPortofolio.nama"
													></v-text-field>
													<v-select
														outlined
														dense
														v-model="verifiedPortofolio.valid"
														:items="status"
														label="Data Valid"
														item-value="id" item-text="status"
													/>
													<v-select
														outlined
														dense
														v-model="verifiedPortofolio.memadai"
														:items="status"
														label="Data Memadai"
														item-value="id" item-text="status"
													/>
													<v-select
														outlined
														dense
														v-model="verifiedPortofolio.asli"
														:items="status"
														label="Data Asli"
														item-value="id" item-text="status"
													/>
													<v-select
														outlined
														dense
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
      <v-dialog
        v-model="soal_preview_dialog"
        persistent
        max-width="800px"
      >
        <v-form>
          <v-card>
            <v-card-subtitle class="font-weight-bold">
              Detil soal observasi
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <v-textarea
                readonly
                v-model="soal_preview.soal"
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
                readonly
                v-model="soal_preview.opsi_k"
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
                readonly
                v-model="soal_preview.opsi_bk"
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
                @click="soal_preview_dialog = false"
              >Batal</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-container>
  </v-layout>
</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, GET_PESERTAS_DETAIL, EVALUASI_PORTOFOLIO_MUTATION } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'
import { UJIOBSERVASI_MUTATION } from '@/constants/observasi'

export default {
  name: 'Index',
  layout: 'App_asesor',
  data() {
    return {
      umpan_balik_observasi: '',
      tambahDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      peserta_id: this.$route.params.id,
      state:{
        loading: false,
        skeleton: true
      },
      portofoliosHeaders: [
        // { text: 'ID', value: 'id' },
        { text: 'Nama', value: 'nama'},
        { text: 'Valid', value: 'valid' },
        { text: 'Memadai', value: 'memadai' },
        { text: 'Keaslian', value: 'asli' },
        { text: 'terkini', value: 'terkini' },
        { text: 'Aksi', value: 'actions', width: '30%' },
      ],
      soal_preview: {},
      soal_preview_dialog: false,
      radios: '',
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
      input: [],
      skema: [],
      syarat: [],
      syaratUpload: [],
      input: {},
      items: [
      ],
      peserta: [],
      skema: [],
      asesi: [],
      ujikompetensi: null,
      umpan_balik_uji: null,
      e11: {},
      verifiedPortofolio: {},
      portofolioDialog: false,
      status: [
        {
          id: -1,
          status: 'Tidak'
        },
        {
          id: 0,
          status: 'Belum'
        },
        {
          id: 1,
          status: 'Ya'
        }
      ],
    }
  },
  mounted() {
    this.getpesertasDetail()
  },
  methods: {
    showSoalDetail(item) {
      this.soal_preview = item
      this.soal_preview_dialog = true
    },
    editItemPortofolio(item) {
      // this.editedIndex = this.tuks.indexOf(item);
      this.verifiedPortofolio = Object.assign({}, item)
      this.portofolioDialog = true
    },
    async submitPenilaian(id, items, umpan_balik) {
      const { state: { loading } } = this
      if (!loading) { 
        this.state.loading = true

        let uji_kompetensi_id = id
        let umpan_balik_uji = umpan_balik
        let uji_observasi = []

        uji_observasi = await items.SoalObservasi.map((item) => {
          return {
            soal_observasi_id: item.id,
            hasil: item.hasil,
            tanggapan: item.tanggapan
          }
        })

        const result = await this.$apollo.mutate({
          mutation: UJIOBSERVASI_MUTATION,
          variables: {
            uji_kompetensi_id, umpan_balik_uji, uji_observasi
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Observasi telah tersimpan')
          this.getpesertasDetail()
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async verifikasiPortofolio() {
      this.alert.show = false
      const { verifiedPortofolio: {id, valid, memadai, asli, terkini} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: EVALUASI_PORTOFOLIO_MUTATION,
        variables: {
          id, valid, memadai, asli, terkini
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Portofolio berhasil diverifikasi')
        this.state.skeleton = true
        this.getpesertasDetail()
      }).catch(({graphQLErrors}) => {
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.portofolioDialog = false
      })
    },
    async getpesertasDetail() {
      const id = this.peserta_id
      const result = await this.$apollo.mutate({
        mutation: GET_PESERTAS_DETAIL,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.peserta = data.peserta
        console.log(data)
        this.ujikompetensi = data.peserta.ujiKompetensi
        for (let x = 0; x < this.ujikompetensi.length; x++) {
          this.ujikompetensi[x].unitKompetensi = Object.assign(this.ujikompetensi[x].unitKompetensi, {umpan_balik_uji: null})
          for (let i = 0; i < this.ujikompetensi[x].unitKompetensi.SoalObservasi.length; i++) {
            this.ujikompetensi[x].unitKompetensi.SoalObservasi[i] = Object.assign(this.ujikompetensi[x].unitKompetensi.SoalObservasi[i], {hasil: '', tanggapan: ''})
            for (let k = 0; k < this.ujikompetensi[x].ujiObservasi.length; k++) {
              if (this.ujikompetensi[x].ujiObservasi[k].soalObservasi.id == this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].id) {
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].hasil = this.ujikompetensi[x].ujiObservasi[k].hasil
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].tanggapan = this.ujikompetensi[x].ujiObservasi[k].tanggapan
              }
            }
          }
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
  }
}

</script>
<style lang="scss" scoped>
</style>