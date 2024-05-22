const prisma = require('../db');

const findPaginateTenantJenis = async ({ page, limit, skip }) => {
  const tenantJenis = await prisma.tenantJenis.findMany({
    take: parseInt(limit),
    skip: skip,
  });
  return tenantJenis;
};

const findTenantJenis = async () => {
  const tenantJenis = await prisma.tenantJenis.findMany();
  return tenantJenis;
};

const totalTenantJenis = async () => {
  const resultCount = await prisma.tenantJenis.count();
  return resultCount;
};

const findTenantJenisById = async (tenantJenis) => {
  const tenantJenisfind = await prisma.tenantJenis.findUnique({
    where: {
      tenantJenis,
    },
  });

  return tenantJenisfind;
};

const insertTenantJenis = async (tenantJenisData) => {
  const tenantJenis = await prisma.tenantJenis.create({
    data: tenantJenisData,
  });

  return tenantJenis;
};

const deleteTenantJenis = async (tenantJenis) => {
  await prisma.tenantJenis.delete({
    where: {
      tenantJenis,
    },
  });
  // DELETE FROM TenantJenis WHERE id = {TenantJenisId}
};

const editTenantJenis = async (id, tenantJenisData) => {
  const tenantJenis = await prisma.tenantJenis.update({
    where: {
      tenantJenis,
    },
    data: tenantJenisData
  });

  return tenantJenis;
};

module.exports = {
  findTenantJenis,
  findPaginateTenantJenis,
  totalTenantJenis,
  findTenantJenisById,
  insertTenantJenis,
  deleteTenantJenis,
  editTenantJenis,
};
