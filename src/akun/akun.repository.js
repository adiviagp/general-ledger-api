const prisma = require('../db');

const findPaginateAkuns = async ({ page, limit, skip, akunId }) => {
  let cond = {};
  if (akunId) cond = { ...cond, akun: akunId };

  const akuns = await prisma.akun.findMany({
    take: parseInt(limit),
    skip: skip,
    orderBy: {
      akun: 'asc',
    },
    where: cond,
  });
  return akuns;
};

const findAkuns = async ({ akunId }) => {
  let cond = {};
  if (akunId) cond = { ...cond, akun: akunId };

  const akuns = await prisma.akun.findMany({
    orderBy: {
      akun: 'asc',
    },
    where: cond,
  });
  return akuns;
};

const totalAkuns = async ({ akunId }) => {
  let cond = {};
  if (akunId) cond = { ...cond, akun: akunId };

  const resultCount = await prisma.akun.count({
    where: cond,
  });
  return resultCount;
};

const findAkunById = async (akun) => {
  const akunfind = await prisma.akun.findUnique({
    where: {
      id: akun,
    },
  });

  return akunfind;
};

const insertAkun = async (akunData) => {
  const akun = await prisma.akun.create({
    data: {
      akun: akunData.akun,
      label: akunData.label,
      posisi: akunData.posisi,
      saldoAwal: parseInt(akunData.saldoAwal),
    },
  });

  return akun;
};

const deleteAkun = async (id) => {
  await prisma.akun.delete({
    where: {
      id: id,
    },
  });
  // DELETE FROM Akuns WHERE id = {AkunId}
};

const editAkun = async (id, akunData) => {
  const akun = await prisma.akun.update({
    where: {
      id: id,
    },
    data: {
      label: akunData.label,
      posisi: akunData.posisi,
      saldoAwal: parseInt(akunData.saldoAwal),
    },
  });

  return akun;
};

module.exports = {
  findAkuns,
  findPaginateAkuns,
  totalAkuns,
  findAkunById,
  insertAkun,
  deleteAkun,
  editAkun,
};
