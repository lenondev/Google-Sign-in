const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verificar si el rol es válido
const esRolValido = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
      throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

// Verificar si el correo existe
const emailExiste = async(email = '') => {
  const existEmail = await Usuario.findOne({email});
  if (existEmail){
    throw new Error(`El email '${email}' no está disponible, pruebe con otro.`);
  }
}

// Verificar si el id pasado en los params existe o no
const existeUsuarioById = async( id ) => {
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ){
    throw new Error(`El id: '${id}' no existe.`);
  }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioById
}
