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
              <span class="headline px-5">Daftar Asesmen</span>
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
                    <label for="">Jadwal Asesmen</label>
                    <v-select
                      v-model="selectedItems"
                      class="mt-2"
                      label="Pilih Jadwal Asesmen"
                      :items="skema"
                      item-text="id"
                      max-height="auto"
                      :rules="[v => !!v || 'wajib diisi']"
                      required
                      outlined
                      dense
                      return-object
                    >
                      <template #selection="data">
                        <v-list-item-title  
                          :key="JSON.stringify(data.item)"
                          @input="data.parent.selectItem(data.item)"
                          v-html="`${data.item.skema.kode}, ${data.item.skema.skema}`"></v-list-item-title>
                      </template>
                      <template #item="data">
                        <v-list-item-content>
                          <v-list-item-title class="mb-2" v-html="`${data.item.skema.kode}, ${data.item.skema.skema}`">
                          </v-list-item-title>
                          <v-list-item-subtitle v-html="'tanggal: ' + data.item.tanggal"></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-select>
                    <label for="">Tujuan Asesmen</label>
                    <v-select
                      v-model="form.tujuan"
                      class="mt-2"
                      :items="tujuan"
                      :rules="[v => !!v || 'wajib diisi']"
                      outlined
                      dense
                      label="Tujuan"
                    ></v-select>
                    <v-card-text v-if="keterangan">
                      <v-alert
                        icon="info"
                        text
                        type="info"
                      >
                        Baca dan pahami ketentuan dari tiap skema yang akan diujikan
                      </v-alert>
                      <v-simple-table>
                        <thead>
                          <td><b>Kode</b></td>
                          <td><b>Unit Kompetensi</b></td>
                          <td><b>Tahun</b></td>
                          <td><b>Standar</b></td>
                        </thead>
                        <tbody>
                          <tr v-for="unit in form.skema.unitKompetensi" :key="unit.id">
                            <td width="20%"><b>{{ unit.kode }}</b></td>
                            <td>{{ unit.unit }}</td>
                            <td>{{ unit.tahun }}</td>
                            <td>{{ unit.standar.standar }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-alert
                        class="mt-3"
                        icon="warning"
                        text
                        type="warning"
                      >
                        Baca dan pahami syarat yang harus dipenuhi
                      </v-alert>
                      <v-simple-table>
                        <thead>
                          <td><b>Syarat</b></td>
                          <td><b>Sifat</b></td>
                        </thead>
                        <tbody>
                          <tr v-for="(syarat, i) in form.skema.syarat" :key="i">
                            <td width="20%">{{ syarat.syarat }}</td>
                            <td width="20%">Wajib</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                      <v-row v-if="form.skema.panduan != null">
                        <v-col>
                          <v-btn :href="form.skema.panduan" target="_blank" color="red darken-3" outlined dark><v-icon left>picture_as_pdf</v-icon>Unduh buku panduan</v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-checkbox v-model="form.terms" label="Saya telah memahami dan menyetujui buku panduan sertifikasi skema yang akan diikuti">
                    </v-checkbox>
                    <v-row>
                      <v-col cols="12" class="d-flex justify-end">
                        <v-btn
                          class="mt-5"
                          width="200"
                          large
                          rounded
                          color="primary"
                          dark
                          @click="registerJadwal">
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
import { GET_ALL_ACTIVE_JADWALS } from '@/constants/jadwal'

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
      skema: [],
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
        // Could either emit (so you can use v-model on the parent)
        // or add to array
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
    // getIndex(list, id) {
    //   return list.findIndex((e) => e.id == id);
    // },
    //  onSyaratSelected(e) {
    //   const syaratFile = e.target.files;
        
    //   if(syaratFile[0] !== undefined) {
    //       this.syarats.syaratName = syaratFile[0].name;
    //       if(this.syarats.syaratName.lastIndexOf('.') <= 0) {
    //           return;
    //       }
    //       const fr = new FileReader ();
    //       fr.readAsDataURL(syaratFile[0]);
    //       fr.addEventListener('load', () => {
    //           this.syarats.syaratUrl = fr.result;
    //           this.syarats.syaratFile = syaratFile[0]; 
    //       });
    //   } else {
    //       this.syarats.syaratName = '';
    //       this.syarats.syaratFile = '';
    //       this.syarats.syaratUrl = '';
    //   }
    // },
    // pickSyarat() {
    //   this.$refs.syarat.click();
    // },
    // async getSyarat() {
    //   const skema_id = this.form.skema_id;
    //   const result = await this.$apollo.mutate({
    //         mutation: GET_SYARATS,
    //         variables: {
    //           skema_id
    //         }
    //   }).then(({ data }) => {
    //       this.items = data.jadwal.skema.syarat;
    //       console.log(data.jadwal.skema.syarat);
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // },
    // async checkAsesiData() {
    //   const user_id = localStorage.getItem('lsp-user-id');
    //   const result = await this.$apollo.mutate({
    //       mutation: GET_USERDATA,
    //       variables: {
    //           user_id
    //       }
    //   }).then(({ data }) => {
    //       if (data.user.asesi != null){
    //           console.log('hello sodara');
    //           this.e1 = 2;
    //       }
    //   }).catch((error) => {
    //       alert(error);
    //   });
    // },
    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async getJadwal() {
      const result = await this.$apollo.mutate({
        mutation: GET_ALL_ACTIVE_JADWALS
      }).then(({ data }) => {
        this.skema = data.allactivejadwal
        console.log(data.allactivejadwal)
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
    async registerJadwal() {
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
        const { form: { id , tujuan } } = this.$data
        const result = await this.$apollo.mutate({
          mutation: REGISTER_JADWALS,
          variables: {
            id,
            tujuan
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Anda telah berhasil mendaftar')
          this.gotoPage('/asesi/informasi-asesmen/'+data.registerJadwal.id)
          console.log(data)
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
