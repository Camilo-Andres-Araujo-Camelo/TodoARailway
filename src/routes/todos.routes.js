const { Router } = require('express');
const {
    getAllTodos, 
    getTodoById, 
    createTodo, 
    updateTodo,
    deleteTodo,
    getTodoWithCategories
} = require('../controllers/todos.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/todos', authMiddleware, getAllTodos);

// 2. Obtener tareas por id
router.get('/todos/:id', getTodoById);

// 2.1 Obtener todo con categorias
router.get('/todos/:id/categories', getTodoWithCategories);

// 3. Crear tareas
router.post('/todos', createTodo);

// 4. Actualizar estado de tareas (is_complete)
router.put('/todos/:id', updateTodo);

// 5. Eliminar tareas por id
router.delete('/todos/:id', deleteTodo);

module.exports = router;