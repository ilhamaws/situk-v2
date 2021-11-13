<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
            <v-card>
              <v-card-title>
                <!-- <v-avatar size="30" color="warning lighten-2">
                  <span class="white--text">APL.1</span>
                </v-avatar> -->
                <span class="headline px-5">Report Asesmen</span>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="px-10 py-5">
                  <div class="px-5 py-5">
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        class="shrink"
                        rounded
                        outlined
                        dense
                      ></v-text-field>
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
                        :items="items"
                        :search="search"
                        :items-per-page="5"
                        :line-numbers="true"
                        hide-default-footer
                    >
                    <template v-slot:item.status="{ item }">
                        <v-chip v-if="item.status == -1" small color="red darken-1" dark>Ditolak</v-chip>
                        <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                        <v-chip v-if="item.status == 1" small color="primary" dark>Disetujui</v-chip>
                        <v-chip v-if="item.status == 2" small color="success" dark>Lulus</v-chip>
                    </template>
                    <template v-slot:item.jadwal.skema.skema="{ item }">
                      <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                        <span>{{ item.jadwal.skema.skema }}</span>
                      </nuxt-link>
                    </template>
                    </v-data-table>
                      <!-- <v-data-table
                          headers="headers"
                          items="items"
                          hide-actions
                          class="elevation-1"
                          select-all
                          :items-per-page="5"
                          item-key="id"
                          loading="true"
                          search="search"
                      >
                      </v-data-table> -->
                  </div>
                </v-col>
              </v-row>
            </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_REPORTS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '../constants/graphql';

  export default {
    name: 'index',
    layout: 'App_asesi',
    data() {
      return {
        search: '',
        headers: [
          { text: 'Skema', value: 'jadwal.skema.skema' },
          { text: 'Tanggal Asesmen', value: 'jadwal.tanggal' },
          { text: 'TUK', value: 'jadwal.tempatUk.nama' },
          { text: 'Asesor', value: 'asesor.nama' },
          { text: 'Status', value: 'status' },
          { text: 'Aksi', value: 'actions' },
        ],
        state:{
          loading: false
        },
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
        alert:{
          show: false,
          type: '',
          message: '',
        },
        items: [
        ],
        e11: {},
      };
    },
    mounted() {
        this.getReport();
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
      async getReport() {
          // this.alert.show = false;
          const user_id = localStorage.getItem('lsp-user-id');
          const result = await this.$apollo.mutate({
              mutation: GET_REPORTS
        }).then(({ data }) => {
            this.items = data.checkselfAsesi.peserta;
            console.log(data);
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
