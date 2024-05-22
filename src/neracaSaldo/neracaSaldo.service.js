const moment = require('moment');
const { findAkuns, totalAkuns, findSewaDiterimaDimuka, findDeposito } = require('./neracaSaldo.repository');

const getAllNeracaSaldo = async ({ startDate, endDate }) => {
  const currentYear = moment(startDate).year();

  const akuns = await findAkuns({ startDate: currentYear.toString() + '-01-01', endDate });

  let neracaSaldo = [];

  akuns.forEach((data) => {
    let totalDebit = BigInt(0);
    let totalCredit = BigInt(0);
    if (data.jurnals?.length > 0) {
      data.jurnals.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : jurnal.debit;
        const credit = jurnal.credit === null ? BigInt(0) : jurnal.credit;

        if (data?.posisi === 'Debit') {
          totalDebit = totalDebit + debit - credit;
        }
        if (data?.posisi === 'Credit') {
          totalCredit = totalCredit + credit - debit;
        }
      });
    }
    const saldoAwal = data.saldoAwal === null ? BigInt(0) : data.saldoAwal;
    // tambah saldo awal
    if (data?.posisi === 'Debit') {
      totalDebit = totalDebit + saldoAwal;
    }
    if (data?.posisi === 'Credit') {
      totalCredit = totalCredit + saldoAwal;
    }
    neracaSaldo = [...neracaSaldo, { ...data, totalDebit, totalCredit }];
  });

  // ----
  let totalAllDebit = BigInt(0);
  let totalAllCredit = BigInt(0);

  neracaSaldo.forEach((saldo) => {
    totalAllDebit = totalAllDebit + saldo.totalDebit;
    totalAllCredit = totalAllCredit + saldo.totalCredit;
  });

  return {
    data: neracaSaldo,
    totalAllDebit: totalAllDebit,
    totalAllCredit: totalAllCredit,
    current_page: 1,
    total_page: 1,
  };
};

const getSewaDiterimaDimuka = async ({ startDate, endDate }) => {
  const currentYear = moment(startDate).year();

  const tenants = await findSewaDiterimaDimuka({ startDate: currentYear.toString() + '-01-01', endDate });

  let neracaSaldo = [];

  tenants?.forEach((tenant) => {
    let totalDebit = BigInt(0);
    let totalCredit = BigInt(0);

    if (tenant.jurnals?.length > 0) {
      const posisi = tenant.jurnals[0]?.akun.posisi;
      const saldoAwal = tenant.jurnals[0]?.akun.saldoAwal === null ? BigInt(0) : tenant.jurnals[0]?.akun.saldoAwal;

      tenant.jurnals.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : jurnal.debit;
        const credit = jurnal.credit === null ? BigInt(0) : jurnal.credit;

        if (jurnal?.akun?.posisi === 'Debit') {
          totalDebit = totalDebit + debit - credit;
        }
        if (jurnal?.akun?.posisi === 'Credit') {
          totalCredit = totalCredit + credit - debit;
        }
      });

      // tambah saldo awal
      if (posisi === 'Debit') {
        totalDebit = totalDebit + saldoAwal;
      }
      if (posisi === 'Credit') {
        totalCredit = totalCredit + saldoAwal;
      }
    }
    neracaSaldo = [...neracaSaldo, { ...tenant, totalDebit, totalCredit }];
  });

  // ----
  let totalAllDebit = BigInt(0);
  let totalAllCredit = BigInt(0);

  neracaSaldo.forEach((saldo) => {
    totalAllDebit = totalAllDebit + saldo.totalDebit;
    totalAllCredit = totalAllCredit + saldo.totalCredit;
  });

  return {
    data: neracaSaldo,
    totalAllDebit: totalAllDebit,
    totalAllCredit: totalAllCredit,
    current_page: 1,
    total_page: 1,
  };
};


const getDeposito = async ({ startDate, endDate }) => {
  const currentYear = moment(startDate).year();

  const tenants = await findDeposito({ startDate: currentYear.toString() + '-01-01', endDate });

  let neracaSaldo = [];

  tenants?.forEach((tenant) => {
    let totalDebit = BigInt(0);
    let totalCredit = BigInt(0);

    if (tenant.jurnals?.length > 0) {
      const posisi = tenant.jurnals[0]?.akun.posisi;
      const saldoAwal = tenant.jurnals[0]?.akun.saldoAwal === null ? BigInt(0) : tenant.jurnals[0]?.akun.saldoAwal;

      tenant.jurnals.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : jurnal.debit;
        const credit = jurnal.credit === null ? BigInt(0) : jurnal.credit;

        if (jurnal?.akun?.posisi === 'Debit') {
          totalDebit = totalDebit + debit - credit;
        }
        if (jurnal?.akun?.posisi === 'Credit') {
          totalCredit = totalCredit + credit - debit;
        }
      });

      // tambah saldo awal
      if (posisi === 'Debit') {
        totalDebit = totalDebit + saldoAwal;
      }
      if (posisi === 'Credit') {
        totalCredit = totalCredit + saldoAwal;
      }
    }
    neracaSaldo = [...neracaSaldo, { ...tenant, totalDebit, totalCredit }];
  });

  // ----
  let totalAllDebit = BigInt(0);
  let totalAllCredit = BigInt(0);

  neracaSaldo.forEach((saldo) => {
    totalAllDebit = totalAllDebit + saldo.totalDebit;
    totalAllCredit = totalAllCredit + saldo.totalCredit;
  });

  return {
    data: neracaSaldo,
    totalAllDebit: totalAllDebit,
    totalAllCredit: totalAllCredit,
    current_page: 1,
    total_page: 1,
  };
};

const download = async ({ startDate, endDate }) => {
  const currentYear = moment(startDate).year();

  const akuns = await findAkuns({ startDate: currentYear.toString() + '-01-01', endDate });

  let neracaSaldo = [];

  akuns.forEach((data) => {
    let totalDebit = BigInt(0);
    let totalCredit = BigInt(0);
    if (data.jurnals?.length > 0) {
      data.jurnals.forEach((jurnal) => {
        const debit = jurnal.debit === null ? BigInt(0) : jurnal.debit;
        const credit = jurnal.credit === null ? BigInt(0) : jurnal.credit;

        if (data?.posisi === 'Debit') {
          totalDebit = totalDebit + debit - credit;
        }
        if (data?.posisi === 'Credit') {
          totalCredit = totalCredit + credit - debit;
        }
      });
    }
    const saldoAwal = data.saldoAwal === null ? BigInt(0) : data.saldoAwal;
    // tambah saldo awal
    if (data?.posisi === 'Debit') {
      totalDebit = totalDebit + saldoAwal;
    }
    if (data?.posisi === 'Credit') {
      totalCredit = totalCredit + saldoAwal;
    }
    neracaSaldo = [...neracaSaldo, { ...data, totalDebit, totalCredit }];
  });

  // ----
  let totalAllDebit = BigInt(0);
  let totalAllCredit = BigInt(0);

  neracaSaldo.forEach((saldo) => {
    totalAllDebit = totalAllDebit + saldo.totalDebit;
    totalAllCredit = totalAllCredit + saldo.totalCredit;
  });

  return neracaSaldo;
};

module.exports = {
  getAllNeracaSaldo,
  getSewaDiterimaDimuka,
  download,
  getDeposito
};
