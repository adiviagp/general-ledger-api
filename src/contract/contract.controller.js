const express = require('express');
const { getAllContracts, getContractById, createContract, deleteContractById, editContractById, getPaginateContracts, createPembayaran } = require('./contract.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let akuns = null;
  let { page = 1, limit = 10, id, tenantId } = req.query;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    akuns = await getPaginateContracts({ page, limit, skip, tenantId });
    res.json(akuns);
  } else {
    akuns = await getAllContracts({ tenantId });
    res.json(akuns);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const akunId = parseInt(req.params.id);
    const akun = await getContractById(parseInt(akunId));

    res.send(akun);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newContractData = req.body;

    const akun = await createContract(newContractData);

    res.send({
      data: akun,
      message: 'create akun success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/pembayaran', async (req, res) => {
  try {
    const newData = req.body;

    const akun = await createPembayaran(newData);

    res.send({
      data: akun,
      message: 'create pembayaran success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const contractId = req.params.id; // string

    await deleteContractById(parseInt(contractId));

    res.send('akun deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const contractId = req.params.id;
  const formData = req.body;

  try {
    const data = await editContractById(parseInt(contractId), formData);

    res.send({
      data: data,
      message: 'edit kontrak success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
