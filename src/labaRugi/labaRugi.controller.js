const express = require('express');
const { getLabaRugi, getSetting, postSetting } = require('./labaRugi.service');
const moment = require('moment');
const excelJS = require('exceljs');

const router = express.Router();

router.get('/', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getLabaRugi({ startDate, endDate });
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
    const labarugi = await postSetting(data);

    res.send({
      data: labarugi,
      message: 'create labarugi success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/download-excel', async (req, res) => {
  let { startDate, endDate } = req.query;

  let labaRugi = null;
  labaRugi = await getLabaRugi({ startDate, endDate });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Laba Rugi');

  worksheet.addRow([]);
  worksheet.mergeCells('A1', 'C1');

  worksheet.mergeCells('A2', 'C3');
  worksheet.getCell('A2').value = 'LABA RUGI';
  worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A4', 'C4');
  worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
  worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(2).width = 100;
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['I', 'PENDAPATAN OPERASI', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'PENDAPATAN USAHA', ''];
  labaRugi.data.laba_rugi_kotor.pendapatan_operasi.pendapatan_usaha.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENDAPATAN USAHA *', labaRugi.data.laba_rugi_kotor.pendapatan_operasi.pendapatan_usaha.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // ----

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'PENDAPATAN LAIN-LAIN', ''];
  labaRugi.data.laba_rugi_kotor.pendapatan_operasi.pendapatan_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENDAPATAN LAIN LAIN *', labaRugi.data.laba_rugi_kotor.pendapatan_operasi.pendapatan_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** PENDAPATAN OPERASI **', labaRugi.data.laba_rugi_kotor.pendapatan_operasi.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['II', 'BEBAN POKOK PENDAPATAN', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'BEBAN POKOK', ''];
  labaRugi.data.laba_rugi_kotor.beban_pokok_pendapatan.beban_pokok.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BEBAN POKOK *', labaRugi.data.laba_rugi_kotor.beban_pokok_pendapatan.beban_pokok.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //  ---

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BEBAN LAIN LAIN', ''];
  labaRugi.data.laba_rugi_kotor.beban_pokok_pendapatan.beban_lain.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BEBAN LAIN LAIN *', labaRugi.data.laba_rugi_kotor.beban_pokok_pendapatan.beban_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** BEBAN POKOK PENDAPATAN **', labaRugi.data.laba_rugi_kotor.beban_pokok_pendapatan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** LABA (RUGI) KOTOR ***	', labaRugi.data.laba_rugi_kotor.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['III', '	BEBAN USAHA', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'BEBAN PEGAWAI', ''];
  labaRugi.data.laba_rugi_usaha.beban_usaha.beban_pegawai.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BEBAN PEGAWAI *', labaRugi.data.laba_rugi_usaha.beban_usaha.beban_pegawai.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // ---

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BEBAN UMUM & ADMINISTRASI', ''];
  labaRugi.data.laba_rugi_usaha.beban_usaha.beban_umum.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BEBAN UMUM & ADMINISTRASI *', labaRugi.data.laba_rugi_usaha.beban_usaha.beban_umum.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // ---

  worksheet.getRow(worksheet.rowCount + 1).values = ['3.', 'BEBAN PENYUSUTAN', ''];
  labaRugi.data.laba_rugi_usaha.beban_usaha.beban_penyusutan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['3.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	BEBAN PENYUSUTAN *', labaRugi.data.laba_rugi_usaha.beban_usaha.beban_penyusutan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  // ---

  worksheet.getRow(worksheet.rowCount + 1).values = ['4.', 'BEBAN AMORTISASI', ''];
  labaRugi.data.laba_rugi_usaha.beban_usaha.beban_amortisasi.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['4.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	BEBAN AMORTISASI *', labaRugi.data.laba_rugi_usaha.beban_usaha.beban_amortisasi.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** LABA (RUGI) USAHA ***	', labaRugi.data.laba_rugi_usaha.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  //
  worksheet.getRow(worksheet.rowCount + 1).values = ['IV', 'PENDAPATAN / BEBAN LAIN LAIN', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'PENDAPATAN LAIN-LAIN', ''];
  labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_lain.pendapatan_lain_sebelum_pajak.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	PENDAPATAN LAIN-LAIN *', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_lain.pendapatan_lain_sebelum_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BEBAN LAIN-LAIN', ''];
  labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_lain.beban_lain_sebelum_pajak.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL	BEBAN LAIN-LAIN *', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_lain.beban_lain_sebelum_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PENDAPATAN/BEBAN LAIN **', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_lain.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['V', 'PENDAPATAN / BEBAN BUNGA', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', 'PENDAPATAN BUNGA', ''];
  labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_bunga.pendapatan_bunga_sebelum_pajak.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENDAPATAN BUNGA *', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_bunga.pendapatan_bunga_sebelum_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['2.', 'BEBAN BUNGA', ''];
  labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_bunga.beban_bunga_sebelum_pajak.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['2.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL BEBAN BUNGA *', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_bunga.beban_bunga_sebelum_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '** TOTAL PENDAPATAN/BEBAN BUNGA **', labaRugi.data.laba_rugi_sebelum_pajak.pendapatan_beban_bunga.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** LABA (RUGI) SEBELUM PAJAK ***', labaRugi.data.laba_rugi_sebelum_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.addRow([]);

  //

  worksheet.getRow(worksheet.rowCount + 1).values = ['VI', 'BEBAN PAJAK PENGHASILAN', ''];

  worksheet.getRow(worksheet.rowCount + 1).values = ['1.', '	BEBAN PAJAK PENGHASILAN', ''];
  labaRugi.data.laba_rugi_setelah_pajak.beban_pajak_penghasilan.details?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = ['1.' + (index + 1), data.label, data.value];
    worksheet.getCell('C' + worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  });
  worksheet.getRow(worksheet.rowCount + 1).values = ['', '* TOTAL PENDAPATAN BUNGA *', labaRugi.data.laba_rugi_setelah_pajak.beban_pajak_penghasilan.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['', '*** LABA (RUGI) SETELAH PAJAK ***', labaRugi.data.laba_rugi_setelah_pajak.total];
  worksheet.getRow(worksheet.rowCount).alignment = { vertical: 'middle', horizontal: 'right' };
  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'lightGray' };

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
    res.setHeader('Content-Disposition', `attachment; filename=laba-rugi.xlsx`);

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

module.exports = router;
