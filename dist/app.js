"use strict";
// Configuración de express (conectar routers, middlewares, etc)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // para el servidor
// Importar routers
const user_routes_1 = require("./routes/user.routes");
// Middleware that parses json -> transforma en json cualqueir peticion tipo json
app.use(express_1.default.json());
// Middleware para usar router
app.use('/users', user_routes_1.UserRouter); // EL POST SE TIENE QUE HACER A ESA RUTA /Users
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEEEEE');
});
exports.default = app; // para poderla importar fuera
