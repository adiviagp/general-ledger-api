const moment = require('moment');
const { findLabaRugi, findSetting, insertSetting } = require('./labaRugi.repository');

const getLabaRugi = async ({ startDate, endDate, tipe }) => {
  // pendapatan_usaha ----------------------------------------
  const pendapatan_usaha = await findLabaRugi({ startDate, endDate, tipe: 'pendapatan_usaha' });
  let pendapatan_usaha_total = BigInt(0);
  const pendapatan_usaha_detail = pendapatan_usaha?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    pendapatan_usaha_total = pendapatan_usaha_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // pendapatan_lain ----------------------------------------
  const pendapatan_lain = await findLabaRugi({ startDate, endDate, tipe: 'pendapatan_lain' });
  let pendapatan_lain_total = BigInt(0);
  const pendapatan_lain_detail = pendapatan_lain?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    pendapatan_lain_total = pendapatan_lain_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban pokok ----------------------------------------
  const beban_pokok = await findLabaRugi({ startDate, endDate, tipe: 'beban_pokok' });
  let beban_pokok_total = BigInt(0);
  const beban_pokok_detail = beban_pokok?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_pokok_total = beban_pokok_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban lain ----------------------------------------
  const beban_lain = await findLabaRugi({ startDate, endDate, tipe: 'beban_lain' });
  let beban_lain_total = BigInt(0);
  const beban_lain_detail = beban_lain?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_lain_total = beban_lain_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban pegawai ----------------------------------------
  const beban_pegawai = await findLabaRugi({ startDate, endDate, tipe: 'beban_pegawai' });
  let beban_pegawai_total = BigInt(0);
  const beban_pegawai_detail = beban_pegawai?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_pegawai_total = beban_pegawai_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban umum ----------------------------------------
  const beban_umum = await findLabaRugi({ startDate, endDate, tipe: 'beban_umum' });
  let beban_umum_total = BigInt(0);
  const beban_umum_detail = beban_umum?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_umum_total = beban_umum_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban penyusutan ----------------------------------------
  const beban_penyusutan = await findLabaRugi({ startDate, endDate, tipe: 'beban_penyusutan' });
  let beban_penyusutan_total = BigInt(0);
  const beban_penyusutan_detail = beban_penyusutan?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_penyusutan_total = beban_penyusutan_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban_amortisasi ----------------------------------------
  const beban_amortisasi = await findLabaRugi({ startDate, endDate, tipe: 'beban_amortisasi' });
  let beban_amortisasi_total = BigInt(0);
  const beban_amortisasi_detail = beban_amortisasi?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_amortisasi_total = beban_amortisasi_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // pendapatan_lain_sebelum_pajak_total ----------------------------------------
  const pendapatan_lain_sebelum_pajak = await findLabaRugi({ startDate, endDate, tipe: 'pendapatan_lain_sebelum_pajak' });
  let pendapatan_lain_sebelum_pajak_total = BigInt(0);
  const pendapatan_lain_sebelum_pajak_detail = pendapatan_lain_sebelum_pajak?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    pendapatan_lain_sebelum_pajak_total = pendapatan_lain_sebelum_pajak_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // pendapatan_lain_sebelum_pajak_total ----------------------------------------
  const beban_lain_sebelum_pajak = await findLabaRugi({ startDate, endDate, tipe: 'beban_lain_sebelum_pajak' });
  let beban_lain_sebelum_pajak_total = BigInt(0);
  const beban_lain_sebelum_pajak_detail = beban_lain_sebelum_pajak?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_lain_sebelum_pajak_total = beban_lain_sebelum_pajak_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // pendapatan_bunga_sebelum_pajak ----------------------------------------
  const pendapatan_bunga_sebelum_pajak = await findLabaRugi({ startDate, endDate, tipe: 'pendapatan_bunga_sebelum_pajak' });
  let pendapatan_bunga_sebelum_pajak_total = BigInt(0);
  const pendapatan_bunga_sebelum_pajak_detail = pendapatan_bunga_sebelum_pajak?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    pendapatan_bunga_sebelum_pajak_total = pendapatan_bunga_sebelum_pajak_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban_bunga_sebelum_pajak ----------------------------------------
  const beban_bunga_sebelum_pajak = await findLabaRugi({ startDate, endDate, tipe: 'beban_bunga_sebelum_pajak' });
  let beban_bunga_sebelum_pajak_total = BigInt(0);
  const beban_bunga_sebelum_pajak_detail = beban_bunga_sebelum_pajak?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_bunga_sebelum_pajak_total = beban_bunga_sebelum_pajak_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // beban_bunga_sebelum_pajak ----------------------------------------
  const beban_pajak_penghasilan = await findLabaRugi({ startDate, endDate, tipe: 'beban_pajak_penghasilan' });
  let beban_pajak_penghasilan_total = BigInt(0);
  const beban_pajak_penghasilan_detail = beban_pajak_penghasilan?.map((akuns) => {
    let currentSaldo = BigInt(0);

    let saldoAwal = akuns.akun.saldoAwal === null ? BigInt(0) : BigInt(akuns.akun.saldoAwal);
    currentSaldo = currentSaldo + saldoAwal;

    akuns.akun?.jurnals?.map((jurnal) => {
      const convertedDebit = jurnal.debit === null ? BigInt(0) : BigInt(jurnal.debit);
      const convertedCredit = jurnal.credit === null ? BigInt(0) : BigInt(jurnal.credit);

      if (akuns?.akun?.posisi === 'Debit') {
        currentSaldo = currentSaldo + convertedDebit - convertedCredit;
      }
      if (akuns?.akun?.posisi === 'Credit') {
        currentSaldo = currentSaldo + convertedCredit - convertedDebit;
      }
    });
    beban_pajak_penghasilan_total = beban_pajak_penghasilan_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const responses = {
    laba_rugi_kotor: {
      pendapatan_operasi: {
        pendapatan_usaha: {
          details: pendapatan_usaha_detail,
          total: pendapatan_usaha_total,
        },
        pendapatan_lain: {
          details: pendapatan_lain_detail,
          total: pendapatan_lain_total,
        },
        total: pendapatan_usaha_total + pendapatan_lain_total,
      },
      beban_pokok_pendapatan: {
        beban_pokok: {
          details: beban_pokok_detail,
          total: beban_pokok_total,
        },
        beban_lain: {
          details: beban_lain_detail,
          total: beban_lain_total,
        },
        total: beban_pokok_total + beban_lain_total,
      },
      total: pendapatan_usaha_total + pendapatan_lain_total - (beban_pokok_total + beban_lain_total),
    },

    laba_rugi_usaha: {
      beban_usaha: {
        beban_pegawai: {
          details: beban_pegawai_detail,
          total: beban_pegawai_total,
        },
        beban_umum: {
          details: beban_umum_detail,
          total: beban_umum_total,
        },
        beban_penyusutan: {
          details: beban_penyusutan_detail,
          total: beban_penyusutan_total,
        },
        beban_amortisasi: {
          details: beban_amortisasi_detail,
          total: beban_amortisasi_total,
        },
        total: beban_pegawai_total + beban_umum_total + beban_penyusutan_total + beban_amortisasi_total,
      },
      total: pendapatan_usaha_total + pendapatan_lain_total - (beban_pokok_total + beban_lain_total) - (beban_pegawai_total + beban_umum_total + beban_penyusutan_total + beban_amortisasi_total),
    },

    laba_rugi_sebelum_pajak: {
      pendapatan_beban_lain: {
        pendapatan_lain_sebelum_pajak: {
          details: pendapatan_lain_sebelum_pajak_detail,
          total: pendapatan_lain_sebelum_pajak_total,
        },
        beban_lain_sebelum_pajak: {
          details: beban_lain_sebelum_pajak_detail,
          total: beban_lain_sebelum_pajak_total,
        },
        total: pendapatan_lain_sebelum_pajak_total - beban_lain_sebelum_pajak_total,
      },
      pendapatan_beban_bunga: {
        pendapatan_bunga_sebelum_pajak: {
          details: pendapatan_bunga_sebelum_pajak_detail,
          total: pendapatan_bunga_sebelum_pajak_total,
        },
        beban_bunga_sebelum_pajak: {
          details: beban_bunga_sebelum_pajak_detail,
          total: beban_bunga_sebelum_pajak_total,
        },
        total: pendapatan_bunga_sebelum_pajak_total - beban_bunga_sebelum_pajak_total,
      },
      total:
        pendapatan_usaha_total +
        pendapatan_lain_total -
        (beban_pokok_total + beban_lain_total) -
        (beban_pegawai_total + beban_umum_total + beban_penyusutan_total + beban_amortisasi_total) +
        (pendapatan_lain_sebelum_pajak_total - beban_lain_sebelum_pajak_total) +
        (pendapatan_bunga_sebelum_pajak_total - beban_bunga_sebelum_pajak_total),
    },

    laba_rugi_setelah_pajak: {
      beban_pajak_penghasilan: {
        details: beban_pajak_penghasilan_detail,
        total: beban_pajak_penghasilan_total,
      },
      total:
        pendapatan_usaha_total +
        pendapatan_lain_total -
        (beban_pokok_total + beban_lain_total) -
        (beban_pegawai_total + beban_umum_total + beban_penyusutan_total + beban_amortisasi_total) +
        (pendapatan_lain_sebelum_pajak_total - beban_lain_sebelum_pajak_total) +
        (pendapatan_bunga_sebelum_pajak_total - beban_bunga_sebelum_pajak_total) -
        beban_pajak_penghasilan_total,
    },
  };
  return {
    data: responses,
    current_page: 1,
    total_page: 1,
    // total_data: total,
  };
};

const getSetting = async (params) => {
  const settings = await findSetting(params);
  return {
    data: settings,
    current_page: 1,
    total_page: 1,
  };
};

const postSetting = async (datas) => {
  const jurnal = await insertSetting(datas);

  return jurnal;
};

module.exports = {
  getLabaRugi,
  getSetting,
  postSetting,
};
