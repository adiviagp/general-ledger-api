const {
  findAkuns,
  findAkunById,
  insertAkun,
  deleteAkun,
  editAkun,
  totalAkuns,
  findPaginateAkuns,
} = require('./akun.repository');

const getAllAkuns = async (params) => {
  const akuns = await findAkuns(params);
  const total = await totalAkuns(params);

  return {
    data: akuns,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginateAkuns = async (params) => {
  const akuns = await findPaginateAkuns(params);
  const total = await totalAkuns(params);
  const totalPage = Math.ceil(total / params.limit);

  return {
    data: akuns,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getAkunById = async (id) => {
  const akun = await findAkunById(id);

  if (!akun) {
    throw new Error('akun not found');
  }

  return akun;
};


const createAkun = async (newAkunData) => {
  const akun = await insertAkun(newAkunData);

  return akun;
};

const deleteAkunById = async (id) => {
  await getAkunById(id);

  await deleteAkun(id);
};

const editAkunById = async (id, akunData) => {
  await getAkunById(id);

  const akun = await editAkun(id, akunData);

  return akun;
};

module.exports = {
  getAllAkuns,
  getPaginateAkuns,
  getAkunById,
  createAkun,
  deleteAkunById,
  editAkunById,
};
