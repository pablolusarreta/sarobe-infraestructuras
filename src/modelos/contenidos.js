const { Schema, model } = require('mongoose')
const contenidosSchema = new Schema({
    ID: String,
    Seccion: String,
    Texto: String,
    Nivel: String,
    Idioma: String,
    Modificado: String,
    Usuario_mod: String
})

module.exports = model('contenidos', contenidosSchema)