const prisma = require('../db');

const findLabaRugi = async ({ startDate, endDate, tipe }) => {
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

  const labarugi = await prisma.labarugi.findMany({
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
  return labarugi;
};

const findSetting = async ({ startDate, endDate, tipe }) => {
  let cond = {};
  if (tipe) {
    cond = {
      ...cond,
      tipe: tipe,
    };
  }

  const labarugi = await prisma.labarugi.findMany({
    where: cond
  });
  return labarugi;
};

const totalAkuns = async () => {
  const resultCount = await prisma.labarugi.count();
  return resultCount;
};

const insertSetting = async (datas) => {

  await prisma.labarugi.deleteMany()
  const jurnal = await prisma.labarugi.createMany({
    data: datas,
  });
  return jurnal;
};


module.exports = {
  findLabaRugi,
  totalAkuns,
  findSetting,
  insertSetting
};
