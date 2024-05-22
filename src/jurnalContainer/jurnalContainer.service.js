const {
  findJurnalContainers,
  findJurnalContainerById,
  deleteJurnalContainer,
  totalJurnalContainers,
  findPaginateJurnalContainers,
} = require('./jurnalContainer.repository');

const getAllJurnalContainers = async () => {
  const jurnalContainers = await findJurnalContainers();
  const total = await totalJurnalContainers();

  return {
    data: jurnalContainers,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginateJurnalContainers = async (params) => {
  const jurnalContainers = await findPaginateJurnalContainers(params);
  const total = await totalJurnalContainers(params);
  const totalPage = Math.ceil(total / params.limit);

  return {
    data: jurnalContainers,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getJurnalContainerById = async (id) => {
  const jurnalContainer = await findJurnalContainerById(id);

  if (!jurnalContainer) {
    throw new Error('jurnalContainer not found');
  }

  return jurnalContainer;
};


const deleteJurnalContainerById = async (id) => {
  await getJurnalContainerById(id);
  await deleteJurnalContainer(id);
};


module.exports = {
  getAllJurnalContainers,
  getPaginateJurnalContainers,
  getJurnalContainerById,
  deleteJurnalContainerById,
};
