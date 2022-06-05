<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container flex>
          <v-card>
            <v-card-title>
              <span class="headline px-5">Daftar Ujian</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" class="px-10 py-5">
                <div class="px-5 py-5">
                  <!-- Alert section -->
                  <div v-if="alert.show">
                    <v-alert v-model="alert.show" :type="alert.type" dismissible class="mb-10">
                      <div class="white--text">
                        {{ alert.message }}
                      </div>
                    </v-alert>
                  </div>
                  <!-- End alert section -->
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-select
                      :items="jadwal_ujian"
                      v-model="selectedItems"
                      outlined
                      dense
                      label="Jadwal Ujian"
                      :rules="[v => !!v || 'wajib diisi']"
                      required
                      return-object
                    >
                      <template #selection="data">
                        <v-list-item-title  
                          :key="JSON.stringify(data.item)"
                          @input="data.parent.selectItem(data.item)"
                          v-html="`${data.item.name}, ${data.item.tanggal}`">
                        </v-list-item-title>
                      </template>
                      <template #item="data">
                        <v-list-item-content>
                          <v-list-item-title class="mb-2" v-html="`${data.item.name}`">
                          </v-list-item-title>
                          <v-list-item-subtitle v-html="'tanggal: ' + data.item.tanggal"></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-select>
                    <label for=""><b>Keterangan Jadwal</b></label>
                    <template v-if="keterangan">
                      <v-alert
                        class="mt-2"
                        icon="info"
                        text
                        type="info"
                      >
                        Baca dan pahami ketentuan dari tiap skema yang akan diujikan
                      </v-alert>
                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td width="20%"><b>Nama Jadwal</b></td>
                            <td width="5%">:</td>
                            <td>{{ form.name }}</td>
                          </tr>
                          <tr>
                            <td><b>Tanggal Pelaksanaan</b></td>
                            <td>:</td>
                            <td>{{ form.tanggal }}</td>
                          </tr>
                          <tr>
                            <td><b>Biaya Pendaftaran</b></td>
                            <td>:</td>
                            <td>{{ form.price }}</td>
                          </tr>
                          <tr>
                            <td><b>Tempat Ujian</b></td>
                            <td>:</td>
                            <td>{{ form.tempat_ujian }}</td>
                          </tr>
                          <tr>
                            <td><b>Kuota Pendaftar</b></td>
                            <td>:</td>
                            <td>{{ form.kuota }}</td>
                          </tr>
                          <tr>
                            <td><b>Keterangan</b></td>
                            <td>:</td>
                            <td>{{ form.keterangan }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </template>
                    <v-checkbox v-model="form.terms" label="Saya telah memahami dan menyetujui sertifikasi yang akan diikuti">
                    </v-checkbox>
                    <v-row>
                      <v-col cols="12" class="d-flex justify-end">
                        <v-btn
                          width="200"
                          large
                          rounded
                          color="primary"
                          dark
                          @click="registerJadwalUjian">
                          <v-progress-circular
                            v-if="state.loading"
                            :size="20"
                            :width="2"
                            indeterminate
                            color="white"
                            class="mr-2"
                          ></v-progress-circular>
                          Daftar
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_ACTIVE_JADWALS, GET_SELF_ASESI } from '@/constants/graphql'
import { GET_ACTIVE_JADWAL_UJIAN } from '@/constants/jadwal'
import { REGISTER_JADWAL_UJIAN_MUTATION } from '@/constants/ujian'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      keterangan: false,
      state:{
        loading: false
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
      tujuan: ['Sertifikasi', 'Sertifikasi ulang', 'PKT', 'RPL', 'Hasil pelatihan/ proses pembelajaran', 'Lainnya'],
      jadwal_ujian: [],
      syaratUpload: [],
      form: {
      },
      syarats: {
        syaratName: '',
        syaratUrl: null,
        syaratFile: ''
      },
      // items: [
      // ],
      chosenItems: [],
      items: [],
      e11: {},
      people: [
        { header: 'Group 1'},
        { name: 'Sandra Adams', group: 'Group 1' },
        { name: 'Ali Connors', group: 'Group 1' },
        { name: 'Trevor Hansen', group: 'Group 1' },
      ],
      peserta_id: null
    }
  },
  computed: {
    selectedItems: {
      get() {
        return this.value
      },
      set(item) {
        console.log(item)
        this.form = item
        this.$emit("input", item)
        this.keterangan = true
      }
    }
  },
  mounted() {
    this.getSelfAsesi()
    // this.getTujuan();
  },
  methods: {
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async getJadwal() {
      const result = await this.$apollo.mutate({
        mutation: GET_ACTIVE_JADWAL_UJIAN
      }).then(({ data }) => {
        this.jadwal_ujian = data.activeJadwalUjian
        console.log(data.activeJadwalUjian)
      }).catch((error) => {
        console.log(error)
      })
    },
    async getSelfAsesi() {
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        this.profile = data.checkselfAsesi
        this.getJadwal()
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    async registerJadwalUjian() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        this.$refs.form.validate()
        if (!this.form.terms) {
          this.state.loading = false
          return this.showAlert('error', 'Syarat dan ketentuan harus disetujui')
        }
        if (!this.$refs.form.validate()) {
          this.state.loading = false
          return 
        }
        const jadwal_id = this.form.id
        const result = await this.$apollo.mutate({
          mutation: REGISTER_JADWAL_UJIAN_MUTATION,
          variables: {
            jadwal_id
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Anda telah berhasil mendaftar')
          this.gotoPage('/asesi/uji-kan/'+data.pesertaUjian.id)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },
    gotoPage(page) {
      this.$router.push(page)
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
