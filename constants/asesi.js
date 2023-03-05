import gql from 'graphql-tag'

export const CREATE_ASESI_MANUAL_MUTATION = gql `
mutation createAsesiManual($nama_lembaga: String, $alamat_lembaga: String, $kodepos_lembaga: String, $telepon_lembaga: String, $email_lembaga: String, $npm: String, $jurusan: String, $fakultas: String, $universitas: String!, $pendidikan_id: ID!, $pekerjaan_id: ID!, $kota_id: Int!, $nik: String!, 
  $nama: String, $jenis_kelamin: String, $tempat_lahir: String, $tanggal_lahir: String, $kebangsaan: String, $alamat: String, 
  $kodepos: String, $telepon: String, $image: String, $ttd: String,
  $instagram: String, $facebook: String, $linkedin: String, $twitter: String
  ) {
  createAsesiManual(
    jurusan: $jurusan
    fakultas: $fakultas
    universitas: $universitas
    nama_lembaga: $nama_lembaga
    alamat_lembaga: $alamat_lembaga
    kodepos_lembaga: $kodepos_lembaga
    telepon_lembaga: $telepon_lembaga
    email_lembaga: $email_lembaga
    pendidikan_id : $pendidikan_id
    pekerjaan_id : $pekerjaan_id
    kota_id : $kota_id
    nik : $nik
    nama : $nama
    npm : $npm
    jenis_kelamin : $jenis_kelamin
    tempat_lahir : $tempat_lahir
    tanggal_lahir : $tanggal_lahir
    kebangsaan : $kebangsaan
    alamat : $alamat
    kodepos : $kodepos
    telepon : $telepon
    image : $image
    ttd : $ttd
    facebook : $facebook
    instagram : $instagram
    twitter : $twitter
    linkedin : $linkedin
  ){
    id
    nama
  }
}
`