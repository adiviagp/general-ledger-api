const { checkTenantJenisAkun, checkTenantJenisLabel } = require('../../utils/akunExist');
const { findAkunById, insertAkun } = require('../akun/akun.repository');
const { findTenantById } = require('../tenant/tenant.repository');
const {
  findContracts,
  findContractById,
  insertContract,
  deleteContract,
  editContract,
  totalContracts,
  findPaginateContracts,
  insertPembayaran,
} = require('./contract.repository');

const getAllContracts = async (params) => {
  const contracts = await findContracts(params);
  // const total = await totalContracts();

  return {
    data: contracts,
    current_page: 1,
    total_page: 1,
    // total_data: total,
  };
};

const getPaginateContracts = async (params) => {
  const contracts = await findPaginateContracts(params);
  // const total = await totalContracts(params);
  // const totalPage = Math.ceil(total / params.limit);

  return {
    data: contracts,
    current_page: params.page - 0,
    // total_page: totalPage,
    // total_data: total,
  };
};

const getContractById = async (id) => {
  
  const contract = await findContractById(id);

  if (!contract) {
    throw new Error('contract not found');
  }

  return contract;
};

const createContract = async (newContractData) => {
  
  const contract = await insertContract(newContractData);

  // * CHECK APAKAH AKUN TENANT EXIST, IF NOT CREATE ONE
  // const tenant  = await findTenantById(newContractData.tenantId)
  // const isAkunExist = await findAkunById(checkTenantJenisAkun(newContractData.tenantJenisId) + "-" + newContractData.tenantId)
 
  // let responseAkun = null
  // // * KETIKA BIKIN CONTRACT BARU, CHECK APAKAH AKUN SUDAH ADA ATAU BELUM. KALAU BELUM TAMBAH AKUN BARU
  // if(!isAkunExist) {
  //   const newAkunData = {
  //     akun: checkTenantJenisAkun(newContractData.tenantJenisId) + "-" + newContractData.tenantId,
  //     label: "Sewa Diterima Dimuka " + checkTenantJenisLabel(newContractData.tenantJenisId) + tenant?.name,
  //     posisi: "Credit"
  //   }
  //   responseAkun = await insertAkun(newAkunData)
  // }
  return contract;
};

const createPembayaran = async (newContractData) => {
  const data = await insertPembayaran(newContractData);
  return data;
};

const deleteContractById = async (id) => {
  await getContractById(id);

  await deleteContract(id);
};

const editContractById = async (id, contractData) => {
  await getContractById(id);

  let kontrak = {
    tenggatPembayaran: new Date(contractData?.kontrak?.tenggatPembayaran?.startDate).toISOString(),
    keterangan: contractData?.kontrak?.keterangan,
    noGedung: contractData?.kontrak?.noGedung,
    isPaid: contractData?.kontrak?.isPaid,
    isActive: contractData?.kontrak?.isActive,
  }

  let tenantId = contractData?.kontrak?.tenantId;
  let pembayaran = contractData?.pembayaran;

  const contract = await editContract(id, kontrak, pembayaran, tenantId);

  return contract;
};

module.exports = {
  getAllContracts,
  getPaginateContracts,
  getContractById,
  createContract,
  deleteContractById,
  editContractById,
  createPembayaran
};
