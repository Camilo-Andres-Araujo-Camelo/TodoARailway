const Categories = require('../models/categories.models');
const TodosCategories = require('../models/todos-categories.models');
const Todos = require('../models/todos.models');
const User = require('../models/user.models');

class UserServices {

    /* Los métodos estaticos nos permiten hacer uso de ellos sin necesidad
    de crear una instancia de nuestra clase para acceder a este tipo de métodos */
    static async getAll() {
        try {
            const result = await User.findAll();
            return result
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const result = await User.findByPk( id, {
                attributes: {
                    exclude: [/* 'password', */ 'createdAt', 'updatedAt']
                }
            })
            return result
        } catch (error) {
            throw error;
        }
    }

    static async getByName(username) {
        try {
            const result = await User.findOne({ 
                where: { username },
                attributes: ['id', 'username', 'email'] // Obtener una respuesta con estos atributos
            }); // Es equivalente a --> SELECT * FROM users WHERE users.id = 1;
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getWithTodos(id){
        try {
            const result = await User.findOne({
                where: { id },
                attributes: ['username', 'email'],
                include: {
                    model: Todos,
                    as: "task", // alias colocado en initModels
                    attributes: ['title', 'isComplete'],
                    include: {
                        model: TodosCategories,
                        as: "categories",
                        attributes: ['categoryId']
                    }
                }
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getWithCategories( id ){
        try {
            const result = await User.findOne({
                where: { id },
                attributes: [ 'username', 'email' ],
                include: {
                    model: Categories,
                    as: "category",
                    attributes: ['id', 'name', 'userId']
                }
            });
            return result;
        } catch (error) {
            throw error
        }
    }

    static async create(user) {
        try {
            const result = await User.create( user );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async update( field, id ) {
        try {
            const result = await User.update( field, {
                where: { id }
            });
            return result;
        } catch (error) {
            throw error
        }
    }

    static async delete( id ) {
        try {
            const result = await User.destroy({
                where: { id }
            })
            return result;
        } catch (error) {
            throw error;
        }
    }

}





module.exports = UserServices;