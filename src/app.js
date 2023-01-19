const express = require('express'); // importar express
const cors = require('cors');
const db = require('./utils/database'); // importar db
const initModels = require('./models/initModels'); // Importamos initModels
const userRoutes = require('./routes/user.routes'); // Importando routes
const todosRoutes = require('./routes/todos.routes');
const authRoutes = require('./routes/auth.routes')
const app = express();// Crear una instancia de express
app.use(express.json());
require('dotenv').config(); // Para poder usar las variables de entorno

const PORT = process.env.PORT; // localhost:8000
app.use(cors());

app.use( '/api/v1', userRoutes ); // primero esta ruta + la del route
// app.use( '/', require('./routes/user.routes') ) // Se puede de este modo tambien
app.use('/api/v1', todosRoutes);
app.use('/api/v1', authRoutes);

db.authenticate() // Probando la conexión a la db
    .then( () => console.log('autenticación exitosa'))
    .catch( (err) => console.log(err));

initModels();// Ejecutamos función initmodels

// Usamos el método sync
// de Sequelize para realizar la sincronización 
// db.sync() // Sincronizar normal
// db.sync( {alter:true} ) // Sincronizar y alterar tablas
// db.sync( {force:true} ) // Sincronizar y fuerza la alteración de las tablas
db.sync()
    .then( () => console.log('base de datos sincronizada'))
    .catch( (err) => console.log(err));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido al servidor' })
});

// Definir las rutas de nuestros endpoints (de ahora en adelante ep)
// Todas las consultas de usuarios
// localhost:8000/users --> todo para usuarios
// localhost:8000/todos --> todo para tareas

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});

console.log(process.env.USERNAME);