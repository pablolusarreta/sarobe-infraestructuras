const express = require('express')
const morgan = require('morgan')
const path = require('path')
const rutas = require('./src/rutas.js')
const app = express()

// Configuración
app.set('port', process.env.PORT || 3000)
// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ficheros estaticos
app.use(express.static(path.join(__dirname, './src/public')))

// rutas servidor
app.use(rutas)

// servidor escuchando
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto - ${app.get('port')}`)
  })

// conexion mongodb
const fs = require('fs')
if (fs.existsSync('./conex.js')) {
  require('./conex.js')()
  console.log(process.env.CONEXION_REMOTA_MONGODB )
}

