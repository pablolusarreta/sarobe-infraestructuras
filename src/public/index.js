if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i))
    location.assign("index.movil.html")
///////////////////////////////////////////////////////////////
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
                cuerpoTabla +=
                    `<tr>
                    <td>${element.Cantidad}</td>          
                    <td onclick="copia_id('${element._id}')">${element['Descripcion' + (id_sel + 1)]}</td>
                    <td>${element.Marca}</td>
                    <td>${element.Modelo}</td>
                    <td class="fecha">${fecha(element.Modificado)}</td>
                </tr>`
            }
        })
        tablas.innerHTML +=
            `<div>
            <h1 class="titulos">${titulo}<button class="descargar" onclick="pdf(${dep},${id_sel},'${titulo}')">
            ${datos[id_sel].descarga.nom} PDF<img  src="img/descargar.png" >
            </button></h1>
            <div class="nota" id="nota${g.ID}"></div>
            <table>${cabecera_tabla[id_sel] + cuerpoTabla}</table>
        </div>`
    });
    carga_notas()
}
/////////////////////////////////////////////////////////////////////////////
const carga_contenido = () => {
    let salida = `<h1 class="titulos">${datos[id_sel].plano.nom}
                    <button class="descargar" onclick="descarga('${datos[id_sel].plano.url[0]}')">                  
                    ${datos[id_sel].descarga.nom} PDF<img  src="img/descargar.png" ></button>
                    <button class="descargar" onclick="descarga('${datos[id_sel].plano.url[1]}')">
                    ${datos[id_sel].descarga.nom} SWG<img  src="img/descargar.png" >
                    </button></h1>
                    <div class="nota" id="nota00"></div>
                    <h1 class="titulos">${datos[id_sel].conciertos.nom}
                    <button class="descargar" onclick="descarga('${datos[id_sel].conciertos.url[0]}')">
                    ${datos[id_sel].descarga.nom} PDF<img  src="img/descargar.png" >
                    </button></h1>
                    <div class="nota" id="nota01"></div>`
    //contenido.innerHTML = d.Texto.replace('\\r\\n', '<br>') + extras
    contenido.innerHTML = salida
    titular.innerHTML = datos[id_sel].seccion.nom
    carga_inventario()
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
const carga_notas = () => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default' };
    fetch("/notas", ini)
        .then(res => {
            return res.json()
        })
        .then(response => {
            listado_notas(response)
        })
}
const listado_notas = d => {
    //console.log(d[0].htm1)
    const g = ['00', '01', '1', '5', '8', '9']
    for (let i = 0; i < g.length; i++) {
        let ele = document.getElementById('nota' + g[i])
        ele.innerHTML = (id_sel == 0) ? d[i].htm1 : d[i].htm2
    }
}
const copia_id = t => {
    const s = `_id: ObjectId("${t}")`
    navigator.clipboard.writeText(s)
        .then(() => {
            console.log(s);
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}
/////////////////////////////////////////////////////////////////////////
const fecha = t => {
    const tm = new Date(t * 1000)
    let d = tm.getDay(); let m = tm.getMonth(); let a = tm.getFullYear();
    d = d < 10 ? '0' + d : d; m = m < 10 ? '0' + m : m
    return d + '/' + m + '/' + a
}
const determina_idioma = () => {
    if (localStorage.sarobeInfraestructuras2021) {
        id_sel = JSON.parse(localStorage.getItem('sarobeInfraestructuras2021')).id_sel
    } else { id_sel = 0 }
    document.getElementById('selector_idiomas').innerHTML =
        `<option value="0" ${(id_sel == 0) ? 'selected' : ''}>Castellano</option>
            <option value="1" ${(id_sel == 1) ? 'selected' : ''}>Euskera</option>`
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
            window.location.assign(response)
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
const esperando = b => {
    telon.style.display = b ? 'block' : 'none'
    document.getElementsByTagName('section')[0].style.filter = b ? 'blur(2px)' : 'none'
}
/////////////////////////////////////////////////////////////////////////
let id_sel = 0
window.onload = () => {
    const titular = document.getElementById('titular')
    const tablas = document.getElementById('tablas')
    const contenido = document.getElementById('contenido')
    const telon = document.getElementById('telon')
    //
    determina_idioma()
}