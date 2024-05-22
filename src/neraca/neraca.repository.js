const prisma = require('../db');

const findNeraca = async ({ startDate, endDate, tipe }) => {
  let condJurnal = {};
  let cond = {};
  if (startDate && endDate) {
    condJurnal = {
      ...condJurnal,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }
  if (tipe) {
    cond = {
      ...cond,
      tipe: tipe,
    };
  }

  const neraca = await prisma.neraca.findMany({
    include: {
      akun: {
        include: {
          jurnals: {
            where: condJurnal
          },
        },
      },
    },
    where: cond
  });
  return neraca;
};

const findSetting = async ({ startDate, endDate, tipe }) => {
  let cond = {};
  if (tipe) {
    cond = {
      ...cond,
      tipe: tipe,
    };
  }

  const neraca = await prisma.neraca.findMany({
    where: cond
  });
  return neraca;
};

const totalAkuns = async () => {
  const resultCount = await prisma.neraca.count();
  return resultCount;
};

const insertSetting = async (datas) => {

  await prisma.neraca.deleteMany()
  const jurnal = await prisma.neraca.createMany({
    data: datas,
  });
  return jurnal;
};


module.exports = {
  findNeraca,
  totalAkuns,
  findSetting,
  insertSetting
};
