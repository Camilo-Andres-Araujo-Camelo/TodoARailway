const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para poder usar las variables de entorno

const AuthServices = require('../services/auth.services');

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await AuthServices.login(email, password);
        // La respuesta siempre traerá un isValid, que será true o false;
        if(response.isValid){
            const data = {
                email: response.result.email,
                username: response.result.username,
                id: response.result.id
            }
            // firmamos un nuevo token/ podemos indicarle la fecha de expiración
            const token = jwt.sign( data, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: '1m' });
            // console.log(token);
            data.token = token;
            // console.log(data) Verificar que agregué token a objeto data
            res.json(data);
        } else {
            res.status(401).json({
                message: 'Credenciales invalidas'
            })
        }  
    } catch (error) {
        res.status(400).json(error.message);
    }
};

module.exports = {
    userLogin
};