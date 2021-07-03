let Idiomas = [{
    "ID": "1", "texto": "Castellano", "color": "#f0f"
},
{
    "ID": "2", "texto": "Euskara", "color": "#f0f"
}]
const cabecera_tabla = (`
<tr>       
    <th>Nº</th>
    <th>Descripción</th>         
    <th>Marca</th>
    <th>Modelo</th>
    <th>Fecha</th>         
</tr>
`)
const grupos = [
    { ID: '1', nombre: 'Espacios' },
    { ID: '5', nombre: 'Audiovisuales' },
    { ID: '8', nombre: 'Iluminación' },
    { ID: '9', nombre: 'Maquinaria' }
]
let Idioma_sel = 0





const listado_inventario = d => {
    grupos.forEach(g => {
        let cuerpoTabla = new String()
        let titulo = new String()
        d.forEach(element => {
            if (element.Grupo == g.ID) {
                titulo = g.nombre
                cuerpoTabla += (`
                <tr>
                    <td>${element.Cantidad}</td>          
                    <td>${element.Descripcion1}</td>
                    <td>${element.Marca}</td>
                    <td>${element.Modelo}</td>
                    <td class="fecha">${fecha(element.Modificado)}</td>
                </tr>
                                `)
            }
        })

        tablas.innerHTML += '<h3>' + titulo + '</h3><table>' + cabecera_tabla + cuerpoTabla + '</table>'
    });
}
const salida_contenido = d => {
    contenido.innerHTML = d.Texto.replace('\\r\\n', '<br>')
}
const carga_contenido = i => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch("/contenido?ID=" + i, ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            salida_contenido(response)
        })
}
const carga_inventario = g => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch("/inventario?grupo=" + g, ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            listado_inventario(response)
        })
}
const fecha = t => {
    const tm = new Date(t * 1000)
    let d = tm.getDay()
    let m = tm.getMonth()
    let a = tm.getFullYear()
    d = d < 10 ? '0' + d : d
    m = m < 10 ? '0' + m : m
    return d + '/' + m + '/' + a
}
window.onload = () => {
    const tablas = document.getElementById('tablas')
    const contenido = document.getElementById('contenido')
    //
    carga_inventario()
    carga_contenido('1130')
}