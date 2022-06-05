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
  border: 0;
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

.text-line {
  text-decoration: line-through;
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

.no-border-horizontal {
  border-left: 0;
  border-right: 0;
}

.no-border-vertical {
  border-top: 0;
  border-bottom: 0;
}

.text-vertical {
  writing-mode: vertical-lr;
  -ms-writing-mode: tb-rl;
  transform: rotate(180deg);
  text-align: center;
  word-break: break-all;
}

.text-small {
  font-size: 12px;
}
</style>

<template>
  <div class="page-content-wrapper-inner fill-height">
    <v-card-title>
      FR.MAPA.01 - MERENCANAKAN AKTIVITAS DAN PROSES ASESMEN
    </v-card-title>
    <v-card-text>
      <table class="no-border-top">
        <tbody>
          <tr style="border: 0">
            <td colspan="6" style="padding: 0; border: 0">
              <table style="border: 0">
                <tbody>
                  <tr style="border: 0">
                    <td rowspan="2" class="no-border-left nowrap">
                      Skema Sertifikasi
                      <br />
                      (KKNI/Okupasi/Klaster)
                    </td>
                    <td class="nowrap">Judul</td>
                    <td class="nowrap">:</td>
                    <th align="start" class="no-border-right">Ahli K3 Madya</th>
                  </tr>
                  <tr style="border: 0">
                    <td class="nowrap">Nomor</td>
                    <td class="nowrap">:</td>
                    <th align="start" class="no-border-right">
                      SS.LSPUPNVJT.FT.02.1
                    </th>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="no-border-top with-bg">
            <th class="no-border-top no-border-right" align="start">1.</th>
            <th class="no-border-top no-border-left" align="start" colspan="5">
              Menentukan Pendekatan Asesmen
            </th>
          </tr>
          <tr>
            <td rowspan="20" class="text-top">1.1</td>
            <td rowspan="3" class="text-top">Kandidat</td>
            <td colspan="3">
              <v-checkbox
                label="Hasil pelatihan dan / atau pendidikan :"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Pekerja berpengalaman" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox
                label="Pelatihan / belajar mandiri"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td rowspan="5" class="text-top">Tujuan Asesmen</td>
            <td colspan="3">
              <v-checkbox label="Sertifikasi" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Sertifikasi Ulang" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox
                label="Pengakuan Kompetensi Terkini (PKT)"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox
                label="Rekognisi Pembelajaran Lampau"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Lainnya" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td rowspan="8" class="text-top">Konteks Asesmen :</td>
            <td class="text-top">Lingkungan</td>
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox
                        label="Tempat Kerja Nyata"
                        readonly
                      ></v-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox
                        label="Tempat Kerja Simulasi"
                        readonly
                      ></v-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td class="text-top">
              Peluang untuk mengumpulkan bukti dalam sejumlah situasi
            </td>
            <td>
              <v-checkbox label="Tersedia" readonly></v-checkbox>
            </td>
            <td>
              <v-checkbox label="Terbatas" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td rowspan="3" class="text-top">
              Hubungan antara standar kompetensi dan :
            </td>
            <td colspan="2">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top">
                        Bukti untuk mendukung asesmen / RPL :
                      </span>
                      <v-icon color="yellow darken-1">
                        mdi-emoticon-happy-outline
                      </v-icon>
                      <v-icon> mdi-emoticon-neutral-outline </v-icon>
                      <v-icon> mdi-emoticon-sad-outline </v-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="nowrap text-top" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top">
                        Aktivitas kerja di tempat kerja Asesi :
                      </span>
                      <v-icon> mdi-emoticon-happy-outline </v-icon>
                      <v-icon> mdi-emoticon-neutral-outline </v-icon>
                      <v-icon> mdi-emoticon-sad-outline </v-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="nowrap text-top" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top"> Kegiatan Pembelajaran : </span>
                      <v-icon> mdi-emoticon-happy-outline </v-icon>
                      <v-icon> mdi-emoticon-neutral-outline </v-icon>
                      <v-icon> mdi-emoticon-sad-outline </v-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td rowspan="3" class="text-top">
              Siapa yang melakukan asesmen / RPL
            </td>
            <td colspan="2">
              <v-checkbox label="Lembaga Sertifikasi" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <v-checkbox label="Organisasi Pelatihan" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <v-checkbox label="Asesor Perusahaan" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td rowspan="4" class="text-top">
              Konfirmasi dengan orang yang relevan
            </td>
            <td colspan="3">
              <v-checkbox label="Manajer sertifikasi LSP" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span>
                        Master Asesor / Master Trainer / Asesor Utama Kompetensi
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span>
                        Manajer Pelatihan Lembaga Training terakreditasi /
                        Lembaga Training terdaftar
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Lainnya :" readonly></v-checkbox>
            </td>
          </tr>
          <!-- ------------------------------------------------------------------- -->
          <tr>
            <td class="text-top" rowspan="5">1.2</td>
            <td class="text-top" rowspan="5">Tolak Ukur Asesmen</td>
            <td colspan="3">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span>
                        Standar Kompetensi: Keputusan Menteri Tenaga Kerja Dan
                        Transmigrasi Republik Indonesia Nomor: Kep.
                        42/Men/III/2008 Tentang Penetapan Standar Kompetensi
                        Kerja Nasional Indonesia Sektor Ketenagakerjaan Bidang
                        Keselamatan Dan Kesehatan Kerja
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox
                label="Kriteria asesmen dari kurikulum pelatihan"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox
                label="Spesifikasi kinerja suatu perusahaan atau industri"
                readonly
              ></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Spesifikasi Produk :" readonly></v-checkbox>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-checkbox label="Pedoman khusus :" readonly></v-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table class="no-border-top">
        <thead>
          <tr class="with-bg">
            <td style="padding: 0; border: 0" colspan="11">
              <table style="border: 0">
                <tr>
                  <th class="no-border-bottom no-border-horizontal nowrap">
                    2.
                  </th>
                  <th
                    class="no-border-bottom no-border-horizontal"
                    align="start"
                  >
                    Mempersiapkan Rencana Asesmen
                  </th>
                </tr>
              </table>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr style="border: 0">
            <td colspan="11" style="padding: 0; border: 0">
              <table style="border: 0">
                <tbody>
                  <tr style="border: 0">
                    <th
                      rowspan="2"
                      class="nowrap no-border-left no-border-bottom"
                    >
                      Unit Kompetensi
                    </th>
                    <td class="nowrap">Kode Unit</td>
                    <td class="nowrap">:</td>
                    <td align="start" class="no-border-right">
                      KKK.00.02.004.01
                    </td>
                  </tr>
                  <tr style="border: 0">
                    <td class="nowrap no-border-bottom">Judul Unit</td>
                    <td class="nowrap text-top no-border-bottom">:</td>
                    <td align="start" class="no-border-right no-border-bottom">
                      Dukungan Terhadap Pelaksanaan Strategi Pengendalian Risiko
                      K3
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th rowspan="2">Kriteria Unjuk Kerja</th>
            <td rowspan="2" align="center">
              <b>Bukti-Bukti</b> <br />
              (Kinerja, Produk, Portofolio, dan / atau Hafalan) diidentifikasi
              berdasarkan Kriteria Unjuk Kerja dan Pendekatan Asesmen.
            </td>
            <th colspan="3">Jenis Bukti</th>
            <th colspan="6">
              Metode dan Perangkat Asesmen <br />
              CL (Ceklis Observasi/ Lembar Periksa), DIT (Daftar Instruksi
              Terstruktur), DPL (Daftar Pertanyaan Lisan), DPT (Daftar
              Pertanyaan Tertulis), VP (Verifikasi Portofolio), CUP (Ceklis
              Ulasan Produk), PW (Pertanyaan Wawancara)
            </th>
          </tr>
          <tr>
            <td>L</td>
            <td>TL</td>
            <td>T</td>
            <td align="center" class="text-small">
              <b>Obsevasi Langsung</b> <br />
              (kerja nyata/aktivitas waktu nyata di tempat kerja di lingkungan
              tempat kerja yang disimulasikan)
            </td>
            <td align="center" class="text-small">
              <b>Kegiatan Terstruktur</b> <br />(latihan simulasi dan bermain
              peran, proyek, presentasi, lembar kegiatan)
            </td>
            <td align="center" class="text-small">
              <b>Tanya Jawab</b> <br />(pertanyaan tertulis, wawancara, asesmen
              diri, tanya jawab lisan, angket, ujian lisan atau tertulis)
            </td>
            <td align="center" class="text-small">
              <b>Verifikasi Portfolio</b> <br />
              (sampel pekerjaaan yang disusun oleh Asesi, produk dengan
              dokumentasi pendukung, bukti sejarah, jurnal atau buku catatan,
              informasi tentang pengalaman hidup)
            </td>
            <td align="center" class="text-small">
              <b>Review Produk</b> <br />
              (testimoni dan laporan dari atasan, bukti pelatihan, otentikasi
              pencapaian sebelumnya, wawancara dengan atasan, atau rekan kerja)
            </td>
            <td align="center" class="text-small">Lainnya : ……………</td>
          </tr>
          <tr>
            <th colspan="11" align="start">
              Elemen: 1. Mengembangkan pilihan pengendalian risiko
            </th>
          </tr>
          <tr>
            <td class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td style="padding-right: 5px" class="text-top">1.1</td>
                    <td>
                      Daftar bahaya, Hasil-hasil investigasi suatu insiden dan
                      penilaian risiko ditinjau ulang untuk mengidentifikasi
                      bahaya yang memerlukan tindakan pengendalian.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="text-top">
              Hasil observasi langsung meninjau ulang hasil-hasil investigasi
              suatu insiden dan penilaian risiko untuk mengidentifikasi bahaya
              yang memerlukan tindakan pengendalian.
            </td>
            <th>L</th>
            <th></th>
            <th></th>
            <td align="center">CL</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <td rowspan="2" class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td style="padding-right: 5px" class="text-top">1.2</td>
                    <td>
                      Pengetahuan tentang perundang- undangan dan standar
                      diterapkan terhadap pengembangan sebuah kisaran opsi untuk
                      mengendalikan risiko-risiko khusus di tempat kerja. Hasil
                      observasi langsung menerapkan pengetahuan
                      perundang-undangan dan standar terhadap pengembangan
                      sebuah kisaran opsi untuk mengendalikan risiko-risiko
                      khusus di tempat kerja.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="text-top">
              Hasil observasi langsung menerapkan pengetahuan perundang-undangan
              dan standar terhadap pengembangan sebuah kisaran opsi untuk
              mengendalikan risiko-risiko khusus di tempat kerja.
            </td>
            <th>L</th>
            <th></th>
            <th></th>
            <td align="center">CL</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <td class="text-top">
              Hasil tanya jawab terkait peraturan perundang-undangan K3.
            </td>
            <th></th>
            <th></th>
            <th>T</th>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center">DPT1</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <th colspan="11" align="start">
              Elemen: 2. Memilih teknik pengendalian risiko yang sesuai
            </th>
          </tr>
          <tr>
            <td rowspan="2" class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td style="padding-right: 5px" class="text-top">2.1</td>
                    <td>
                      Hasil - hasil penilaian risiko ditinjau untuk
                      menginformasikan proses dari pemilihan opsi untuk
                      mengendalikan risiko.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="text-top">
              Hasil observasi langsung meninjau hasil-hasil penilaian risiko
              untuk menginformasikan proses dari pemilihan opsi untuk
              mengendalikan risiko.Hasil observasi langsung meninjau hasil-hasil
              penilaian risiko untuk menginformasikan proses dari pemilihan opsi
              untuk mengendalikan risiko.
            </td>
            <th>L</th>
            <th></th>
            <th></th>
            <td align="center">CL</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <td class="text-top">
              Hasil tanya jawab tentang praktik pengelolaan K3.
            </td>
            <th></th>
            <th></th>
            <th>T</th>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center">DPT3</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <td rowspan="2" class="text-top">
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td style="padding-right: 5px" class="text-top">2.2</td>
                    <td>
                      Intervensi yang tepat pada saat pemilihan pengendalian
                      risiko diprioritaskan.
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td class="text-top">
              Hasil observasi langsung memprioritaskan intervensi yang tepat
              pada saat pemilihan pengendalian risiko.
            </td>
            <th>L</th>
            <th></th>
            <th></th>
            <td align="center">CL</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
          <tr>
            <td class="text-top">
              Hasil tanya jawab tentang mekanisme pengukuran bahaya
            </td>
            <th></th>
            <th></th>
            <th>T</th>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center">DPT4</td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-text>
      <table class="no-border-top">
        <thead>
          <tr class="with-bg">
            <td style="padding: 0; border: 0" colspan="11">
              <table style="border: 0">
                <tbody>
                  <tr>
                    <th class="no-border-bottom no-border-horizontal nowrap">
                      3.
                    </th>
                    <th
                      class="no-border-bottom no-border-horizontal"
                      align="start"
                    >
                      Mengidentifikasi Persyaratan Modifikasi dan
                      Kontekstualisasi :
                    </th>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="text-top">
            <td rowspan="4" class="nowrap no-border-right">3.1.</td>
            <td
              rowspan="2"
              class="nowrap no-border-left no-border-bottom"
              style="padding-left: 0"
            >
              a. Karakteristik Kandidat:
            </td>
            <td class="no-border-bottom">
              <span class="text-line">Ada</span> / <span>tidak ada</span>*
              karakteristik khusus Kandidat
            </td>
          </tr>
          <tr class="text-top">
            <td class="no-border-top" style="padding-top: 0">
              Jika Ada, tuliskan
            </td>
          </tr>
          <tr class="text-top">
            <td
              rowspan="2"
              class="nowrap no-border-left no-border-top"
              style="padding: 0 10px 10px 0"
            >
              b. Kebutuhan kontekstualisasi terkait tempat kerja:
            </td>
            <td class="no-border-bottom">
              <span>Ada</span> / <span>tidak ada</span>* kebutuhan
              kontekstualisasi
            </td>
          </tr>
          <tr class="text-top">
            <td class="no-border-top" style="padding-top: 0">
              Jika Ada, tuliskan.....
            </td>
          </tr>
          <tr class="text-top">
            <td rowspan="2" class="nowrap no-border-right">3.2.</td>
            <td
              rowspan="2"
              class="nowrap no-border-left"
              style="padding-left: 0"
            >
              Saran yang diberikan oleh paket pelatihan atau pengembang
              pelatihan
            </td>
            <td class="no-border-bottom">
              <span>Ada</span> / <span>tidak ada</span>* saran
            </td>
          </tr>
          <tr class="text-top">
            <td class="no-border-top" style="padding-top: 0">
              Jika Ada, tuliskan
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle> *Coret yang tidak perlu </v-card-subtitle>
    <v-card-subtitle>
      <b>Konfirmasi dengan orang yang relevan</b>
    </v-card-subtitle>
    <v-card-text>
      <table>
        <thead>
          <tr class="with-bg">
            <th class="nowrap">Orang yang relevan</th>
            <th>Tanda tangan</th>
          </tr>
        </thead>
        <tbody>
          <tr class="nowrap">
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top"> Manajer sertifikasi LSP </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
          </tr>
          <tr class="nowrap">
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top">
                        Master Asesor / Master Trainer / Lead Asesor/ Asesor
                        Utama Kompetensi
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
          </tr>
          <tr class="nowrap">
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top">
                        Manajer pelatihan Lembaga Training terakreditasi /
                        Lembaga Training terdaftar
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
          </tr>
          <tr class="nowrap">
            <td>
              <table class="table-nested">
                <tbody>
                  <tr>
                    <td class="text-top nowrap" style="padding-right: 5px">
                      <v-checkbox readonly></v-checkbox>
                    </td>
                    <td>
                      <span class="text-top"> Lainnya : </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-subtitle>
      <b>Konfirmasi dengan orang yang relevan</b>
    </v-card-subtitle>
    <v-card-text>
      <table>
        <thead>
          <tr class="with-bg">
            <th>Nama</th>
            <th class="nowrap">Jabatan</th>
            <th>Tanggal dan Tanda Tangan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td class="nowrap">Penyusun</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td class="nowrap">Validator</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </div>
</template>