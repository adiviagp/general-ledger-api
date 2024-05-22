const prisma = require('../db');

const findJurnals = async ({ akunId, startDate, endDate }) => {
  let cond = {};
  if (akunId) cond = { ...cond, akunId: akunId };
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const jurnals = await prisma.jurnal.findMany({
    where: cond,
    include: {
      jurnalContainer: true,
      akun: true,
    },
  });
  return jurnals;
};

module.exports = {
  findJurnals,
};
