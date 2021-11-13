<template>
  <div class="">
    <section>
      <v-layout
        column
        wrap
        class="my-4"
      >
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-card>
              <v-card-title>
                <!-- <v-avatar size="30" color="warning lighten-2">
                  <span class="white--text">APL.1</span>
                </v-avatar> -->
                <span class="headline px-5">Informasi Asesmen</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="px-10 py-5">
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
                    <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                    >
                      <v-select
                        label="Pilih Skema"
                        :items="skema"
                        v-model="form.skema"
                        item-text="`${data.item.skema.kode}, ${data.item.skema.skema}`"
                        item-value="`${data.item.skema.kode}, ${data.item.skema.skema}`"
                        max-height="auto"
                        :rules="[v => !!v || 'wajib diisi']"
                        required
                        autocomplete
                        outlined
                        dense
                      >
                        <template slot="selection" slot-scope="data">
                          {{ data.item.skema.kode }}, {{data.item.skema.skema}}
                        </template>
                        <template slot="item" slot-scope="data">
                            <v-list-item-content>
                              <v-list-item-title v-html="`${data.item.skema.kode}, ${data.item.skema.skema}`">
                              </v-list-item-title>
                              <v-list-item-subtitle v-html="'tanggal: ' + data.item.tanggal"></v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                      </v-select>

                        <!-- <v-select
                            v-model="form.skema_id"
                            :items="skema"
                            :rules="[v => !!v || 'wajib diisi']"
                            label="Pilih Skema"
                            item-value="id" item-text="skema.skema"
                            outlined
                            dense
                            clearable
                        /> -->
                        <v-text-field
                            v-model="form.tujuan"
                            label="Tujuan"
                            type="text"
                            :rules="[v => !!v || 'wajib diisi']"
                            outlined
                            dense
                        />
                        <v-row>
                          <v-spacer></v-spacer>
                          <v-btn
                            @click='registerJadwal'
                            class="mt-5"
                            width="200"
                            large
                            rounded
                            color="primary"
                            dark>
                            <v-progress-circular
                              :size="20"
                              :width="2"
                              indeterminate
                              color="white"
                              v-if="state.loading"
                              class="mr-2"
                            ></v-progress-circular>
                            Simpan
                          </v-btn>
                        </v-row>
                    </v-form>
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <!-- <v-stepper v-model="e1">
                <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Pilih Skema Uji Kompetensi</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">Upload Berkas</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Tunggu Verifikasi</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form>
                        <v-select
                            v-model="form.skema_id"
                            :items="skema"
                            :rules="[v => !!v || 'wajib diisi']"
                            label="Pilih Skema"
                            item-value="id" item-text="skema.skema"
                            @input="getSyarat"
                            outlined
                            dense
                            clearable
                        />
                        <v-text-field
                            v-model="form.tujuan"
                            label="Tujuan"
                            type="text"
                            :rules="[v => !!v || 'wajib diisi']"
                            outlined
                            dense
                        />
                    </v-form>

                    <v-btn
                    color="primary"
                    @click='checkAsesiData'
                    >
                    Lanjut
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-form v-for="item in items" :key="item.id">
                    <v-file-input accept="image/*" v-model='syaratUpload[getIndex(items, item.id)]' label="File input"></v-file-input>
                    <v-text-field label="Upload Tanda Tangan" v-model='syaratUpload[getIndex(items, item.id)]' @click='pickSyarat' prepend-icon='attach_file'></v-text-field>
                    <input
                        type="file"
                        style="display: none"
                        ref="item"
                        accept="image/png, image/jpeg, application/pdf"
                        @change="onSyaratSelected"
                    >
                  </v-form>

                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Lanjut
                    </v-btn>

                    <v-btn text @click="e1 = 1">Kembali</v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-btn
                    color="primary"
                    @click='registerJadwal'
                    >
                    Daftar
                    </v-btn>
                    <v-btn text @click="e1 = 1">Kembali</v-btn>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper> -->
          </v-container>
        </v-flex>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '../constants/graphql';

  export default {
    name: 'index',
    layout: 'App_asesi',
    data() {
      return {
        id: this.$route.params.id,
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
        skema: [],
        syaratUpload: [],
        form: {
        },
        syarats: {
            syaratName: '',
            syaratUrl: null,
            syaratFile: ''
        },
        items: [
        ],
        e11: {},
      people: [
        { header: 'Group 1'},
        { name: 'Sandra Adams', group: 'Group 1' },
        { name: 'Ali Connors', group: 'Group 1' },
        { name: 'Trevor Hansen', group: 'Group 1' },
      ]
      };
    },
    mounted() {
      this.getJadwal();
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
        this.alert = { show: true, type, message };
      },
      async getJadwal() {
          // this.alert.show = false;
          const result = await this.$apollo.mutate({
              mutation: GET_JADWALS
        }).then(({ data }) => {
            console.log(data.jadwals);
        }).catch((error) => {
          console.log(error);
        });
      },
      async registerJadwal() {
        const { state: { loading } } = this;
        if (!loading) {
          this.state.loading = true;
          this.$refs.form.validate();
          if (!this.$refs.form.validate()) {
            // return this.showAlert('error', 'Syarat dan ketentuan harus disetujui');
            this.state.loading = false;
            return ;
          }
          const { form: { skema: { id }, tujuan } } = this.$data;
          const result = await this.$apollo.mutate({
              mutation: REGISTER_JADWALS,
              variables: {
                  id,
                  tujuan
              }
          }).then(({ data }) => {
              this.showAlert('success', 'Anda telah berhasil mendaftar');
              console.log(data);
          }).catch(({graphQLErrors}) => {
              this.showAlert('error', graphQLErrors[0].message);
              console.log(graphQLErrors);
          }).finally(() => {
            this.state.loading = false;
          });
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
</style>
