<template>
  <v-layout
    column
    wrap
  >
    <v-container>
      <v-card class="rounded-lg">
        <v-toolbar flat color="primary" dark>
          <v-icon class="white--text" left color="orange lighten-2">work_history</v-icon>
          <span>
            <h4>Sertifikasi Yang Sedang Diikuti</h4>
          </span>
        </v-toolbar>
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
                :sort-by="['jadwal.id']"
                :sort-desc="[true]"
                :items="items"
                :search="search"
                :items-per-page="5"
                :line-numbers="true"
              >
                <template #top>
                  <v-dialog v-model="deleteDialog" persistent max-width="600px">
                    <v-card>
                      <v-card-title class="headline">Apakah anda yakin menghapus Data?</v-card-title>

                      <v-card-text>
                        Peringatan! Apakah anda yakin untuk membatalkan jadwal?.
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="deleteDialog = false">Batal</v-btn>
                        <v-btn color="red darken-1" text @click="deletePeserta">Delete Peserta</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template #item.status="{ item }">
                  <v-chip v-if="item.status == -2" small color="error" dark>Belum Kompeten</v-chip>
                  <v-chip v-if="item.status == -1" small color="error" dark>Ditolak</v-chip>
                  <v-chip v-if="item.status == 0" small color="grey" dark>Belum</v-chip>
                  <v-chip v-if="item.status == 1" small color="indigo lighten-2" dark>Disetujui</v-chip>
                  <v-chip v-if="item.status == 2" small color="success" dark>Kompeten</v-chip>
                </template>
                <template #item.actions="{ item }">
                  <v-icon
                    color="error"
                    class="mr-2"
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                  <!-- <nuxt-link :to="`/informasi-asesmen/${item.id}`">
                      <v-btn rounded x-small color="primary">Detail</v-btn>
                    </nuxt-link> -->
                </template>
                <template #item.jadwal.skema.id="{ item }">
                  <nuxt-link :to="`/asesi/informasi-asesmen/${item.id}`">
                    <div class="blobs-container">
                      <span class="blobs-container">
                        <span v-if="item.status == -2" class="blob red"></span>
                        <span v-if="item.status == -1" class="blob orange"></span>
                        <span v-if="item.status == 0" class="blob grey"></span>
                        <span v-if="item.status == 1" class="blob blue"></span>
                        <span v-if="item.status == 2" class="blob green"></span>
                      </span>
                    </div>
                  </nuxt-link>
                </template>
                <template #item.jadwal.skema.skema="{ item }">
                  <nuxt-link :to="`/asesi/informasi-asesmen/${item.id}`">
                    {{ item.jadwal.skema.skema }}
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
    </v-container>
  </v-layout>
</template>
<script>
import { GET_SELF_ASESI, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS } from '@/constants/graphql'
import { DELETE_PESERTA_MUTATION } from '../../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      search: '',
      headers: [
        { text: '', value: 'jadwal.skema.id' },
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
      deleteDialog: false,
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
      deletedPeserta: {},
      alert:{
        show: false,
        type: '',
        message: '',
      },
      items: [
      ],
      e11: {},
    }
  },
  mounted() {
    this.getReport()
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
    deleteItem(item){
      // this.deletedIndex = this.elements.indexOf(item);
      this.deletedPeserta = Object.assign({}, item)
      this.deleteDialog = true
    },
    async getReport() {
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        this.items = data.checkselfAsesi.peserta
        console.log(data)
      }).catch((error) => {
        console.log(error)
      })
    },
    async deletePeserta() {
      this.alert.show = false
      const { deletedPeserta: {id} } = this.$data
      const result = await this.$apollo.mutate({
        mutation: DELETE_PESERTA_MUTATION,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.showAlert('success', 'Jadwal berhasil dihapus')
        this.getReport()
      }).catch(({graphQLErrors}) => {
        console.log(graphQLErrors)
        this.showAlert('error', graphQLErrors[0].message)
      }).finally(() => {
        this.deleteDialog = false
      })
    },
    async registerJadwal() {
      const { state: { loading } } = this
      if (!loading) {
        this.state.loading = true
        this.$refs.form.validate()
        if (!this.$refs.form.validate()) {
          // return this.showAlert('error', 'Syarat dan ketentuan harus disetujui');
          this.state.loading = false
          return 
        }
        const { form: { skema: { id }, tujuan } } = this.$data
        const result = await this.$apollo.mutate({
          mutation: REGISTER_JADWALS,
          variables: {
            id,
            tujuan
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Anda telah berhasil mendaftar')
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
</style>
