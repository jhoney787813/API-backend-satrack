
Pregunta 1
Dado el siguiente esquema de base de datos para una
aplicación de red social:
Usuarios (id, nombre, email, contraseña)
Publicaciones (id, usuario_id, contenido, fecha_publicacion)
Amigos (id, usuario_id1, usuario_id2, fecha_amistad)
Escriba una consulta SQL para obtener las publicaciones de
los amigos de un usuario específico (por ejemplo, usuario_id =
1) realizadas en la última semana.



Pregunta 2
Implemente una API RESTful en Node.js utilizando Express que
permita a los usuarios registrarse, iniciar sesión y publicar
mensajes. Las rutas requeridas son:
1.Registro de usuarios (POST /register)
2.Inicio de sesión (POST /login)
3.Publicar un mensaje (POST /messages)
Asegúrese de incluir validaciones, manejo de errores y
autenticación basada en tokens JWT. Proporcione pruebas
unitarias para cada endpoint.



Pregunta 3
Se ha detectado que una de las consultas más utilizadas en
una base de datos PostgreSQL está causando tiempos de
respuesta muy lentos. Describa el proceso que seguiría para
identificar y resolver el problema, incluyendo el análisis de los
planes de ejecución de las consultas y cualquier optimización
que considere necesaria.
