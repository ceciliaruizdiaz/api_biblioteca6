const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");

//Configuracion Middleware con el Servidor de Autorizacion
const autenticacion = auth({
    audience: "http://localhost:3000/api/productos",
    issuerBaseURL: "https://dev-utn-frc-iaew.auth0.com/",
    tokenSingningAlg: "RS256",
});

const app = express();
app.use(express.json());

//Importamos el router de libros
const librosrouter = require("./routes/libros");

//Importamos el Middleware Error Handler
const errorHandler = require("./middleware/errorHandler.js");

//Configuramos el middleware de autenticacion
app.use("/libros", autenticacion, librosrouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log(`Servidor iniciado en el puerto 3000`);
});