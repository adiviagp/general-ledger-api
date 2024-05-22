const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  //  * TENANT TYPE
  const individual = await prisma.tenantType.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Individual',
    },
  });

  const perusahaan = await prisma.tenantType.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Perusahaan',
    },
  });
  console.log({ individual, perusahaan });
}

// * --------- TENANT JENIS ----
const TENANT_JENIS = ['Office Space', 'Executive Office', 'Virtual Office', 'CO Working', 'Lain-lainnya'];
function seedTenantJenis() {
  Promise.all(TENANT_JENIS.map((n) => prisma.tenantJenis.create({ data: { name: n } })))
    .then(() => console.info('[SEED] Succussfully create tenantJenis records'))
    .catch((e) => console.error('[SEED] Failed to create tenantJenis records', e));
}
seedTenantJenis();

// * --------- AKUN ----
const AKUN = [
    {
        akun: '110-10',
        label: 'Kantor Batam',
        posisi: 'Debit'
    },
    {
        akun: '110-20',
        label: 'Kas',
        posisi: 'Debit'
    },
    {
        akun: '110-30',
        label: 'Kas (USD)',
        posisi: 'Debit'
    },
    {
        akun: '120-10',
        label: 'Bank Bukopin ( AC 1002532243 )',
        posisi: 'Debit'
    },
    {
        akun: '120-11',
        label: 'Bank CIMB Niaga ( AC 2940100761003 )',
        posisi: 'Debit'
    },
    {
        akun: '120-12',
        label: 'Bank BNI AC 0362158023',
        posisi: 'Debit'
    },
    {
        akun: '120-13',
        label: 'Bank BRI',
        posisi: 'Debit'
    },
    {
        akun: '120-14',
        label: 'Bank BTN Syariah',
        posisi: 'Debit'
    },
    {
        akun: '120-15',
        label: 'Deposito',
        posisi: 'Debit'
    },
    {
        akun: '120-16',
        label: 'Bank BRI DSRA',
        posisi: 'Debit'
    },
    {
        akun: '120-20',
        label: 'Bank (USD)',
        posisi: 'Debit'
    },


    {
        akun: '130-10',
        label: 'Uang Muka Pembelian',
        posisi: 'Debit'
    },
    {
        akun: '130-20',
        label: 'Piutang Usaha',
        posisi: 'Debit'
    },
    {
        akun: '130-40',
        label: 'Cadangan Kerugian Piutang',
        posisi: 'Debit'
    },
    {
        akun: '130-50',
        label: 'Piutang Non Usaha Tdk Lancar',
        posisi: 'Debit'
    },
    {
        akun: '130-51',
        label: 'Piutang Pokok Dan Bunga AGW',
        posisi: 'Debit'
    },
    {
        akun: '130-52',
        label: 'Piutang Non Usaha Lancar',
        posisi: 'Debit'
    },
    {
        akun: '130-53',
        label: 'Piutang Listrik Tenant',
        posisi: 'Debit'
    },

    {
        akun: '140-10',
        label: 'Persedian 1',
        posisi: 'Debit'
    },
    {
        akun: '140-20',
        label: 'Persediaan 2',
        posisi: 'Debit'
    },
    {
        akun: '140-30',
        label: 'Persediaan 3',
        posisi: 'Debit'
    },
    {
        akun: '140-40',
        label: 'Persediaan 4',
        posisi: 'Debit'
    },
    {
        akun: '149-98',
        label: 'Persediaan Dalam Perjalanan Beli',
        posisi: 'Debit'
    },
    {
        akun: '149-99',
        label: 'Persediaan Dalam Perjalanan Beli',
        posisi: 'Debit'
    },



    {
        akun: '150-10',
        label: 'UM Pajak 4.2 Sewa & Service Charge',
        posisi: 'Debit'
    },
    {
        akun: '150-20',
        label: 'UM PPh Psl 25 Badan',
        posisi: 'Debit'
    },
    {
        akun: '150-21',
        label: 'UM Pengurusan Sertifikat Tanah ( BPHTB )',
        posisi: 'Debit'
    },
    {
        akun: '150-22',
        label: 'UM BIaya Asuransi Gedung',
        posisi: 'Debit'
    },
    {
        akun: '150-23',
        label: 'Biaya Pembuatan Partisi Kantor',
        posisi: 'Debit'
    },


    {
        akun: '160-10',
        label: 'Investasi Saham',
        posisi: 'Debit'
    },
    {
        akun: '160-20',
        label: 'Investasi Obligasi',
        posisi: 'Debit'
    },
    {
        akun: '170-10',
        label: 'Tanah',
        posisi: 'Debit'
    },
    {
        akun: '170-20',
        label: 'Bangunan Kantor',
        posisi: 'Debit'
    },
    {
        akun: '170-21',
        label: 'Partisi Ruangan KPP Pratama',
        posisi: 'Debit'
    },
    {
        akun: '170-22',
        label: 'Akumulasi Penyusutan Bangunan',
        posisi: 'Debit'
    },
    {
        akun: '170-23',
        label: 'Akumulasi Penyusutan Partisi Ruangan KPP',
        posisi: 'Debit'
    },
    {
        akun: '170-30',
        label: 'Mesin dan Peralatan',
        posisi: 'Debit'
    },
    {
        akun: '170-31',
        label: 'Akumulasi Penyusutan Mesin dan Peralatan',
        posisi: 'Debit'
    },
    {
        akun: '170-40',
        label: 'Perlengkapan Kantor',
        posisi: 'Debit'
    },
    {
        akun: '170-41',
        label: 'Akumulasi Penyusutan Perlengkapan Kantor',
        posisi: 'Debit'
    },
    {
        akun: '170-50',
        label: 'Kendaraan',
        posisi: 'Debit'
    },
    {
        akun: '170-51',
        label: 'Akumulasi Penyusutan Kendaraan',
        posisi: 'Debit'
    },
    {
        akun: '170-70',
        label: 'Lahan Parkir Tambahan',
        posisi: 'Debit'
    },
    {
        akun: '170-71',
        label: 'Akumulasi Penyusutan Lahan Parkir Tambahan',
        posisi: 'Debit'
    },
    {
        akun: '170-72',
        label: 'Akta Pendirian',
        posisi: 'Debit'
    },
    {
        akun: '170-73',
        label: 'Amortisasi Akta Pendirian',
        posisi: 'Debit'
    },
    {
        akun: '170-74',
        label: 'Fasilitas Penunjang',
        posisi: 'Debit'
    },
    {
        akun: '170-75',
        label: 'Akumulasi Penyusutan Fasilitas Penunjang',
        posisi: 'Debit'
    },


    {
        akun: '210-10',
        label: 'Hutang Bank JK Pendek BRI',
        posisi: 'Credit'
    },
    {
        akun: '210-15',
        label: 'Hutang Giro',
        posisi: 'Credit'
    },
    {
        akun: '210-20',
        label: 'Hutang Usaha',
        posisi: 'Credit'
    },
    {
        akun: '210-25',
        label: 'Hutang Usaha (USD)',
        posisi: 'Credit'
    },
    {
        akun: '210-30',
        label: 'Hutang Konsinyasi',
        posisi: 'Credit'
    },
    {
        akun: '210-40',
        label: 'Uang Muka Penjualan',
        posisi: 'Credit'
    },
    {
        akun: '210-55',
        label: 'Hutang Deviden',
        posisi: 'Credit'
    },
    {
        akun: '210-60',
        label: 'Hutang Bunga',
        posisi: 'Credit'
    },
    {
        akun: '210-65',
        label: 'Biaya Yang Masih Harus Dibayar',
        posisi: 'Credit'
    },
    {
        akun: '210-75',
        label: 'Biaya Perluasan Parkir Kantor',
        posisi: 'Credit'
    },
    {
        akun: '210-76',
        label: 'Cadangan Biaya Pemeliharaan',
        posisi: 'Credit'
    },
    {
        akun: '210-77',
        label: 'Cadangan Bonus',
        posisi: 'Credit'
    },
    {
        akun: '210-80',
        label: 'Hutang Pajak PPh 4.2 Atas Sewa & Service',
        posisi: 'Credit'
    },
    {
        akun: '210-81',
        label: 'Hutang Pajak Final Sewa Tenant',
        posisi: 'Credit'
    },
    {
        akun: '210-82',
        label: 'Hutang PPh Psl 23',
        posisi: 'Credit'
    },
    {
        akun: '210-85',
        label: 'Hutang PPh Psl 25',
        posisi: 'Credit'
    },
    {
        akun: '210-90',
        label: 'Hutang Supplier / Subkon',
        posisi: 'Credit'
    },
        {
        akun: '220-10',
        label: 'Sewa Diterima Dimuka',
        posisi: 'Credit'
    },
    {
        akun: '220-20',
        label: 'Jaminan / Deposito Tenant',
        posisi: 'Credit'
    },
    {
        akun: '230-21',
        label: 'Hutang Bank BRI',
        posisi: 'Credit'
    },
    {
        akun: '250-00',
        label: 'Kewajiban Imbalan Pasca Kerja',
        posisi: 'Credit'
    },
    {
        akun: '250-01',
        label: 'Cadangan Umum',
        posisi: 'Credit'
    },
    {
        akun: '300-10',
        label: 'Modal',
        posisi: 'Credit'
    },
    {
        akun: '320-10',
        label: 'Laba Ditahan',
        posisi: 'Credit'
    },
    {
        akun: '320-20',
        label: 'Laba Tahun Berjalan',
        posisi: 'Credit'
    },
    {
        akun: '320-30',
        label: 'Laba ( Rugi ) Tax Amnesty',
        posisi: 'Credit'
    },
    {
        akun: '400-10',
        label: 'Pendapatan sewa',
        posisi: 'Credit'
    },
    {
        akun: '400-20',
        label: 'Pendapatan listrik',
        posisi: 'Credit'
    },
    {
        akun: '410-91',
        label: 'Overtime',
        posisi: 'Credit'
    },
    {
        akun: '510-10',
        label: 'Beban Bahan Bakar Generator',
        posisi: 'Credit'
    },
    {
        akun: '510-20',
        label: 'Beban Listrik PLN',
        posisi: 'Credit'
    },
    {
        akun: '510-30',
        label: 'Beban Telp dan PAM',
        posisi: 'Credit'
    },
    {
        akun: '510-40',
        label: 'Beban Cleaning Service',
        posisi: 'Credit'
    },

    {
        akun: '510-70',
        label: 'Beban Pemeliharaan',
        posisi: 'Credit'
    },
    {
        akun: '510-80',
        label: 'Beban Asuransi Gedung',
        posisi: 'Credit'
    },
    {
        akun: '510-81',
        label: 'Beban Penyusuran Gedung',
        posisi: 'Credit'
    },

    {
        akun: '510-82',
        label: 'Beban Penyusutan Peralatan Gedung',
        posisi: 'Credit'
    },

    {
        akun: '510-83',
        label: 'Beban Penyusutan Ruangan KPP Pratama',
        posisi: 'Credit'
    },

    {
        akun: '510-84',
        label: 'Beban Penyusutan Parkir Tambahan',
        posisi: 'Credit'
    },

    {
        akun: '510-85',
        label: 'Beban Penyusutan Fasilitas Penunjang',
        posisi: 'Credit'
    },

    {
        akun: '520-20',
        label: 'Biaya Denda Keterlambatan',
        posisi: 'Credit'
    },

    {
        akun: '610-10',
        label: 'Gaji Karyawan',
        posisi: 'Credit'
    },
    {
        akun: '610-30',
        label: 'Kesejahteraan Karyawan',
        posisi: 'Credit'
    },

    {
        akun: '610-40',
        label: 'Beban Kewajiban Imbalan Pasca Kerja',
        posisi: 'Credit'
    },

    {
        akun: '610-41',
        label: 'Beban Bonus',
        posisi: 'Credit'
    },

    {
        akun: '610-50',
        label: 'Promosi dan Iklan',
        posisi: 'Credit'
    },
    {
        akun: '610-60',
        label: 'Administrasi Kantor',
        posisi: 'Credit'
    },

    {
        akun: '610-61',
        label: 'Beban Pelatihan',
        posisi: 'Credit'
    },

    {
        akun: '610-62',
        label: 'beban Jasa Management',
        posisi: 'Credit'
    },
    {
        akun: '610-63',
        label: 'Beban Kendaraan',
        posisi: 'Credit'
    },

    {
        akun: '610-64',
        label: 'Beban Pajak',
        posisi: 'Credit'
    },
    {
        akun: '610-65',
        label: 'Beban Perjalanan Dinas',
        posisi: 'Credit'
    },
    {
        akun: '610-66',
        label: 'Beban Rupa-rupa Umum',
        posisi: 'Credit'
    },
    {
        akun: '610-67',
        label: 'Beban Marketing Fee',
        posisi: 'Credit'
    },


    {
        akun: '660-10',
        label: 'Beban Penyusutan Kendaraan',
        posisi: 'Credit'
    },
    {
        akun: '660-11',
        label: 'Penyusutan Perlengkapan Kantor',
        posisi: 'Credit'
    },
    {
        akun: '660-12',
        label: 'Penyusutan Mebeluler',
        posisi: 'Credit'
    },
    {
        akun: '660-16',
        label: 'Amortisasi Sertifikat',
        posisi: 'Credit'
    },


    {
        akun: '810-12',
        label: 'Pendapatan Bunga Deposito',
        posisi: 'Credit'
    },
    {
        akun: '810-30',
        label: 'Pendapatan Lain',
        posisi: 'Credit'
    },
    {
        akun: '810-31',
        label: 'Hasil Jasa Giro',
        posisi: 'Credit'
    },
    {
        akun: '910-10',
        label: 'Beban Pembuatan Installasi',
        posisi: 'Credit'
    },
    {
        akun: '910-11',
        label: 'Beban Lain',
        posisi: 'Credit'
    },
    {
        akun: '910-12',
        label: 'Beban Bunga Bank',
        posisi: 'Credit'
    },
    {
        akun: '910-13',
        label: 'Provisi Kredit',
        posisi: 'Credit'
    },

    {
        akun: '910-14',
        label: 'Pajak Bunga Deposito',
        posisi: 'Credit'
    },
    {
        akun: '910-15',
        label: 'Beban ADM Bank',
        posisi: 'Credit'
    },
    {
        akun: '910-16',
        label: 'Beban Pajak Penghasilan Final Sewa',
        posisi: 'Credit'
    },
    {
        akun: '910-17',
        label: 'Beban Pajak Penghasilan Final Listrik',
        posisi: 'Credit'
    },
    {
        akun: '910-18',
        label: 'Beban Pajak Penghasilan Tidak Final',
        posisi: 'Credit'
    },
    
    
];
function seedAkun() {
  Promise.all(AKUN.map((n) => prisma.akun.create({ data: { akun: n.akun, label: n.label, posisi: n.posisi } })))
    .then(() => console.info('[SEED] Succussfully create AKUN records'))
    .catch((e) => console.error('[SEED] Failed to create AKUN records', e));
}
seedAkun();





// * ---------------

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
