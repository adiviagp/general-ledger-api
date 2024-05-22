const moment = require('moment');
const { findTenants, findTenantById, insertTenant, deleteTenant, editTenant, totalTenants, findPaginateTenants } = require('./tenant.repository');

const getAllTenants = async (params) => {
  let tenants = await findTenants(params);
  const total = await totalTenants(params);

  if (params?.status || params?.pembayaran) {
    tenants = tenants.filter((tenant) => tenant?.contracts?.length > 0 && tenant?.contracts[0]?.isPaid === params?.pembayaran);
  }

  return {
    data: tenants,
    current_page: 1,
    total_page: 1,
    total_data: total,
  };
};

const getPaginateTenants = async (params) => {
  let tenants = await findPaginateTenants(params);
  const total = await totalTenants(params);
  const totalPage = Math.ceil(total / params.limit);

  if (params?.status || params?.pembayaran || params?.tenantJenisId) {
    tenants = tenants.filter((tenant) => {
      let res = false;
      let resPembayaran = false;
      let resJenis = false;

      if (tenant.contracts?.length > 0) {
        const firstContract = tenant.contracts[0];
        
        // 
        if (firstContract && params?.status) {
          const jarakKontrak = moment(firstContract.endDate).diff(moment(), 'days');
          if (jarakKontrak <= 0) {
            res = params.status === 'Telah Berakhir';
          } else if (jarakKontrak <= 30) {
            res = params.status === 'Segera Berakhir';
          } else {
            res = params.status === 'Sedang Berjalan';
          }
        } else {
          res = !res;
        }

        // 
        if (firstContract && params?.pembayaran) {
          resPembayaran = firstContract.isPaid === params?.pembayaran;
        } else {
          resPembayaran = !resPembayaran;
        }

        // 
        if (firstContract && params?.tenantJenisId) {
          console.log("-----------");
          console.log(firstContract);
          console.log(params?.tenantJenisId);
          resJenis = firstContract.tenantJenisId == params?.tenantJenisId;
        } else {
          resJenis = !resJenis;
        }

        console.log({
          res: res,
          resPembayaran: resPembayaran,
          resJenis: resJenis
        });

        return res && resPembayaran && resJenis;
      }

      return false;
    });
  }

  return {
    data: tenants,
    current_page: params.page - 0,
    total_page: totalPage,
    total_data: total,
  };
};

const getTenantById = async (id) => {
  const tenant = await findTenantById(id);

  if (!tenant) {
    throw new Error('tenant not found');
  }

  return tenant;
};

const createTenant = async (newTenantData) => {
  const tenant = await insertTenant(newTenantData);

  return tenant;
};

const deleteTenantById = async (id) => {
  await getTenantById(id);

  await deleteTenant(id);
};

const editTenantById = async (id, tenantData) => {
  await getTenantById(id);

  const tenant = await editTenant(id, tenantData);
  return tenant;
};

module.exports = {
  getAllTenants,
  getPaginateTenants,
  getTenantById,
  createTenant,
  deleteTenantById,
  editTenantById,
};
