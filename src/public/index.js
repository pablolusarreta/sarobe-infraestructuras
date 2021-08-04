const listado_inventario = d => {
    tablas.innerHTML = ''
    grupos.forEach(g => {
        let cuerpoTabla = new String()
        let titulo = new String()
        let dep = new String()
        d.forEach(element => {
            if (element.Grupo == g.ID) {
                titulo = (id_sel == 0) ? g.nombre : g.izena
                dep = element.Grupo
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
            <h1 class="titulos">${titulo}<button class="descargar" onclick="pdf(${dep},${id_sel},'${titulo}')">
            <img  src="img/pdf.png" ><img  src="img/descargar.png" >
            </button></h1>
            <table>${cabecera_tabla[id_sel] + cuerpoTabla}</table>
        </div>`
    });
}

const salida_contenido = d => {
    const extras = `<div style="height:60px;"></div><h1 class="titulos">${otros[id_sel].plano.nom}<button class="descargar">
                    <img  src="img/pdf.png" onclick="descarga('${otros[id_sel].plano.url[0]}')">
                    <img  src="img/dwg.png" onclick="descarga('${otros[id_sel].plano.url[1]}')">
                    <img  src="img/descargar.png" >
                    </button></h1><br>
                    <h1 class="titulos">${otros[id_sel].conciertos.nom}<button class="descargar">
                    <img  src="img/pdf.png" onclick="descarga('${otros[id_sel].conciertos.url[0]}')">
                    <img  src="img/descargar.png" >
                    </button></h1>`
    contenido.innerHTML = d.Texto.replace('\\r\\n', '<br>') + extras
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
        `<option value="0" ${(id_sel == 0) ? 'selected' : ''}>Castellano</option>
         <option value="1" ${(id_sel == 1) ? 'selected' : ''}>Euskera</option>`
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
const pdf = (s, i, titulo) => {
    esperando(true)
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch(`/pdf?s=${s}&i=${i}&titulo=${titulo}`, ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            window.open(response)
            esperando(false)
        })
}
const descarga = (fichero) => {
    esperando(true)
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch(`/descarga?fichero=${fichero}`, ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            window.open(response)
            esperando(false)
        })
}
const esperando = m => {
    telon.style.display = m ? 'block' : 'none'
}
/////////////////////////////////////////////////////////////////////////
let id_sel = 0
window.onload = () => {
    const tablas = document.getElementById('tablas')
    const contenido = document.getElementById('contenido')
    const telon = document.getElementById('telon')
    //
    determina_idioma()
}