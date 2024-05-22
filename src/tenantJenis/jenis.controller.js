const express = require('express');
const { getAllTenantJenis, getTenantJenisById, createTenantJenis, deleteTenantJenisById, editTenantJenisById, getPaginateTenantJenis } = require('./jenis.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let TenantJenis = null;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    let { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    TenantJenis = await getPaginateTenantJenis({ page, limit, skip });
    res.json(TenantJenis);
  } else {
    TenantJenis = await getAllTenantJenis();
    res.json(TenantJenis);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const TenantJenisId = parseInt(req.params.id);
    const TenantJenis = await getTenantJenisById(parseInt(TenantJenisId));

    res.send(TenantJenis);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTenantJenisData = req.body;

    const TenantJenis = await createTenantJenis(newTenantJenisData);

    res.send({
      data: TenantJenis,
      message: 'create TenantJenis success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const TenantJenisId = req.params.id; // string

    await deleteTenantJenisById(parseInt(TenantJenisId));

    res.send('TenantJenis deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const TenantJenisId = req.params.id;
  const TenantJenisData = req.body;

  if (!TenantJenisData.name) {
    return res.status(400).send('Some fields are missing');
  }

  try {
    const TenantJenis = await editTenantJenisById(parseInt(TenantJenisId), TenantJenisData);

    res.send({
      data: TenantJenis,
      message: 'edit TenantJenis success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
