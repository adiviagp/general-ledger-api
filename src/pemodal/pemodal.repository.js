const prisma = require('../db');

const findPaginatePemodals = async ({ page, limit, skip, name }) => {
  let cond = {};
  if (name) cond = { ...cond, name: { contains: name, mode: 'insensitive'} };

  const pemodals = await prisma.pemodal.findMany({
    take: parseInt(limit),
    skip: skip,
    orderBy: {
      name: 'asc',
    },
    where: cond,

  });
  return pemodals;
};

const findPemodals = async ({name}) => {
  let cond = {};
  if (name) cond = { ...cond, name: { contains: name, mode: 'insensitive'} };

  const pemodals = await prisma.pemodal.findMany({
    orderBy: {
      name: 'asc',
    },
    where: cond,

  });
  return pemodals;
};

const totalPemodals = async () => {
  const resultCount = await prisma.pemodal.count();
  return resultCount;
};

const findPemodalById = async (pemodal) => {
  const pemodalfind = await prisma.pemodal.findUnique({
    where: {
      id: pemodal,
      
    },
  });

  return pemodalfind;
};

const insertPemodal = async (pemodalData) => {
  const pemodal = await prisma.pemodal.create({
    data: {
      name: pemodalData.name,
    },
  });

  return pemodal;
};

const deletePemodal = async (pemodal) => {
  await prisma.pemodal.delete({
    where: {
      id: pemodal,
    },
  });
};

const editPemodal = async (id, pemodalData) => {
  const pemodal = await prisma.pemodal.update({
    where: {
      id: id,
    },
    data: {
      name: pemodalData.name,
    },
  });

  return pemodal;
};

module.exports = {
  findPemodals,
  findPaginatePemodals,
  totalPemodals,
  findPemodalById,
  insertPemodal,
  deletePemodal,
  editPemodal,
};
