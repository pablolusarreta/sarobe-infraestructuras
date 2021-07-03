const { Schema, model } = require('mongoose')
const textosSchema = new Schema({
    ID: String,
    Listado1: String,
    Listado2: String

})

module.exports = model('textos', textosSchema)