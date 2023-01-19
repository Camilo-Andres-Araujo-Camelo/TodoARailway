const TodosServices = require('../services/todos.services');

 const getAllTodos = async (req, res) => {
    try {
        const todos = await TodosServices.getAll();
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


// 2. Obtener tareas por id
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodosServices.getById( id );
        res.status(200).json(todo);  
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// 2.1 Obtener todos con categorias

const getTodoWithCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TodosServices.getWithCategories( id );
        res.json({
            message: "Enviando tarea con categorias",
            data: result,
        });  
    } catch (error) {
        res.status(400).json({
            error: error.message,
            details: error.stack
        });
    }
};

// 3. Crear tareas
const createTodo = async (req, res) => {
    try {
        const newTodo = req.body;
        const result = await TodosServices.create( newTodo );
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }   
};


// 4. Actualizar estado de tareas (is_complete)
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const result = await TodosServices.update(field, id)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }   
};

// 5. Eliminar tareas por id
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TodosServices.delete(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message)
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoWithCategories
}