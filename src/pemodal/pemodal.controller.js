const express = require('express');
const { getAllPemodals, getPemodalById, createPemodal, deletePemodalById, editPemodalById, getPaginatePemodals } = require('./pemodal.service');

const router = express.Router();

router.get('/', async (req, res) => {
  let pemodals = null;
  let { page = 1, limit = 10, name } = req.query;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    pemodals = await getPaginatePemodals({ page, limit, skip, name });
    res.json(pemodals);
  } else {
    pemodals = await getAllPemodals({name});
    res.json(pemodals);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pemodalId = parseInt(req.params.id);
    const pemodal = await getPemodalById(parseInt(pemodalId));

    res.send(pemodal);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newPemodalData = req.body;

    const pemodal = await createPemodal(newPemodalData);

    res.send({
      data: pemodal,
      message: 'create pemodal success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pemodalId = req.params.id; // string

    await deletePemodalById(parseInt(pemodalId));

    res.send('pemodal deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const pemodalId = req.params.id;
  const pemodalData = req.body;

  if (!pemodalData.name) {
    return res.status(400).send('Some fields are missing');
  }

  try { 
    const pemodal = await editPemodalById(parseInt(pemodalId), pemodalData);

    res.send({
      data: pemodal,
      message: 'edit pemodal success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
