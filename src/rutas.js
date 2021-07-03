const { Router } = require('express')
const router = Router()

const Idiomas = require('./modelos/idiomas')
const Inventarios = require('./modelos/inventarios')
const Contenidos = require('./modelos/contenidos')
const Textos = require('./modelos/textos')
require('./conexion')




router.get('/inventario', async (req, res) => {
    const grupo = req.query.grupo
    const salida = await Inventarios.find(
        { $or: [{ Grupo: '1' }, { Grupo: '5' }, { Grupo: '8' }, { Grupo: '9' }] },
        { _id: 0, Grupo: 1, Cantidad: 1, Descripcion1: 1,Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 }
    ).sort({ Grupo: 1, Descripcion1: 1 })
    if (!salida) {
        return res.status(404).send("ERROR")
    }
    res.status(200).json(salida)
});




router.get('/contenido', async (req, res) => {
    const ID = req.query.ID
    const salida = await Contenidos.findOne(
        { ID: ID },
        { _id: 0, Texto: 1 }
    )
    if (!salida) {
        return res.status(404).send("ERROR")
    }
    res.status(200).json(salida)
});
//
module.exports = router