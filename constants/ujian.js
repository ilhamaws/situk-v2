import gql from 'graphql-tag'

export const GET_JADWAL_UJIANS = gql `
{
  jadwalUjians{
    id
    name
    kuota
    tanggal
    tempat_ujian
    keterangan
    price
    status
    pesertaUjian {
        id
    }
    paketUjian {
        id
        paket
        deskripsi
    }
  }
}
`

export const GET_JADWAL_UJIAN = gql `
query jadwalUjian($id: ID!){
    jadwalUjian(
      id: $id
    ){
      id
      name
      kuota
      price
      tanggal
      tempat_ujian
      status
      pesertaUjian {
        id
        nilai
        status
        asesi {
          id
          nik
          nama
          jenis_kelamin
        }
      }
    }
  }
`

export const CREATE_JADWAL_UJIAN_MUTATION = gql `
mutation createJadwalUjian(
  $paket_id: ID,
  $name: String,
  $kuota: Int,
  $tanggal: String,
  $keterangan: String,
  $tempat_ujian: String,
  $price: Int
){
  createJadwalUjian(
    paket_id: $paket_id
    name: $name
    kuota: $kuota
    tanggal: $tanggal
    keterangan: $keterangan
    tempat_ujian: $tempat_ujian
    price: $price
  ) {
    id
  }
}
`
export const UPDATE_JADWAL_UJIAN_MUTATION = gql `
mutation updateJadwalUjian(
  $id: ID,
  $name: String,
  $kuota: Int,
  $tanggal: String,
  $keterangan: String,
  $tempat_ujian: String,
  $price: Int
){
  updateJadwalUjian(
    id: $id
    name: $name
    kuota: $kuota
    tanggal: $tanggal
    keterangan: $keterangan
    tempat_ujian: $tempat_ujian
    price: $price
  ) {
    id
  }
}
`

export const DELETE_JADWAL_UJIAN_MUTATION = gql `
mutation deleteJadwalUjian(
  $id: ID,
){
  deleteJadwalUjian(
    id: $id
  )
}
`

export const REGISTER_JADWAL_UJIAN_MUTATION = gql `
mutation registerJadwalUjian($jadwal_id: ID!){
  registerJadwalUjian(
    jadwal_id : $jadwal_id
  ){
    id
  }
}
`

export const GET_UJIAN_DETAIL = gql `
query pesertaUjian($id: ID!) {
  pesertaUjian(
    id : $id
    ){
      id
      nilai
      status
      jadwalUjian {
        id
        name
        kuota
        price
        tanggal
        tempat_ujian
        keterangan
        status
      }
      syaratPesertaUjian {
        id
        path
        keterangan
        status
        syaratUjian {
          id
          syarat
          keterangan
        }
      }
      ujian {
        id
        nilai
        lulus
        start_at
        finish_at
      }
      portofolioUjian {
        id
        nama
        file
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
    }
}
`

export const CREATE_SYARAT_PESERTA_UJIAN_MUTATION = gql `
mutation createSyaratPesertaUjian(
  $id: ID!,
  $file: String!
){
  createSyaratPesertaUjian(
    id: $id
    file: $file
  ) {
    id
  }
}
`

