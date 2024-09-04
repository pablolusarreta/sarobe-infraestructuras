const { Router } = require('express')
const router = Router()

const Inventarios = require('./modelos/inventarios')
const Notas = require('./modelos/notas')
const fs = require('fs')

require('./conexion.js')

router.get('/notas', async (req, res) => {
    const salida = await Notas.find({}, { _id: 0, ID: 1, htm1: 1, htm2: 1 }).sort({ ID: 1 })
    if (!salida) {
        return res.status(404).send("ERROR")
    }
    res.status(200).json(salida)
});

router.get('/inventario', async (req, res) => {
    const salida = await Inventarios.find(
        { $and: [{ Alquiler: '1' }], $or: [{ Grupo: '1' }, { Grupo: '5' }, { Grupo: '8' }, { Grupo: '9' }] },
        { _id: 1, Grupo: 1, Cantidad: 1, Descripcion1: 1, Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 }
    ).sort({ Grupo: 1, Descripcion1: 1, Descripcion2: 1 })
    if (!salida) {
        return res.status(404).send("ERROR")
    }
    res.status(200).json(salida)
});
router.get('/conciertos', async (req, res) => {
    const salida = await Inventarios.find(
        { $and: [{ Ocupacion: 'conciertos' }], $or: [{ Grupo: '1' }, { Grupo: '5' }, { Grupo: '8' }, { Grupo: '9' }] },
        { _id: 0, Grupo: 1, Cantidad: 1, Descripcion1: 1, Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 }
    ).sort({ Grupo: 1, Descripcion1: 1, Descripcion2: 1 })
    if (!salida) {
        return res.status(404).send("ERROR")
    }
    res.status(200).json(salida)
});

router.get('/consulta', async (req, res) => {
    const grupo = req.query.g
    const salida = await Inventarios.find({ Grupo: grupo })
    if (!salida) { return res.status(404).send("ERROR") }
    res.status(200).json(salida)
});

router.get('/descarga', async (req, res) => {
    res.status(200).json(req.query.fichero)
});
//PDF_________________________
const PDFDocument = require("pdfkit-table")
const buildPDF = (dataCallback, endCallback, titulo, datos) => {
    const doc = new PDFDocument();

    doc.on("data", dataCallback);
    doc.on("end", endCallback);


    doc.moveDown();
    const tableArray = {
        title: titulo,
        headers: ["Nº", "Descripcion", "Marca", "Modelo"],
        rows: []
    };
    datos.forEach(element => {
        tableArray.rows.push([element.Cantidad, element.Descripcion1, element.Marca, element.Modelo])
    })
    //console.log(tableArray)
    doc.table(tableArray, { width: 460 }); // A4 595.28 x 841.89 (portrait) (about width sizes)
    doc.end();
}

router.get('/genera_pdf', async (req, res) => {
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=inventario.pdf",
    });
    const titulo = req.query.t
    const grupo = req.query.g
    const salida = await Inventarios.find({ Grupo: grupo }, { _id: 0, Cantidad: 1, Descripcion1: 1, Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 })
    if (!salida) { return res.status(404).send("ERROR") }
    else if (salida) {

        buildPDF((data) => stream.write(data), () => stream.end(), titulo, salida);
    }


});

//---------------------
const fecha = t => {
    const tm = new Date(t * 1000)
    let d = tm.getDay(); let m = tm.getMonth(); let a = tm.getFullYear();
    d = d < 10 ? '0' + d : d; m = m < 10 ? '0' + m : m
    return d + '/' + m + '/' + a
}
module.exports = router;