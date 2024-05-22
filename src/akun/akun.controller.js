const express = require('express');
const { getAllAkuns, getAkunById, createAkun, deleteAkunById, editAkunById, getPaginateAkuns } = require('./akun.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let akuns = null;
  let { page = 1, limit = 10, akunId } = req.query;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    akuns = await getPaginateAkuns({ page, limit, skip, akunId });
    res.json(akuns);
  } else {
    akuns = await getAllAkuns({akunId});
    res.json(akuns);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const akunId = parseInt(req.params.id);
    const akun = await getAkunById(parseInt(akunId));

    res.send(akun);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newAkunData = req.body;

    const akun = await createAkun(newAkunData);

    res.send({
      data: akun,
      message: 'create akun success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const akunId = req.params.id; // string

    await deleteAkunById(parseInt(akunId));

    res.send('akun deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const akunId = req.params.id;
  const akunData = req.body;

  if (!akunData.label) {
    return res.status(400).send('Some fields are missing');
  }

  try {
    const akun = await editAkunById(parseInt(akunId), akunData);

    res.send({
      data: akun,
      message: 'edit akun success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
