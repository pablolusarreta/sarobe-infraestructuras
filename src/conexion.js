const mongoose = require('mongoose')
const baseDatos = 'sustapena'
const uri = `mongodb+srv://pablo:pabl8173@cluster0-tg8cc.mongodb.net/${baseDatos}?retryWrites=true&w=majority`

//mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(`=> cloud.mongodb.com/${baseDatos}`))
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('conexion:'))

module.exports
