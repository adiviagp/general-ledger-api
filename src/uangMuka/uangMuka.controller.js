const express = require('express');
const { getRekapKontrak } = require('./uangMuka.service');
const excelJS = require('exceljs');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {
  let { startDate, endDate, selectedYear, tenantJenisId } = req.query;

  let akuns = null;
  akuns = await getRekapKontrak({ startDate, endDate, selectedYear, tenantJenisId });
  res.json(akuns);
});

router.get('/download-excel', async (req, res) => {
  let { startDate, endDate, selectedYear, tenantJenisId } = req.query;
  const kontrak = await getRekapKontrak({ startDate, endDate, selectedYear, tenantJenisId });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Rekap Kontrak');

  worksheet.addRow([]);
  worksheet.mergeCells('A1', 'P1');

  worksheet.mergeCells('A2', 'P3');
  worksheet.getCell('A2').value = 'REKAP KONTRAK';
  worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A4', 'P4');
  worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
  worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.getColumn(1).width = 25;
  worksheet.getColumn(2).width = 30;
  worksheet.getColumn(3).width = 25;

  worksheet.getColumn(4).width = 25;
  worksheet.getColumn(5).width = 25;
  worksheet.getColumn(6).width = 25;
  worksheet.getColumn(7).width = 25;
  worksheet.getColumn(8).width = 25;
  worksheet.getColumn(9).width = 25;
  worksheet.getColumn(10).width = 25;
  worksheet.getColumn(11).width = 25;
  worksheet.getColumn(12).width = 25;
  worksheet.getColumn(13).width = 25;
  worksheet.getColumn(14).width = 25;
  worksheet.getColumn(15).width = 25;

  worksheet.getColumn(16).width = 30;


  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = [
    'Penyewa',
    'Periode Kontrak',
    'Sisa Uang Muka Tahun Lalu',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
    'Sisa Uang Muka Tahun Berjalan',
  ];

  worksheet.getCell('A' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('B' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('C' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('D' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('E' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('F' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('G' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('H' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('I' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('J' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('K' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('L' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('M' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('N' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('O' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };
  worksheet.getCell('P' + worksheet.rowCount).fill = { type: 'pattern', pattern: 'mediumGray' };


  kontrak.data?.forEach((data, index) => {
    worksheet.getRow(worksheet.rowCount + 1).values = [
      data?.tenant?.name,
      `${moment(data.startDate).format('YYYY-MM-DD')} - ${moment(data.endDate).format('YYYY-MM-DD')}`,
      data.tahunLaluUM,
      data.januari,
      data.februari,
      data.maret,
      data.april,
      data.mei,
      data.juni,
      data.juli,
      data.agustus,
      data.september,
      data.oktober,
      data.november,
      data.desember,
      data.tahunBerjalanUM,
    ];
  });

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
    res.setHeader('Content-Disposition', `attachment; filename=rekap-kontrak.xlsx`);

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
