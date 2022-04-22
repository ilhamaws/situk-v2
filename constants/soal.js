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
mutation upatePaketUjian(
    $id: Int!,
    $paket: String!,
    $deskripsi: String!,
    $passing_grade: Int
    ) {
      upatePaketUjian(
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