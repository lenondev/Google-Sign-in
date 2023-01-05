const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

// EXPRESS SERVER
class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';

    // DB connection
    this.conectarDB();

    //Middllewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB(){
      await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port http/localhost:${this.port}/`);
    });
  }
}

module.exports = Server;
