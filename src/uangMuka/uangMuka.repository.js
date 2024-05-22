const prisma = require('../db');

const findAkuns = async ({ startDate, endDate }) => {
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

  const uangMuka = await prisma.tenant.findMany({
    include: {
      contracts: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        where: {
          endDate: {
            gte: new Date('2023-01-01').toISOString(), // "2022-01-15T00:00:00.000Z"
          },
        },
      },
    },
  });
  return uangMuka.filter((um) => um.contracts.length > 0);
};

// -----

const findRekapKontrak = async ({ startDate, endDate, selectedYear, tenantJenisId }) => {
  let cond = {};
  if (endDate) {
    cond = {
      ...cond,
      OR: [
        {
          startDate: {
            lte: new Date(endDate).toISOString(),
          },
          endDate: {
            gte: new Date(startDate).toISOString(),
          },
        },
        {
          startDate: {
            gte: new Date(startDate).toISOString(),
          },
          endDate: {
            lte: new Date(endDate).toISOString(),
          },
        },
      ],
    };
  }
  if (tenantJenisId) {
    console.log('tenantJenisId', tenantJenisId);
    cond = {
      ...cond,
      tenantJenisId: parseInt(tenantJenisId),
    };
  }

  const uangMuka = await prisma.contract.findMany({
    where: cond,
    include: {
      tenantJenis: true,
      tenant: {
        include: {
          jurnals: {
            where: {
              AND: [
                {
                  akunId: '220-10',
                },
              ],
              NOT: [
                {
                  bulan: null,
                  tahun: null,
                },
              ],
            },
          },
        },
      },
    },
  });
  return uangMuka;
};

const findRekapKontrakUM = async ({ startDate, endDate, contractId }) => {
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
  if(contractId){
    cond = {
      ...cond,
      contractId: parseInt(contractId)
    }
  }

  const uangMuka = await prisma.jurnal.findMany({
    where: cond,
    
  });
  return uangMuka;
};


const totalAkuns = async () => {
  const resultCount = await prisma.akun.count();
  return resultCount;
};

module.exports = {
  findAkuns,
  findRekapKontrak,
  totalAkuns,
  findRekapKontrakUM
};
