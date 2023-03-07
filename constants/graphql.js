import gql from 'graphql-tag'

export const CREATE_ASESI_MUTATION = gql `
mutation createAsesi($lembaga_id: ID!, $npm: String, $jurusan_id: ID!, $pendidikan_id: ID!, $pekerjaan_id: ID!, $kota_id: Int!, $nik: String!, 
  $nama: String, $jenis_kelamin: String, $tempat_lahir: String, $tanggal_lahir: String, $kebangsaan: String, $alamat: String, 
  $kodepos: String, $telepon: String, $image: String, $ttd: String) {
  createAsesi(
    lembaga_id : $lembaga_id
    pendidikan_id : $pendidikan_id
    pekerjaan_id : $pekerjaan_id
    kota_id : $kota_id
    nik : $nik
    nama : $nama
    npm : $npm
    jurusan_id : $jurusan_id
    jenis_kelamin : $jenis_kelamin
    tempat_lahir : $tempat_lahir
    tanggal_lahir : $tanggal_lahir
    kebangsaan : $kebangsaan
    alamat : $alamat
    kodepos : $kodepos
    telepon : $telepon
    image : $image
    ttd : $ttd
  ){
    nama
  }
}
`

export const CREATE_ASESOR_MUTATION = gql `
mutation createAsesor($user_id: ID, $name: String!, $skema_id: ID!, $no_registrasi: String, $no_sertifikat: String, 
  $no_blanko: String, $exp_sertifikat: String, $alamat: String, $image: String, $ttd: String) {
    createAsesor(
      user_id : $user_id
      nama : $name
      skema_id : $skema_id
      no_registrasi : $no_registrasi
      no_sertifikat : $no_sertifikat
      no_blanko : $no_blanko
      exp_sertifikat : $exp_sertifikat
      alamat : $alamat
      image : $image
      ttd : $ttd
  ){
    id
  }
}
`

export const UPDATE_ASESOR_MUTATION = gql `
mutation updateAsesor($user_id: ID, $nama: String!, $skema_id: ID!, $no_registrasi: String, $no_sertifikat: String, 
  $no_blanko: String, $exp_sertifikat: String, $alamat: String, $image: String, $ttd: String) {
    updateAsesor(
      user_id : $user_id
      nama : $nama
      skema_id : $skema_id
      no_registrasi : $no_registrasi
      no_sertifikat : $no_sertifikat
      no_blanko : $no_blanko
      exp_sertifikat : $exp_sertifikat
      alamat : $alamat
      image : $image
      ttd : $ttd
  ){
    id
  }
}
`

export const SIGNIN_MUTATION = gql `
mutation($email: String!, $password: String!) {
    login(
      email : $email
      password : $password
    ) {
      asesi{
        id
        nama
      }
      id
      token
      role {
        id
        role
      }
    }
  }
`

export const SIGNUP_MUTATION = gql `
mutation($email: String!, $password: String!, $password_confirm: String!) {
  register(
    email : $email
    password : $password
    password_confirmation : $password_confirm
  )
}
`

export const UPDATE_SELF_USER = gql `
mutation($email: String, $old_password: String, $password: String, $password_confirmation: String) {
  updateSelfUser(
    email : $email
    old_password : $old_password
    password : $password
    password_confirmation : $password_confirmation
  )
}
`

export const CREATE_USER_MUTATION = gql `
mutation createAccount($email: String!, $password: String!, $role_id: ID) {
  createAccount(
    email : $email
    password : $password
    role_id : $role_id
  ) {
    email
  }
}
`

export const UPDATE_USER_MUTATION = gql `
mutation updateAccount($id: ID!, $email: String!, $password: String!) {
  updateAccount(
    id : $id
    email : $email
    password : $password
  ) {
    email
  }
}
`

export const DELETE_USER_MUTATION = gql `
mutation deleteAccount($id: ID!){
  deleteAccount(
    id: $id
  )
}
`

export const ACC_PERSETUJUAN_PESERTA_MUTATION = gql `
mutation accPersetujuanPeserta($peserta_id: ID!, $jenis_tes: Int){
  accPersetujuanPeserta(
    peserta_id: $peserta_id
    jenis_tes: $jenis_tes
  )
}
`

export const ACC_PERSETUJUAN_ASESOR_MUTATION = gql `
mutation accPersetujuanAsesor($peserta_id: ID!){
  accPersetujuanAsesor(
    peserta_id: $peserta_id
  )
}
`

export const ACTIVATE_ACCOUNT_MUTATION = gql `
mutation activate($email: String, $activation: String){
  activate(
    email : $email
    activation : $activation
  )
}
`

export const VERIFIKASI_PESERTA_MUTATION = gql `
mutation verifikasiPeserta($id: ID!, $status: Int, $note: String){
  verifikasiPeserta(
    id : $id
    status : $status
    note : $note
  )
}
`

export const VERIFIKASI_FILEINPUT_MUTATION = gql `
mutation verifikasiSyarat(
  $id: ID!,
  $status: Int!
  ){
  verifikasiSyarat(
    id: $id,
    status: $status
  )
}
`

export const OBSERVASI_MUTATION = gql `
mutation observasi($observasi: [observasi]!, $uji_kompetensi_id: ID!, $umpan_balik: String){
  observasi(
    observasi: $observasi
    uji_kompetensi_id: $uji_kompetensi_id
    umpan_balik: $umpan_balik
  )
}
`

export const EVALUASI_PORTOFOLIO_MUTATION = gql `
mutation evaluasiPortofolio(
  $id: ID!
  $valid: Int
  $memadai: Int
  $asli: Int
  $terkini: Int
){
  evaluasiPortofolio(
    id: $id
    valid: $valid
    memadai: $memadai
    asli: $asli
    terkini: $terkini
  )
}
`

export const RESEND_OTP_MUTATION = gql `
mutation resendOtp($email: String){
  resendOtp(
    email : $email
  )
}
`

export const RESET_PASSWORD_MUTATION = gql `
mutation resetPassword($email: String){
  resetPassword(
    email : $email
  )
}
`

export const CREATE_SKEMA_MUTATION = gql `
mutation createSkema($kode: String!, $skema: String!, $kategori: String, $bidang: String, $panduan: String, $default_tuk: ID!, $mea: String){
  createSkema(
    kode: $kode
    skema: $skema
    kategori: $kategori
    bidang: $bidang
    mea: $mea
    panduan: $panduan
    default_tuk: $default_tuk
  ) {
    skema
  }
}
`

export const UPDATE_SKEMA_MUTATION = gql `
mutation updateSkema($id: ID!, $kode: String!, $skema: String!, $kategori: String, $bidang: String, $panduan: String, $default_tuk: ID!, $mea: String){
  updateSkema(
    id: $id
    kode: $kode
    skema: $skema
    kategori: $kategori
    bidang: $bidang
    mea: $mea
    panduan: $panduan
    default_tuk: $default_tuk
  ) {
    skema
  }
}
`

export const DELETE_SKEMA_MUTATION = gql `
mutation deleteSkema($id: ID!){
  deleteSkema(
    id: $id
  )
}
`

export const CREATE_DOKUMEN_SKEMA_MUTATION = gql `
mutation createDokumenSkema(
  $skema_id: ID!,
  $name: String,
  $keterangan: String,
  $file: String,
  $flag: Int,
){
  createDokumenSkema(
    skema_id: $skema_id
    name: $name
    keterangan: $keterangan
    file: $file
    flag: $flag
  ) {
    id
  }
}
`

export const UPDATE_DOKUMEN_SKEMA_MUTATION = gql `
mutation updateDokumenSkema(
  $id: ID!,
  $skema_id: ID!,
  $name: String,
  $keterangan: String,
  $file: String,
  $flag: Int,
){
  updateDokumenSkema(
    id: $id
    skema_id: $skema_id
    name: $name
    keterangan: $keterangan
    file: $file
    flag: $flag
  ) {
    id
  }
}
`

export const DELETE_DOKUMEN_SKEMA_MUTATION = gql `
mutation deleteDokumenSkema($id: ID!){
  deleteDokumenSkema(
    id: $id
  )
}
`

export const CREATE_SYARAT_MUTATION = gql `
mutation createSyarat($syarat: String!, $skema_id: ID!){
  createSyarat(
    syarat: $syarat
    skema_id: $skema_id
  ) {
    id
  }
}
`

export const UPDATE_SYARAT_MUTATION = gql `
mutation updateSyarat($syarat: String, $id: ID!, $status: Int){
  updateSyarat(
    syarat: $syarat
    id: $id
    status: $status
  ) {
    id
  }
}
`

export const CREATE_LEMBAGA_MUTATION = gql `
mutation createlembaga(
  $nama: String,
  $alamat: String,
  $kodepos: String,
  $telepon: String,
  $email: String,
){
  createLembaga(
    nama: $nama
    alamat: $alamat
    kodepos: $kodepos
    telepon: $telepon
    email: $email
  ) {
    id
    nama
  }
}
`

export const UPDATE_LEMBAGA_MUTATION = gql `
mutation updatelembaga(
  $id: ID!,
  $nama: String,
  $alamat: String,
  $kodepos: String,
  $telepon: String,
  $email: String,
){
  updateLembaga(
    id: $id
    nama: $nama
    alamat: $alamat
    kodepos: $kodepos
    telepon: $telepon
    email: $email
  ) {
    id
    nama
  }
}
`

export const DELETE_LEMBAGA_MUTATION = gql `
mutation deleteLembaga($id: ID!){
  deleteLembaga(
    id: $id
  )
}
`

export const CREATE_TUK_MUTATION = gql `
mutation createTUK(
  $kode: String!,
  $nama: String!,
  $jenis: String,
  $alamat: String
){
  createTUK(
    kode: $kode
    nama: $nama
    jenis: $jenis
    alamat: $alamat
  ) {
    kode
  }
}
`

export const UPDATE_TUK_MUTATION = gql `
mutation updateTUK(
  $id: ID!,
  $kode: String!,
  $nama: String!,
  $jenis: String,
  $alamat: String
){
  updateTUK(
    id: $id
    kode: $kode
    nama: $nama
    jenis: $jenis
    alamat: $alamat
  ) {
    kode
  }
}
`

export const DELETE_TUK_MUTATION = gql `
mutation deleteTUK($id: ID!){
  deleteTUK(
    id: $id
  )
}
`

export const CREATE_FAKULTAS_MUTATION = gql `
mutation createFakultas(
  $fakultas: String!
){
  createFakultas(
    fakultas: $fakultas
  ) {
    id
  }
}
`

export const UPDATE_FAKULTAS_MUTATION = gql `
mutation updateFakultas(
  $id: ID!,
  $fakultas: String
){
  updateFakultas(
    id: $id
    fakultas: $fakultas
  ) {
    id
  }
}
`

export const DELETE_FAKULTAS_MUTATION = gql `
mutation deleteFakultas($id: ID!){
  deleteFakultas(
    id: $id
  )
}
`

export const CREATE_JURUSAN_MUTATION = gql `
mutation createJurusan(
  $jurusan: String
  $fakultas_id: ID!
){
  createJurusan(
    jurusan: $jurusan
    fakultas_id: $fakultas_id
  ) {
    id
  }
}
`

export const UPDATE_JURUSAN_MUTATION = gql `
mutation updateJurusan(
  $id: ID!,
  $jurusan: String
  $fakultas_id: ID!
){
  updateJurusan(
    id: $id
    jurusan: $jurusan
    fakultas_id: $fakultas_id
  ) {
    id
  }
}
`

export const DELETE_JURUSAN_MUTATION = gql `
mutation deleteJurusan($id: ID!){
  deleteJurusan(
    id: $id
  )
}
`

export const CREATE_UMPAN_BALIK_MUTATION = gql `
mutation createUmpanBalik(
  $komponen: String!,
){
  createUmpanBalik(
    komponen: $komponen
  ) {
    id
  }
}
`

export const CREATE_UMPAN_BALIK_PESERTA_MUTATION = gql `
mutation createUmpanBalikPeserta(
  $catatan: String,
  $peserta_id: ID!,
  $umpan_balik: [umpanBalikInput]!
){
  createUmpanBalikPeserta(
    catatan: $catatan
    peserta_id: $peserta_id
    umpan_balik: $umpan_balik
  )
}
`

export const UPDATE_UMPAN_BALIK_MUTATION = gql `
mutation updateUmpanBalik(
  $id: ID!,
  $komponen: String,
  $status: Int
){
  updateUmpanBalik(
    id: $id
    komponen: $komponen
    status: $status
  ) {
    id
  }
}
`

export const DELETE_UMPAN_BALIK_MUTATION = gql `
mutation deleteUmpanBalik(
  $id: ID!
){
  deleteUmpanBalik(
    id: $id
  )
}
`

export const UPDATE_ASESOR_PESERTA_MUTATION = gql `
mutation updateAsesorPeserta($id: ID!, $asesor_id: ID!){
  updateAsesorPeserta(
    id: $id
    asesor_id: $asesor_id
  )
}
`

export const RANDOM_ASESOR_MUTATION = gql `
mutation randomAsesor($asesor_id: [ID], $jadwal_id: ID!){
  randomAsesor(
    asesor_id: $asesor_id
    jadwal_id: $jadwal_id
  )
}
`

export const CREATE_JADWAL_MUTATION = gql `
mutation createJadwal(
  $skema_id: ID!,
  $tempat_uk_id: ID,
  $anggaran_id: ID,
  $tanggal: String
  $keterangan: String
  $jurusan_id: [ID]
){
  createJadwal(
    keterangan: $keterangan,
    tempat_uk_id: $tempat_uk_id,
    skema_id: $skema_id,
    anggaran_id: $anggaran_id,
    tanggal: $tanggal,
    jurusan_id: $jurusan_id
  ) {
    id
  }
}
`

export const UPDATE_JADWAL_MUTATION = gql `
mutation updateJadwal(
  $id: ID!,
  $tempat_uk_id: ID,
  $anggaran_id: ID,
  $tanggal: String,
  $kuota: Int,
  $status: Int,
  $keterangan: String,
  $jurusan_id: [ID]
){
  updateJadwal(
    id: $id
    tempat_uk_id: $tempat_uk_id
    anggaran_id: $anggaran_id
    tanggal: $tanggal
    kuota: $kuota
    status: $status
    keterangan: $keterangan
    jurusan_id: $jurusan_id
  ) {
    kuota
  }
}
`

export const CANCEL_JADWAL_MUTATION = gql `
mutation cancelJadwal(
  $id: ID
){
  cancelJadwal(
    id: $id
  ) {
    id
  }
}
`

// START DELETE MUTATION

export const DELETE_ELEMENT_MUTATION = gql `
mutation deleteElement($id: ID!){
  deleteElement(
    id: $id
  )
}
`

export const DELETE_JADWAL_MUTATION = gql `
mutation deleteJadwal($id: ID!){
  deleteJadwal(
    id: $id
  )
}
`

export const DELETE_KRITERIAUK_MUTATION = gql `
mutation deleteKriteriaUK($id: ID!){
  deleteKriteriaUK(
    id: $id
  )
}
`

export const DELETE_PESERTA_MUTATION = gql `
mutation deletePeserta($id: ID!){
  deletePeserta(
    id: $id
  )
}
`

// export const DELETE_PESERTABYADMIN_MUTATION = gql `
// mutation PesertabyAdmin($id: ID!){
//   PesertabyAdmin(
//     id: $id
//   )
// }
// `;

export const DELETE_PESERTABYADMIN_MUTATION = gql `
mutation deletePesertabyAdmin($id: ID!){
  deletePesertabyAdmin(
    id: $id
  )
}
`

export const DELETE_PORTOFOLIO_MUTATION = gql `
mutation deletePortofolio($id: ID!){
  deletePortofolio(
    id: $id
  )
}
`

export const DELETE_SYARAT_MUTATION = gql `
mutation deleteSyarat($id: ID!){
  deleteSyarat(
    id: $id
  )
}
`

export const DELETE_SYARAT_PESERTA_MUTATION = gql `
mutation deleteSyaratPeserta($id: ID!){
  deleteSyaratPeserta(
    id: $id
  )
}
`

export const UPDATE_DATE_PESERTA = gql `
mutation updateDatePeserta($id: ID!, $date: String){
  updateDatePeserta(
    id: $id
    date: $date
  )
}
`

export const CREATE_UNITKOMPETENSI_MUTATION = gql `
mutation createUnitKompetensi(
  $kode: String!,
  $unit: String!,
  $tahun: String,
  $skema_id: ID!,
  $standar_id: ID!
){
  createUnitKompetensi(
    kode: $kode
    unit: $unit
    tahun: $tahun
    skema_id: $skema_id
    standar_id: $standar_id
  ) {
    id
  }
}
`

export const CREATE_ELEMENT_MUTATION = gql `
mutation createElement(
  $elemen: String,
  $unit_kompetensi_id: ID!
){
  createElement(
    elemen: $elemen
    unit_kompetensi_id: $unit_kompetensi_id
  ) {
    id
  }
}
`

export const UPDATE_ELEMENT_MUTATION = gql `
mutation updateElement(
  $id: ID!,
  $elemen: String,
  $unit_kompetensi_id: ID!
  $flag: Int!
){
  updateElement(
    id: $id
    elemen: $elemen
    flag: $flag
    unit_kompetensi_id: $unit_kompetensi_id
  ) {
    id
  }
}
`

export const CREATE_KRITERIAUK_MUTATION = gql `
mutation createKriteriaUK(
  $kriteria: String,
  $element_id: ID!
){
  createKriteriaUK(
    kriteria: $kriteria
    element_id: $element_id
  ) {
    id
  }
}
`

export const UPDATE_KRITERIAUK_MUTATION = gql `
mutation updateKriteriaUK(
  $id: ID!
  $kriteria: String,
  $element_id: ID!
  $flag: Int
){
  updateKriteriaUK(
    id: $id
    kriteria: $kriteria
    element_id: $element_id
    flag: $flag
  ) {
    id
  }
}
`

export const UPDATE_UNITKOMPETENSI_MUTATION = gql `
mutation updateUnitKompetensi(
  $id: ID!,
  $kode: String!,
  $unit: String!,
  $tahun: String,
  $skema_id: ID!,
  $standar_id: ID!,
  $flag: Int!
){
  updateUnitKompetensi(
    id: $id
    kode: $kode
    unit: $unit
    tahun: $tahun
    skema_id: $skema_id
    standar_id: $standar_id
    flag: $flag
  ) {
    id
  }
}
`

export const DELETE_UNITKOMPETENSI_MUTATION = gql `
mutation deleteUnitKompetensi($id: ID!){
  deleteUnitKompetensi(
    id: $id
  )
}
`

// END DELETE

export const UPDATE_ASESI_MUTATION = gql `
mutation updateAsesi($npm: String, $jurusan_id: ID, $lembaga_id: ID!, $pendidikan_id: ID!, $pekerjaan_id: ID!, $kota_id: Int!, $nik: String!, 
  $nama: String, $jenis_kelamin: String, $tempat_lahir: String, $tanggal_lahir: String, $kebangsaan: String, $alamat: String, 
  $kodepos: String, $telepon: String, $image: String, $ttd: String) {
  updateAsesi(
    lembaga_id : $lembaga_id
    pendidikan_id : $pendidikan_id
    pekerjaan_id : $pekerjaan_id
    kota_id : $kota_id
    nik : $nik
    nama : $nama
    jenis_kelamin : $jenis_kelamin
    tempat_lahir : $tempat_lahir
    tanggal_lahir : $tanggal_lahir
    kebangsaan : $kebangsaan
    alamat : $alamat
    kodepos : $kodepos
    telepon : $telepon
    image : $image
    ttd : $ttd
    npm: $npm
    jurusan_id: $jurusan_id
  ){
    id
    nama
  }
}
`

export const UPDATE_ASESI_MANUAL_MUTATION = gql `
mutation updateAsesiManual($pendidikan_id: ID!, $pekerjaan_id: ID!, $kota_id: Int!, $nik: String!, $nama: String, $npm: String, $jenis_kelamin: String,
  $tempat_lahir: String, $tanggal_lahir: String, $kebangsaan: String, $alamat: String,
  $kodepos: String, $telepon: String, $jurusan: String, $fakultas: String, $universitas: String!, $nama_lembaga: String, $alamat_lembaga: String,
  $kodepos_lembaga: String, $telepon_lembaga: String, $email_lembaga: String, $image: String, $ttd: String) {
  updateAsesiManual(
    nik: $nik
    nama: $nama
    npm: $npm
    kota_id: $kota_id
    jenis_kelamin: $jenis_kelamin
    tempat_lahir: $tempat_lahir
    tanggal_lahir: $tanggal_lahir
    kebangsaan: $kebangsaan
    alamat: $alamat
    kodepos: $kodepos
    telepon: $telepon
    jurusan: $jurusan
    fakultas: $fakultas
    universitas: $universitas
    nama_lembaga: $nama_lembaga
    alamat_lembaga: $alamat_lembaga
    kodepos_lembaga: $kodepos_lembaga
    telepon_lembaga: $telepon_lembaga
    email_lembaga: $email_lembaga
    pendidikan_id: $pendidikan_id
    pekerjaan_id: $pekerjaan_id
    image: $image
    ttd: $ttd
  ){
    id
    nama
  }
}
`

// export const UPDATE_ASESI_MUTATION = gql `
// mutation updateAsesi($lembaga: ID!, $pendidikan: ID!, $pekerjaan: ID!, $kota: Int!, $nik: String!, 
//   $nama: String, $jenis_kelamin: String, $tempat_lahir: String, $tanggal_lahir: String, $kebangsaan: String, $alamat: String, 
//   $kodepos: String, $telepon: String, $imageUrl: String, $ttdUrl: String) {
//   updateAsesi(
//     lembaga_id : $lembaga
//     pendidikan_id : $pendidikan
//     pekerjaan_id : $pekerjaan
//     kota_id : $kota
//     nik : $nik
//     nama : $nama
//     jenis_kelamin : $jenis_kelamin
//     tempat_lahir : $tempat_lahir
//     tanggal_lahir : $tanggal_lahir
//     kebangsaan : $kebangsaan
//     alamat : $alamat
//     kodepos : $kodepos
//     telepon : $telepon
//     image : $imageUrl
//     ttd : $ttdUrl
//   ){
//     nama
//   }
// }
// `;

export const REGISTER_JADWALS = gql `
mutation registerJadwal($id: ID!, $tujuan: String){
  registerJadwal(
    jadwal_id : $id
    tujuan : $tujuan 
  ){
    id
    status
    tindak_lanjut
  }
}
`

export const UPLOAD_SYARAT = gql `
mutation uploadSyaratPeserta($id: ID!, $file: String){
  uploadSyaratPeserta(
    id : $id
    file : $file
  )
}
`

export const VALIDASI_UNIT_PESERTA = gql `
mutation validasiUnitPeserta($peserta_id: ID!){
  validasiUnitPeserta(
    peserta_id: $peserta_id
  )
}
`

// export const UPLOAD_SYARAT = gql `
// mutation createSyarat($peserta_id: ID!, $file: String, $syarat: String){
//   createSyarat(
//     peserta_id : $peserta_id
//     file : $file
//     syarat : $syarat
//   ) {
//     id
//   }
// }
// `;

export const UPLOAD_PORTOFOLIO = gql `
mutation createPortofolio($nama: String, $peserta_id: ID!, $file: String, $uji_kompetensi_id: ID){
  createPortofolio(
    nama : $nama
    peserta_id : $peserta_id
    file : $file
    uji_kompetensi_id : $uji_kompetensi_id
  ) {
    id
  }
}
`

export const ASESMEN_MANDIRI_MUTATION = gql `
mutation asesmenMandiri(
  $asesmen: [asesmen_mandiri]!
  $uji_kompetensi_id: ID!
){
  asesmenMandiri(
    asesmen : $asesmen
    uji_kompetensi_id : $uji_kompetensi_id
  )
}
`

export const VERIFIKASI_ASESMEN_MANDIRI_MUTATION = gql `
mutation verifikasiAsesmenMandiri(
  $asesmen: [asesmen_mandiri]!
  $uji_kompetensi_id: ID!
  $rekomendasi_am: String
){
  verifikasiAsesmenMandiri(
    asesmen : $asesmen
    uji_kompetensi_id : $uji_kompetensi_id
    rekomendasi_am: $rekomendasi_am
  )
}
`

// export const OBSERVASI_MUTATION = gql `
// mutation{
//   register(
//     observasi : "$observasi"
//     uji_kompetensi_id : "$uji_kompetensi_id"
//     umpan_balik : "$umpan_balik"
//   )
// }
// `;

// export const EVALUASI_PORTOFOLIO_MUTATION = gql `
// mutation{
//   register(
//     portofolio : "$portofolio"
//   )
// }
// `;

export const REKAM_ASESMEN_KOMPETENSI_MUTATION = gql `
mutation rekamamAsesmenKompetensi(
  $peserta_id: ID!
  $uji_kompetensi: [rekaman_ujikompetensi]!
  $keputusan: Boolean
  $tindak_lanjut: String
  $komentar_observasi: String
){
  rekamamAsesmenKompetensi(
    peserta_id: $peserta_id
    keputusan: $keputusan
    tindak_lanjut: $tindak_lanjut
    komentar_observasi: $komentar_observasi
    uji_kompetensi: $uji_kompetensi
  )
}
`


// Form data apl 1

export const GET_LEMBAGAS = gql `
{
  lembagas{
    id
    nama
    alamat
    kodepos
    telepon
    email
    asesi {
      id
      nama
    }
  }
}
`

export const GET_PEKERJAANS = gql `
{
  pekerjaans{
    id
    pekerjaan
  }
}
`

export const GET_PENDIDIKANS = gql `
{
  pendidikans{
    id
    pendidikan
  }
}
`

export const GET_PROVINSIS = gql `
{
  provinsis{
    id
    provinsi
  }
}
`

export const GET_KOTAS = gql `
query($id: ID!) {
  provinsi(id: $id) {
    kota{
      id
      kota
    }
  }
}
`

export const GET_FAKULTASS = gql `
{
  fakultass{
    id
    fakultas
  }
}
`

export const GET_ALL_JURUSANS = gql `
{
  jurusans{
    id
    jurusan
  }
}
`

export const GET_JURUSANS = gql `
query($id: ID!) {
  fakultas(id: $id) {
    id
    jurusan{
      id
      jurusan
    }
  }
}
`

export const GET_ACCOUNT = gql `
{
  user{
    id
    email
    role {
      role
    }
  }
}
`

// Get Self Asesi
// export const GET_SELF_ASESI = gql`
// {

// }
// `;

// Get Self Asesi
export const GET_SELF_ASESOR = gql`
{
  checkselfAsesor {
    id
    nama
    no_registrasi
    no_sertifikat
    no_blanko
    alamat
    image
    ttd
    exp_sertifikat
    skema {
      id
      skema
      jadwal{
        id
        tanggal
        kuota
        status
        tempatUk {
          id
          nama
        }
        skema {
          id
          kode
          skema
        }
        anggaran {
          id
          anggaran
        }
      }
    }
    peserta {
      id
      status
      note_apl1
      tujuan
      komentar_observasi
      tindak_lanjut
      asesmen_date
      persetujuan
      asesi {
        id
        nama
      }
      jadwal {
        id
        tanggal
        skema {
          id
          skema
        }
      }
      asesor {
        id
        nama
      }
      syaratPeserta {
        id
        file
        syarat {
          id
          syarat
        }
        status
      }
    }
    user {
      id
      email
      role {
        id
        role
      }
    }
  }
}
`

export const GET_SELF_ASESI = gql `
{
  checkselfAsesi{
    id
    nik
    nama
    jenis_kelamin
    tempat_lahir
    tanggal_lahir
    kebangsaan
    alamat
    kodepos
    telepon
    image
    ttd
    npm
    jurusan
    fakultas
    universitas
    user {
      id
      email
      role {
        id
        role
      }
    }
    lembaga {
      id
      nama
      alamat
      kodepos
      telepon
      email
    }
    pendidikan {
      id
      pendidikan
    }
    kota {
      id
      kota
      provinsi {
        id
        provinsi
      }
    }
    pekerjaan {
      id
      pekerjaan
    }
    pesertaUjian {
      id
      nilai
      status
      jadwalUjian {
        id
        name
        price
        kuota
        status
        tanggal
        tempat_ujian
        paketUjian {
          id
          paket
          deskripsi
        }
      }
    }
    peserta{
      id
      status
      tindak_lanjut
      asesor{
        id
        nama
      }
      jadwal{
        id
        tanggal
        tempatUk {
          id
          nama
        }
        skema{
          id
          skema
          kode
        }
      }
    }
  }
}
`

// Get User Data
export const GET_USERDATA = gql`
query($user_id: ID!) {
  user(
    id: $user_id
  ){
    id
    email
    role {
      id
      role
    }
    asesi {
      id
      nik
      nama
      jenis_kelamin
      tempat_lahir
      tanggal_lahir
      kebangsaan
      alamat
      kodepos
      telepon
      image
      ttd
      lembaga {
        id
        nama
      }
      pendidikan {
        id
        pendidikan
      }
      kota {
        id
        kota
        provinsi {
          id
          provinsi
        }
      }
      pekerjaan {
        id
        pekerjaan
      }
    }
  }
}
`

export const GET_SYARATS = gql `
query($skema_id: ID!) {
  jadwal(
    id : $skema_id
    ){
    id
    skema {
      kode
      skema
      syarat {
        id
        syarat
      }
    }
  }
}
`

export const GET_SKEMAS = gql `
{
  skemas{
    id
    kode
    skema
    kategori
    bidang
    mea
    panduan
    tempatUk {
      id
      nama
    }
  }
}
`

export const GET_UMPAN_BALIKS = gql `
{
  umpanBaliks{
    id
    komponen
    status
  }
}
`

export const GET_TUKS = gql `
{
  tempatuks{
    id
    kode
    nama
    jenis
    alamat
  }
}
`

export const GET_ANGGARANS = gql `
{
  anggarans{
    id
    anggaran
  }
}
`

export const GET_USERS = gql `
{
  users{
    id
    email
    created_at
    updated_at
    role {
      id
      role
    }
  }
}
`

export const GET_ASESIS = gql `
{
  asesis{
    id
    nik
    nama
    jenis_kelamin
    tempat_lahir
    tanggal_lahir
    kebangsaan
    alamat
    kodepos
    telepon
    image
    ttd
    pendidikan {
      pendidikan
    }
    kota {
      kota
    }
    pekerjaan {
      pekerjaan
    }
  }
}
`

export const GET_ASESORS = gql `
{
  asesors{
    id
    nama
    no_registrasi
    no_sertifikat
    no_blanko
    alamat
    exp_sertifikat
  }
}
`

export const CHECK_USER_DATA = gql `
query ($id: ID!){
  user(
    id: $id
  ){
    id
    asesi{
      id
      nama
    }
    asesor{
      id
      skema {
        id
        kode
        skema
      }
    }
  }
}
`

export const GET_ASESORS_BYSKEMA = gql `
query($id: ID!){
  skema (
      id: $id
    ){
      id
      jadwal{
        id
        tanggal
        kuota
        status
        tempatUk {
          id
          nama
        }
        skema {
          id
          kode
          skema
        }
        anggaran {
          id
          anggaran
        }
      }
      asesor {
        id
        nama
        no_registrasi
        no_sertifikat
        no_blanko
        alamat
        exp_sertifikat
        user{
          id
          email
        }
      }
  }
}
`

export const GET_SKEMAS_BYJADWAL = gql `
query($id: ID!){
  jadwal(
    id: $id
  ){
    skema {
      id
      skema
      asesor {
        id
        nama
      }
    }
  }
}
`

export const GET_ROLES = gql `
{
  roles{
    id
    role
  }
}
`

export const GET_JADWALS = gql `
{
  jadwals{
    id
    tanggal
    kuota
    status
    keterangan
    tempatUk {
      id
      nama
    }
    skema {
      id
      kode
      skema
    }
    peserta{
      id
      status
    }
    anggaran {
      id
      anggaran
    }
  }
}
`

export const GET_ACTIVE_JADWALS = gql `
query($jurusan_id: ID!){
  activejadwal(
    jurusan_id: $jurusan_id
  ){
    id
    tanggal
    kuota
    status
    tempatUk {
      id
      nama
    }
    skema {
      id
      kode
      skema
      panduan
      unitKompetensi {
        id
        kode
        unit
        tahun
        standar {
          id
          standar
        }
      }
    } 
    anggaran {
      id
      anggaran
    }
  }
}
`

export const GET_STANDARS = gql `
{
  standars {
    id
    standar
  }
}
`

export const GET_ELEMENTS = gql `
{
  elements {
    id
    elemen
    flag
    unitKompetensi{
      id
      unit
    }
    kriteriaUk{
      id
      kriteria
    }
  }
}
`

export const GET_ELEMENT_BY_ID = gql `
query($id: ID!){
  element(
    id: $id
  ){
    id
    elemen
    flag
    unitKompetensi{
      id
      unit
    }
    kriteriaUk {
      id
      kriteria
      flag
      element {
        id
        elemen
      }
    }
  }
}
`


export const GET_KRITERIAUKS = gql `
{
  kriteriauks {
    id
    kriteria
    flag
    element {
      id
      elemen
    }
  }
}
`


// export const GET_REPORTS = gql `
// {
//   checkselfAsesi{
//     peserta{
//       id
//       status
//       tindak_lanjut
//       asesor{
//         id
//         nama
//       }
//       jadwal {
//         id
//         tanggal
//         tempatUk {
//           id
//           nama
//         }
//         skema{
//           id
//           skema
//           kode
//         }
//       }
//     }
//   }
// }
// `;

export const GET_PESERTAS = gql `
{
  pesertas {
    id
    status
    note_apl1
    tujuan
    komentar_observasi
    tindak_lanjut
    asesmen_date
    asesi {
      id
      nama
    }
    jadwal {
      id
      tanggal
      skema {
        id
        skema
      }
    }
    asesor {
      id
      nama
    }
    syaratPeserta {
      id
      file
      syarat{
        id
        syarat
      }
    }
  }
}
`

export const GET_PESERTAS_ASESOR = gql `
query($id: ID!){
    jadwal(
      id: $id
    ){
      peserta {
        id
        status
        note_apl1
        tujuan
        komentar_observasi
        tindak_lanjut
        asesmen_date
        asesi {
          id
          nik
          nama
          jenis_kelamin
          tempat_lahir
          tanggal_lahir
          kebangsaan
          alamat
          kodepos
          telepon
          image
          ttd
          jurusan
          user {
            id
            email
            role {
              id
              role
            }
          }
          lembaga {
            id
            nama
            alamat
            kodepos
            telepon
            email
          }
          pendidikan {
            id
            pendidikan
          }
          kota {
            id
            kota
            provinsi {
              id
              provinsi
            }
          }
          pekerjaan {
            id
            pekerjaan
          }
        }
        jadwal {
          id
          tanggal
          skema {
            id
            skema
          }
        }
        asesor {
          id
          nama
        }
        syaratPeserta {
          id
          file
          syarat {
            id
            syarat
          }
          status
        }
      }
    }
  }
`

export const GET_JADWALS_ASESOR = gql `
{
  checkselfAsesor {
    id
    skema{
      jadwal{
        id
        tanggal
        kuota
        status
        tempatUk {
          id
          nama
        }
        skema {
          id
          kode
          skema
        }
        anggaran {
          id
          anggaran
        }
      }
    }
  }
}
`

export const GET_JADWALS_BYSKEMA = gql `
query($id: ID!){
  skema(
    id: $id
  ){
    id
    kode
    skema
    jadwal {
      id
      tanggal
      kuota
      status
      keterangan
      tempatUk {
        id
        nama
      }
      skema {
        id
        kode
        skema
      }
      anggaran {
        id
        anggaran
      }
    }
  }
}
`

export const GET_SKEMA_BYID = gql `
query($id: ID!){
  skema(
    id: $id
  ){
    id
    kode
    skema
    syarat {
      id
      syarat
      status
    }
    unitKompetensi {
      id
      kode
      unit
      bankSoalObservasi {
        id
        soal
        opsi_k
        opsi_bk
        unitKompetensi {
          id
          unit
          kode
        }
      }
      SoalObservasi {
        id
        soal
        opsi_k
        opsi_bk
        unitKompetensi {
          id
          unit
          kode
        }
      }
    }
    jadwal {
      id
      tanggal
      kuota
      status
      tempatUk {
        id
        nama
      }
      skema {
        id
        kode
        skema
      }
      anggaran {
        id
        anggaran
      }
    }
    dokumenSkema {
      id
      name
      keterangan
      file
      flag
    }
  }
}
`

export const GET_PESERTAS_DETAIL = gql `
query($id: ID!){
    peserta(
      id: $id
    ){
      id
      status
      note_apl1
      tujuan
      komentar_observasi
      tindak_lanjut
      asesmen_date
      persetujuan
      persetujuan_asesi_date
      persetujuan_asesor_date
      jenis_tes
      asesi {
        id
        nik
        nama
        jenis_kelamin
        tempat_lahir
        tanggal_lahir
        kebangsaan
        alamat
        kodepos
        telepon
        image
        ttd
        jurusan
        user {
          id
          email
          role {
            id 
            role
          }
        }
        lembaga {
          id
          nama
          alamat
          kodepos
          telepon
          email
        }
        pendidikan {
          id
          pendidikan
        }
        kota {
          id
          kota
          provinsi {
            id
            provinsi
          }
        }
        pekerjaan {
          id
          pekerjaan
        }
      }
      jadwal {
        id
        tanggal
        tempatUk {
          id
          nama
        }
        skema {
          id
          skema
          kode
        }
      }
      asesor {
        id
        nama
        ttd
      }
      syaratPeserta {
        id
        file
        syarat{
          id
          syarat
        }
        status
      }
      portofolio {
        id
        nama
        file
        valid
        memadai
        asli
        terkini
      }
      ujiKompetensi {
        id
        status
        verifikasi_am
        observasi_date
        rekomendasi_am
        am_date
        umpan_balik_observasi
        umpan_balik_uji
        ujiObservasi {
          id
          hasil
          tanggapan
          score
          soalObservasi {
            id
            soal
          }
        }
        unitKompetensi {
          id
          kode
          unit
          tahun
          flag
          bankSoalObservasi {
            id
            soal
            opsi_k
            opsi_bk
          }
          SoalObservasi {
            id
            soal
            opsi_k
            opsi_bk
          }
          element {
            id
            elemen
            flag
            kriteriaUk{
              id
              kriteria
              flag
            }
          }
          standar {
            id
            standar
          }
        }
        asesmen {
          id
          asesmen_mandiri
          element {
            id
            elemen
          }
          portofolioAsesmen {
            id
            portofolio {
              id
              nama
              file
            }
          }
        }
        observasi {
          id
          observasi
          penelitian_lanjut
          penilaian_lanjut
          kriteriaUk {
            id
            kriteria
          }
        }
        rekamanAsesmen {
          id
          observasi
          portofolio
          pihak_ketiga
          pertanyaan_lisan
          pertanyaan_tertulis
          proyek_kerja
          lainnya
        }
      }
    }
  }
`

export const GET_UJIKOMPETENSI_DETAIL = gql `
query($id: ID!){
  ujikompetensi(
      id: $id
    ){
      id
      status
      rekomendasi_am
      am_date
      verifikasi_am
      observasi_date
      umpan_balik_observasi
      peserta{
        id
        status
        tujuan
        komentar_observasi
        tindak_lanjut
        asesor {
          id
          nama
          ttd
        }
        asesi {
          id
          nik
          nama
          jenis_kelamin
          tempat_lahir
          tanggal_lahir
          kebangsaan
          alamat
          kodepos
          telepon
          image
          ttd
          jurusan
          user {
            id
            email
            role {
              id
              role
            }
          }
          lembaga {
            id
            nama
            alamat
            kodepos
            telepon
            email
          }
          pendidikan {
            id
            pendidikan
          }
          kota {
            id
            kota
            provinsi {
              id
              provinsi
            }
          }
          pekerjaan {
            id
            pekerjaan
          }
        }
        jadwal {
          id
          tempatUk {
            id
            nama
          }
        }
      }
      unitKompetensi {
        id
        kode
        unit
        tahun
        flag
        skema {
          id
          skema
          kode
        }
        element {
          id
          elemen
          flag
          kriteriaUk{
            id
            kriteria
            flag
          }
        }
        standar {
          id
          standar
        }
      }
      asesmen {
        id
        asesmen_mandiri
        element {
          id
          elemen
          kriteriaUk {
            id
            kriteria
          }
        }
      }
      observasi {
        id
        observasi
        penilaian_lanjut
        kriteriaUk {
          id
          kriteria
        }
      }
    }
  }
`

export const GET_REPORT_DETAIL = gql `
query($id: ID!) {
  peserta(
    id : $id
    ){
      id
      status
      note_apl1
      tujuan
      komentar_observasi
      tindak_lanjut
      asesmen_date
      persetujuan
      jenis_tes
      umpan_balik_date
      asesi {
        id
        nik
        nama
        jenis_kelamin
        tempat_lahir
        tanggal_lahir
        kebangsaan
        alamat
        kodepos
        telepon
        image
        ttd
        jurusan
        user {
          id
          email
          role {
            id
            role
          }
        }
        lembaga {
          id
          nama
          alamat
          kodepos
          telepon
          email
        }
        pendidikan {
          id
          pendidikan
        }
        kota {
          id
          kota
          provinsi {
            id
            provinsi
          }
        }
        pekerjaan {
          id
          pekerjaan
        }
      }
      jadwal {
        id
        tanggal
        tempatUk {
          id
          nama
        }
        skema {
          id
          skema
          kode
          unitKompetensi {
            id
            kode
            unit
            standar{
              id
              standar
            }
          }
        }
      }
      asesor {
        id
        nama
      }
      syaratPeserta {
        id
        file
        syarat {
          id
          syarat
        }
        status
      }
      portofolio {
        id
        nama
        file
        valid
        memadai
        asli
        terkini
        ujiKompetensi {
          id
          unitKompetensi {
            id
            kode
            unit
          }
        }
      }
      ujiKompetensi {
        id
        status
        unitKompetensi {
          id
          kode
          unit
          tahun
          flag
          element {
            id
            elemen
            flag
            kriteriaUk{
              id
              kriteria
              flag
            }
          }
          standar {
            id
            standar
          }
        }
        asesmen {
          id
          asesmen_mandiri
          element {
            id
            elemen
            flag            
          }
        }
      }
    }
}
`

// export const GET_REPORT_DETAIL = gql `
// query($id: ID!) {
//   peserta(
//     id : $id
//     ){
//       id
//       status
//       tujuan
//       komentar_observasi
//       tindak_lanjut
//       asesor {
//         id
//         nama
//         image
//       }
//       asesi {
//         id
//         nama
//         image
//       }
//       syarat {
//         id
//         syarat
//         file
//       }
//       portofolio {
//         id
//         file
//         valid
//         memadai
//         asli
//         terkini
//         ujiKompetensi {
//           id
//           unitKompetensi {
//             id
//             kode
//             unit
//             tahun
//             flag
//             element {
//               id
//               elemen
//               flag
//               kriteriaUk{
//                 id
//                 kriteria
//                 flag
//               }
//             }
//             standar {
//               id
//               standar
//             }
//           }
//         }
//       }
//       jadwal {
//         id
//         tanggal
//         tempatUk {
//           id
//           nama
//         }
//         skema {
//           id
//           skema
//           kode
//         }
//       }
//     }
// }
// `;


export const GET_UNIT_KOMPETENSIS = gql `
{
  unitkompetensis {
    id
    kode
    unit
    tahun
    flag
    skema {
      id
      skema
    }
    standar {
      id
      standar
    }
  }
}
`

export const GET_UNIT_KOMPETENSI_BY_ID = gql `
query($id: ID!){
  unitkompetensi(
    id: $id
  ){
    id
    kode
    unit
    tahun
    flag
    skema {
      id
      skema
    }
    standar {
      id
      standar
    }
    element {
      id
      elemen
      flag
      unitKompetensi{
        id
        unit
      }
      kriteriaUk{
        id
        kriteria
      }
    }
  }
}
`

export const GET_UNIT_KOMPETENSIS_BYSKEMA = gql `
query($id: ID!){
  skema(
    id: $id
  ){
    id
    kode
    skema
    unitKompetensi {
      id
      kode
      unit
      tahun
      flag
      standar {
        id
        standar
      }
      skema {
        id
        skema
      }
    }
  }
}
`
// export default {SIGNIN_MUTATION, CREATE_ASESI_MUTATION, GET_LEMBAGAS, GET_PEKERJAANS, GET_PENDIDIKANS, GET_PROVINSIS, GET_KOTAS};