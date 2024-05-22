const {
  findTenantJenis,
  findTenantJenisById,
  insertTenantJenis,
  deleteTenantJenis,
  editTenantJenis,
  totalTenantJenis,
  findPaginateTenantJenis,
} = require('./jenis.repository');

const getAllTenantJenis = async (params) => {
  const tenantJenis = await findTenantJenis(params);
  const total = await totalTenantJenis();

  return {
    data: tenantJenis,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginateTenantJenis = async (params) => {
  const tenantJenis = await findPaginateTenantJenis(params);
  const total = await totalTenantJenis();
  const totalPage = Math.ceil(total / params.limit);

  return {
    data: tenantJenis,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getTenantJenisById = async (id) => {
  const TenantJenis = await findTenantJenisById(id);

  if (!TenantJenis) {
    throw new Error('TenantJenis not found');
  }

  return TenantJenis;
};

const createTenantJenis = async (newTenantJenisData) => {
  const TenantJenis = await insertTenantJenis(newTenantJenisData);

  return TenantJenis;
};

const deleteTenantJenisById = async (id) => {
  await getTenantJenisById(id);

  await deleteTenantJenis(id);
};

const editTenantJenisById = async (id, TenantJenisData) => {
  await getTenantJenisById(id);

  const TenantJenis = await editTenantJenis(id, TenantJenisData);

  return TenantJenis;
};

module.exports = {
  getAllTenantJenis,
  getPaginateTenantJenis,
  getTenantJenisById,
  createTenantJenis,
  deleteTenantJenisById,
  editTenantJenisById,
};
