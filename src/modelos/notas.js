const { Schema, model } = require('mongoose')
const notasSchema = new Schema({
    ID: String,
    htm1: String,
    htm2: String
})
module.exports = model('notas', notasSchema)