 <template>
  <v-layout
    column
    wrap
  >
    <v-container fluid>
      <v-card v-if="!state.skeleton">
        <v-card-subtitle>
          <!-- <v-avatar size="30" color="warning lighten-2">
            <span class="white--text">APL.1</span>
          </v-avatar> -->
          <span class="font-weight-bold">FR.IA.09 PERTANYAAN WAWANCARA</span>
        </v-card-subtitle>
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
                Formulir ini diisi pada saat asesor akan melakukan asesmen dengan metode observasi demonstrasi 
              </li>
              <li>
                Pertanyaan dibuat dengan tujuan untuk menggali, dapat berisi pertanyaan yang berkaitan dengan dimensi kompetensi, batasan variabel dan aspek kritis.
              </li>
              <li>
                Tanggapan asesi dapat ditulis oleh asesor dikolom tanggapan, dan apabila tanggapan sesuai maka beri tanda centrang pada kolom (K) dan apabila belum sesuai  beri tanda centrang pada kolom (BK)
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
            <v-expansion-panels multiple accordion>
              <v-expansion-panel
                v-for="(uji, ujiIndex) in ujikompetensi"
                :key="uji.id"
              >
                <v-expansion-panel-header>{{ uji.unitKompetensi.kode }} {{ uji.unitKompetensi.unit }} {{ uji.unitKompetensi.tahun }}
                  <div v-if="ujikompetensi[ujiIndex].am_date == null" class="blobs-container">
                    <div class="blob orange"></div>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-simple-table> 
                    <tbody>
                      <tr>
                        <td width="20%"><b>Unit Kompetensi:</b></td>
                        <td>{{ uji.unitKompetensi.unit }}</td>
                      </tr>
                      <tr>
                        <td width="20%"><b>Kode:</b></td>
                        <td>{{ uji.unitKompetensi.kode }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                  <v-simple-table>
                    <template #default>
                      <thead>
                        <tr>
                          <th colspan="2" rowspan="2" width="50%" class="text-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"><b>Pertanyaan</b></th>
                          <th colspan="2" width="15%" class="text-center" style="border-bottom: thin solid rgba(0, 0, 0, 0.12);"><b>Rekomendasi</b></th>
                        </tr>
                        <tr>
                          <th class="text-center"><b>Kompeten</b></th>
                          <th class="text-center"><b>Belum Kompeten</b></th>
                        </tr>
                      </thead>
                      <tbody template v-for="(soal, i) in uji.unitKompetensi.SoalObservasi" :key="i">
                        <tr>
                          <td width="3%">{{i+1}}</td>
                          <td>
                            <a @click="showSoalDetail(soal)">
                              {{ soal.soal }}
                            </a>
                          </td>
                          <td colspan="2">
                            <v-radio-group readonly v-model="soal.hasil" row>
                              <v-col cols="6" class="py-0">
                                <v-radio class="justify-center" :value="1"></v-radio>
                              </v-col>
                              <v-col cols="6" class="py-0">
                                <v-radio class="justify-center" :value="-1"></v-radio>
                              </v-col>
                            </v-radio-group>
                          </td>
                        </tr>
                        <tr>
                          <td width="3%"></td>
                          <td>
                            <v-text-field
                              v-model="soal.tanggapan"
                              class="py-5"
                              name="tanggapan"
                              label="Tanggapan"
                              id="id"
                              outlined
                              dense
                              hide-details
                              readonly
                            ></v-text-field>
                          </td>
                          <td colspan="2">
                            <v-text-field
                              v-model="soal.score"
                              class="py-5"
                              name="Nilai"
                              label="Nilai"
                              type="number"
                              id="id"
                              outlined
                              dense
                              hide-details
                              readonly
                            ></v-text-field>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-if="uji.unitKompetensi.SoalObservasi.length > 0">
                        <tr>
                          <td></td>
                          <td>
                            <v-text-field
                              v-model="uji.umpan_balik_uji"
                              outlined
                              hide-details
                              name="umpan_balik_uji"
                              label="Umpan balik uji"
                              class="py-5"
                              dense
                              readonly
                            ></v-text-field>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-row class="mt-2">
                    <v-col class="d-flex justify-end">
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="`/admin/print/fr-ia-09/${peserta.id}`" target="_blank" color="primary" outlined dark><v-icon left>print</v-icon>Cetak Dokumen</v-btn>            
          </v-card-actions>
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
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, GET_PESERTAS_DETAIL } from '@/constants/graphql'
import { ASESMEN_MANDIRI_MUTATION } from '@/constants/graphql'
import { UJIOBSERVASI_MUTATION } from '@/constants/observasi'

export default {
  name: 'Index',
  layout: 'App_admin',
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
            hasil: item.score > 50 ? 1 : -1, //todo
            // score: item.score,
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
            this.ujikompetensi[x].unitKompetensi.SoalObservasi[i] = Object.assign(this.ujikompetensi[x].unitKompetensi.SoalObservasi[i], {hasil: '', tanggapan: '', status: null , score: ''})
            for (let k = 0; k < this.ujikompetensi[x].ujiObservasi.length; k++) {
              if (this.ujikompetensi[x].ujiObservasi[k].soalObservasi.id == this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].id) {
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].hasil = this.ujikompetensi[x].ujiObservasi[k].hasil
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].tanggapan = this.ujikompetensi[x].ujiObservasi[k].tanggapan
                this.ujikompetensi[x].unitKompetensi.SoalObservasi[i].score = this.ujikompetensi[x].ujiObservasi[k].score
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