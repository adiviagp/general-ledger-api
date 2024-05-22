const prisma = require('../db');

const findPaginateJurnalContainers = async ({ page, limit, skip, startDate, endDate, tipe }) => {
  let cond = {};
  if (tipe) cond = { ...cond, tipe: tipe };
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const jurnalContainers = await prisma.jurnalContainer.findMany({
    take: parseInt(limit),
    skip: skip,
    where: cond,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return jurnalContainers;
};

const findJurnalContainers = async () => {
  const jurnalContainers = await prisma.jurnalContainer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return jurnalContainers;
};

const totalJurnalContainers = async ({ startDate, endDate, tipe }) => {
  let cond = {};
  if (tipe) cond = { ...cond, tipe: tipe };
  if (startDate && endDate) {
    cond = {
      ...cond,
      date: {
        gte: new Date(startDate).toISOString(), // "2022-01-15T00:00:00.000Z"
        lte: new Date(endDate).toISOString(), // "2022-01-30T00:00:00.000Z"
      },
    };
  }

  const resultCount = await prisma.jurnalContainer.count({
    where: cond,
  });
  return resultCount;
};

const findJurnalContainerById = async (jurnalContainer) => {
  const jurnalContainerfind = await prisma.jurnalContainer.findUnique({
    where: {
      id: jurnalContainer,
    },
    include: {
      jurnals: {
        include: {
          akun: true
        }
      }
    }
  });

  return jurnalContainerfind;
};

const insertJurnalContainer = async (tipe, user_id, date, jurnalContainerData) => {
  const jurnalContainerContainer = await prisma.jurnalContainerContainer.create({
    data: {
      tipe: tipe,
      userId: user_id,
      date: new Date(date).toISOString()
    },
  });

  // *MASUKIN ID DARI JURNAL CONTAINER KE MASING MASING JURNAL
  let jurnalContainerReformat = [];
  jurnalContainerData.map((jurnalContainer) => {
    jurnalContainerReformat.push({
      ...jurnalContainer,
      jurnalContainerContainerId: jurnalContainerContainer?.id,
    });
  });

  const jurnalContainer = await prisma.jurnalContainer.createMany({
    data: jurnalContainerReformat,
  });

  return jurnalContainer;
};

const deleteJurnalContainer = async (jurnalContainer) => {
  await prisma.jurnalContainer.delete({
    where: {
      jurnalContainer,
    },
  });
  // DELETE FROM JurnalContainers WHERE id = {JurnalContainerId}
};


module.exports = {
  findJurnalContainers,
  findPaginateJurnalContainers,
  totalJurnalContainers,
  findJurnalContainerById,
  insertJurnalContainer,
  deleteJurnalContainer,
};
