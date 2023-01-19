const jwt = require('jsonwebtoken');
require('dotenv').config(); // Para poder usar las variables de entorno


const authMiddleware = ( req, res, next ) => {
  let { authorization: token } = req.headers;
  token = token.replace("Bearer ", "");
  console.log(token);
  jwt.verify(
    token,
    process.env.JWT_SECRET, 
    { algorithms: "HS512" },
    (err, decoded) => {
      if(err) {
        res.status(400).json({
          error: "Invalid token",
          message: "El token no es valido, envía un token correcto"
        });
      } else {
        next();
      }
    })
};

module.exports = authMiddleware;


// Validar el token

// Si el token es valido
// lo dejamos pasar a la ruta

// Si NO es valido
// respondemos anda pasha