const express = require('express');
const { getAllJurnals, getJurnalById, createJurnal, deleteJurnalById, editJurnalById, getPaginateJurnals, createJurnalUpdate, deleteBeforeUpdate } = require('./jurnal.service');
const moment = require('moment');

const router = express.Router();

router.get('/', async (req, res) => {
  let jurnals = null;
  let { page = 1, limit = 10, akunId , startDate, endDate} = req.query;
  
  if (req.query?.page > 0 && req.query?.limit > 0) {
    const skip = (page - 1) * limit;
    jurnals = await getPaginateJurnals({ page, limit, skip, akunId, startDate, endDate });
    res.json(jurnals);
  } else {
    jurnals = await getAllJurnals({akunId, startDate, endDate});
    res.json(jurnals);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jurnalId = parseInt(req.params.id);
    const jurnal = await getJurnalById(parseInt(jurnalId));
    res.send(jurnal);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const {tenantId, tipe, contractId, user_id, date, keterangan, jurnals, bulan, tahun, akunId} = req.body;
    let jurnalData = [];
    jurnals.map((jurnal) => {
      jurnalData.push({
        keterangan: jurnal.keterangan,
        debit: jurnal.debit,
        credit: jurnal.credit,
        date: new Date(date).toISOString(),
        akunId: jurnal.akunId,
        tenantId: tenantId,   
        contractId: contractId,   
        bulan: bulan,
        tahun: tahun
      })
    })

    const jurnal = await createJurnal(tipe, tenantId, user_id, date, keterangan, jurnalData);
    
    res.send({
      data: jurnal,
      message: 'create jurnal success',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const jurnalId = req.params.id; // string

    await deleteJurnalById(parseInt(jurnalId));

    res.send('jurnal deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const jurnal_container_id = req.params.id;
  const {jurnals, keterangan } = req.body;

  if (!jurnals) {
    return res.status(400).send('Some fields are missing');
  }

  try {
    await deleteBeforeUpdate(
      {
        jurnal_container_id: parseInt(jurnal_container_id),
        keterangan: keterangan,
        jurnals: jurnals
      }
    );
    res.send('jurnal deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
