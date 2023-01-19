const db = require('../utils/database');
const User = require('../models/user.models');
const Todos = require('../models/todos.models')
const Categories = require('../models/categories.models');
const TodosCategories = require('../models/todos-categories.models');


const users = [
    {username: 'Camilo', email: 'caac9530@gmail.com', password: '12345'},
    {username: 'Juan', email: 'juan@gmail.com', password: '12345'},
    {username: 'Pedro', email: 'pedro@gmail.com', password: '12345'},
];

const todos = [
    {title: 'Estudiar node', description: 'Descripción para 1', userId: 1}, // 1
    {title: 'Pasear al perro', description: 'Descripción para 2', userId: 1}, // 2
    {title: 'Lavar platos', userId: 2}, // 3
    {title: 'Ir a chequeo mensual', description: 'no me dejan dormir', userId: 3} // 4
];

const categories = [
    {name: 'personal', userId: 1}, // 1
    {name: 'educacion', userId: 1}, // 2
    {name: 'salud', userId: 1}, // 3
    {name: 'trabajo', userId: 1}, // 4
    {name: 'hogar', userId: 2}, // 5
    {name: 'cocina', userId: 2}, // 6
    {name: 'deporte', userId: 2}, // 7
    {name: 'ocio', userId: 3}, // 8
    {name: 'financiero', userId: 3}, // 9
    {name: 'entretenimiento', userId: 3} // 10
]

const todosCategories = [
    {categoryId: 1, todoId: 1},
    {categoryId: 2, todoId: 1},
    {categoryId: 4, todoId: 1},
    {categoryId: 1, todoId: 2},
    {categoryId: 7, todoId: 2},
    {categoryId: 2, todoId: 2},
    {categoryId: 10, todoId: 2},
    {categoryId: 3, todoId: 2},
    {categoryId: 5, todoId: 3},
    {categoryId: 6, todoId: 3},
    {categoryId: 1, todoId: 4},
    {categoryId: 3, todoId: 4},
];


// Ya solo falta crear la información que tenemos en los arreglos dentro de la base de datos. Lo que hay que hacer es Sincronizar la base de datos
// Cada modelo tiene los siquientes métodos:
// create
// findOne, getAll, findByPK
// update
// destroy

db.sync({ force: true })
    .then( () => {
        console.log('Iniciando la siembre de informacion');
        users.forEach( user => User.create(user)); // Esto es equivalente a INSERT INTO user () VALUES (cada usuario)
        setTimeout(() => {
            todos.forEach( todo => Todos.create(todo))
        }, 200);
        setTimeout(() => {
            categories.forEach( category => Categories.create(category));
        }, 400);
        setTimeout(() => {
            todosCategories.forEach((tc) => TodosCategories.create(tc));
        }, 600)
    })
    .catch( err => console.log(err) )