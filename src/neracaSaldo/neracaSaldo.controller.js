const express = require('express');
const { getAllNeracaSaldo, download, getSewaDiterimaDimuka, getDeposito } = require('./neracaSaldo.service');
const excelJS = require('exceljs');

const router = express.Router();

router.get('/', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getAllNeracaSaldo({ startDate, endDate });
  res.json(akuns);
});

router.get('/sewa-diterima-dimuka', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getSewaDiterimaDimuka({ startDate, endDate });
  res.json(akuns);
});

router.get('/deposit', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await getDeposito({ startDate, endDate });
  res.json(akuns);
});

router.get('/download-excel', async (req, res) => {
  let { startDate, endDate } = req.query;

  let akuns = null;
  akuns = await download({ startDate, endDate });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Neraca Saldo');

  worksheet.addRow([]);
  worksheet.mergeCells('A1', 'D1');

  worksheet.mergeCells('A2', 'D3');
  worksheet.getCell('A2').value = 'NERACA SALDO';
  worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A4', 'D4');
  worksheet.getCell('A4').value = `${startDate}   -   ${endDate}`;
  worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getColumn(3).width = 80;
  worksheet.getColumn(4).width = 80;
  worksheet.addRow([]);

  worksheet.getRow(worksheet.rowCount + 1).values = ['No Akun', 'Nama Akun', 'Debit', 'Kredit'];

  worksheet.columns = [
    { key: 'akun', width: 10 },
    { key: 'label', width: 50 },
    { key: 'totalDebit', width: 10 },
    { key: 'totalCredit', width: 10 },
  ];

  akuns.forEach((akun) => {
    worksheet.addRow(akun);
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
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

router.post('/download-csv', async (req, res) => {
  const User = [
    { fname: 'Amir', lname: 'Mustafa', email: 'amir@gmail.com', gender: 'Male' },
    {
      fname: 'Ashwani',
      lname: 'Kumar',
      email: 'ashwani@gmail.com',
      gender: 'Male',
    },
    { fname: 'Nupur', lname: 'Shah', email: 'nupur@gmail.com', gender: 'Female' },
    {
      fname: 'Himanshu',
      lname: 'Mewari',
      email: 'amir@gmail.com',
      gender: 'Male',
    },
    {
      fname: 'Vankayala',
      lname: 'Sirisha',
      email: 'sirisha@gmail.com',
      gender: 'Female',
    },
  ];

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Users');

  worksheet.columns = [
    { header: 'S no.', key: 's_no', width: 10 },
    { header: 'First Name', key: 'fname', width: 10 },
    { header: 'Last Name', key: 'lname', width: 10 },
    { header: 'Email Id', key: 'email', width: 10 },
    { header: 'Gender', key: 'gender', width: 10 },
  ];

  let counter = 1;

  User.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user);
    counter++;
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
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
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=users.csv`);

    return workbook.csv.write(res).then(() => {
      res.status(200);
    });

    // await workbook.xlsx.writeFile(`${path}/users.xlsx`).then(() => {
    //   res.send({
    //     status: "success",
    //     message: "file successfully downloaded",
    //     path: `${path}/users.xlsx`,
    //   });
    // });
  } catch (err) {
    res.send({
      status: 'error',
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
