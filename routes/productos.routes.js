const {Router} = require ('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeProductoById } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// // Obtener todas las categorías - público
router.get('/', obtenerProductos);

// // Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un id de mongo.').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], obtenerProducto);

// Crear un nuevo producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'Debe introducir un nombre').notEmpty(),
    validarCampos
], crearProducto);

// // Actualizar un registro por id - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('id').custom(existeProductoById),
    validarCampos
], actualizarProducto);

// // Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo.').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], borrarProducto);

module.exports = router;