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
                    <td>${element['Descripcion' + (id_sel + 1)]}</td>
                    <td>${element.Marca}</td>
                    <td>${element.Modelo}</td>
                    <td class="fecha">${fecha(element.Modificado)}</td>
                </tr>
                                `)
            }
        })

        tablas.innerHTML += '<h3>' + titulo + '</h3><table>' + cabecera_tabla[id_sel] + cuerpoTabla + '</table>'
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
    let d = tm.getDay()
    let m = tm.getMonth()
    let a = tm.getFullYear()
    d = d < 10 ? '0' + d : d
    m = m < 10 ? '0' + m : m
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
let id_sel = 0
window.onload = () => {
    const tablas = document.getElementById('tablas')
    const contenido = document.getElementById('contenido')
    //
    determina_idioma()
}