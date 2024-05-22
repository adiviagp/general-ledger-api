const express = require('express');
const { getNeraca, getSetting, postSetting } = require('./neraca.service');
const excelJS = require('exceljs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const router = express.Router();

router.get('/', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getNeraca({ startDate, endDate });
  res.json(akuns);
});

router.get('/setting', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getSetting({ startDate, endDate });
  res.json(akuns);
});

router.post('/', async (req, res) => {
  try {
    const { data } = req.body;
    const neraca = await postSetting(data);

    res.send({
      data: neraca,
      message: 'create neraca success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/download-excel', async (req, res) => {
  let { startDate, endDate } = req.query;

  let neraca = null;
  neraca = await getNeraca({ startDate, endDate });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Nereaca');

  worksheet.addRow([]);
  worksheet.mergeCells('A1', 'C1');

  worksheet.mergeCells('A2', 'C3');
  worksheet.getCell('A2').value = 'NERACA';
  worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A4', 'C4');
  worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
  worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(2).width = 80;
  worksheet.getColumn(3).width = 40;
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['ASET', '', ''];
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };

  worksheet.getRow(worksheet.rowCount + 1).values = ['I', 'ASET LANCAR', ''];
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'KAS', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.', 'KAS BESAR', ''];
  neraca.data.pasiva.asset.asset_lancar.kas.kas_besar.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KAS BESAR *', neraca.data.pasiva.asset.asset_lancar.kas.kas_besar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // --

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'KAS HARIAN', ''];
  neraca.data.pasiva.asset.asset_lancar.kas.kas_harian.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KAS BESAR *', neraca.data.pasiva.asset.asset_lancar.kas.kas_harian.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL KAS **', neraca.data.pasiva.asset.asset_lancar.kas.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  // //

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BANK', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.', 'BANK GIRO', ''];
  neraca.data.pasiva.asset.asset_lancar.bank.bank_giro.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL DEPOSITO *', neraca.data.pasiva.asset.asset_lancar.bank.bank_giro.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // --

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.', 'DEPOSITO', ''];
  neraca.data.pasiva.asset.asset_lancar.bank.deposito.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL DEPOSITO *', neraca.data.pasiva.asset.asset_lancar.bank.deposito.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL BANK **', neraca.data.pasiva.asset.asset_lancar.bank.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  // //

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'PEMBAYARAN DIMUKA', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.1.', 'PEMBAYARAN UANG MUKA', ''];
  neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_uang_muka.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PEMBAYARAN UANG MUKA *', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_uang_muka.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // --

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.2.', 'PEMBAYARAN BIAYA DI MUKA', ''];
  neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_biaya_dimuka.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PEMBAYARAN BIAYA DI MUKA *', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_biaya_dimuka.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PEMBAYARAN DI MUKA  **', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  // //

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'PIUTANG', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.1.', 'PIUTANG USAHA LANCAR', ''];
  neraca.data.pasiva.asset.asset_lancar.piutang.piutang_usaha_lancar.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG USAHA LANCAR *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_usaha_lancar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // --

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.2.', 'PIUTANG TIDAK LANCAR', ''];
  neraca.data.pasiva.asset.asset_lancar.piutang.piutang_tidak_lancar.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG TIDAK LANCAR *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_tidak_lancar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // --

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.3.', 'PIUTANG PEMEGANG SAHAM', ''];
  neraca.data.pasiva.asset.asset_lancar.piutang.piutang_pemegang_saham.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG PEMEGANG SAHAM *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_pemegang_saham.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PIUTANG  **', neraca.data.pasiva.asset.asset_lancar.piutang.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'INVESTASI', ''];
  neraca.data.pasiva.asset.asset_lancar.investasi.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL INVESTASI *', neraca.data.pasiva.asset.asset_lancar.investasi.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET LANCAR ***	', neraca.data.pasiva.asset.asset_lancar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  // ----

  worksheet.getRow(worksheet.rowCount + 1).values = ['II', 'ASET TETAP', ''];
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'NILAI PEROLEHAN', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.', 'TANAH', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_tanah.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL TANAH *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_tanah.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'BANGUNAN', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_bangunan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BANGUNAN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_bangunan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'ALAT GEDUNG', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_alat_gedung.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL ALAT GEDUNG *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_alat_gedung.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'KENDARAAN', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_kendaraan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KENDARAAN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_kendaraan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'PERLENGKAPAN KANTOR', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_perlengkapan_kantor.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PERLENGKAPAN KANTOR *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_perlengkapan_kantor.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'LAIN LAIN', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_lain_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL LAIN LAIN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_lain_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'FASILITAS PENUNJANG', ''];
  neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_fasilitas_penunjang.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL FASILITAS PENUNJANG *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_fasilitas_penunjang.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL NILAI PEROLEHAN **', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  // --- //

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'AKUMULASI PENYUSUTAN', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.', 'AKK PENYUSUTAN BANGUNAN', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_bangunan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN BANGUNAN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_bangunan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.', 'AKK PENYUSUTAN ALAT GEDUNG', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_alat_gedung.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	AKK PENYUSUTAN ALAT GEDUNG *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_alat_gedung.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.3.', 'AKK PENYUSUTAN KENDARAAN', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_kendaraan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN KENDARAAN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_kendaraan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.4.', 'AKK PENYUSUTAN PERLENGKAPAN KANTOR', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_perlengkapan_kantor.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.4.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN PERLENGKAPAN KANTOR *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_perlengkapan_kantor.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.5.', 'AKK PENYUSUTAN LAIN-LAIN', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_lain_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN LAIN-LAIN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_lain_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.6.', 'AKK PENYUSUTAN FASILITAS PENUNJANG', ''];
  neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_fasilitas_penunjang.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.6.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = [
    '',
    '* TOTAL AKK PENYUSUTAN FASILITAS PENUNJANG *',
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_fasilitas_penunjang.total,
  ];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL AKUMULASI PENYUSUTAN **', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET TETAP ***', neraca.data.pasiva.asset.asset_tetap.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  //
  // ----

  worksheet.getRow(worksheet.rowCount + 1).values = ['III', 'ASET LAIN LAIN', ''];
  worksheet.addRow([]);
  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'NILAI PEROLEHAN', ''];
  neraca.data.pasiva.asset.asset_lain_lain.biaya_pendirian.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	NILAI PEROLEHAN *', neraca.data.pasiva.asset.asset_lain_lain.biaya_pendirian.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);
  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'PENYERTAAN USAHA', ''];
  neraca.data.pasiva.asset.asset_lain_lain.penyertaan_usaha.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	PENYERTAAN USAHA *', neraca.data.pasiva.asset.asset_lain_lain.penyertaan_usaha.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET LAIN-LAIN ***', neraca.data.pasiva.asset.asset_lain_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET ***', neraca.data.pasiva.asset.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
  worksheet.addRow([]);

  // --- // --- //

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['KEWAJIBAN & EKUITY', '', ''];
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };

  worksheet.getRow(worksheet.rowCount + 1).values = ['IV', 'UTANG JANGKA PENDEK', ''];
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'UTANG BANK', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_bank.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG BANK *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_bank.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'UTANG PAJAK', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_pajak.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG PAJAK *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'UTANG USAHA', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_usaha.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG USAHA *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_usaha.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'UTANG LAIN LAIN', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_lain_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG LAIN LAIN *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_lain_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'PENERIMAAN DIMUKA SEWA KANTOR', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_sewa.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	PENERIMAAN DIMUKA SEWA KANTOR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_sewa.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'PENERIMAAN DIMUKA DEPOSIT SEWA KANTOR', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_deposit_sewa.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENERIMAAN DIMUKA DEPOSIT SEWA KANTOR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_deposit_sewa.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'BIAYA MASIH HARUS DIBAYAR', ''];
  neraca.data.pasiva.kewajiban.kewajiban_lancar.biaya_masih_harus_dibayar.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BIAYA MASIH HARUS DIBAYAR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.biaya_masih_harus_dibayar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL UTANG JANGKA PENDEK ***', neraca.data.pasiva.kewajiban.kewajiban_lancar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  // -- //

  worksheet.getRow(worksheet.rowCount + 1).values = ['V', 'UTANG JANGKA PANJANG', ''];
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'UTANG BANK', ''];
  neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_bank.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG BANK *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_bank.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'UTANG LAIN LAIN', ''];
  neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_lain_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG LAIN LAIN *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_lain_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'KEWAJIBAN IMBALAN PASCA KERJA', ''];
  neraca.data.pasiva.kewajiban.utang_jangka_panjang.kewajiban_imbalan_pasca_kerja.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KEWAJIBAN IMBALAN PASCA KERJA *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.kewajiban_imbalan_pasca_kerja.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL UTANG JANGKA PANJANG ***', neraca.data.pasiva.kewajiban.utang_jangka_panjang.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  // -- //

  worksheet.getRow(worksheet.rowCount + 1).values = ['VI', 'EKUITY', ''];
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'MODAL DASAR', ''];
  neraca.data.pasiva.ekuity.ekuity_modal_dasar.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL MODAL DASAR *', neraca.data.pasiva.ekuity.ekuity_modal_dasar.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'MODAL PEMEGANG SAHAM', ''];
  neraca.data.pasiva.ekuity.ekuity_modal_pemegang_saham.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL MODAL PEMEGANG SAHAM *', neraca.data.pasiva.ekuity.ekuity_modal_pemegang_saham.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'TAMBAHAN HARTA TAX AMNESTY', ''];
  neraca.data.pasiva.ekuity.ekuity_tax_amnesty.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL TAMBAHAN HARTA TAX AMNESTY *', neraca.data.pasiva.ekuity.ekuity_tax_amnesty.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'CADANGAN', ''];
  neraca.data.pasiva.ekuity.ekuity_cadangan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL CADANGAN *', neraca.data.pasiva.ekuity.ekuity_cadangan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'SALDO LABA (RUGI)', ''];
  neraca.data.pasiva.ekuity.ekuity_saldo_laba_rugi.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* SALDO LABA (RUGI) *', neraca.data.pasiva.ekuity.ekuity_saldo_laba_rugi.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL EKUITY ***	', neraca.data.pasiva.ekuity.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL PASIVA ***	', neraca.data.pasiva.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.addRow([]);

  worksheet.columns.forEach((column) => {
    column.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  try {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=neraca.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
    });
  } catch (err) {
    res.send({
      status: 'error',
      message: 'Something went wrong',
    });
  }
});

router.get('/download-pdf', async (req, res) => {
  let { startDate, endDate } = req.query;

  let neraca = null;
  neraca = await getNeraca({ startDate, endDate });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Neraca');

  if (startDate) {
    worksheet.addRow([]);
    worksheet.mergeCells('A1', 'C1');

    worksheet.mergeCells('A2', 'C3');
    worksheet.getCell('A2').value = 'NERACA';
    worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.mergeCells('A4', 'C4');
    worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
    worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(2).width = 80;
    worksheet.getColumn(3).width = 40;
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['ASET', '', ''];
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };

    worksheet.getRow(worksheet.rowCount + 1).values = ['I', 'ASET LANCAR', ''];
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'KAS', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.', 'KAS BESAR', ''];
    neraca.data.pasiva.asset.asset_lancar.kas.kas_besar.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KAS BESAR *', neraca.data.pasiva.asset.asset_lancar.kas.kas_besar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // --

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'KAS HARIAN', ''];
    neraca.data.pasiva.asset.asset_lancar.kas.kas_harian.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KAS BESAR *', neraca.data.pasiva.asset.asset_lancar.kas.kas_harian.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL KAS **', neraca.data.pasiva.asset.asset_lancar.kas.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    // //

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BANK', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.', 'BANK GIRO', ''];
    neraca.data.pasiva.asset.asset_lancar.bank.bank_giro.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL DEPOSITO *', neraca.data.pasiva.asset.asset_lancar.bank.bank_giro.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // --

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.', 'DEPOSITO', ''];
    neraca.data.pasiva.asset.asset_lancar.bank.deposito.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL DEPOSITO *', neraca.data.pasiva.asset.asset_lancar.bank.deposito.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL BANK **', neraca.data.pasiva.asset.asset_lancar.bank.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    // //

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'PEMBAYARAN DIMUKA', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.1.', 'PEMBAYARAN UANG MUKA', ''];
    neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_uang_muka.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['3.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PEMBAYARAN UANG MUKA *', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_uang_muka.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // --

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.2.', 'PEMBAYARAN BIAYA DI MUKA', ''];
    neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_biaya_dimuka.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['3.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PEMBAYARAN BIAYA DI MUKA *', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.pembayaran_biaya_dimuka.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PEMBAYARAN DI MUKA  **', neraca.data.pasiva.asset.asset_lancar.pembayaran_dimuka.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    // //

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'PIUTANG', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.1.', 'PIUTANG USAHA LANCAR', ''];
    neraca.data.pasiva.asset.asset_lancar.piutang.piutang_usaha_lancar.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['4.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG USAHA LANCAR *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_usaha_lancar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // --

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.2.', 'PIUTANG TIDAK LANCAR', ''];
    neraca.data.pasiva.asset.asset_lancar.piutang.piutang_tidak_lancar.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['4.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG TIDAK LANCAR *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_tidak_lancar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // --

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.3.', 'PIUTANG PEMEGANG SAHAM', ''];
    neraca.data.pasiva.asset.asset_lancar.piutang.piutang_pemegang_saham.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['4.3.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PIUTANG PEMEGANG SAHAM *', neraca.data.pasiva.asset.asset_lancar.piutang.piutang_pemegang_saham.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PIUTANG  **', neraca.data.pasiva.asset.asset_lancar.piutang.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'INVESTASI', ''];
    neraca.data.pasiva.asset.asset_lancar.investasi.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL INVESTASI *', neraca.data.pasiva.asset.asset_lancar.investasi.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET LANCAR ***	', neraca.data.pasiva.asset.asset_lancar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    // ----

    worksheet.getRow(worksheet.rowCount + 1).values = ['II', 'ASET TETAP', ''];
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'NILAI PEROLEHAN', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.', 'TANAH', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_tanah.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL TANAH *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_tanah.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'BANGUNAN', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_bangunan.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BANGUNAN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_bangunan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'ALAT GEDUNG', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_alat_gedung.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL ALAT GEDUNG *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_alat_gedung.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'KENDARAAN', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_kendaraan.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KENDARAAN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_kendaraan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'PERLENGKAPAN KANTOR', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_perlengkapan_kantor.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PERLENGKAPAN KANTOR *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_perlengkapan_kantor.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'LAIN LAIN', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_lain_lain.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL LAIN LAIN *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_lain_lain.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.', 'FASILITAS PENUNJANG', ''];
    neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_fasilitas_penunjang.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL FASILITAS PENUNJANG *', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.nilai_perolehan_fasilitas_penunjang.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL NILAI PEROLEHAN **', neraca.data.pasiva.asset.asset_tetap.nilai_perolehan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    // --- //

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'AKUMULASI PENYUSUTAN', ''];

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.', 'AKK PENYUSUTAN BANGUNAN', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_bangunan.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN BANGUNAN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_bangunan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.', 'AKK PENYUSUTAN ALAT GEDUNG', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_alat_gedung.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	AKK PENYUSUTAN ALAT GEDUNG *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_alat_gedung.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.3.', 'AKK PENYUSUTAN KENDARAAN', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_kendaraan.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.3.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN KENDARAAN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_kendaraan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.4.', 'AKK PENYUSUTAN PERLENGKAPAN KANTOR', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_perlengkapan_kantor.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.4.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN PERLENGKAPAN KANTOR *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_perlengkapan_kantor.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.5.', 'AKK PENYUSUTAN LAIN-LAIN', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_lain_lain.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL AKK PENYUSUTAN LAIN-LAIN *', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_lain_lain.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.6.', 'AKK PENYUSUTAN FASILITAS PENUNJANG', ''];
    neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_fasilitas_penunjang.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.6.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = [
      '',
      '* TOTAL AKK PENYUSUTAN FASILITAS PENUNJANG *',
      neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.akk_penyusutan_fasilitas_penunjang.total,
    ];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL AKUMULASI PENYUSUTAN **', neraca.data.pasiva.asset.asset_tetap.akumulasi_penyusutan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET TETAP ***', neraca.data.pasiva.asset.asset_tetap.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    //
    // ----

    worksheet.getRow(worksheet.rowCount + 1).values = ['III', 'ASET LAIN LAIN', ''];
    worksheet.addRow([]);
    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'NILAI PEROLEHAN', ''];
    neraca.data.pasiva.asset.asset_lain_lain.biaya_pendirian.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	NILAI PEROLEHAN *', neraca.data.pasiva.asset.asset_lain_lain.biaya_pendirian.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);
    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'PENYERTAAN USAHA', ''];
    neraca.data.pasiva.asset.asset_lain_lain.penyertaan_usaha.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	PENYERTAAN USAHA *', neraca.data.pasiva.asset.asset_lain_lain.penyertaan_usaha.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET LAIN-LAIN ***', neraca.data.pasiva.asset.asset_lain_lain.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL ASET ***', neraca.data.pasiva.asset.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'darkUp' };
    worksheet.addRow([]);

    // --- // --- //

    //
    worksheet.getRow(worksheet.rowCount + 1).values = ['KEWAJIBAN & EKUITY', '', ''];
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };

    worksheet.getRow(worksheet.rowCount + 1).values = ['IV', 'UTANG JANGKA PENDEK', ''];
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'UTANG BANK', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_bank.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG BANK *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_bank.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'UTANG PAJAK', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_pajak.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG PAJAK *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_pajak.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'UTANG USAHA', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_usaha.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG USAHA *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_usaha.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'UTANG LAIN LAIN', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_lain_lain.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['4.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	UTANG LAIN LAIN *', neraca.data.pasiva.kewajiban.kewajiban_lancar.utang_lain_lain.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'PENERIMAAN DIMUKA SEWA KANTOR', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_sewa.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	PENERIMAAN DIMUKA SEWA KANTOR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_sewa.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'PENERIMAAN DIMUKA DEPOSIT SEWA KANTOR', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_deposit_sewa.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENERIMAAN DIMUKA DEPOSIT SEWA KANTOR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.penerimaan_dimuka_deposit_sewa.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'BIAYA MASIH HARUS DIBAYAR', ''];
    neraca.data.pasiva.kewajiban.kewajiban_lancar.biaya_masih_harus_dibayar.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BIAYA MASIH HARUS DIBAYAR *', neraca.data.pasiva.kewajiban.kewajiban_lancar.biaya_masih_harus_dibayar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL UTANG JANGKA PENDEK ***', neraca.data.pasiva.kewajiban.kewajiban_lancar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    // -- //

    worksheet.getRow(worksheet.rowCount + 1).values = ['V', 'UTANG JANGKA PANJANG', ''];
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'UTANG BANK', ''];
    neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_bank.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG BANK *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_bank.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'UTANG LAIN LAIN', ''];
    neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_lain_lain.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL UTANG LAIN LAIN *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.utang_jangka_panjang_utang_lain_lain.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'KEWAJIBAN IMBALAN PASCA KERJA', ''];
    neraca.data.pasiva.kewajiban.utang_jangka_panjang.kewajiban_imbalan_pasca_kerja.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL KEWAJIBAN IMBALAN PASCA KERJA *', neraca.data.pasiva.kewajiban.utang_jangka_panjang.kewajiban_imbalan_pasca_kerja.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL UTANG JANGKA PANJANG ***', neraca.data.pasiva.kewajiban.utang_jangka_panjang.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    // -- //

    worksheet.getRow(worksheet.rowCount + 1).values = ['VI', 'EKUITY', ''];
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'MODAL DASAR', ''];
    neraca.data.pasiva.ekuity.ekuity_modal_dasar.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL MODAL DASAR *', neraca.data.pasiva.ekuity.ekuity_modal_dasar.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'MODAL PEMEGANG SAHAM', ''];
    neraca.data.pasiva.ekuity.ekuity_modal_pemegang_saham.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL MODAL PEMEGANG SAHAM *', neraca.data.pasiva.ekuity.ekuity_modal_pemegang_saham.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'TAMBAHAN HARTA TAX AMNESTY', ''];
    neraca.data.pasiva.ekuity.ekuity_tax_amnesty.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL TAMBAHAN HARTA TAX AMNESTY *', neraca.data.pasiva.ekuity.ekuity_tax_amnesty.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'CADANGAN', ''];
    neraca.data.pasiva.ekuity.ekuity_cadangan.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['4.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL CADANGAN *', neraca.data.pasiva.ekuity.ekuity_cadangan.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    //

    worksheet.getRow(worksheet.rowCount + 1).values = ['5.', 'SALDO LABA (RUGI)', ''];
    neraca.data.pasiva.ekuity.ekuity_saldo_laba_rugi.details?.forEach((data, index) => {
      worksheet.getRow(worksheet.rowCount + 1).values = ['5.' + (index + 1), data.label, data.value];
      worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    });
    worksheet.getRow(worksheet.rowCount + 1).values = ['', '* SALDO LABA (RUGI) *', neraca.data.pasiva.ekuity.ekuity_saldo_laba_rugi.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL EKUITY ***	', neraca.data.pasiva.ekuity.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** TOTAL PASIVA ***	', neraca.data.pasiva.total];
    worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
    worksheet.addRow([]);

    worksheet.columns.forEach((column) => {
      column.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  }

  // Embed Excel content as an image on the PDF page
  const sheet = workbook.getWorksheet(1); // Assuming data is in the first sheet
  // Extract data from Excel sheet
  const data = [];
  sheet.eachRow((row, rowNumber) => {
    const rowData = row.values;
    data.push(rowData);
    // console.log(rowData);
  });

  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the PDF document
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 page size

  // Add data to PDF page
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  const lineHeight = 14;
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // data.forEach((rowData, rowIndex) => {
  //   rowData.forEach((cellData, colIndex) => {
  //     cellData = cellData !== null ? cellData.toString() : cellData;
  //     // console.log(cellData);
  //     const x = 50 + colIndex * 100;
  //     const y = 800 - rowIndex * lineHeight;
  //     page.drawText(`${cellData}`, { x, y, font, fontSize });
  //   });
  // });
  const { width, height } = page.getSize()
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  console.log(pdfDoc);
  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
  res.send(pdfBytes);
});

router.get('/pdf', async (req, res) => {
  let { startDate, endDate } = req.query;

  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()
  download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
});


module.exports = router;
