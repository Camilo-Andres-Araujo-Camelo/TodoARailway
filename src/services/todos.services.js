const Categories = require('../models/categories.models');
const TodosCategories = require('../models/todos-categories.models');
const Todos = require('../models/todos.models')


class TodosServices {

    static async getAll() {
        try {
            const result = await Todos.findAll();
            // Buscar y contar
            /* const result = await Todos.findAndCountAll({
                where: { isComplete: false }
            }); */
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getById( id ) {
        try {
            const result = await Todos.findByPk( id, {
                attributes: ['title', 'isComplete']
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async getWithCategories( id ){
        try {
            const result = await Todos.findOne({
                where: { id },
                attributes: ['id', 'title', 'description', 'userId'],
                include: {
                    model: TodosCategories,
                    as: "categories",
                    attributes: ['id', 'todoId', 'categoryId'],
                    include: {
                        model: Categories,
                        as: "category",
                        attributes: ['name']
                    }
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    };

    static async create(newTodo) {
        try {
            const result = await Todos.create(newTodo);
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update(field, id) {
        try {
            const result = await Todos.update(field, { where: {
                id
            }});
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await Todos.destroy({
                where:{ id }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = TodosServices;