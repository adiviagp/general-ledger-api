const express = require('express');
const moment = require('moment');
const excelJS = require('exceljs');

const { getAllJurnals, download } = require('./bukubesar.service');
const { getAllAkuns } = require('../akun/akun.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let jurnals = null;
  let { page = 1, limit = 10, akunId, startDate, endDate } = req.query;

  jurnals = await getAllJurnals({ akunId, startDate, endDate });
  res.json(jurnals);
});

router.get('/download-excel', async (req, res) => {
  let { startDate, endDate } = req.query;
  const akuns = await getAllAkuns({});

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Buku Besar');

  worksheet.addRow([]);
  worksheet.mergeCells('A1', 'F1');

  worksheet.mergeCells('A2', 'F3');
  worksheet.getCell('A2').value = 'BUKU BESAR';
  worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A4', 'F4');
  worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
  worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn('A').width = 100;
  worksheet.getColumn('C').width = 100;

  worksheet.addRow([]);

  for (const akun of akuns.data) {
    const bukuBesar = await download({ akunId: akun.akun, startDate, endDate });

    worksheet.addRow([`AKUN: ${akun.akun}`]);
    const currentRowIdx = worksheet.rowCount;
    const endColumnIdx = worksheet.columnCount;
    worksheet.mergeCells(currentRowIdx, 1, currentRowIdx, endColumnIdx);
    worksheet.getRow(currentRowIdx + 1).values = ['Tanggal', 'Keterangan', 'Ref', 'Debit', 'Kredit', 'Saldo'];

    worksheet.columns = [
      { key: 'date', width: 10 },
      { key: 'keterangan', width: 50 },
      { key: 'id', width: 10 },
      { key: 'debit', width: 10 },
      { key: 'credit', width: 10 },
      { key: 'currentSaldo', width: 10 },
    ];

    bukuBesar.forEach((akun) => {
      worksheet.addRow(akun);
    });
    worksheet.addRow([]);
  }

  // worksheet.getRow(1).eachCell((cell) => {
  //   cell.font = { bold: true };
  // });

  // -------

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
    res.setHeader('Content-Disposition', `attachment; filename=neraca-saldo.xlsx`);

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
