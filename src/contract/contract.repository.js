const prisma = require('../db');

const findPaginateContracts = async ({ page, limit, skip, tenantId }) => {
  let cond = {};
  if (tenantId) cond = { ...cond, tenantId: parseInt(tenantId) };

  const contracts = await prisma.contract.findMany({
    take: parseInt(limit),
    skip: skip,
    where: cond,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tenantJenis: true,
      pembayaran: true
    },
  });
  return contracts;
};

const findContracts = async ({ tenantId }) => {
  let cond = {};
  if (tenantId) cond = { ...cond, tenantId: parseInt(tenantId) };

  const contracts = await prisma.contract.findMany({
    where: cond,
  });
  return contracts;
};

const totalContracts = async (id) => {
  let cond = {};
  if (id) cond = { ...cond, tenantId: parseInt(id) };

  const resultCount = await prisma.contract.count({
    where: cond,
  });
  return resultCount;
};

const findContractById = async (contract) => {
  const contractfind = await prisma.contract.findUnique({
    where: {
      id: contract,
    },
    include: {
      pembayaran: true,
    },
  });

  return contractfind;
};

const insertContract = async (contractData) => {
  const contract = await prisma.contract.create({
    data: contractData,
  });

  return contract;
};

const insertPembayaran = async (data) => {
  const contract = await prisma.pembayaran.createMany({
    data: data,
  });

  return contract;
};

const deleteContract = async (contract) => {
  await prisma.contract.delete({
    where: {
      id: contract,
    },
  });
  // DELETE FROM Contracts WHERE id = {ContractId}
};

const editContract = async (id, contractData, pembayaranData, tenantId) => {
  let cond = {
    isActive: true,
  };
  if (tenantId) cond = { ...cond, tenantId: parseInt(tenantId) };

  await prisma.contract.updateMany({
    where: cond,
    data: {
      isActive: false
    },
  });

  await prisma.contract.update({
    where: {
      id: id,
    },
    data: {
      ...contractData,
      pembayaran: {
        deleteMany: {},
      },
    },
  });

  const contract = await prisma.pembayaran.createMany({
    data: pembayaranData,
  });

  return contract;
};

module.exports = {
  findContracts,
  findPaginateContracts,
  totalContracts,
  findContractById,
  insertContract,
  deleteContract,
  editContract,
  insertPembayaran,
};
