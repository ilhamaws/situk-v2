<template>
  <div class="page-content-wrapper-inner">
    <section>
      <v-layout
        column
        wrap
      >
        <v-container fluid>
          <div v-if="!state.skeleton">
            <v-row>
              <v-col cols="12" md="4">
                <v-card>
                  <div class="d-flex flex-no-wrap">
                    <!-- <v-avatar
                      class="mx-auto mt-10"
                      size="125"
                      circle
                    >
                    </v-avatar> -->
                    <div class="mx-auto pt-5">
                      <v-img class="rounded-lg" width="150" height="200" aspect-ratio="3/4" :src="profile.image"></v-img>
                    </div>
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
                    <v-chip class="mx-auto" text small color="primary">{{ profile.user.role.role }}</v-chip>
                  </div>
                  <!-- <v-divider></v-divider> -->
                  <v-card-text class="px-5">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td width="20%"><b>Nama:</b></td>
                          <td>{{ profile.nama }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>NIK:</b></td>
                          <td>{{ profile.nik }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Email:</b></td>
                          <td>{{ profile.user.email }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Telepon:</b></td>
                          <td>{{ profile.telepon }}</td>
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
                      class="mt-5 ml-5"
                      size="125"
                      style="border-radius: .42rem;"
                      tile
                    >
                      <v-img :src="profile.image"></v-img>
                    </v-avatar>
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="profile.nama"
                      ></v-card-title>
                      <v-card-subtitle class="py-0">status user:</v-card-subtitle>
                      <v-card-actions>
                        <v-btn text color="primary">
                          <span class="text-capitalize">
                            {{ profile.user.role.role }}
                          </span>
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </div>
                  <v-card-text class="px-5">
                    <v-simple-table>
                      <tbody>
                        <tr>
                          <td width="20%"><b>Nama:</b></td>
                          <td>{{ profile.nama }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>NIK:</b></td>
                          <td>{{ profile.nik }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Email:</b></td>
                          <td>{{ profile.user.email }}</td>
                        </tr>
                        <tr>
                          <td width="20%"><b>Telepon:</b></td>
                          <td>{{ profile.telepon }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </div> -->
              <v-col cols="12" md="8">
                <v-card
                  class="mx-auto"
                >
                  <v-card-title>
                    <span class="font-weight-bold">Edit Profil</span>

                    <v-spacer></v-spacer>

                    <v-btn
                      to="/asesi/profile"
                      outlined
                      color="primary"
                    >
                      <v-icon small class="mr-2">person</v-icon>
                      Informasi Profil
                    </v-btn>

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
                        v-for="(page, i) in pages"
                        :key="i"
                        :to="page.link"
                        click=""
                      >
                        <v-list-item-icon class="mr-3">
                          <v-icon>{{ page.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ page.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu> -->
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col md="12" class="px-10 py-5">
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
                        <v-form ref="form">
                          <v-row>
                            <v-col md="12" class="py-0">
                              <label for=""><b>Nama Lengkap</b></label>
                              <v-text-field
                                v-model="input.nama"
                                class="mt-2"
                                label="Nama Lengkap"
                                type="text"
                                solo
                                
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="12" class="py-0">
                              <label for=""><b>NIK</b></label>
                              <v-text-field
                                v-model="input.nik"
                                class="mt-2"
                                label="NIK"
                                type="number"
                                solo
                                
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="12" class="py-0">
                              <label for=""><b>No. Telepon</b></label>
                              <v-text-field
                                v-model="input.telepon"
                                class="mt-2"
                                label="No. Telepon"
                                type="number"
                                solo
                                
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Tempat Lahir</b></label>
                              <v-text-field
                                v-model="input.tempat_lahir"
                                class="mt-2"
                                label="Tempat Lahir"
                                type="text"
                                solo
                                
                              />
                            </v-col>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Tanggal Lahir</b></label>
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template #activator="{ on }">
                                  <v-text-field
                                    v-model="input.tanggal_lahir"
                                    class="mt-2"
                                    label="Tanggal lahir"
                                    solo
                                    v-on="on"
                                    
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="input.tanggal_lahir" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Jenis Kelamin</b></label>
                              <v-select
                                v-model="input.jenis_kelamin"
                                class="mt-2"
                                :items="gender"
                                item-text="jk"
                                item-value="kode"
                                label="Jenis Kelamin"
                                solo
                                
                                append-icon
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="8" class="py-0">
                              <label for=""><b>Alamat</b></label>
                              <v-text-field
                                v-model="input.alamat"
                                class="mt-2"
                                label="Alamat"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Kode Pos</b></label>
                              <v-text-field
                                v-model="input.kodepos"
                                class="mt-2"
                                label="Kodepos"
                                type="text"
                                solo
                              />
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Provinsi</b></label>
                              <v-select
                                v-model="input.kota.provinsi.id"
                                class="mt-2"
                                :items="province"
                                label="Provinsi"
                                item-value="id"
                                item-text="provinsi" solo
                                @input="selectKotas"
                              />
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Kota</b></label>
                              <v-select
                                v-model="input.kota.id"
                                class="mt-2"
                                :items="kota"
                                label="Kota"
                                item-value="id" item-text="kota"
                                solo
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Kebangsaan</b></label>
                              <v-text-field
                                v-model="input.kebangsaan"
                                class="mt-2"
                                label="Kebangsaan"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Pekerjaan</b></label>
                              <v-select
                                v-model="input.pekerjaan.id"
                                class="mt-2"
                                :items="pekerjaan"
                                label="Pekerjaan"
                                item-value="id" item-text="pekerjaan"
                                disabled
                                solo
                              />
                            </v-col>
                            <v-col md="4" class="py-0">
                              <label for=""><b>Pendidikan</b></label>
                              <v-select
                                v-model="input.pendidikan.id"
                                class="mt-2"
                                :items="pendidikan"
                                label="Pendidikan"
                                item-value="id" item-text="pendidikan"
                                solo
                              />
                            </v-col>
                          </v-row>

                          <v-row v-if="input.pekerjaan.id == 3">
                            <v-col md="4" xs="12" class="py-0">
                              <label for=""><b>NPM</b></label>
                              <v-text-field
                                v-model="input.npm"
                                class="mt-2"
                                label="NPM Mahasiswa"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="4" xs="12" class="py-0">
                              <label for=""><b>Fakultas</b></label>
                              <v-text-field
                                v-model="input.fakultas"
                                class="mt-2"
                                label="Fakultas"
                                solo
                              />
                            </v-col>
                            <v-col md="4" xs="12" class="py-0">
                              <label for=""><b>Jurusan</b></label>
                              <v-text-field
                                v-model="input.jurusan"
                                class="mt-2"
                                label="Jurusan"
                                solo
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="4" xs="12" class="py-0">
                              <label for=""><b>Nama Lembaga</b></label>
                              <v-text-field
                                v-model="input.lembaga.nama"
                                class="mt-2"
                                label="Nama Lembaga"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col md="8" xs="12" class="py-0">
                              <label for=""><b>Alamat Lembaga</b></label>
                              <v-text-field
                                v-model="input.lembaga.alamat"
                                class="mt-2"
                                label="Alamat Lembaga"
                                solo
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" md="4" class="py-0">
                              <label for=""><b>Kodepos Lembaga</b></label>
                              <v-text-field
                                v-model="input.lembaga.kodepos"
                                class="mt-2"
                                label="Kodepos Lembaga"
                                type="text"
                                solo
                              />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                              <label for=""><b>Email Lembaga</b></label>
                              <v-text-field
                                v-model="input.lembaga.email"
                                class="mt-2"
                                type="email"
                                label="Email Lembaga"
                                solo
                              />
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                              <label for=""><b>Telepon Lembaga</b></label>
                              <v-text-field
                                v-model="input.lembaga.telepon"
                                class="mt-2"
                                type="number"
                                label="Telepon lembaga"
                                solo
                              />
                            </v-col>
                          </v-row>

                          <!-- <v-row>
                            <v-col md="12" class="py-0">
                              <label for=""><b>Lembaga</b></label>
                              <v-select
                                v-model="input.lembaga.id"
                                class="mt-2"
                                :items="lembaga"
                                label="Lembaga"
                                item-value="id" item-text="nama"
                                solo
                              />
                            </v-col>
                          </v-row> -->

                          <v-row>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Foto</b></label>
                              <v-row>
                                <v-col md="7">
                                    <v-img
                                      :src="input.image"
                                      :lazy-src="input.image"
                                      height="200"
                                      width="150"
                                      class="grey lighten-2 rounded-lg mt-2"
                                    ></v-img>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col md="7">
                                  <v-text-field v-model="image.imageName" label="Edit Foto" prepend-icon="mdi-camera" solo @click="pickImage"></v-text-field>
                                  <input
                                    ref="image"
                                    type="file"
                                    style="display: none"
                                    accept="image/png, image/jpeg"
                                    @change="onPhotoSelected"
                                  >
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col md="6" class="py-0">
                              <label for=""><b>Tanda tangan</b></label>
                              <v-row>
                                <v-col cols="12">
                                  <v-card class="rounded-lg">
                                    <v-img
                                      height="200"
                                      width="full"
                                      :src="input.ttd"
                                      :lazy-src="input.ttd"
                                      aspect-ratio="1"
                                      class="white mt-2"
                                    ></v-img>
                                  </v-card>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col md="7">
                                  <v-btn block large color="primary" outlined dark @click="pickTtd"><v-icon left>edit</v-icon>Edit tanda tangan</v-btn>
                                </v-col>
                              </v-row>
                              <v-dialog v-model="editDialog" persistent max-width="600px">
                                <v-card>
                                  <v-card-title class="headline">Edit Tanda Tangan</v-card-title>
                                  <v-card-text>
                                    <v-card>
                                      <VueSignaturePad
                                        id="signature"
                                        ref="signaturePad"
                                        width="100%"
                                        height="200px"
                                        :options="{onBegin: () => {$refs.signaturePad.resizeCanvas()}}"
                                      />
                                    </v-card>
                                  </v-card-text>
                                  <v-card-text>
                                    <v-btn color="primary" class="mr-2" outlined dark @click="undo()"><v-icon left>undo</v-icon>Undo</v-btn>
                                    <v-btn color="primary" outlined dark @click="clear()"><v-icon left>clear</v-icon>Clear</v-btn>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="grey" text @click="editDialog = false">Batal</v-btn>
                                    <v-btn color="primary" text @click="saveTtd">Simpan Ttd</v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col md="12" class="justify-end d-flex">
                              <!-- <v-spacer></v-spacer>
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                  <v-btn class="mr-2" v-on="on" large rounded color="grey" text @click="resetForm()" target="_blank">
                                    Reset form
                                  </v-btn>
                                </template>
                                <span>Reset form ke awal</span>
                              </v-tooltip> -->
                              <v-btn
                                large
                                rounded
                                color="primary"
                                dark
                                @click="updateAsesiManual">
                                <v-progress-circular
                                  v-if="state.loading"
                                  :size="20"
                                  :width="2"
                                  indeterminate
                                  color="white"
                                  class="mr-2"
                                ></v-progress-circular>
                                Simpan Perubahan
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                        <!-- <v-form>
                          <v-row>
                            <v-col md="6">
                              <v-text-field
                                v-model="profile.nama"
                                label="Nama Lengkap"
                                type="text"
                                outlined
                                dense
                              />
                            </v-col>
                            <v-col md="6">
                              <v-select
                                v-model="profile.jenis_kelamin"
                                :items="gender"
                                item-text="jk"
                                item-value="kode"
                                label="Jenis Kelamin"
                                outlined
                                dense
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="6">
                              <v-text-field
                                v-model="profile.tempat_lahir"
                                label="Tempat Lahir"
                                type="text"
                                outlined
                                dense
                              />
                            </v-col>
                            <v-col md="6">
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="profile.tanggal_lahir"
                                    label="Tanggal lahir"
                                    v-on="on"
                                    outlined
                                    dense
                                  ></v-text-field>
                                </template>
                                <v-date-picker v-model="date" no-title scrollable>
                                  <v-spacer></v-spacer>
                                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>

                          <v-text-field
                            v-model="profile.alamat"
                            label="Alamat"
                            type="text"
                            outlined
                            dense
                          />

                          <v-row>
                            <v-col md="5">
                              <v-select
                              @input='selectKotas'
                              v-model="profile.provinsi"
                              :items="province"
                              label="Provinsi"
                              item-value="id" item-text="provinsi"
                              outlined
                              dense
                              />
                            </v-col>
                            <v-col md="5">
                              <v-select
                              v-model="profile.kota"
                              :items="kota"
                              label="Kota"
                              item-value="id" item-text="kota"
                              outlined
                              dense
                              />
                            </v-col>
                            <v-col md="2">
                              <v-text-field
                              v-model="profile.kodepos"
                              label="Kode Pos"
                              type="text"
                              outlined
                              dense
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="6">
                              <v-text-field
                                v-model="profile.nik"
                                label="NIK"
                                type="number"
                                outlined
                                dense
                              />
                            </v-col>
                            <v-col md="6">
                              <v-select
                              v-model="profile.lembaga"
                              :items="lembaga"
                              label="Lembaga"
                              item-value="id" item-text="nama"
                              outlined
                              dense
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="6">
                              <v-text-field
                                v-model="profile.kebangsaan"
                                label="Kebangsaan"
                                type="text"
                                outlined
                                dense
                              />
                            </v-col>
                            <v-col md="6">
                              <v-text-field
                                v-model="profile.telepon"
                                label="Telepon"
                                type="number"
                                outlined
                                dense
                              />
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col md="6">
                              <v-select
                              v-model="profile.pekerjaan"
                              :items="pekerjaan"
                              label="Pekerjaan"
                              item-value="id" item-text="pekerjaan"
                              outlined
                              dense
                              />
                            </v-col>
                            <v-col md="6">
                              <v-select
                              v-model="profile.pendidikan"
                              :items="pendidikan"
                              label="Pendidikan"
                              item-value="id" item-text="pendidikan"
                              outlined
                              dense
                              />
                            </v-col>
                          </v-row>

                          <v-text-field label="Pilih Foto" v-model='image.imageName' @click='pickImage' prepend-icon='mdi-camera'></v-text-field>
                          <input
                              type="file"
                              style="display: none"
                              ref="image"
                              accept="image/png, image/jpeg"
                              @change="onPhotoSelected"
                          >

                          <v-text-field label="Upload Tanda Tangan" v-model='ttd.ttdName' @click='pickTtd' prepend-icon='attach_file'></v-text-field>
                          <input
                              type="file"
                              style="display: none"
                              ref="ttd"
                              accept="image/png, image/jpeg"
                              @change="onTtdSelected"
                          >
                          <v-row>
                            <v-spacer></v-spacer>
                            <v-btn
                              @click='updateAsesi'
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
                        </v-form> -->
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-layout>
    </section>
  </div>
</template>
<script>
import { LSP_USER_ID, LSP_AUTH_TOKEN, API_BASE_URL } from '@/constants/settings'
import { UPDATE_ASESI_MANUAL_MUTATION, GET_USERDATA, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS, GET_SELF_ASESI, GET_FAKULTASS, GET_JURUSANS } from '@/constants/graphql'

export default {
  name: 'Profile',
  layout: 'App_asesi',
  data() {
    return {
      editDialog: false,
      state:{
        loading: false,
        skeleton: true
      },
      pages: [
        { title: 'Informasi Profil' , icon: 'person', link: 'profile'},
        // { title: 'Ubah Password' , icon: 'lock', link: '/change-password'},
        // { title: 'Overview' , icon: 'bar_chart', link: '/dashboard-asesi'},
      ],
      options: {
        penColor: "#c0f"
      },
      alert:{
        show: false,
        type: '',
        message: '',
      },
      rules: [
        value => !value || value.size < 1000000 || 'Ukuran image harus kurang dari 1 MB!',
      ],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      profile : [],
      input: [],
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
      nama: '',
      nik: '',
      tempat_lahir: '',
      kebangsaan: '',
      alamat: '',
      kodepos: '',
      telepon: '',
      // image: null,
      image: {
        imageName: '',
        imageUrl: null,
        imageFile: ''
      },
      ttd: {
        ttdName: '',
        ttdUrl: null,
        ttdFile: ''
      },
      selectedImage: '',
      // ttd: null,
      selectedTtd: '',
      selectedGender: null,
      kota: [],
      selectedCity: null,
      province: [],
      selectedProvince: null,
      lembaga: [],
      selectedLembaga: null,
      pekerjaan: [],
      selectedPekerjaan: null,
      pendidikan: [],
      selectedPendidikan:null,
      fakultass: [],
      jurusans: []
    }
  },
  async created() {
  },
  async mounted() {
    await this.checkAsesiData()
    this.getLembagas()
    this.getPekerjaans()
    this.getPendidikans()
    this.getProvinsis()
    this.getKotas()
    this.getFakultass()
    this.getJurusans()
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    clear() {
      this.$refs.signaturePad.clearSignature()
    },
    saveTtd() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.input.ttd = data
      this.ttd.ttdUrl = data
      this.editDialog = false
      // alert("Open DevTools see the save data.");
      // console.log(isEmpty);
      // console.log(data);
    },
    onPhotoSelected(e) {
      const files = e.target.files
      // const reader = new FileReader();

      if(files[0] !== undefined) {
        this.image.imageName = files[0].name
        if(this.image.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.image.imageUrl = fr.result
          this.input.image = fr.result
          this.image.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.image.imageName = ''
        this.image.imageFile = ''
        this.image.imageUrl = ''
      }
      // reader.onloadend = (imgFile) => {
      //   this.image = reader.result;
      // };
      // reader.readAsDataURL(imgFile);
    },
    pickImage() {
      this.$refs.image.click()
    },
    pickTtd() {
      // this.$nextTick(() => {
      //   this.$refs.signaturePad.resizeCanvas();
      // });
      this.editDialog = true
      // this.$refs.ttd.click();
    },
    resetForm(){
      this.input = {...this.profile}
    },
    onTtdSelected(e) {
      const ttdFile = e.target.files

      if(ttdFile[0] !== undefined) {
        this.ttd.ttdName = ttdFile[0].name
        if(this.ttd.ttdName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(ttdFile[0])
        fr.addEventListener('load', () => {
          this.ttd.ttdUrl = fr.result
          this.ttd.ttdFile = ttdFile[0] // this is an ttd file that can be sent to server...
        })
      } else {
        this.ttd.ttdName = ''
        this.ttd.ttdFile = ''
        this.ttd.ttdUrl = ''
      }
    },

    async getLembagas() {
      const result = await this.$apollo.mutate({
        mutation: GET_LEMBAGAS
      }).then(({ data }) => {
        this.lembaga = data.lembagas
      }).catch((error) => {
        console.log(error)
      })
    },

    async getPekerjaans() {
      const result = await this.$apollo.mutate({
        mutation: GET_PEKERJAANS
      }).then(({ data }) => {
        this.pekerjaan = data.pekerjaans
      }).catch((error) => {
        console.log(error)
      })
    },

    async getPendidikans() {
      const result = await this.$apollo.mutate({
        mutation: GET_PENDIDIKANS
      }).then(({ data }) => {
        this.pendidikan = data.pendidikans
      }).catch((error) => {
        console.log(error)
      })
    },

    async getProvinsis() {
      const result = await this.$apollo.mutate({
        mutation: GET_PROVINSIS
      }).then(({ data }) => {
        this.province = data.provinsis
      }).catch((error) => {
        console.log(error)
      })
    },

    async getKotas() {
      const id = this.input.kota.provinsi.id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_KOTAS,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.kota = data.provinsi.kota
      }).catch((error) => {
        console.log(error)
      })
    },

    async getFakultass() {
      const result = await this.$apollo.mutate({
        mutation: GET_FAKULTASS
      }).then(({ data }) => {
        console.log(data)
        this.fakultass = data.fakultass
      }).catch((error) => {
        console.log(error)
      })
    },

    async getJurusans() {
      const id = this.input.jurusan.fakultas.id
      const result = await this.$apollo.mutate({
        mutation: GET_JURUSANS,
        variables: {
          id
        }
      }).then(({ data }) => {
        console.log(data)
        this.jurusans = data.fakultas.jurusan
      }).catch((error) => {
        console.log(error)
      })
    },

    async selectKotas() {
      const id = this.input.kota.provinsi.id
      console.log(id)
      const result = await this.$apollo.mutate({
        mutation: GET_KOTAS,
        variables: {
          id
        }
      }).then(({ data }) => {
        this.kota = data.provinsi.kota
      }).catch((error) => {
        console.log(error)
      })
    },

    showAlert(type, message) {
      this.alert = { show: true, type, message }
    },
    async updateAsesi(e) {
      e.preventDefault()
      const { state: { loading } } = this

      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const { input: { nik
          , nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon, npm}} = this.$data
        const lembaga_id = this.input.lembaga.id
        const pendidikan_id = this.input.pendidikan.id
        const pekerjaan_id = this.input.pekerjaan.id
        const kota_id = this.input.kota.id
        const jurusan_id = this.input.jurusan.id
        const image = this.input.image
        const ttd = this.input.ttd
        const result = await this.$apollo.mutate({
          mutation: UPDATE_ASESI_MUTATION,
          variables: {
            lembaga_id, pendidikan_id, pekerjaan_id, kota_id, nik,
            nama, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat, kodepos, telepon,
            image, ttd, jurusan_id, npm
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data berhasil diubah')
          this.checkAsesiData()
          // location.href = 'edit-profile';
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },

    async updateAsesiManual(e) {
      e.preventDefault()
      const { state: { loading } } = this

      if (!loading) {
        this.alert.show = false
        this.state.loading = true
        const { input: {
          nik, nama, npm, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat,
          kodepos, telepon, jurusan, fakultas, universitas
        }} = this.$data
        const nama_lembaga = this.input.lembaga.nama
        const alamat_lembaga = this.input.lembaga.alamat
        const kodepos_lembaga = this.input.lembaga.kodepos
        const telepon_lembaga = this.input.lembaga.telepon
        const email_lembaga = this.input.lembaga.email

        const pendidikan_id = this.input.pendidikan.id
        const pekerjaan_id = this.input.pekerjaan.id
        const kota_id = this.input.kota.id
        const image = this.image.imageUrl
        const ttd = this.ttd.ttdUrl
        const result = await this.$apollo.mutate({
          mutation: UPDATE_ASESI_MANUAL_MUTATION,
          variables: {
            nik, nama, npm, jenis_kelamin, tempat_lahir, tanggal_lahir, kebangsaan, alamat,
            kodepos, telepon, jurusan, fakultas, universitas, nama_lembaga, alamat_lembaga,
            kodepos_lembaga, telepon_lembaga, email_lembaga, pendidikan_id, pekerjaan_id, image, ttd, kota_id
          }
        }).then(({ data }) => {
          this.showAlert('success', 'Data berhasil diubah')
          this.checkAsesiData()
          // location.href = 'edit-profile';
          console.log(data)
        }).catch(({graphQLErrors}) => {
          this.showAlert('error', graphQLErrors[0].message)
        }).finally(() => {
          this.state.loading = false
        })
      }
    },

    async checkAsesiData() {
      // const user_id = localStorage.getItem('lsp-user-id');
      const result = await this.$apollo.mutate({
        mutation: GET_SELF_ASESI
      }).then(({ data }) => {
        this.profile = data.checkselfAsesi
        this.input = { ...this.profile }
        // this.profile.nama = data.user.asesi.nama;
        // this.profile.jenis_kelamin = data.user.asesi.jenis_kelamin;
        // this.profile.nik = data.user.asesi.nik;
        // this.profile.tempat_lahir = data.user.asesi.tempat_lahir;
        // this.profile.tanggal_lahir = data.user.asesi.tanggal_lahir;
        // this.profile.kebangsaan = data.user.asesi.kebangsaan;
        // this.profile.alamat = data.user.asesi.alamat;
        // this.profile.kota = data.user.asesi.kota.id;
        // this.profile.provinsi = data.user.asesi.kota.provinsi.id;
        // this.profile.kodepos = data.user.asesi.kodepos;
        // this.profile.telepon = data.user.asesi.telepon;
        // this.profile.lembaga = data.user.asesi.lembaga.id;
        // this.profile.pekerjaan = data.user.asesi.pekerjaan.id;
        // this.profile.pendidikan = data.user.asesi.pendidikan.id;
        // this.profile.image = data.user.asesi.image;
        // this.profile.ttd = data.user.asesi.ttd;
        // this.profile.email = data.user.email;
        // this.profile.role = data.user.role.role;
        console.log(data)
      }).catch((error) => {
        alert(error)
      }).finally(() => {
        this.state.skeleton = false
      })
    },
    gotoPage(page) {
      this.$router.push(page)
    },
  }
}

</script>
<style lang="scss" scoped>
</style>
