const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bromas_db',{useNewUrlParser: true})
    .then( ()=>  {
        console.log("Base de datos conectada.")
    })
    .catch( ()=> {
        console.log("Hubo un error a conectarese a la base de datos.")
    })

mongoose.connection.on('error', (err)=>{
    console.log('Mongoose error: '+err);
    process.exit(0);
});

mongoose.connection.on('disconnected',() => {
    console.log("Base de datos desconectado.")
})