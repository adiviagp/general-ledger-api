const express = require('express');
const { getAllJurnals, getJurnalById, createJurnal, deleteJurnalById, editJurnalById, getPaginateJurnals, createJurnalUpdate } = require('./jurnal.service');
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
    const {tenant_id, tipe, user_id, date, keterangan, jurnals, bulan, tahun, akunId} = req.body;
    let jurnalData = [];
    jurnals.map((jurnal) => {
      jurnalData.push({
        keterangan: jurnal.keterangan,
        debit: jurnal.debit,
        credit: jurnal.credit,
        date: new Date(date).toISOString(),
        akunId: jurnal.akunId,
        tenantId: tenant_id,   
        bulan: bulan,
        tahun: tahun
      })
    })

    const jurnal = await createJurnal(tipe, user_id, date, keterangan, jurnalData);
    
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
  const jurnalId = req.params.id;
  const {jurnals, tenant_id, tipe, user_id, date, keterangan } = req.body;

  if (!jurnals) {
    return res.status(400).send('Some fields are missing');
  }

  let oldJurnal = [];
  let newJurnal = [];


  jurnals.forEach((jurnal) => {
    if(jurnal?.id) {
      oldJurnal.push({
        id: jurnal.id,
        keterangan: jurnal?.keterangan,
        debit: parseInt(jurnal?.debit),
        credit: parseInt(jurnal?.credit),
        date: new Date(date.endDate).toISOString(),
        akunId: jurnal.akunId,
        tenantId: tenant_id,   
      })
    } else {
      newJurnal.push({
        keterangan: jurnal?.keterangan,
        debit: parseInt(jurnal?.debit),
        credit: parseInt(jurnal?.credit),
        date: new Date(date.endDate).toISOString(),
        akunId: jurnal.akunId,
        tenantId: tenant_id,
        jurnalContainerId: parseInt(jurnalId)
      }
      )
    }
  })


  try {
    if(newJurnal?.length > 0){
      await createJurnalUpdate(newJurnal);
    }
    if(oldJurnal?.length > 0){
      oldJurnal.forEach(async (data) => {
        await editJurnalById(parseInt(data?.id), { akunId: data?.akunId, keterangan: data?.keterangan, credit: data?.credit, debit: data?.debit})
      })
    }
    
    res.send({
      // data: jurnal,
      message: 'edit jurnal success',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
