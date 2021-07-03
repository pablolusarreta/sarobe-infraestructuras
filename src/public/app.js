const cargaDatos = (m, u, f, d) => {
    m = m ? m : "GET", u = u ? u : "/", f = f ? f : () => { }, d = d ? d : {}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText) {
                console.log('Respuesta', this.readyState + '-' + this.status)
                f(JSON.parse(this.responseText))
            }
        }
    }
    xhttp.open(m, u, true)
    if (m == "GET") {
        xhttp.send();
    } else if (m == "POST") {
        xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
        xhttp.send(JSON.stringify(d));
    }
}
//
const listado = d => {
    //console.log(d)
    estado.innerHTML = 'Datos Cargados'
    cuerpoTabla.innerHTML = ''
    cabeceraTabla.innerHTML = (`
        <tr>
            <th>_id (mongodb)</th>
            <th>Nombre</th>
            <th>Apellido1</th>
            <th>Apellido2</th>
            <th>Telefono</th>
            <th>Relacion</th>
            <th>Lugar</th>
            <th></th>
            <th></th>
        </tr>
   `)
    let n = 0
    d.forEach(element => {
        cuerpoTabla.innerHTML += (`

        <tr>
            <td class="id" title="${element._id}">&#8801;
            </td>
            <td><input type="text" id="nom${n}" value="${element.Nombre}" title="${element.Nombre}"></td>
            <td><input type="text" id="ap1${n}" value="${element.Apellido1}" title="${element.Apellido1}"></td>
            <td><input type="text" id="ap2${n}" value="${element.Apellido2}" title="${element.Apellido2}"></td>
            <td><input type="text" id="tlf${n}" value="${element.Telefono}" title="${element.Telefono}"></td>
            <td><input type="text" id="rel${n}" value="${element.Relacion}" title="${element.Relacion}"></td>
            <td><input type="text" id="lug${n}" value="${element.Lugar}" title="${element.Lugar}"></td>
            <td onclick="actualiza('${element._id}','${n}')" class="boton">Actualizar</td>  
            <td onclick="elimina('${element._id}')" class="boton">Eliminar</td>  
        </tr>
        `)
        n++
    });
}
const procesoDB = d => {
    estado.innerHTML = 'Procesado DB terminado'
    console.log('Proceso DB terminado    ' + JSON.stringify(d))
    recarga()
}
const recarga = () => { cargaDatos("GET", "/select", listado) }
// CRUD
const crud = post => {
    let ini = { method: 'POST', body: JSON.stringify(post), headers: { 'Content-Type': 'application/json' } }
    fetch("/crud", ini)
        .then((res) => {
            console.log('status:', res.status)
        }).then(() => {
            muestra()
        })
}
const crea = () => {
    let datos_persona = {
        Nombre: document.getElementById('nom').value,
        Apellido1: document.getElementById('ap1').value,
        Apellido2: document.getElementById('ap2').value,
        Telefono: document.getElementById('tlf').value,
        Relacion: document.getElementById('rel').value,
        Lugar: document.getElementById('lug').value,
        Creado: new Date().getTime()
    }
    console.log(datos_persona)
    cargaDatos("POST", "/create", procesoDB, datos_persona)
}
const elimina = (id) => {
    console.log('Eliminando ' + id)
    let datos_persona = { _id: id }
    cargaDatos("POST", "/delete", procesoDB, datos_persona)
}
const actualiza = (id, n) => {
    console.log('Actualizando ' + id)
    let datos_persona = {
        _id: id,
        Nombre: document.getElementById('nom' + n).value,
        Apellido1: document.getElementById('ap1' + n).value,
        Apellido2: document.getElementById('ap2' + n).value,
        Telefono: document.getElementById('tlf' + n).value,
        Relacion: document.getElementById('rel' + n).value,
        Lugar: document.getElementById('lug' + n).value,
        Creado: new Date().getTime()
    }
    console.log(datos_persona)
    cargaDatos("POST", "/update", procesoDB, datos_persona)
}
//
const formatoFecha = (st) => {
    let fecha = st.split('T')
    return fecha[0] + '&nbsp;&nbsp;&nbsp;&nbsp;' + fecha[1].split('.')[0];
}


const muestra = () => {
    let ini = { method: 'GET', mode: 'cors', redirect: 'follow', cache: 'default'};
    fetch("/select", ini)
        .then(res => {
            // console.log('status:', res.status, ' Listado ')
            return res.json()
        })
        .then(response => {
            console.log(response)
            listado(response)
        })
}
window.onload = () => {
    estado = document.getElementById('estado')
    cuerpoTabla = document.getElementById('cuerpoTabla')
    cabeceraTabla = document.getElementById('cabeceraTabla')
    //
    muestra()
}