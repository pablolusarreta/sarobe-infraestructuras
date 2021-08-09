const { Router } = require('express')
const router = Router()

const Idiomas = require('./modelos/idiomas')
const Inventarios = require('./modelos/inventarios')
const Contenidos = require('./modelos/contenidos')
const Textos = require('./modelos/textos')
const fs = require('fs');
const pdf = require('html-pdf')

require('./conexion.js')
router.get('/inventario', async (req, res) => {
    const salida = await Inventarios.find(
        { $and: [{ Alquiler: '1' }], $or: [{ Grupo: '1' }, { Grupo: '5' }, { Grupo: '8' }, { Grupo: '9' }] },
        { _id: 0, Grupo: 1, Cantidad: 1, Descripcion1: 1, Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 }
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fecha = t => {
    const tm = new Date(t * 1000)
    let d = tm.getDay(); let m = tm.getMonth(); let a = tm.getFullYear();
    d = d < 10 ? '0' + d : d; m = m < 10 ? '0' + m : m
    return d + '/' + m + '/' + a
}
router.get('/pdf', async (req, res) => {
    const i = Number(req.query.i)
    const salida = await Inventarios.find(
        { $and: [{ Alquiler: '1' }], $or: [{ Grupo: req.query.s }] },
        { _id: 0, Grupo: 1, Cantidad: 1, Descripcion1: 1, Descripcion2: 1, Marca: 1, Modelo: 1, Modificado: 1 }
    ).sort({ Grupo: 1, Descripcion1: 1, Descripcion2: 1 })
    if (!salida) { return res.status(404).send("ERROR") }
    let cuerpoTabla = new String()
    salida.forEach(element => {
        cuerpoTabla += (`
                <tr>
                    <td>${element.Cantidad}</td>          
                    <td>${element['Descripcion' + (i + 1)]}</td>
                    <td>${element.Marca}</td>
                    <td>${element.Modelo}</td>
                    <td class="fecha">${fecha(element.Modificado)}</td>
                </tr>
                                `)
    })
    const estilo = ` <style>
                        body{
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            padding: 20px;
                            margin: 10px;
                            font-size: 11px;
                        }
                        #logo {
                            position: absolute;
                            right: 30px;
                            width:173px;
                            height:60px;
                            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAA8CAIAAACb963yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQzFBRjJCRjlBMUZFNDExQTBDREQyMzg2NzEwOTU0MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NjQwOTk4RTdGMjcxMUU1OEQ0N0M3QkM3N0FGQ0ZCMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjQwOTk4RDdGMjcxMUU1OEQ0N0M3QkM3N0FGQ0ZCMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNEMUFGMkJGOUExRkU0MTFBMENERDIzODY3MTA5NTQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDMUFGMkJGOUExRkU0MTFBMENERDIzODY3MTA5NTQwIi8+IDwvcmRmOkRlc2NyaXB0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");
                        }
                        table {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            margin: 10px;
                            font-size: 11px;
                            width: calc(100% - 20px);
                            border-collapse: collapse;
                            background-color: white;
                        }
                        h1 {
                            margin: 10px;
                            font-weight: 200;
                        }
                        th,
                        td {
                            padding: 4px 10px;
                            border: 1px solid #ccc;
                        }

                        td.fecha {
                            font-size: 9px;
                        }

                        th {
                            background-color: #ccc;
                            font-size: 12px;
                            font-weight: 200;
                        }

                        header {
                            margin-top: 100px;
                            margin-bottom: 40px;
                            width: 100%;
                            text-align: right;
                            font-size: 10px;
                        }

                        header>span>a {
                            text-decoration: none;
                            color: #999;
                        }

                        header>span {
                            padding: 0 10px
                        }
                    </style>`
    const cabeza = `<div id="logo"></div><header>
                    <span>M. Yurramendi 2, 20130 Urnieta (Gipuzkoa)</span>
                    |<span>Tel.: <a href="callto:943008042">943 008042</a></span>
                    |<span> Fax: 943 008067</span>
                    |<span><a href="mailto:sarobe@urnieta.eus">sarobe@urnieta.eus</a></span>
                    |<span>2012 ®</span>
</header>`
    const html = `${estilo}<body>${cabeza}<h1>${req.query.titulo}</h1><table>${cabecera_tabla[i] + cuerpoTabla}</table> </body>`
    pdf.create(html).toFile(`src/public/pdf/${req.query.titulo}.pdf`, function (error, respuesta) {
        if (error) return console.log(error);
        console.log(respuesta); // { filename: '/app/businesscard.pdf' } 
        res.status(200).json(`pdf/${req.query.titulo}.pdf`)
    });

});
//
const cabecera_tabla = [`<tr>       
                            <th>Nº</th>
                            <th>Descripción</th>         
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Fecha</th>         
                        </tr>`,
    `<tr>       
                            <th>Zª</th>
                            <th>Deskribapen</th>         
                            <th>Markak</th>
                            <th>Eredu</th>
                            <th>Data</th>         
                        </tr>`
]
module.exports = router