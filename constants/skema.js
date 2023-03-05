import gql from 'graphql-tag'

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