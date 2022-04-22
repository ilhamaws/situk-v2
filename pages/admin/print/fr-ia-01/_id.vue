<style lang="scss" scoped>
* {
  font-family: Calibri, sans-serif !important;
}

@media print
{
  table { page-break-after:auto }
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto }
  thead { display:table-header-group }
  tfoot { display:table-footer-group }
}

ol {
  margin: 0;
  padding-left: 20px;
}

table {
  width: 100%;
}

th,
td {
  padding: 10px;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.table-nested,
.table-nested th,
.table-nested td {
  border: 0 solid white;
  border-collapse: collapse;
}

.table-nested th,
.table-nested td {
  padding: 0;
}

.nowrap {
  white-space: nowrap;
  width: 1px;
}

.text-top {
  vertical-align: top;
}

.with-bg {
  background-color: #fabf8f;
}

.no-border-top {
  border-top: 0;
}

.no-border-left {
  border-left: 0;
}

.no-border-right {
  border-right: 0;
}

.no-border-bottom {
  border-bottom: 0;
}

.text-line {
  text-decoration: line-through;
}
</style>

<template>
  <div class="page-content-wrapper-inner fill-height">
    <v-card-title>
      FR.IA.01. CEKLIS OBSERVASI AKTIVITAS DI TEMPAT KERJA ATAU TEMPAT KERJA
      SIMULASI
    </v-card-title>
    <v-card-text style="padding-bottom: 0">
      <table>
        <tbody>
          <tr>
            <td rowspan="2" class="nowrap">
              Skema Sertifikasi
              <br />
              (KKNI/Okupasi/Klaster)
            </td>
            <td class="nowrap">Judul</td>
            <td class="nowrap">:</td>
            <td>Ahli K3 Madya</td>
          </tr>
          <tr>
            <td class="nowrap">Nomor</td>
            <td class="nowrap">:</td>
            <td>SS.LSPUPNVJT.FT.02.1</td>
          </tr>
          <tr>
            <td colspan="2">TUK</td>
            <td>:</td>
            <td>
              <span class="text-line">Sewaktu</span> /
              <span>Tempat Kerja</span> / <span>Mandiri</span>*
            </td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesor</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Nama Asesi</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">Tanggal</td>
            <td>:</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle style="padding-top: 0">
      *Coret yang tidak perlu
    </v-card-subtitle>
    <v-card-text>
      <table>
        <thead>
          <tr>
            <th align="start" class="with-bg">PANDUAN BAGI ASESOR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul style="margin: 0; padding-left: 20px">
                <li>
                  Lengkapi nama unit kompetensi, elemen, dan kriteria unjuk
                  kerja sesuai kolom dalam tabel.
                </li>
                <li>
                  Istilah Acuan Pembanding dengan SOP / spesifikasi produk dari
                  industri / organisasi dari tempat kerja atau simulasi tempat
                  kerja.
                </li>
                <li>
                  Beri tanda centang (&#10004;) pada kolom K jika Anda yakin
                  asesi dapat melakukan / mendemonstrasikan tugas sesuai KUK,
                  atau centang (&#10004;) pada kolom BK bila sebaliknya.
                </li>
                <li>
                  Penilaian Lanjut diisi bila hasil belum dapat disimpulkan,
                  untuk itu gunakan metode lain sehingga keputusan dapat dibuat.
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <td rowspan="2" class="nowrap">Unit Kompetensi</td>
            <td class="nowrap">Kode Unit</td>
            <td class="nowrap">:</td>
            <td>KKK.00.02.004.01</td>
          </tr>
          <tr>
            <td class="nowrap">Judul Unit</td>
            <td class="nowrap">:</td>
            <td>
              Dukungan Terhadap Pelaksanaan Strategi Pengendalian Risiko K3
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text style="padding-bottom: 0">
      <table>
        <tbody>
          <tr class="with-bg">
            <th rowspan="2">No.</th>
            <th rowspan="2">Elemen</th>
            <th rowspan="2">Kriteria Unjuk Kerja*</th>
            <th rowspan="2">Benchmark (SOP / spesifikasi produk industri)</th>
            <th colspan="2">Rekomendasi</th>
            <th>Penilaian Lanjut</th>
          </tr>
          <tr class="with-bg">
            <th>K</th>
            <th>BK</th>
            <th></th>
          </tr>
          <tr>
            <td class="text-top" rowspan="2">1</td>
            <td class="text-top" rowspan="2">
              Mengembangkan pilihan pengendalian risiko
            </td>
            <td>
              1.1. Meninjau ulang daftar bahaya, hasil-hasil investigasi suatu
              insiden dan penilaian risiko untuk mengidentifikasi bahaya yang
              memerlukan tin-dakan pengendalian.
            </td>
            <td class="text-top" rowspan="2">
              Pedoman Umum Sistem Manajemen K3 UPNVJT
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td class="text-top"></td>
          </tr>
          <tr>
            <td>
              1.2. Menerapkan pengetahuan tentang perundang- undangan dan
              standar terhadap pengembangan sebuah kisaran opsi untuk
              mengendalikan risiko-risiko khusus di tempat kerja.
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td class="text-top"></td>
          </tr>
          <tr>
            <td class="text-top" rowspan="2">2</td>
            <td class="text-top" rowspan="2">
              Memilih teknik pengendalian risiko yang sesuai
            </td>
            <td>
              2.1. Meninjau hasil - hasil penilaian risiko untuk
              menginformasikan proses dari pemilihan opsi untuk mengendalikan
              risiko.
            </td>
            <td class="text-top" rowspan="2">
              Pedoman Umum Sistem Manajemen K3 UPNVJT
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td class="text-top"></td>
          </tr>
          <tr>
            <td>
              2.2 Memprioritaskan intervensi yang tepat pada saat pemilihan
              pengendalian risiko.
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-checkbox readonly></v-checkbox>
              </div>
            </td>
            <td class="text-top"></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle style="padding-top: 0">
      *Cara penulisan KUK menggunakan kalimat aktif (Contoh: <b>D</b>ilakukan
      menjadi <b>M</b>elakukan)
    </v-card-subtitle>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th class="nowrap with-bg">Umpan Balik untuk Asesi :</th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th rowspan="2" class="nowrap text-top" align="start">Nama</th>
            <th align="start" style="border-bottom: 0">Asesi :</th>
            <th align="start" style="border-bottom: 0">Asesor :</th>
          </tr>
          <tr>
            <td style="border-top: 0; padding-top: 0">Muhammad</td>
            <td style="border-top: 0; padding-top: 0">Rifan</td>
          </tr>
          <tr>
            <th class="nowrap text-top" align="start">
              Tanda Tangan dan Tanggal
            </th>
            <td>TTD Asesi</td>
            <td>TTD Asesor</td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </div>
</template>