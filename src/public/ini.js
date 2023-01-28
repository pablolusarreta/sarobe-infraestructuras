let Idiomas = [{
    ID: 1,
    texto: "Castellano",
    color: "#f0f"
},
{
    ID: 2,
    texto: "Euskera",
    color: "#f0f"
}]
let cabecera_tabla = [`<tr>       
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
let cabecera_tabla_movil = [`<tr>       
                            <th>Nº</th>
                            <th>Descripción</th>         
                            <th>Marca</th>
                            <th>Modelo</th>
                        </tr>`,
    `<tr>       
                            <th>Zª</th>
                            <th>Deskribapen</th>         
                            <th>Markak</th>
                            <th>Eredu</th>
                        </tr>`
]
let grupos = [
    { ID: '1', nombre: 'Espacios', izena: 'Guneak' },
    { ID: '5', nombre: 'Audiovisuales', izena: 'Ikus-entzunezko' },
    { ID: '8', nombre: 'Iluminación', izena: 'Argiztapen' },
    { ID: '9', nombre: 'Maquinaria', izena: 'Makina eszenikoa' }
]
let datos = [
    {
        seccion: { nom: 'Infraestructuras técnicas' },
        plano: { nom: 'Plano técnico', url: ['pdf/SarobePlanoTecnico.pdf', 'pdf/SarobePlanoTecnico.dwg'] },
        conciertos: { nom: 'Dotación Sarobe-Kontzertuak', url: ['pdf/SarobeKontzertuaEquipamiento.pdf'] },
        descarga: { nom: 'Descarga' }
    },
    {
        seccion: { nom: 'Azpiegiturak teknikoak' },
        plano: { nom: 'Plano teknikooa', url: ['pdf/SarobePlanoTecnico.pdf', 'pdf/SarobePlanoTecnico.dwg'] },
        conciertos: { nom: 'Hornidurak Sarobe-Kontzertuak', url: ['pdf/SarobeKontzertuaEquipamiento.pdf'] },
        descarga: { nom: 'Deskargatu' }
    }
]