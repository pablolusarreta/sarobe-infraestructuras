const listado_inventario = d => {
    tablas.innerHTML = ''
    grupos.forEach(g => {
        let cuerpoTabla = new String()
        let titulo = new String()
        d.forEach(element => {
            if (element.Grupo == g.ID) {
                titulo = (id_sel == 0) ? g.nombre : g.izena
                cuerpoTabla += (`
                <tr>
                    <td>${element.Cantidad}</td>          
                    <td>${element['Descripcion' + (id_sel + 1)]}</td>
                    <td>${element.Marca}</td>
                    <td>${element.Modelo}</td>
                    <td class="fecha">${fecha(element.Modificado)}</td>
                </tr>
                                `)
            }
        })

        tablas.innerHTML +=
            `<div>
            <h1 class="titulos">${titulo}<img src="img/print.png" onclick="imprime(this,'${titulo}')"></h1>
            <table>${cabecera_tabla[id_sel] + cuerpoTabla}</table>
        </div>`
    });
}

const salida_contenido = d => {
    contenido.innerHTML = d.Texto.replace('\\r\\n', '<br>')
}
const carga_contenido = () => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch("/contenido?ID=" + (id_sel + 1) + '130', ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            salida_contenido(response)
        })
}
const carga_inventario = () => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch("/inventario", ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            listado_inventario(response)
        })
}
const fecha = t => {
    const tm = new Date(t * 1000)
    let d = tm.getDay(); let m = tm.getMonth(); let a = tm.getFullYear();
    d = d < 10 ? '0' + d : d; m = m < 10 ? '0' + m : m
    return d + '/' + m + '/' + a
}
const determina_idioma = () => {
    if (localStorage.sarobeInfraestructuras2021) {
        id_sel = JSON.parse(localStorage.getItem('sarobeInfraestructuras2021')).id_sel
    }
    document.getElementById('selector_idiomas').innerHTML =
        (`<option value="0" ${(id_sel == 0) ? 'selected' : ''}>Castellano</option>
         <option value="1" ${(id_sel == 1) ? 'selected' : ''}>Euskera</option>`)
    document.getElementById('titular').innerHTML =
        ((id_sel == 0) ? 'Infraestructuras' : 'Azpiegiturak')
    carga_inventario()
    carga_contenido()
}
const establece_idioma = i => {
    id_sel = Number(i)
    localStorage.setItem('sarobeInfraestructuras2021', JSON.stringify({ id_sel: Number(i) }))
    determina_idioma()
}
const imprime = (ob, titulo) => {
    console.log(ob.parentNode.parentNode.parentNode.innerHTML)
    let htm =    `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${titulo}</title>
        <link rel="stylesheet" href="index.css">
        <style type="text/css" media="print">
        @media print {
            @font-face {
                font-family: principal;
                src: url("../fuentes/segoe_ui_light-webfont.woff");
            }
            body{ font-family: principal;}
            img{display:none;}
            h1{font-size: 28px;}
            table {               
                margin-bottom: 100px;
                width: 100vw;
                border-collapse: collapse;
                border: 1px solid #000;
                background-color: white;
            }
            th,td{ border: 1px solid #000;font-size: 14px;}
            footer{font-size:12px;text-align: center;}
        }
        </style>
    </head>  
    <body>
    ${ob.parentNode.parentNode.innerHTML}
    <footer>
        <span>M. Yurramendi 2, 20130 Urnieta (Gipuzkoa)</span>
        <b>|</b><span>Tel.: <a href="callto:943008042">943 008042</a></span>
        <b>|</b><span> Fax: 943 008067</span>
        <b>|</b><span><a href="mailto:sarobe@urnieta.eus">sarobe@urnieta.eus</a></span>
        <b>|</b><span>2012 ®</span>
        </footer>
    </body>
    </html>`
    let ventana = window.open()
    ventana.document.write(htm)
    ventana.print()
    ventana.close()

}
/////////////////////////////////////////////////////////////////////////
let id_sel = 0
window.onload = () => {
    const tablas = document.getElementById('tablas')
    const contenido = document.getElementById('contenido')
    //
    determina_idioma()
}