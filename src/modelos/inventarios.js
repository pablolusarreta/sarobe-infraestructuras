const { Schema, model } = require('mongoose')
const inventariosSchema = new Schema({
    ID: String,
    Cantidad: String,
    Grupo: String,
    Descripcion1: String,
    Descripcion2: String,
    Marca: String,
    Modelo: String,
    Modificado: String,
    Estado: String,
    Departamento: String,
    Ubicacion: String,
    Portable: String,
    Disponible: String,
    Alquiler: String,
    Ocupacion: String,
    Foto: String
})

module.exports = model('inventarios', inventariosSchema)
