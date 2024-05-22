const moment = require('moment');
const { findAkuns, findRekapKontrak, totalAkuns, findRekapKontrakUM } = require('./uangMuka.repository');

const getRekapKontrak = async ({ startDate, endDate, tenantJenisId }) => {
  const selectedYear = moment(startDate).year();
  const contracts = await findRekapKontrak({ startDate, endDate, selectedYear, tenantJenisId });
  let result = [];

  const listMonth = ['januari', 'februari', 'maret', 'april', 'mei', 'juni', 'juli', 'agustus', 'september', 'oktober', 'november', 'desember'];

  for(const data of contracts) {
    console.log("--");
    console.log("tahun lalu", moment(startDate).subtract(1, 'day'));
    console.log("tahun berjalan", moment(endDate));
    const tahunLaluJurnal = await findRekapKontrakUM({ startDate: '2000-01-01', endDate: moment(startDate).subtract(1, 'day'), contractId: data.id });
    const tahunBerjalanJurnal = await findRekapKontrakUM({ startDate: '2000-01-01', endDate: moment(endDate), contractId: data.id });

    let tahunLaluUM = BigInt(0);
    let tahunBerjalanUM = BigInt(0);

    if (tahunLaluJurnal?.length > 0) {
      tahunLaluJurnal.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
        const credit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

        tahunLaluUM = tahunLaluUM + credit - debit;
      });
    }

    if (tahunBerjalanJurnal?.length > 0) {
      tahunBerjalanJurnal.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
        const credit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

        tahunBerjalanUM = tahunBerjalanUM + credit - debit;
      });
    }

    let bulan = {
      januari: null,
      februari: null,
      maret: null,
      april: null,
      mei: null,
      juni: null,
      juli: null,
      agustus: null,
      september: null,
      oktober: null,
      november: null,
      desember: null,
    };

    const handlePenyesuaian = (month, year, jurnals) => {
      const inidata = listMonth[month];

      if (selectedYear === year) {
        if (jurnals?.length > 0) {
          // console.log("contractid", data.id);
          const isExist = jurnals?.filter((jurnal) => {
            if (parseInt(jurnal.bulan) === month + 1 && parseInt(jurnal.tahun) === year && parseInt(jurnal.contractId) === parseInt(data.id)) return true;
          });
          if (isExist?.length > 0) {
            let resNumber = 0;
            isExist?.forEach((jurnal) => {
              const jurnalDebit = jurnal.debit !== null ? parseInt(jurnal.debit) : 0;
              resNumber = resNumber + jurnalDebit;
            });
            bulan[inidata] = resNumber;
          } else {
            bulan[inidata] = 'belum disesuaikan';
          }
        } else {
          bulan[inidata] = 'belum disesuaikan';
        }
      }
    };

    // TODO: CHECK APAKAH KONTRAK 'BULAN' sama dengan di jurnal

    const monthDiff = moment(data.endDate).add(1, 'd').diff(moment(data.startDate), 'months');
    // console.log("######");
    // console.log(moment(data.startDate), moment(data.endDate));
    // console.log("monthDiff", monthDiff);

    if (Math.floor(monthDiff) === 1) {
      const startMonth = moment(data.startDate).month();
      const startYear = moment(data.startDate).year();
      handlePenyesuaian(startMonth, startYear, data?.tenant?.jurnals);
    }

    if (Math.floor(monthDiff) > 1) {
      // console.log('Math.floor(monthDiff)', Math.floor(monthDiff));
      // console.log(moment(data.endDate), moment(data.startDate));
      // console.log("######");
      for (let index = 0; index < Math.floor(monthDiff); index++) {
        const addedMonth = moment(data.startDate).add(index, 'M');
        const startMonth = addedMonth.month();
        const startYear = addedMonth.year();
        handlePenyesuaian(startMonth, startYear, data?.tenant?.jurnals);
      }
    }

    result.push({
      ...data,
      ...bulan,
      tahunLaluUM,
      tahunBerjalanUM
    });
  };

  return {
    data: result,
    current_page: 1,
    total_page: 1,
  };
};

module.exports = {
  getRekapKontrak,
};
