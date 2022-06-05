import gql from 'graphql-tag'

export const GET_BANKSOALS = gql `
{
  bankSoals {
    id
    soal
    kategori
    image
    type
    jawaban
    kunci_jawaban
  }
}
`

export const CREATE_BANK_SOAL_MUTATION = gql `
mutation createBankSoal(
    $soal: String!,
    $kategori: String,
    $image: String,
    $type: Int!,
    $jawaban: String,
    $kunci_jawaban: String
    ) {
        createBankSoal(
            soal: $soal
            kategori: $kategori
            image: $image
            type: $type
            jawaban: $jawaban
            kunci_jawaban: $kunci_jawaban
    ) {
        id
        soal
        jawaban
    }
}
`

export const UPDATE_BANK_SOAL_MUTATION = gql `
mutation updateBankSoal(
    $id: Int,
    $soal: String!,
    $kategori: String,
    $image: String,
    $type: Int!,
    $jawaban: String,
    $kunci_jawaban: String
    ) {
        updateBankSoal(
            id: $id
            soal: $soal
            kategori: $kategori
            image: $image
            type: $type
            jawaban: $jawaban
            kunci_jawaban: $kunci_jawaban
    ) {
        id
        soal
        jawaban
    }
}
`

export const DELETE_BANK_SOAL_MUTATION = gql `
mutation deleteBankSoal($id: Int!){
  deleteBankSoal(
    id: $id
  )
}
`

export const GET_PAKET_UJIANS = gql `
{
  paketUjians {
    id
    paket
    deskripsi
    passing_grade
  }
}
`

export const GET_PAKET_UJIAN = gql `
query paketUjian($id: ID!){
  paketUjian (
    id: $id
  ){
    id
    paket
    deskripsi
    passing_grade
    syaratUjian {
      id
      syarat
      keterangan
      flag
    }
    sectionUjian {
      id
      title
      deskripsi
      max_time
      soal {
        id
        soal
        image
        type
        jawaban
        bank_soal_id
      }
    }
  }
}
`

export const CREATE_PAKET_UJIAN_MUTATION = gql `
mutation createPaketUjian(
    $paket: String!,
    $deskripsi: String!,
    $passing_grade: Int
    ) {
        createPaketUjian(
            paket: $paket
            deskripsi: $deskripsi
            passing_grade: $passing_grade
    ) {
        id
        paket
    }
}
`
export const UPDATE_PAKET_UJIAN_MUTATION = gql `
mutation updatePaketUjian(
    $id: Int!,
    $paket: String!,
    $deskripsi: String!,
    $passing_grade: Int
    ) {
      updatePaketUjian(
            id: $id
            paket: $paket
            deskripsi: $deskripsi
            passing_grade: $passing_grade
    ) {
        id
        paket
    }
}
`

export const DELETE_PAKET_UJIAN_MUTATION = gql `
mutation deletePaketUjian($id: Int!){
  deletePaketUjian(
    id: $id
  )
}
`

export const CREATE_SYARAT_UJIAN_MUTATION = gql `
mutation createSyaratUjian(
    $paket_id: Int,
    $syarat: String,
    $keterangan: String
    ) {
      createSyaratUjian(
            paket_id: $paket_id
            syarat: $syarat
            keterangan: $keterangan
    ) {
        id
    }
}
`

export const UPDATE_SYARAT_UJIAN_MUTATION = gql `
mutation updateSyaratUjian(
    $id: Int,
    $syarat: String,
    $keterangan: String,
    $flag: Int,
    ) {
      updateSyaratUjian(
            id: $id
            syarat: $syarat
            keterangan: $keterangan
            flag: $flag
    ) {
        id
    }
}
`

export const DELETE_SYARAT_UJIAN_MUTATION = gql `
mutation deleteSyaratUjian($id: Int!){
  deleteSyaratUjian(
    id: $id
  )
}
`

export const CREATE_SECTION_UJIAN_MUTATION = gql `
mutation createSectionUjian(
    $paket_id: Int,
    $title: String,
    $deskripsi: String,
    $max_time: Int,
    $soal: [Int]
    ) {
      createSectionUjian(
            paket_id: $paket_id
            title: $title
            deskripsi: $deskripsi
            max_time: $max_time
            soal: $soal
    ) {
        id
        title
        deskripsi
    }
}
`