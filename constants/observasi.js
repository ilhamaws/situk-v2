import gql from 'graphql-tag'

export const CREATE_BANK_SOAL_OBSERVASI_MUTATION = gql `
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

export const UPDATE_BANK_SOAL_OBSERVASI_MUTATION = gql `
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

export const DELETE_BANK_SOAL_OBSERVASI_MUTATION = gql `
mutation deleteBankSoalObservasi($id: Int!){
  deleteBankSoalObservasi(
    id: $id
  )
}
`

// soal observasi

export const CREATE_SOAL_OBSERVASI_MUTATION = gql `
mutation createSoalObservasi(
    $unit_kompetensi_id: Int,
    $bank_soal_id: Int,
    ) {
    createSoalObservasi(
        unit_kompetensi_id: $unit_kompetensi_id,
        bank_soal_id: $bank_soal_id
    ){
        id
        soal
    }
}
`

export const DELETE_SOAL_OBSERVASI_MUTATION = gql `
mutation deleteSoalObservasi($id: Int!){
  deleteSoalObservasi(
    id: $id
  )
}
`

export const UJIOBSERVASI_MUTATION = gql `
mutation ujiobservasi(
    $uji_kompetensi_id: ID!,
    $umpan_balik_uji: String,
    $uji_observasi: [ujiobservasi]!,
    ) {
        ujiobservasi(
            uji_kompetensi_id: $uji_kompetensi_id,
            umpan_balik_uji: $umpan_balik_uji,
            uji_observasi: $uji_observasi,
    )
}
`