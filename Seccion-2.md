
Pregunta 1

Dado el siguiente esquema de base de datos para una
aplicación de red social:
Usuarios (id, nombre, email, contraseña)
Publicaciones (id, usuario_id, contenido, fecha_publicacion)
Amigos (id, usuario_id1, usuario_id2, fecha_amistad)
Escriba una consulta SQL para obtener las publicaciones de
los amigos de un usuario específico (por ejemplo, usuario_id =1)
realizadas en la última semana.

R/= para responder esta pregunta digamos que no se espeficica a profundida la estructura con sus tipos de datos ya creada de la bd de red social por lo que quiero
dejar la siguiente premisa: ¿existen indices creados en los campos clave?

Si la respuesta no: primero consideraria una subconsulta para enlazar las tablas por los campos: usuario_id2, usuario_id1,fecha_amistad

        SELECT p.id, p.usuario_id, p.contenido, p.fecha_publicacion
        FROM Publicaciones p
        WHERE p.usuario_id IN (
            SELECT 
                CASE 
                    WHEN a.usuario_id1 = 1 THEN a.usuario_id2
                    WHEN a.usuario_id2 = 1 THEN a.usuario_id1
                END
            FROM Amigos a
            WHERE a.usuario_id1 = 1 OR a.usuario_id2 = 1
        )
        AND p.fecha_publicacion >= DATEADD(WEEK, -1, GETDATE());


Si la respuesta es sí: y existen indices para lo campos  usuario_id2, usuario_id1,fecha_amistad. esto nos ahorria tiempo de procesamiento y podriamos inlcuso aprovechas las capacidades de la instrucción "JOIN" de sql

          SELECT p.id, p.usuario_id, p.contenido, p.fecha_publicacion
          FROM Publicaciones p
                JOIN Amigos a ON (a.usuario_id1 = p.usuario_id OR a.usuario_id2 = p.usuario_id)
                WHERE (a.usuario_id1 = 1 OR a.usuario_id2 = 1)
                  AND p.usuario_id != 1 AND p.fecha_publicacion >= DATEADD(WEEK, -1, GETDATE());



Para verifica el resultado de las cosultas podemos utilizar esta pagina: (https://www.mycompiler.io/es/new/sql) pegamos los scrips y probamos los resultados de la consulta



Script de tablas

____________________________________________________________
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


____________________________________________________________

Pregunta 3

Se ha detectado que una de las consultas más utilizadas en
una base de datos PostgreSQL está causando tiempos de
respuesta muy lentos. Describa el proceso que seguiría para
identificar y resolver el problema, incluyendo el análisis de los
planes de ejecución de las consultas y cualquier optimización
que considere necesaria.
