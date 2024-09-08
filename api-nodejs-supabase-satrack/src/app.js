const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./config/swagger');

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/auth', require('./routes/authRoutes'));
app.use('/messages', require('./routes/messageRoutes'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
