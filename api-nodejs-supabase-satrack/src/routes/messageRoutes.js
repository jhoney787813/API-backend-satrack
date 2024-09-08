const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const messageController = require('../controllers/messageController');

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Endpoints para manejar mensajes
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Publica un nuevo mensaje
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje publicado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Falta de autenticación
 *       403:
 *         description: Acceso denegado
 */
router.post('/', authenticateToken, messageController.postMessage);

module.exports = router;
