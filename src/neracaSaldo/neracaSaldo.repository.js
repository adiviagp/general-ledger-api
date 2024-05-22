const prisma = require('../db');

const findAkuns = async ({startDate, endDate}) => {
  let cond = {};
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const akuns = await prisma.akun.findMany({
    orderBy: {
      akun: 'asc',
    },
    include: {
      jurnals: {
        where: cond,
      },
    },
  });
  return akuns;
};

const findSewaDiterimaDimuka = async ({startDate, endDate}) => {
  let cond = {
    akunId: '220-10'
  };
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const akuns = await prisma.tenant.findMany({
    include: {
      contracts: {
        where: {
          isActive: true
        },
        include: {
          tenantJenis: true
        }
      },
      jurnals: {
        where: cond,
        include: {
          akun: true
        }
      },
    },
  });
  return akuns;
};

const findDeposito = async ({startDate, endDate}) => {
  let cond = {
    akunId: '220-20'
  };
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const akuns = await prisma.tenant.findMany({
    include: {
      contracts: {
        where: {
          isActive: true
        },
        include: {
          tenantJenis: true
        }
      },
      jurnals: {
        where: cond,
        include: {
          akun: true
        }
      },
    },
  });
  return akuns;
};

const totalAkuns = async () => {
  const resultCount = await prisma.akun.count();
  return resultCount;
};

module.exports = {
  findAkuns,
  findSewaDiterimaDimuka,
  findDeposito,
  totalAkuns,
};
