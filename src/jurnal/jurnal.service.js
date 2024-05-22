const {
  findJurnals,
  findJurnalById,
  insertJurnal,
  deleteJurnal,
  editJurnal,
  totalJurnals,
  findPaginateJurnals,
  insertJurnalUpdate,
  deleteBeforeUpdateRepo,
  findJurnalContainerById,
} = require('./jurnal.repository');

const getAllJurnals = async (params) => {
  const jurnals = await findJurnals(params);
  const total = await totalJurnals(params);

  return {
    data: jurnals,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginateJurnals = async (params) => {
  const jurnals = await findPaginateJurnals(params);
  const total = await totalJurnals(params);
  const totalPage = Math.ceil(total / params.limit);

  return {
    data: jurnals,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getJurnalById = async (id) => {
  const jurnal = await findJurnalById(id);

  if (!jurnal) {
    throw new Error('jurnal not found');
  }

  return jurnal;
};

const getJurnalContainerById = async (id) => {
  const jurnal = await findJurnalContainerById(id);

  if (!jurnal) {
    throw new Error('jurnal container not found');
  }

  return jurnal;
};

const createJurnal = async (tipe, tenantId,  user_id, date, keterangan, jurnalData) => {
  const jurnal = await insertJurnal(tipe, tenantId, user_id, date, keterangan, jurnalData);

  return jurnal;
};

const createJurnalUpdate = async (jurnalData) => {
  const jurnal = await insertJurnalUpdate(jurnalData);

  return jurnal;
};

const deleteJurnalById = async (id) => {
  await getJurnalContainerById(id);
  await deleteJurnal(id);
};

const editJurnalById = async (id, jurnalData) => {
  await getJurnalById(id);

  const jurnal = await editJurnal(id, jurnalData);

  return jurnal;
};

const editJurnalMany = async (id, jurnalData) => {
  // await getJurnalById(id);

  const jurnal = await editJurnal(id, jurnalData);

  return jurnal;
};

const deleteBeforeUpdate = async (params) => {
  const jurnal = await deleteBeforeUpdateRepo(params);

  return jurnal;
};

module.exports = {
  getAllJurnals,
  getPaginateJurnals,
  getJurnalById,
  createJurnal,
  deleteJurnalById,
  editJurnalById,
  createJurnalUpdate,
  editJurnalMany,
  deleteBeforeUpdate,
  getJurnalContainerById
};
