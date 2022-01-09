<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-card>
          <v-card-title class="px-8 ">
            <!-- <v-avatar size="30" color="warning lighten-2">
                  <span class="white--text">APL.1</span>
                </v-avatar> -->
            <span class="headline">Asesmen Mandiri</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="px-8 py-8">
            <v-alert
              icon="info"
              text
              type="info"
            >
              Perhatikan pengisian asesmen mandiri, pengisian asesmen mandiri hanya dapat dilakukan sekali.
            </v-alert>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="value"
                  :items="items"
                  prepend-icon="date_range"
                  label="Pilih Jadwal"
                ></v-select>
              </v-col>
            </v-row>
            <div>
              <v-expansion-panels multiple accordion>
                <v-expansion-panel
                  v-for="(item,i) in 5"
                  :key="i"
                >
                  <v-expansion-panel-header>Unit Kompetensi {{ i+1 }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template #default>
                        <thead>
                          <tr>
                            ceritone iki KUK
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card-text>
          <v-row>
                
            <v-col cols="12" class="px-10 py-5">
              <!-- Alert section -->
              <div v-if="alert.show">
                <v-alert :type="alert.type" dismissible class="mb-10">
                  <div class="white--text">
                    {{ alert.message }}
                  </div>
                </v-alert>
              </div>
              <!-- End alert section -->
              <div class="px-5 py-5">
                <v-row>
                      
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </section>
  </div>

</template>
<script>
import { GET_JADWALS, GET_USERDATA, REGISTER_JADWALS, GET_SYARATS, GET_REPORT_DETAIL, UPLOAD_SYARAT } from '@/constants/graphql'
import { GET_SELF_ASESI } from '../../constants/graphql'

export default {
  name: 'Index',
  layout: 'App_asesi',
  data() {
    return {
      ujikompetensi: null,
      tambahDialog: false,
      search: '',
      headers: [
        { text: 'Syarat', value: 'syarat' },
        // { text: 'File', value: 'file'},
        { text: 'Aksi', value: 'actions' },
      ],
      syarats: {
        syarat: '',
        syaratName: '',
        syaratUrl: null,
        syaratFile: ''
      },
      id: this.$route.params.id,
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
      skema: [],
      syarat: [],
      syaratUpload: [],
      form: {
      },
      items: [
      ],
      peserta: [],
      asesi: [],
      e11: {},
    }
  },
  mounted() {
    this.getJadwal()
    // this.getAsesi();
  },
  methods: {
    getIndex(list, id) {
      return list.findIndex((e) => e.id == id)
    },
    pickSyarat() {
      this.$refs.syarat.click()
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
    // onSyaratSelected(index, e) {
    //   if (this.syarats[index] == null) {
    //       this.syarats[index] = {};
    //   }
    //   const syaratFile = e.target.files;
        
    //   if(syaratFile[0] !== undefined) {
    //       this.syarats[index].syaratName = syaratFile[0].name;
    //       if(this.syarats[index].syaratName.lastIndexOf('.') <= 0) {
    //           return;
    //       }
    //       const fr = new FileReader ();
    //       fr.readAsDataURL(syaratFile[0]);
    //       fr.addEventListener('load', () => {
    //           this.syarats[index].syaratUrl = fr.result;
    //           this.syarats[index].syaratFile = syaratFile[0]; 
    //       });
    //   } else {
    //       this.syarats[index].syaratName = '';
    //       this.syarats[index].syaratFile = '';
    //       this.syarats[index].syaratUrl = '';
    //   }
    // },
    // pickSyarat(id) {
    //   console.log(id);
    //   this.$refs[id][0].click();
    // },
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
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        // this.peserta = data.peserta;
        // this.items = data.peserta.syaratPeserta;
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.state.skeleton = false
      })
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
          
        const peserta_id = this.peserta.id
        const syarat = this.syarats.syarat
        const file = this.syarats.syaratUrl

        const result = await this.$apollo.mutate({
          mutation: UPLOAD_SYARAT,
          variables: {
            peserta_id,
            file,
            syarat
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data anda telah berhasil diupload')
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
          console.log(graphQLErrors)
        }).finally(() => {
          this.state.loading = false
          this.tambahDialog = false
          this.getJadwal()
        })
      }
    }
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
