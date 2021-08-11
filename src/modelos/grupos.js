const { Schema, model } = require('mongoose')
const gruposSchema = new Schema({
    ID: String,
    Listado1: String,
    Listado2: String,
    Nota1: String,
    Nota2: String,
    Url: Array
})

module.exports = model('grupos', gruposSchema)