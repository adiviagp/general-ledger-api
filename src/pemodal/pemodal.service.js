const {
  findPemodals,
  findPemodalById,
  insertPemodal,
  deletePemodal,
  editPemodal,
  totalPemodals,
  findPaginatePemodals,
} = require('./pemodal.repository');

const getAllPemodals = async (params) => {
  const pemodals = await findPemodals(params);
  const total = await totalPemodals();

  return {
    data: pemodals,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginatePemodals = async (params) => {
  const pemodals = await findPaginatePemodals(params);
  const total = await totalPemodals();
  const totalPage = Math.ceil(total / params.limit);

  return {
    data: pemodals,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getPemodalById = async (id) => {
  const pemodal = await findPemodalById(id);

  if (!pemodal) {
    throw new Error('pemodal not found');
  }

  return pemodal;
};

const createPemodal = async (newPemodalData) => {
  const pemodal = await insertPemodal(newPemodalData);

  return pemodal;
};

const deletePemodalById = async (id) => {
  await getPemodalById(id);

  await deletePemodal(id);
};

const editPemodalById = async (id, pemodalData) => {
  await getPemodalById(id);

  const pemodal = await editPemodal(id, pemodalData);

  return pemodal;
};

module.exports = {
  getAllPemodals,
  getPaginatePemodals,
  getPemodalById,
  createPemodal,
  deletePemodalById,
  editPemodalById,
};
