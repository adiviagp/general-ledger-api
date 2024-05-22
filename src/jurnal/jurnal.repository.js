const prisma = require('../db');

const findPaginateJurnals = async ({ page, limit, skip, akunId, startDate, endDate }) => {
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
    take: parseInt(limit),
    skip: skip,
    where: cond,
    include: {
      jurnalContainer: true,
    },
  });
  return jurnals;
};

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

const totalJurnals = async ({ akunId, startDate, endDate }) => {
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

  const resultCount = await prisma.jurnal.count({
    where: cond,
  });
  return resultCount;
};

const findJurnalById = async (jurnal) => {
  const jurnalfind = await prisma.jurnal.findUnique({
    where: {
      id: jurnal,
    },
  });

  return jurnalfind;
};

const findJurnalContainerById = async (jurnal) => {
  const jurnalfind = await prisma.jurnalContainer.findUnique({
    where: {
      id: jurnal,
    },
  });

  return jurnalfind;
};

const insertJurnal = async (tipe, tenantId, user_id, date, keterangan, jurnalData) => {
  const jurnalContainer = await prisma.jurnalContainer.create({
    data: {
      tipe: tipe,
      userId: user_id,
      keterangan: keterangan,
      tenantId: tenantId,
      date: new Date(date).toISOString(),
    },
  });

  // *MASUKIN ID DARI JURNAL CONTAINER KE MASING MASING JURNAL
  let jurnalReformat = [];
  jurnalData.map((jurnal) => {
    jurnalReformat.push({
      ...jurnal,
      jurnalContainerId: jurnalContainer?.id,
    });
  });

  const jurnal = await prisma.jurnal.createMany({
    data: jurnalReformat,
  });

  return jurnal;
};

const insertJurnalUpdate = async (jurnalData) => {
  const jurnal = await prisma.jurnal.createMany({
    data: jurnalData,
  });
  return jurnal;
};

const deleteJurnal = async (id) => {
  await prisma.jurnalContainer.delete({
    where: {
      id: id,
    },
  });
  // DELETE FROM Jurnals WHERE id = {JurnalId}
};

const editJurnal = async (id, jurnalData) => {
  const jurnal = await prisma.jurnal.update({
    where: {
      id: id,
    },
    data: jurnalData,
  });

  return jurnal;
};

const editJurnalMany = async (id, jurnalData) => {
  const jurnal = await prisma.jurnal.updateMany({
    where: {
      id: id,
    },
    data: jurnalData,
  });

  return jurnal;
};

const deleteBeforeUpdateRepo = async ({ jurnal_container_id, keterangan, jurnals }) => {
  await prisma.jurnalContainer.update({
    where: {
      id: jurnal_container_id,
    },
    data: {
      keterangan: keterangan,
      jurnals: {
        deleteMany: {},
      },
    },
  });

  const jurnal = await prisma.jurnal.createMany({
    data: jurnals,
  });

  return jurnal;
};

module.exports = {
  findJurnals,
  findPaginateJurnals,
  totalJurnals,
  findJurnalById,
  insertJurnal,
  editJurnalMany,
  deleteJurnal,
  editJurnal,
  insertJurnalUpdate,
  deleteBeforeUpdateRepo,
  findJurnalContainerById,
};
