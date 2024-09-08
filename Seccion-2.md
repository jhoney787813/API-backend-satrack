
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
                AND p.fecha_publicacion >= NOW() - INTERVAL 1 WEEK;


Si la respuesta es sí: y existen indices para lo campos  usuario_id2, usuario_id1,fecha_amistad. esto nos ahorria tiempo de procesamiento y podriamos inlcuso aprovechas las capacidades de la instrucción "JOIN" de sql

                 SELECT p.id, p.usuario_id, p.contenido, p.fecha_publicacion
                FROM Publicaciones p
                JOIN Amigos a 
                    ON (a.usuario_id1 = p.usuario_id OR a.usuario_id2 = p.usuario_id)
                WHERE (a.usuario_id1 = 1 OR a.usuario_id2 = 1)
                  AND p.usuario_id != 1
                  AND p.fecha_publicacion >= NOW() - INTERVAL 1 WEEK;



Para verifica el resultado de las cosultas podemos utilizar esta pagina: ( https://www.mycompiler.io/es/new/mysql ) pegamos los scrips y probamos los resultados de la consulta

Script de tablas

                CREATE TABLE Usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,      
                    nombre VARCHAR(100) NOT NULL,           
                    email VARCHAR(255) NOT NULL UNIQUE,    
                    contrasena VARCHAR(255) NOT NULL        
                );

                CREATE TABLE Publicaciones (
                    id INT AUTO_INCREMENT PRIMARY KEY,        
                    usuario_id INT NOT NULL,                
                    contenido TEXT NOT NULL,               
                    fecha_publicacion DATETIME NOT NULL,     
                    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) 
                );

                CREATE TABLE Amigos (
                    id INT AUTO_INCREMENT PRIMARY KEY,       
                    usuario_id1 INT NOT NULL,                
                    usuario_id2 INT NOT NULL,              
                    fecha_amistad DATETIME NOT NULL,         
                    FOREIGN KEY (usuario_id1) REFERENCES Usuarios(id),
                    FOREIGN KEY (usuario_id2) REFERENCES Usuarios(id)  
                );

insert

                        INSERT INTO Usuarios (nombre, email, contrasena)
                        VALUES 
                        ('Alex', 'alex@satrack.es', 'Alexpassword123'),
                        ('Wilmar', 'Wilmar@satrack.es', 'WilmarPass1'),
                        ('Carlos', 'carlos@satrack.es', 'carlosPass2'),
                        ('Ana', 'ana@satrack.es', 'anaPass3'),
                        ('Yulieth', 'Yulieth@satrack.es', 'YuliethPass4'),
                        ('Pampis', 'Pampis@satrack.es', 'PampisPass5'),
                        ('el primo', 'primo@satrack.es', 'primoPass6'),
                        ('Edy', 'Edy@satrack.es', 'EdyPass7'),
                        ('Sebastian', 'Sebastian@satrack.es', 'SebastianPass8'),
                        ('andres', 'andres@satrack.es', 'andresPass9');
                
                INSERT INTO Publicaciones (usuario_id, contenido, fecha_publicacion)
                VALUES
                (2, '¡Qué día tan bonito hoy en el parque!', NOW() - INTERVAL 3 DAY),
                (3, 'Estoy empezando un nuevo libro, ¡me encanta!', NOW() - INTERVAL 10 DAY),
                (4, 'Cocinando una receta nueva, ¡deliciosa!', NOW() - INTERVAL 2 DAY), 
                (5, 'Entrenamiento matutino completado.', NOW() - INTERVAL 7 DAY),  
                (6, 'Amo los días de lluvia y un buen café.', NOW() - INTERVAL 1 DAY), 
                (7, 'Preparándome para mi próximo viaje.', NOW() - INTERVAL 15 DAY), 
                (8, 'Hoy aprendí algo nuevo sobre SQL Server.', NOW() - INTERVAL 6 DAY), 
                (9, 'Disfrutando de un buen libro y una copa de vino.', NOW() - INTERVAL 5 DAY), 
                (10, 'Gran noche con amigos.', NOW() - INTERVAL 4 DAY), 
                (1, 'Día de descanso total.', NOW() - INTERVAL 8 DAY); 

                INSERT INTO Amigos (usuario_id1, usuario_id2, fecha_amistad)
                VALUES
                (1, 2, NOW() - INTERVAL 1 YEAR), 
                (1, 3, NOW() - INTERVAL 6 MONTH), 
                (1, 4, NOW() - INTERVAL 3 MONTH), 
                (1, 5, NOW() - INTERVAL 1 MONTH),  
                (1, 6, NOW() - INTERVAL 20 DAY),   
                (2, 3, NOW() - INTERVAL 2 MONTH), 
                (4, 5, NOW() - INTERVAL 1 MONTH),  
                (6, 7, NOW() - INTERVAL 1 YEAR),   
                (8, 9, NOW() - INTERVAL 4 MONTH), 
                (10, 1, NOW() - INTERVAL 100 DAY); 

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
