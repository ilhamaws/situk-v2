import gql from 'graphql-tag'

export const CREATE_BANK_SOAl_OBSERVASI_MUTATION = gql `
mutation createBankSoalObservasi(
    $unit_kompetensi_id: Int,
    $soal: String!,
    $opsi_k: String,
    $opsi_bk: String) {
    createBankSoalObservasi(
        unit_kompetensi_id: $unit_kompetensi_id,
        soal: $soal,
        opsi_k: $opsi_k,
        opsi_bk: $opsi_bk
    ){
        id
        soal
        opsi_k
        opsi_bk
    }
}
`

export const UPDATE_BANK_SOAl_OBSERVASI_MUTATION = gql `
mutation updateBankSoalObservasi(
    $id: Int,
    $soal: String!,
    $opsi_k: String,
    $opsi_bk: String) {
    updateBankSoalObservasi(
        id: $id,
        soal: $soal,
        opsi_k: $opsi_k,
        opsi_bk: $opsi_bk
    ){
        id
        soal
        opsi_k
        opsi_bk
    }
}
`

export const DELETE_BANK_SOAl_OBSERVASI_MUTATION = gql `
mutation deleteBankSoalObservasi($id: Int!){
  deleteBankSoalObservasi(
    id: $id
  )
}
`