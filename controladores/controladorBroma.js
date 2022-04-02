const { request, response } = require('express');
const Broma = require('./../modelos/modeloBroma');

const insertarBroma = (request,response) => {
    // console.log("INGRESO AL METODO INSERTAR BROMAS");
    const {id,setup,punchline} = request.body;
    if(!id || !setup || !punchline){
        response.statusMessage = "Para crear una broma es necesario ingresar el id, setup y punchline.";
        console.log("ERRROR CON LA VALIDACION");
        return response.status(406).end();
    }
    else{
        const nuevaBroma = {
            id, setup, punchline
        };
        Broma.create(nuevaBroma)
            .then( nuevaBroma => {
                console.log("EXITOSO");
                return response.status(201).json(nuevaBroma);
            })
            .catch( err => {
                response.statusMessage = "Hubo un error al ejecutar el insert "+err;
                console.log("ERROR");
                return response.status(404).end();
            })
    }
};

const allBromas = (request,response) => {
    Broma.find()
        .then( listaBromas => {
            return response.status(200).json(listaBromas);
        })
        .catch( err=>{
            response.statusMessage = "Hubo un error al mostrar todas las bromas "+err;
            return response.status(404).end();
        })
};

const bromaRandom = (request,response) => {
    //HALLAMOS EL NUMERO DE REGISTROS
    // const numeroResgistros = Broma.find().count();
    console.log("SE ESTA EJECUTANDO EL METODO BROMARANDOM")
    Broma.find()
        .then( allBromas =>  {
            let numeroResgistros = allBromas.length;

            function randomNumber(max){
                const r = Math.random()*(max)
                return Math.floor(r)
            }

            let bromaAzar = randomNumber(numeroResgistros);
            console.log("numero de aleatorio "+bromaAzar);

            return response.status(200).json(allBromas[bromaAzar]);
        })
        .catch( err=>{
            response.statusMessage = "Hubo un error al mostrar una broma aleatorio "+err;
            return response.status(404).end();
        })
};

const bromaById = (request,response) => {
    console.log("SE ESTA EJECUTANDO EL BROMABYID")
    const {id} = request.params;
    Broma.findOne({id})
        .then( bromaEncontrada =>  {
            return response.status(200).json(bromaEncontrada);
        })
        .catch( err => {
            response.statusMessage = "Hubo un error encontrando la broma POR ID. "+err;
            return response.status(404).end();
        })
};
const borrarBroma = (request,response) => {
    const {id} = request.params;
    Broma.findOneAndDelete({id})
        .then( () => {
            return response.status(204).end();
        })
        .catch( err => {
            response.statusMessage = "Hubo un error eliminado una broma. "+err;
            return response.status(404).end()
        })
}

const actualizaBroma = (request,response) => {
    const {idBuscar} = request.params;
    const {id, setup, punchline} = request.body;
    const bromaActualizar = {
        id, setup, punchline
    }
    Broma.findOneAndUpdate( {idBuscar}, {$set : bromaActualizar},{new:true})
        .then( datoBroma => {
            return response.status(202).json(datoBroma);
        })
        .catch( err => {
            response.statusMessage = "No se pudo actualizar UNA BROMA";
            return response.status(404).end();
        })
};

const ControladorBroma = {
    insertarBroma,
    allBromas,
    bromaById,
    borrarBroma,
    bromaRandom,
    actualizaBroma
}
module.exports = ControladorBroma;