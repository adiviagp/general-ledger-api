const express = require('express');
const { getAllTenants, getTenantById, createTenant, deleteTenantById, editTenantById, getPaginateTenants } = require('./tenant.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let tenants = null;
  let { page = 1, limit = 10, name, tenantTypeId, tenantJenisId, status, pembayaran } = req.query;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    tenants = await getPaginateTenants({ page, limit, skip, name, tenantTypeId, tenantJenisId, status, pembayaran });
    res.json(tenants);
  } else {
    tenants = await getAllTenants({name, tenantTypeId, tenantJenisId, status, pembayaran});
    res.json(tenants);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tenantId = parseInt(req.params.id);
    const tenant = await getTenantById(tenantId);
    res.send(tenant);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTenantData = req.body;

    const tenant = await createTenant(newTenantData);

    res.send({
      data: tenant,
      message: 'create tenant success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tenantId = req.params.id; // string

    await deleteTenantById(parseInt(tenantId));

    res.send('tenant deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const tenantId = req.params.id;
  const tenantData = req.body;


  if (!tenantData.name) {
    return res.status(400).send('Some fields are missing');
  }

  try {
    const tenant = await editTenantById(parseInt(tenantId), tenantData);

    res.send({
      data: tenant,
      message: 'edit tenant success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
