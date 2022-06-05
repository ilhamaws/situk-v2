import gql from 'graphql-tag'

export const CREATE_JADWAL_NO_JURUSAN_MUTATION = gql `
mutation createJadwalNoJurusan(
  $skema_id: ID!,
  $tempat_uk_id: ID,
  $anggaran_id: ID,
  $tanggal: String,
  $kuota: Int,
  $keterangan: String
){
  createJadwalNoJurusan(
    keterangan: $keterangan,
    tempat_uk_id: $tempat_uk_id,
    skema_id: $skema_id,
    kuota: $kuota,
    anggaran_id: $anggaran_id,
    tanggal: $tanggal
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
  $keterangan: String
){
  updateJadwal(
    id: $id
    tempat_uk_id: $tempat_uk_id
    anggaran_id: $anggaran_id
    tanggal: $tanggal
    kuota: $kuota
    status: $status
    keterangan: $keterangan
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

export const DELETE_JADWAL_MUTATION = gql `
mutation deleteJadwal($id: ID!){
  deleteJadwal(
    id: $id
  )
}
`

export const GET_ALL_ACTIVE_JADWALS = gql `
{
  allactivejadwal{
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
      syarat {
        id
        syarat
      }
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

export const GET_ACTIVE_JADWAL_UJIAN = gql `
{
  activeJadwalUjian{
    id
    name
    kuota
    price
    tanggal
    tempat_ujian
    keterangan
    status
  }
}
`