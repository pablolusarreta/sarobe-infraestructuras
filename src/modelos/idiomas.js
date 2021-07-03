const { Schema, model } = require('mongoose')
const idiomasSchema = new Schema({
    ID: String,
    Listado1: String,
    Listado2: String

})

module.exports = model('idiomas', idiomasSchema)