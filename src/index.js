const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors())

app.get('/api', (req, res) => {
  res.send('Selamat datang di API akuh');
});

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const productController = require('./product/product.controller');
const tenantController = require('./tenant/tenant.controller');
const akunController = require('./akun/akun.controller');
const jurnalController = require('./jurnal/jurnal.controller');
const jurnalContainerController = require('./jurnalContainer/jurnalContainer.controller');
const contractController = require('./contract/contract.controller');
const tenantJenisController = require('./tenantJenis/jenis.controller');
const neracaSaldoController = require('./neracaSaldo/neracaSaldo.controller');
const uangMukaController = require('./uangMuka/uangMuka.controller');
const pemodalController = require('./pemodal/pemodal.controller');
const bukubesarController = require('./bukubesar/bukubesar.controller');
const labaRugiController = require('./labaRugi/labaRugi.controller');
const neracaController = require('./neraca/neraca.controller');
const usersController = require('./users/users.controller');
const authController = require('./auth/auth.controller');

app.use('/products', productController);
app.use('/tenants', tenantController);
app.use('/akuns', akunController);
app.use('/jurnals', jurnalController);
app.use('/jurnalContainers', jurnalContainerController);
app.use('/contracts', contractController);
app.use('/tenant-jenis', tenantJenisController);
app.use('/neraca-saldo', neracaSaldoController);
app.use('/uang-muka', uangMukaController);
app.use('/pemodals', pemodalController);
app.use('/bukubesar', bukubesarController);
app.use('/laba-rugi', labaRugiController);
app.use('/neraca', neracaController);
app.use('/users', usersController);
app.use('/auth', authController);

app.listen(PORT, () => {
  console.log('Express API running in port: ' + PORT);
});
