const checkTenantJenisAkun = (tenantJenisId) => {
  if (tenantJenisId === 1) return '220-01';
  if (tenantJenisId === 2) return '220-02';
  if (tenantJenisId === 3) return '220-03';
  if (tenantJenisId === 4) return '220-04';
};

const checkTenantJenisLabel = (tenantJenisId) => {
    if (tenantJenisId === 1) return ' Office Space ';
    if (tenantJenisId === 2) return ' Executive Office ';
    if (tenantJenisId === 3) return ' Virtual Office ';
    if (tenantJenisId === 4) return ' Co Working ';
  };
module.exports  = { checkTenantJenisAkun, checkTenantJenisLabel };
