/* El controlador solo se encarga de pedirle al modelo la información (lo cual hace a través de un servicio)
y de responder */

const UserServices = require('../services/user.services')



const getAllUsers = async ( req, res ) => {
    try {
        const result = await UserServices.getAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const getUserById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const result = await UserServices.getById( id );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message) 
    }
};

const getUserByName = async ( req, res ) => {
    try {
        const { username } = req.params;
        const result = await UserServices.getByName(username)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const getUserWithTodos = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UserServices.getWithTodos(id);
        res.json(result); // por defecto se responde un 200, por eso se omite res.status(200)
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const getUserWithCategories = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await UserServices.getWithCategories( id );
        res.json(result);
    } catch (error) {
        res.status(400).json(error.message)
    }
};

const createUser = async ( req, res ) => {
    try {
        const newUser = req.body
        const result = await UserServices.create( newUser );
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message) 
    }
};

const updateUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        const  field  = req.body;
        const result = await UserServices.update( field, id );
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    } 
};

const deleteUser = async ( req, res ) => {
    try {
        const { id } = req.params;
        const result = await UserServices.delete( id );
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
    } 
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByName,
    getUserWithTodos,
    getUserWithCategories
};