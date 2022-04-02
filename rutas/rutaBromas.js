const express = require('express');

const BromaRouter = express.Router();
const ControladorBroma = require('./../controladores/controladorBroma');

BromaRouter.post('/new', ControladorBroma.insertarBroma);

BromaRouter.get('', ControladorBroma.allBromas);
BromaRouter.get('/random/', ControladorBroma.bromaRandom);
BromaRouter.get('/:id', ControladorBroma.bromaById);


BromaRouter.delete('/delete/:id', ControladorBroma.borrarBroma)
BromaRouter.put('/update/:id', ControladorBroma.actualizaBroma);

module.exports = BromaRouter;