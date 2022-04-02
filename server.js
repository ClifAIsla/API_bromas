const { json } = require('express');
const express = require('express');
require('./config/config');
const app = express();

const BromaRouter = require('./rutas/rutaBromas');
console.log("desde el servidor")
app.use( express.json() );
app.use('/api/jokes',BromaRouter);

app.listen( 8080, () => {
    console.log(`EL SERVICOR SE ENCUENTRA CORRIEDNO EN EL PUERTO 8080.`)
})
