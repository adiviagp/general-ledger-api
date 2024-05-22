const { findAkuns } = require('../akun/akun.repository');
const {
  findJurnals,
} = require('./bukubesar.repository');
const moment = require('moment');

const getAllJurnals = async ({ akunId, startDate, endDate }) => {
  const currentYear = moment(startDate).year();
  const prevMonth = await findJurnals({ akunId, startDate: currentYear.toString() + "-01-01" , endDate: moment(endDate).subtract(1,'months').format('YYYY-MM-DD') });
  const thisMonth = await findJurnals({ akunId, startDate, endDate });
  const akun = await findAkuns({akunId});


  let currentSaldo = BigInt(0);
  let reformat = [];

  if(akun?.length > 0 ){
    const saldoAwal = akun[0].saldoAwal === null ? BigInt(0) : BigInt(akun[0].saldoAwal)
    currentSaldo = currentSaldo + saldoAwal;
  }

  if(prevMonth?.length > 0){
    prevMonth.forEach((data) => {
      const convertedDebit = data.debit === null ? BigInt(0) : BigInt(data.debit);
      const convertedCredit = data.credit === null ? BigInt(0) : BigInt(data.credit);
      if(data?.akun?.posisi === "Debit") {
        currentSaldo = (currentSaldo + convertedDebit) - convertedCredit;
      }
      if(data?.akun?.posisi === "Credit") {
        currentSaldo = (currentSaldo + convertedCredit) - convertedDebit;
      }
    });

    let prevMonthReformat = {
      id: 0,
      keterangan: 'Saldo Awal',
      debit: prevMonth[0]?.akun?.posisi === "Debit" ? currentSaldo : BigInt(0),
      credit: prevMonth[0]?.akun?.posisi === "Credit" ? currentSaldo : BigInt(0),
      date: moment(startDate).subtract(1,'months').endOf('month'),
      currentSaldo: currentSaldo,
    };

    reformat.push(prevMonthReformat)
  } else {
    let prevMonthReformat = {
      id: 0,
      keterangan: 'Saldo Awal',
      debit: akun[0]?.posisi === "Debit" ? currentSaldo : BigInt(0),
      credit: akun[0]?.posisi === "Credit" ? currentSaldo : BigInt(0),
      date: moment(startDate).subtract(1,'months').endOf('month'),
      currentSaldo: currentSaldo,
    };

    reformat.push(prevMonthReformat)
  }

// --------

  thisMonth.forEach((data) => {
    const convertedDebit = data.debit === null ? BigInt(0) : BigInt(data.debit);
    const convertedCredit = data.credit === null ? BigInt(0) : BigInt(data.credit);

    if(data?.akun?.posisi === "Debit") {
      currentSaldo = (currentSaldo + convertedDebit) - convertedCredit;
    }
    if(data?.akun?.posisi === "Credit") {
      currentSaldo = (currentSaldo + convertedCredit) - convertedDebit;
    }
   
    reformat.push({
      ...data,
      debit: data.debit === null ? BigInt(0) : data.debit,
      credit: data.credit === null ? BigInt(0) : data.credit,
      currentSaldo: currentSaldo,
    })
  });

  return {
    data: reformat,
    current_page: 1,
    total_page: 1,
  };
};



const download = async ({ akunId, startDate, endDate }) => {
  const currentYear = moment(startDate).year();
  const prevMonth = await findJurnals({ akunId, startDate: currentYear.toString() + "-01-01" , endDate: moment(endDate).subtract(1,'months').format('YYYY-MM-DD') });
  const thisMonth = await findJurnals({ akunId, startDate, endDate });
  const akun = await findAkuns({akunId});

  let currentSaldo = BigInt(0);
  let reformat = [];

  if(akun?.length > 0 ){
    const saldoAwal = akun[0].saldoAwal === null ? BigInt(0) : BigInt(akun[0].saldoAwal)
    currentSaldo = currentSaldo + saldoAwal;
  }

  if(prevMonth?.length > 0){
    prevMonth.forEach((data) => {
      const convertedDebit = data.debit === null ? BigInt(0) : BigInt(data.debit);
      const convertedCredit = data.credit === null ? BigInt(0) : BigInt(data.credit);
      if(data?.akun?.posisi === "Debit") {
        currentSaldo = (currentSaldo + convertedDebit) - convertedCredit;
      }
      if(data?.akun?.posisi === "Credit") {
        currentSaldo = (currentSaldo + convertedCredit) - convertedDebit;
      }
    });

    let prevMonthReformat = {
      id: 0,
      keterangan: 'Saldo Awal',
      debit: prevMonth[0]?.akun?.posisi === "Debit" ? currentSaldo : BigInt(0),
      credit: prevMonth[0]?.akun?.posisi === "Credit" ? currentSaldo : BigInt(0),
      date: moment(startDate).subtract(1,'months').endOf('month'),
      currentSaldo: currentSaldo,
    };

    reformat.push(prevMonthReformat)
  } else {
    let prevMonthReformat = {
      id: 0,
      keterangan: 'Saldo Awal',
      debit: akun[0]?.posisi === "Debit" ? currentSaldo : BigInt(0),
      credit: akun[0]?.posisi === "Credit" ? currentSaldo : BigInt(0),
      date: moment(startDate).subtract(1,'months').endOf('month'),
      currentSaldo: currentSaldo,
    };

    reformat.push(prevMonthReformat)
  }

// --------

  thisMonth.forEach((data) => {
    const convertedDebit = data.debit === null ? BigInt(0) : BigInt(data.debit);
    const convertedCredit = data.credit === null ? BigInt(0) : BigInt(data.credit);
    if(data?.akun?.posisi === "Debit") {
      currentSaldo = (currentSaldo + convertedDebit) - convertedCredit;
    }
    if(data?.akun?.posisi === "Credit") {
      currentSaldo = (currentSaldo + convertedCredit) - convertedDebit;
    }
   
    reformat.push({
      ...data,
      debit: data.debit === null ? BigInt(0) : BigInt(data.debit),
      credit: data.credit === null ? BigInt(0) : BigInt(data.credit),
      currentSaldo: currentSaldo,
    })
  });

  return reformat;
};


module.exports = {
  getAllJurnals,
  download
};
