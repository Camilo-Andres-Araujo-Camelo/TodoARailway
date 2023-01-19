const { Router } = require('express');
const { 
    getAllUsers, 
    getUserById,
    getUserWithTodos,
    getUserWithCategories,
    createUser, 
    updateUser, 
    deleteUser,
    getUserByName
} = require('../controllers/user.controller');

const router = Router();


router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.get('/users/username/:username', getUserByName);

// Obtener un usuario con sus tareas

router.get('/users/:id/todos', getUserWithTodos);

// Obtener usuarios con categorias creadas por él

router.get('/users/:id/categories', getUserWithCategories)

////////////////////////////

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);
// Validar que el usuario no tenga tareas
// si tiene tareas responder 'no se puede eliminar'
// si no tiene, eliminarlo



module.exports = router;






