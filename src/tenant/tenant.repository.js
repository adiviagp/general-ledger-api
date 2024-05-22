const prisma = require('../db');

const findPaginateTenants = async ({ page, limit, skip, name, tenantTypeId, tenantJenisId, status, pembayaran }) => {
  let cond = {};
  if (tenantTypeId) cond = { ...cond, tenantTypeId: parseInt(tenantTypeId) };
  if (name) cond = { ...cond, name: { contains: name }};

  const tenants = await prisma.tenant.findMany({
    take: parseInt(limit),
    skip: skip,
    orderBy: {
      createdAt: 'desc',
    },
    where: cond,
    include: {
      tenantType: true,
      contracts: {
        where: {
          isActive: true
        },
        include: {
          tenantJenis: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return tenants;
};

const findTenants = async ({name, tenantTypeId, tenantJenisId, status, pembayaran}) => {
  let cond = {};
  if (tenantTypeId) cond = { ...cond, tenantTypeId: parseInt(tenantTypeId) };
  if (name) cond = { ...cond, name: { contains: name} };

  const tenants = await prisma.tenant.findMany({
    include: {
      tenantType: true,
      contracts: {
        where: {
          isActive: true
        },
        include: {
          tenantJenis: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
    where: cond,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return tenants;
};

const totalTenants = async ({name, tenantTypeId, tenantJenisId, status, pembayaran}) => {
  let cond = {};
  if (tenantTypeId) cond = { ...cond, tenantTypeId: parseInt(tenantTypeId) };
  if (name) cond = { ...cond, name: { contains: name} };

  const resultCount = await prisma.tenant.count({
    where: cond,
  });
  return resultCount;
};

const findTenantById = async (id) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      id,
    },
    include: {
      tenantType: true,
    },
  });
  return tenant;
};

const insertTenant = async (tenantData) => {
  const tenant = await prisma.tenant.create({
    data: tenantData,
  });

  return tenant;
};

const deleteTenant = async (id) => {


  await prisma.jurnal.deleteMany({
    where: {
      tenantId: id
    }
  })

  await prisma.contract.deleteMany({
    where: {
      tenantId: id
    }
  })

  const data = await prisma.tenant.delete({
    where: {
      id,
    },
  });

  return data
};

const editTenant = async (id, tenantData) => {
  const tenant = await prisma.tenant.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: tenantData.name,
      contactName: tenantData.contactName,
      contactPosition: tenantData.contactPosition,
      nik: tenantData.nik,
      npwp: tenantData.npwp,
      noTelp: tenantData.noTelp,
      noNIB: tenantData.noNIB,
      noAkte: tenantData.noAkte,
    },
  });

  return tenant;
};

module.exports = {
  findPaginateTenants,
  findTenants,
  totalTenants,
  findTenantById,
  insertTenant,
  deleteTenant,
  editTenant,
};
