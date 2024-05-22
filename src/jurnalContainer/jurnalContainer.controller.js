const express = require('express');
const { getAllJurnalContainers, getJurnalContainerById, createJurnalContainer, deleteJurnalContainerById, editJurnalContainerById, getPaginateJurnalContainers } = require('./jurnalContainer.service');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {
  let jurnalContainers = null;
  let { page = 1, limit = 10 , startDate, endDate, tipe} = req.query;

  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    jurnalContainers = await getPaginateJurnalContainers({ page, limit, skip, startDate, endDate, tipe });
    res.json(jurnalContainers);
  } else {
    jurnalContainers = await getAllJurnalContainers();
    res.json(jurnalContainers);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jurnalContainerId = parseInt(req.params.id);
    const jurnalContainer = await getJurnalContainerById(parseInt(jurnalContainerId));
    res.send(jurnalContainer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const jurnalContainerId = req.params.id; // string

    await deleteJurnalContainerById(parseInt(jurnalContainerId));

    res.send('jurnalContainer deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
