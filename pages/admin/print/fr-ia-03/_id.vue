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
    <v-card-title>FR.IA.03. PERTANYAAN UNTUK MENDUKUNG OBSERVASI</v-card-title>
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
    <v-card-subtitle style="padding-top: 0"
      >*Coret yang tidak perlu</v-card-subtitle
    >
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
                  Formulir ini diisi pada saat asesor akan melakukan asesmen
                  dengan metode observasi demonstrasi.
                </li>
                <li>
                  Pertanyaan dibuat dengan tujuan untuk menggali, dapat berisi
                  pertanyaan yang berkaitan dengan dimensi kompetensi, batasan
                  variabel dan aspek kritis.
                </li>
                <li>
                  Tanggapan asesi dapat ditulis oleh asesor dikolom tanggapan,
                  dan apabila tanggapan sesuai maka beri tanda centrang pada
                  kolom (K) dan apabila belum sesuai beri tanda centrang pada
                  kolom (BK).
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
    <v-card-text>
      <table>
        <thead>
          <tr>
            <td rowspan="2" colspan="2" align="center">Pertanyaan</td>
            <td colspan="2" align="center">Rekomendasi</td>
          </tr>
          <tr>
            <td align="center">K</td>
            <td align="center">BK</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="with-bg text-top">1.</th>
            <td>
              Jika anda sedang melakukan investigasi suatu insiden yang terjadi
              di tempat kerja anda kemudian anda menemukan potensi bahaya di
              satu lokasi yang belum teridentifikasi. Apa tindakan anda?
              <b>(CMS)</b>
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
          </tr>
          <tr>
            <td colspan="2" align="start" class="no-border-bottom">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <th class="nowrap text-top" style="padding-right: 10px">
                      Tanggapan :
                    </th>
                    <td>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quisquam deserunt similique, consequuntur est, iste
                      excepturi fugiat accusamus delectus eius dolorum quaerat!
                      Odit enim nesciunt voluptates ratione. Consequatur
                      reprehenderit laborum amet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th class="with-bg text-top">2.</th>
            <td>
              Misalnya, muncul insiden kecelakaan ringan di tempat kerja anda
              dengan frekuensi tinggi namun pemangku kepentingan di tempat kerja
              anda tidak berkenan untuk merevisi sistem manajemen K3. Apa
              tindakan anda?
              <b>(JRES)</b>
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
          </tr>
          <tr>
            <td colspan="2" align="start" class="no-border-bottom">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <th class="nowrap text-top" style="padding-right: 10px">
                      Tanggapan :
                    </th>
                    <td>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Quisquam deserunt similique, consequuntur est, iste
                      excepturi fugiat accusamus delectus eius dolorum quaerat!
                      Odit enim nesciunt voluptates ratione. Consequatur
                      reprehenderit laborum amet.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th align="start" class="nowrap text-top">
              Umpan balik untuk asesi :
            </th>
            <td align="start">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
              dignissimos nostrum provident! Earum totam similique, mollitia
              illo autem quas ex libero sunt aliquid cum, commodi delectus at!
              Unde, in est?
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table>
        <tbody>
          <tr>
            <th rowspan="2" class="nowrap text-top" align="start">Nama</th>
            <th align="start" class="no-border-bottom">Asesi :</th>
            <th align="start" class="no-border-bottom">Asesor :</th>
          </tr>
          <tr>
            <td class="no-border-top" style="padding-top: 0">Muhammad</td>
            <td class="no-border-top" style="padding-top: 0">Rifan</td>
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