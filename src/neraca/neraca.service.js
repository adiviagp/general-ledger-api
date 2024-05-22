const moment = require('moment');
const { findSetting, insertSetting, findNeraca } = require('./neraca.repository');
const { getLabaRugi } = require('../labaRugi/labaRugi.service');
const { getSewaDiterimaDimuka, getDeposito } = require('../neracaSaldo/neracaSaldo.service');

const getNeraca = async ({ startDate, endDate, tipe }) => {
  const labarugi = await getLabaRugi({ startDate, endDate });
  const sewaDiterimaDimuka = await getSewaDiterimaDimuka({ startDate, endDate });
  const sewaDiterimaDimukaReformat = sewaDiterimaDimuka?.data?.map((data) => {
    return {
      label: data?.name,
      value: data?.totalCredit
    }
  })

  // 
  const sewaDiterimaDimukaDeposit = await getDeposito({ startDate, endDate });
  const sewaDiterimaDimukaDepositReformat = sewaDiterimaDimukaDeposit?.data?.map((data) => {
    return {
      label: data?.name,
      value: data?.totalCredit
    }
  })

  // ----------------------------------------
  const kas_besar = await findNeraca({ startDate, endDate, tipe: 'kas_besar' });
  let kas_besar_total = BigInt(0);
  const kas_besar_detail = kas_besar?.map((akuns) => {
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
    kas_besar_total = kas_besar_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const kas_harian = await findNeraca({ startDate, endDate, tipe: 'kas_harian' });
  let kas_harian_total = BigInt(0);
  const kas_harian_detail = kas_harian?.map((akuns) => {
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
    kas_harian_total = kas_harian_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const bank_giro = await findNeraca({ startDate, endDate, tipe: 'bank_giro' });
  let bank_giro_total = BigInt(0);
  const bank_giro_detail = bank_giro?.map((akuns) => {
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
    bank_giro_total = bank_giro_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const deposito = await findNeraca({ startDate, endDate, tipe: 'deposito' });
  let deposito_total = BigInt(0);
  const deposito_detail = deposito?.map((akuns) => {
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
    deposito_total = deposito_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const pembayaran_uang_muka = await findNeraca({ startDate, endDate, tipe: 'pembayaran_uang_muka' });
  let pembayaran_uang_muka_total = BigInt(0);
  const pembayaran_uang_muka_detail = pembayaran_uang_muka?.map((akuns) => {
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
    pembayaran_uang_muka_total = pembayaran_uang_muka_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const pembayaran_biaya_dimuka = await findNeraca({ startDate, endDate, tipe: 'pembayaran_biaya_dimuka' });
  let pembayaran_biaya_dimuka_total = BigInt(0);
  const pembayaran_biaya_dimuka_detail = pembayaran_biaya_dimuka?.map((akuns) => {
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
    pembayaran_biaya_dimuka_total = pembayaran_biaya_dimuka_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const piutang_usaha_lancar = await findNeraca({ startDate, endDate, tipe: 'piutang_usaha_lancar' });
  let piutang_usaha_lancar_total = BigInt(0);
  const piutang_usaha_lancar_detail = piutang_usaha_lancar?.map((akuns) => {
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
    piutang_usaha_lancar_total = piutang_usaha_lancar_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const piutang_tidak_lancar = await findNeraca({ startDate, endDate, tipe: 'piutang_tidak_lancar' });
  let piutang_tidak_lancar_total = BigInt(0);
  const piutang_tidak_lancar_detail = piutang_tidak_lancar?.map((akuns) => {
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
    piutang_tidak_lancar_total = piutang_tidak_lancar_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });
  // ----------------------------------------
  const piutang_pemegang_saham = await findNeraca({ startDate, endDate, tipe: 'piutang_pemegang_saham' });
  let piutang_pemegang_saham_total = BigInt(0);
  const piutang_pemegang_saham_detail = piutang_pemegang_saham?.map((akuns) => {
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
    piutang_pemegang_saham_total = piutang_pemegang_saham_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const investasi = await findNeraca({ startDate, endDate, tipe: 'investasi' });
  let investasi_total = BigInt(0);
  const investasi_detail = investasi?.map((akuns) => {
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
    investasi_total = investasi_total + currentSaldo;
    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const asset_lancar_total =
    kas_besar_total +
    kas_harian_total +
    (bank_giro_total + deposito_total) +
    (pembayaran_uang_muka_total + pembayaran_biaya_dimuka_total) +
    (piutang_usaha_lancar_total + piutang_tidak_lancar_total + piutang_pemegang_saham_total) +
    investasi_total;

  // ---------------------------------------------------
  // ----------------------------------------

  const nilai_perolehan_tanah = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_tanah' });
  let nilai_perolehan_tanah_total = BigInt(0);
  const nilai_perolehan_tanah_detail = nilai_perolehan_tanah?.map((akuns) => {
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
    nilai_perolehan_tanah_total = nilai_perolehan_tanah_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_bangunan = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_bangunan' });
  let nilai_perolehan_bangunan_total = BigInt(0);
  const nilai_perolehan_bangunan_detail = nilai_perolehan_bangunan?.map((akuns) => {
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
    nilai_perolehan_bangunan_total = nilai_perolehan_bangunan_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_alat_gedung = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_alat_gedung' });
  let nilai_perolehan_alat_gedung_total = BigInt(0);
  const nilai_perolehan_alat_gedung_detail = nilai_perolehan_alat_gedung?.map((akuns) => {
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
    nilai_perolehan_alat_gedung_total = nilai_perolehan_alat_gedung_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_kendaraan = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_kendaraan' });
  let nilai_perolehan_kendaraan_total = BigInt(0);
  const nilai_perolehan_kendaraan_detail = nilai_perolehan_kendaraan?.map((akuns) => {
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
    nilai_perolehan_kendaraan_total = nilai_perolehan_kendaraan_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_perlengkapan_kantor = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_perlengkapan_kantor' });
  let nilai_perolehan_perlengkapan_kantor_total = BigInt(0);
  const nilai_perolehan_perlengkapan_kantor_detail = nilai_perolehan_perlengkapan_kantor?.map((akuns) => {
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
    nilai_perolehan_perlengkapan_kantor_total = nilai_perolehan_perlengkapan_kantor_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_lain_lain = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_lain_lain' });
  let nilai_perolehan_lain_lain_total = BigInt(0);
  const nilai_perolehan_lain_lain_detail = nilai_perolehan_lain_lain?.map((akuns) => {
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
    nilai_perolehan_lain_lain_total = nilai_perolehan_lain_lain_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const nilai_perolehan_fasilitas_penunjang = await findNeraca({ startDate, endDate, tipe: 'nilai_perolehan_fasilitas_penunjang' });
  let nilai_perolehan_fasilitas_penunjang_total = BigInt(0);
  const nilai_perolehan_fasilitas_penunjang_detail = nilai_perolehan_fasilitas_penunjang?.map((akuns) => {
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
    nilai_perolehan_fasilitas_penunjang_total = nilai_perolehan_fasilitas_penunjang_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_penyusutan_bangunan = await findNeraca({ startDate, endDate, tipe: 'akk_penyusutan_bangunan' });
  let akk_penyusutan_bangunan_total = BigInt(0);
  const akk_penyusutan_bangunan_detail = akk_penyusutan_bangunan?.map((akuns) => {
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
    akk_penyusutan_bangunan_total = akk_penyusutan_bangunan_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_penyusutan_alat_gedung = await findNeraca({ startDate, endDate, tipe: 'akk_penyusutan_alat_gedung' });
  let akk_penyusutan_alat_gedung_total = BigInt(0);
  const akk_penyusutan_alat_gedung_detail = akk_penyusutan_alat_gedung?.map((akuns) => {
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
    akk_penyusutan_alat_gedung_total = akk_penyusutan_alat_gedung_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_penyusutan_kendaraan = await findNeraca({ startDate, endDate, tipe: 'akk_penyusutan_kendaraan' });
  let akk_penyusutan_kendaraan_total = BigInt(0);
  const akk_penyusutan_kendaraan_detail = akk_penyusutan_kendaraan?.map((akuns) => {
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
    akk_penyusutan_kendaraan_total = akk_penyusutan_kendaraan_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_perlengkapan_kantor = await findNeraca({ startDate, endDate, tipe: 'akk_perlengkapan_kantor' });
  let akk_perlengkapan_kantor_total = BigInt(0);
  const akk_perlengkapan_kantor_detail = akk_perlengkapan_kantor?.map((akuns) => {
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
    akk_perlengkapan_kantor_total = akk_perlengkapan_kantor_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_penyusutan_lain_lain = await findNeraca({ startDate, endDate, tipe: 'akk_penyusutan_lain_lain' });
  let akk_penyusutan_lain_lain_total = BigInt(0);
  const akk_penyusutan_lain_lain_detail = akk_penyusutan_lain_lain?.map((akuns) => {
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
    akk_penyusutan_lain_lain_total = akk_penyusutan_lain_lain_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const akk_penyusutan_fasilitas_penunjang = await findNeraca({ startDate, endDate, tipe: 'akk_penyusutan_fasilitas_penunjang' });
  let akk_penyusutan_fasilitas_penunjang_total = BigInt(0);
  const akk_penyusutan_fasilitas_penunjang_detail = akk_penyusutan_fasilitas_penunjang?.map((akuns) => {
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
    akk_penyusutan_fasilitas_penunjang_total = akk_penyusutan_fasilitas_penunjang_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const nilai_perolehan_total =
    nilai_perolehan_fasilitas_penunjang_total +
    nilai_perolehan_lain_lain_total +
    nilai_perolehan_perlengkapan_kantor_total +
    nilai_perolehan_kendaraan_total +
    nilai_perolehan_alat_gedung_total +
    nilai_perolehan_bangunan_total +
    nilai_perolehan_tanah_total;
  const akumulasi_penyusutan_total =
    akk_penyusutan_fasilitas_penunjang_total +
    akk_penyusutan_lain_lain_total +
    akk_penyusutan_kendaraan_total +
    akk_perlengkapan_kantor_total +
    akk_penyusutan_bangunan_total +
    akk_penyusutan_alat_gedung_total;

  // ----------------------------------------
  const biaya_pendirian = await findNeraca({ startDate, endDate, tipe: 'biaya_pendirian' });
  let biaya_pendirian_total = BigInt(0);
  const biaya_pendirian_detail = biaya_pendirian?.map((akuns) => {
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
    biaya_pendirian_total = biaya_pendirian_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const penyertaan_usaha = await findNeraca({ startDate, endDate, tipe: 'penyertaan_usaha' });
  let penyertaan_usaha_total = BigInt(0);
  const penyertaan_usaha_detail = penyertaan_usaha?.map((akuns) => {
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
    penyertaan_usaha_total = penyertaan_usaha_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------- UTANG JANGKA PANJANG-------------------------------
  // ----------------------------------------
  const utang_bank = await findNeraca({ startDate, endDate, tipe: 'utang_bank' });
  let utang_bank_total = BigInt(0);
  const utang_bank_detail = utang_bank?.map((akuns) => {
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
    utang_bank_total = utang_bank_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });
  // ----------------------------------------
  const utang_pajak = await findNeraca({ startDate, endDate, tipe: 'utang_pajak' });
  let utang_pajak_total = BigInt(0);
  const utang_pajak_detail = utang_pajak?.map((akuns) => {
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
    utang_pajak_total = utang_pajak_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const utang_usaha = await findNeraca({ startDate, endDate, tipe: 'utang_usaha' });
  let utang_usaha_total = BigInt(0);
  const utang_usaha_detail = utang_usaha?.map((akuns) => {
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
    utang_usaha_total = utang_usaha_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const utang_lain_lain = await findNeraca({ startDate, endDate, tipe: 'utang_lain_lain' });
  let utang_lain_lain_total = BigInt(0);
  const utang_lain_lain_detail = utang_lain_lain?.map((akuns) => {
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
    utang_lain_lain_total = utang_lain_lain_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const biaya_masih_harus_dibayar = await findNeraca({ startDate, endDate, tipe: 'biaya_masih_harus_dibayar' });
  let biaya_masih_harus_dibayar_total = BigInt(0);
  const biaya_masih_harus_dibayar_detail = biaya_masih_harus_dibayar?.map((akuns) => {
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
    biaya_masih_harus_dibayar_total = biaya_masih_harus_dibayar_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const kewajibanLancarTotal = utang_bank_total + utang_pajak_total + utang_usaha_total + utang_lain_lain_total + biaya_masih_harus_dibayar_total + BigInt(sewaDiterimaDimuka?.totalAllCredit) + BigInt(sewaDiterimaDimukaDeposit?.totalAllCredit);

  // ----------------------------------------
  // ----------------------------------------
  const utang_jangka_panjang_utang_bank = await findNeraca({ startDate, endDate, tipe: 'utang_jangka_panjang_utang_bank' });
  let utang_jangka_panjang_utang_bank_total = BigInt(0);
  const utang_jangka_panjang_utang_bank_detail = utang_jangka_panjang_utang_bank?.map((akuns) => {
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
    utang_jangka_panjang_utang_bank_total = utang_jangka_panjang_utang_bank_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const utang_jangka_panjang_utang_lain_lain = await findNeraca({ startDate, endDate, tipe: 'utang_jangka_panjang_utang_lain_lain' });
  let utang_jangka_panjang_utang_lain_lain_total = BigInt(0);
  const utang_jangka_panjang_utang_lain_lain_detail = utang_jangka_panjang_utang_lain_lain?.map((akuns) => {
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
    utang_jangka_panjang_utang_lain_lain_total = utang_jangka_panjang_utang_lain_lain_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });


  const kewajiban_imbalan_pasca_kerja = await findNeraca({ startDate, endDate, tipe: 'kewajiban_imbalan_pasca_kerja' });
  let kewajiban_imbalan_pasca_kerja_total = BigInt(0);
  const kewajiban_imbalan_pasca_kerja_detail = kewajiban_imbalan_pasca_kerja?.map((akuns) => {
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
    kewajiban_imbalan_pasca_kerja_total = kewajiban_imbalan_pasca_kerja_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });


  const utang_jangka_panjang = utang_jangka_panjang_utang_bank_total + utang_jangka_panjang_utang_lain_lain_total + kewajiban_imbalan_pasca_kerja_total

  // ----------------------------------------
  const ekuity_modal_dasar = await findNeraca({ startDate, endDate, tipe: 'ekuity_modal_dasar' });
  let ekuity_modal_dasar_total = BigInt(0);
  const ekuity_modal_dasar_detail = ekuity_modal_dasar?.map((akuns) => {
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
    ekuity_modal_dasar_total = ekuity_modal_dasar_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const ekuity_modal_pemegang_saham = await findNeraca({ startDate, endDate, tipe: 'ekuity_modal_pemegang_saham' });
  let ekuity_modal_pemegang_saham_total = BigInt(0);
  const ekuity_modal_pemegang_saham_detail = ekuity_modal_pemegang_saham?.map((akuns) => {
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
    ekuity_modal_pemegang_saham_total = ekuity_modal_pemegang_saham_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const ekuity_tax_amnesty = await findNeraca({ startDate, endDate, tipe: 'ekuity_tax_amnesty' });
  let ekuity_tax_amnesty_total = BigInt(0);
  const ekuity_tax_amnesty_detail = ekuity_tax_amnesty?.map((akuns) => {
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
    ekuity_tax_amnesty_total = ekuity_tax_amnesty_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const ekuity_cadangan = await findNeraca({ startDate, endDate, tipe: 'ekuity_cadangan' });
  let ekuity_cadangan_total = BigInt(0);
  const ekuity_cadangan_detail = ekuity_cadangan?.map((akuns) => {
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
    ekuity_cadangan_total = ekuity_cadangan_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  // ----------------------------------------
  const ekuity_saldo_laba_rugi = await findNeraca({ startDate, endDate, tipe: 'ekuity_saldo_laba_rugi' });
  let ekuity_saldo_laba_rugi_total = BigInt(0);
  const ekuity_saldo_laba_rugi_detail = ekuity_saldo_laba_rugi?.map((akuns) => {
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
    ekuity_saldo_laba_rugi_total = ekuity_saldo_laba_rugi_total + currentSaldo;

    return {
      label: akuns.akun.label,
      value: currentSaldo,
    };
  });

  const ekuityTotal =
    ekuity_modal_dasar_total + ekuity_modal_pemegang_saham_total + ekuity_tax_amnesty_total + ekuity_cadangan_total + ekuity_saldo_laba_rugi_total + labarugi?.data?.laba_rugi_setelah_pajak?.total;

  const response = {
    pasiva: {
      asset: {
        asset_lancar: {
          kas: {
            kas_besar: {
              details: kas_besar_detail,
              total: kas_besar_total,
            },
            kas_harian: {
              details: kas_harian_detail,
              total: kas_harian_total,
            },
            total: kas_besar_total + kas_harian_total,
          },
          bank: {
            bank_giro: {
              details: bank_giro_detail,
              total: bank_giro_total,
            },
            deposito: {
              details: deposito_detail,
              total: deposito_total,
            },
            total: bank_giro_total + deposito_total,
          },
          pembayaran_dimuka: {
            pembayaran_uang_muka: {
              details: pembayaran_uang_muka_detail,
              total: pembayaran_uang_muka_total,
            },
            pembayaran_biaya_dimuka: {
              details: pembayaran_biaya_dimuka_detail,
              total: pembayaran_biaya_dimuka_total,
            },
            value: pembayaran_uang_muka_total + pembayaran_biaya_dimuka_total,
          },
          piutang: {
            piutang_usaha_lancar: {
              details: piutang_usaha_lancar_detail,
              total: piutang_usaha_lancar_total,
            },
            piutang_tidak_lancar: {
              details: piutang_tidak_lancar_detail,
              total: piutang_tidak_lancar_total,
            },
            piutang_pemegang_saham: {
              details: piutang_pemegang_saham_detail,
              total: piutang_pemegang_saham_total,
            },
            total: piutang_usaha_lancar_total + piutang_tidak_lancar_total + piutang_pemegang_saham_total,
          },
          investasi: {
            details: investasi_detail,
            total: investasi_total,
          },
          total: asset_lancar_total,
        },
        asset_tetap: {
          nilai_perolehan: {
            nilai_perolehan_tanah: {
              details: nilai_perolehan_tanah_detail,
              total: nilai_perolehan_tanah_total,
            },
            nilai_perolehan_bangunan: {
              details: nilai_perolehan_bangunan_detail,
              total: nilai_perolehan_bangunan_total,
            },
            nilai_perolehan_alat_gedung: {
              details: nilai_perolehan_alat_gedung_detail,
              total: nilai_perolehan_alat_gedung_total,
            },
            nilai_perolehan_kendaraan: {
              details: nilai_perolehan_kendaraan_detail,
              total: nilai_perolehan_kendaraan_total,
            },
            nilai_perolehan_perlengkapan_kantor: {
              details: nilai_perolehan_perlengkapan_kantor_detail,
              total: nilai_perolehan_perlengkapan_kantor_total,
            },
            nilai_perolehan_lain_lain: {
              details: nilai_perolehan_lain_lain_detail,
              total: nilai_perolehan_lain_lain_total,
            },
            nilai_perolehan_fasilitas_penunjang: {
              details: nilai_perolehan_fasilitas_penunjang_detail,
              total: nilai_perolehan_fasilitas_penunjang_total,
            },
            total: nilai_perolehan_total,
          },
          akumulasi_penyusutan: {
            akk_penyusutan_bangunan: {
              details: akk_penyusutan_bangunan_detail,
              total: akk_penyusutan_bangunan_total,
            },
            akk_penyusutan_alat_gedung: {
              details: akk_penyusutan_alat_gedung_detail,
              total: akk_penyusutan_alat_gedung_total,
            },
            akk_penyusutan_kendaraan: {
              details: akk_penyusutan_kendaraan_detail,
              total: akk_penyusutan_kendaraan_total,
            },
            akk_perlengkapan_kantor: {
              details: akk_perlengkapan_kantor_detail,
              total: akk_perlengkapan_kantor_total,
            },
            akk_penyusutan_lain_lain: {
              details: akk_penyusutan_lain_lain_detail,
              total: akk_penyusutan_lain_lain_total,
            },
            akk_penyusutan_fasilitas_penunjang: {
              details: akk_penyusutan_fasilitas_penunjang_detail,
              total: akk_penyusutan_fasilitas_penunjang_total,
            },
            total: akumulasi_penyusutan_total,
          },
          total: nilai_perolehan_total + akumulasi_penyusutan_total,
        },
        asset_lain_lain: {
          biaya_pendirian: {
            details: biaya_pendirian_detail,
            total: biaya_pendirian_total,
          },
          penyertaan_usaha: {
            details: penyertaan_usaha_detail,
            total: penyertaan_usaha_total,
          },
          total: biaya_pendirian_total + penyertaan_usaha_total,
        },
        total: asset_lancar_total + (nilai_perolehan_total + akumulasi_penyusutan_total) + (biaya_pendirian_total + penyertaan_usaha_total),
      },
      kewajiban: {
        kewajiban_lancar: {
          utang_bank: {
            details: utang_bank_detail,
            total: utang_bank_total,
          },
          utang_pajak: {
            details: utang_pajak_detail,
            total: utang_pajak_total,
          },
          utang_usaha: {
            details: utang_usaha_detail,
            total: utang_usaha_total,
          },
          utang_lain_lain: {
            details: utang_lain_lain_detail,
            total: utang_lain_lain_total,
          },
          penerimaan_dimuka_sewa: {
            details: sewaDiterimaDimukaReformat,
            total: BigInt(sewaDiterimaDimuka?.totalAllCredit),
          },
          penerimaan_dimuka_deposit_sewa: {
            details: sewaDiterimaDimukaDepositReformat,
            total: BigInt(sewaDiterimaDimukaDeposit?.totalAllCredit),
          },
          biaya_masih_harus_dibayar: {
            details: biaya_masih_harus_dibayar_detail,
            total: biaya_masih_harus_dibayar_total,
          },
          total: kewajibanLancarTotal,
        },
        utang_jangka_panjang: {
          utang_jangka_panjang_utang_bank: {
            details: utang_jangka_panjang_utang_bank_detail,
            total: utang_jangka_panjang_utang_bank_total,
          },
          utang_jangka_panjang_utang_lain_lain: {
            details: utang_jangka_panjang_utang_lain_lain_detail,
            total: utang_jangka_panjang_utang_lain_lain_total,
          },
          kewajiban_imbalan_pasca_kerja: {
            details: kewajiban_imbalan_pasca_kerja_detail,
            total: kewajiban_imbalan_pasca_kerja_total,
          },
          total: utang_jangka_panjang,
        },
      },
      ekuity: {
        ekuity_modal_dasar: {
          details: ekuity_modal_dasar_detail,
          total: ekuity_modal_dasar_total,
        },
        ekuity_modal_pemegang_saham: {
          details: ekuity_modal_pemegang_saham_detail,
          total: ekuity_modal_pemegang_saham_total,
        },
        ekuity_tax_amnesty: {
          details: ekuity_tax_amnesty_detail,
          total: ekuity_tax_amnesty_total,
        },
        ekuity_cadangan: {
          details: ekuity_cadangan_detail,
          total: ekuity_cadangan_total,
        },
        ekuity_saldo_laba_rugi: {
          details: [
            ...ekuity_saldo_laba_rugi_detail,
            {
              label: "Laba Rugi Tahun Berjalan",
              value: labarugi?.data?.laba_rugi_setelah_pajak?.total
            }
          ],
          total: ekuity_saldo_laba_rugi_total + (labarugi?.data?.laba_rugi_setelah_pajak?.total),
        },
        total: ekuityTotal,
      },
      total: ekuityTotal + utang_jangka_panjang + kewajibanLancarTotal,
    },
  };

  return {
    data: response,
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
  getNeraca,
  getSetting,
  postSetting,
};
