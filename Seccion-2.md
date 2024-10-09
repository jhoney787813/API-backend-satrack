
# Pregunta 1

Dado el siguiente esquema de base de datos para una aplicación de red social:

- **Usuarios** `(id, nombre, email, contraseña)`
- **Publicaciones** `(id, usuario_id, contenido, fecha_publicacion)`
- **Amigos** `(id, usuario_id1, usuario_id2, fecha_amistad)`

Escriba una consulta SQL para obtener las publicaciones de los amigos de un usuario específico (por ejemplo, `usuario_id = 1`) realizadas en la última semana.

## Respuesta

Para responder a esta pregunta, asumimos que no se especifica a profundidad la estructura con sus tipos de datos ya creados de la base de datos de la red social. Por lo tanto, quiero dejar la siguiente premisa:

**¿Existen índices creados en los campos clave?**


**Si la respuesta no:** 

primero consideraria una subconsulta para enlazar las tablas por los campos: usuario_id2, usuario_id1,fecha_amistad

   ```sql
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
```
**Si la respuesta es sí:**

y existen indices para lo campos  usuario_id2, usuario_id1,fecha_amistad. esto nos ahorria tiempo de procesamiento y podriamos inlcuso aprovechas las capacidades de la instrucción "JOIN" de sql

 ```sql
                 SELECT p.id, p.usuario_id, p.contenido, p.fecha_publicacion
                FROM Publicaciones p
                JOIN Amigos a 
                    ON (a.usuario_id1 = p.usuario_id OR a.usuario_id2 = p.usuario_id)
                WHERE (a.usuario_id1 = 1 OR a.usuario_id2 = 1)
                  AND p.usuario_id != 1
                  AND p.fecha_publicacion >= NOW() - INTERVAL 1 WEEK;

   ```


**Importante:** si se utiliza sql server utilizar la instruccion "with nolock" para evitar bloqueo en las transacciones.
si se utiliza my sql como en este caso se puede utilizar

ejemplo: para encapsular nuestro codigo a nivel de lectura solo para la instancia que lanza la consulta
             
```sql
              SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED ;
              
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
                         
              SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ ;
```
Para verifica el resultado de las cosultas podemos utilizar esta pagina: ( https://www.mycompiler.io/es/new/mysql ) pegamos los scrips y probamos los resultados de la consulta

Script de tablas

**Create**

```sql
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

```

**Insert**

   ```sql
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

   ```
**Resultados de nuestro ejemplo:**

![image](https://github.com/user-attachments/assets/83747342-f868-42a2-8289-8a8b7b9767ed)

**Conclusión:** para nuestro caso ya que no se especifica una necesidad a suplir mas alla del requerimiento inicial de consultar por rangos de una semana las ultimas publicaciones, vemos que las consultas que se hacen no tienen variación de resultados y los tiempos de respuesta son parecedidos, esto puede variar si se utiliza exponencialmente la tabla a nivel de transacciones para las *"Publicaciones"*, por lo que yo aconejaria utilizar ejemplo incial de aislar las transacciones en este caso las consultas con *"SESSION TRANSACTION ISOLATION"* si se utiliza my sql o para sql server utilizar "with nolock" en las consultas donde se requiera evitar bloqueos.
____________________________________________________________
# Pregunta 2

Implemente una API RESTful en Node.js utilizando Express que permita a los usuarios registrarse, iniciar sesión y publicar mensajes. Las rutas requeridas son:

1. **Registro de usuarios** (`POST /register`)
2. **Inicio de sesión** (`POST /login`)
3. **Publicar un mensaje** (`POST /messages`)

Asegúrese de incluir validaciones, manejo de errores y autenticación basada en tokens JWT. Proporcione pruebas unitarias para cada endpoint.

## Respuesta

Se incluye en el repositorio la carpeta con la API Node.js que contiene lo siguiente: [API-backend-satrack](https://github.com/jhoney787813/API-backend-satrack/tree/main/api-nodejs-supabase-satrack)

Se me pidió realizar la API en Node.js, pero no se especificó qué patrón o tácticas utilizar para el desarrollo de esta API. Sin embargo, planteé lo siguiente:

Utilizo una **arquitectura limpia** (Clean Architecture), aunque no aplica al 100% todos los conceptos debido a la baja complejidad del ejercicio. Esta arquitectura permite escalar una aplicación y promueve la extensión y mantenibilidad de la misma, teniendo en cuenta también los principios SOLID.

### Fundamentos de la Implementación de la API Node.js

- **Separación de la lógica de negocio y presentación**: Ayuda a separar la lógica de negocio de la lógica de presentación.
- **Flexibilidad y escalabilidad**: Permite una mayor flexibilidad y escalabilidad.
- **Mantenibilidad**: Facilita la mantenibilidad y el desarrollo de la aplicación.
- **Reducción de complejidad**: Reduce la complejidad y la cantidad de código.
- **Mejora de legibilidad**: Mejora la legibilidad y comprensión del código.

He querido plasmar con esta pequeña aplicación el patrón de diseño "Clean Architecture", ya que se basa en la separación de preocupaciones y la utilización de interfaces para comunicar entre las diferentes capas de la aplicación, dando como resultado una distribución lógica entre componentes y carpetas. Sin embargo, también puede ser planteada en paquetes externos al proyecto para mayor modularidad.

Una vez que el proyecto esté corriendo con el comando `npm start`, abre tu navegador e ingresa [http://localhost:5000/api-docs](http://localhost:5000/api-docs) para ver la documentación con Swagger que se adicionó.

## Implementación de Swagger

![image](https://github.com/user-attachments/assets/f1bc85b7-ff64-40bc-b25c-dd8148c8bfe3)

Con la siguiente estructura doy cumplimiento 

![image](https://github.com/user-attachments/assets/d3b78738-4f69-4b25-bff8-41900a05c59b)

            api-nodejs-supabase-satrack/
            ├── src/
            │   ├── config/
            │   │   └── config.js  -> Configuración de las variables de entorno de conexion al servicio de web de supabase para BD
            │   ├── controllers/     
            │   │   ├── authController.js  -> Aquí se proceso las solicitudes de los endpoints  /register y /login.
            │   │   └── messageController.js  -> Aquí se proceso las solicitudes para el endpoint /messages
            │   ├── routes/
            │   │   ├── authRoutes.js  -> definición de las rutas /register y /login. de los endpoint para los controllers
            │   │   └── messageRoutes.js  -> definición de las rutas /messages delendpoint para los controllers
            │   ├── services/
            │   │   ├── authService.js    ->Contiene la lógica de negocio para la autenticación y el registro de usuarios con supabase
            │   │   └── messageService.js -> lógica de negocio para la publicación de mensajes en la bd de supabase
            │   ├── repositories/
            │   │   └── messageRepository.js  -> Se encarga de la interacción la base de datos de Supabase para las operaciones relacionadas con la publicación de mensajes.
            │   ├── middlewares/
            │   │   └── authenticateToken.js  -> Verifica que el token JWT devuelto por el endpoinr de /login sea valido, para permitir la publicación de mensajes en supabase
            │   ├── supabaseClient.js  ->  Exporta las configuraciones para que el api cliente pueda utilizar en los servicios y repositorios que tiene ene el servicio supabase
            │   └── app.js  -> Configuraciones y puntos de entrada principales poder usar el api con express.
            ├── .env   -> Archivo para almacenar variables de entorno, como las claves API de Supabase y otras configuraciones sensibles. (este archivo es el que permite realizar la conexión con los tokets que provee el servicio en la nube   SUPABASE.
            └── package.json


Contenido de archivos
![image](https://github.com/user-attachments/assets/f4849525-9b4b-43ba-a556-94763de682e8)
![image](https://github.com/user-attachments/assets/bbef1d3f-bbfe-46a1-9c77-74eb625e2b6d)
![image](https://github.com/user-attachments/assets/f6468a60-1748-4579-b655-8718e03b4423)
![image](https://github.com/user-attachments/assets/40fb8e37-7644-4622-9710-9a5cddc5b961)
![image](https://github.com/user-attachments/assets/1cfbfe1e-9a59-43c6-a94f-aa3de48c95aa)
![image](https://github.com/user-attachments/assets/5141c6ea-9985-47a9-9b95-b2550142a661)
![image](https://github.com/user-attachments/assets/1fe8ba9c-cad2-433a-b662-78e6e32a9ae9)
![image](https://github.com/user-attachments/assets/3a32ea5e-e8d7-413a-a0fc-528027dad7a9)
![image](https://github.com/user-attachments/assets/17ebee12-59fa-45fe-9051-d750fb80a58b)
![image](https://github.com/user-attachments/assets/e6726527-2c64-4476-b746-1cf4f56ca3e9)
![image](https://github.com/user-attachments/assets/aa6c5b25-270e-402c-a11c-823bc5b896ec)
![image](https://github.com/user-attachments/assets/595de9c1-0eda-4bfb-b495-e2fe1f5ca89c)
![image](https://github.com/user-attachments/assets/73888380-b950-4d91-a8e1-e07620884c10)
![image](https://github.com/user-attachments/assets/6a5c21aa-701c-49ec-9475-97410b8e8c54)

____________________________________________________________
# Pregunta 3

Se ha detectado que una de las consultas más utilizadas en una base de datos PostgreSQL está causando tiempos de respuesta muy lentos. Describa el proceso que seguiría para identificar y resolver el problema, incluyendo el análisis de los planes de ejecución de las consultas y cualquier optimización que considere necesaria.

## Respuesta

Se recibe el caso inicial donde se expresa que una consulta "N" se está demorando mucho en ejecutarse. Lo primero que haría yo sería preguntar cuál es el percentil 90 con el que se debe evaluar los tiempos de respuesta de la consulta. Si este valor ya se conoce y se tiene como un estándar en la compañía, entonces lo que se debería hacer es primero preparar un ambiente de pruebas equivalente al que procesa la consulta.

### Proceso de Identificación y Resolución

1. **Configuración del Ambiente de Pruebas**: 
   - Preparar un entorno que simule el ambiente de producción.

2. **Ejecución Inicial de la Consulta**:
   - Lanzar la ejecución de la consulta para evaluar los tiempos y compararlos con los requeridos.

3. **Revisión del Script**:
   - Si los tiempos son iguales, parecidos o superiores, proceder con la revisión del script o estructura de la consulta para identificar las tablas relacionadas y la lógica con la cual se diseñó la consulta inicial.

4. **Verificación de Índices**:
   - Antes de modificar la consulta, verificar los campos primarios y claves. 
   - Comprobar si cada tabla tiene un índice para cada campo involucrado, o si se puede reemplazar en la consulta por uno que sí lo tenga.

5. **Creación de Índices**:
   - Si es necesario crear índices, hacerlo y volver a lanzar la consulta para verificar si hay mejora en los tiempos de respuesta. Si mejoran, no se realizarían más modificaciones.

6. **Optimización de la Consulta**:
   - Si no mejora, considerar modificar la consulta teniendo en cuenta:
     - Reducir al máximo el uso de subconsultas con el operador `IN`.
     - Utilizar `JOIN` antes de llegar a las instrucciones `WHERE`.
     - Igualar en el `JOIN` los datos coincidentes:
       ```sql
       JOIN tabla t ON t.campo = tabla1.campo AND t.campo2 = tabla1.campo2
       ```

7. **Aislamiento de la Ejecución**:
   - Aislar la ejecución teniendo en cuenta el principio de aislamiento de los datos. Para evitar bloqueos, se recomienda usar transacciones en PostgreSQL antes de ejecutar una consulta:
     ```sql
     BEGIN;
         SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
         SELECT * FROM tabla;  -- O consulta a evaluar el rendimiento
     COMMIT;
     ```

8. **Uso de `EXPLAIN ANALYZE`**:
   - Durante cada modificación o tuning de la consulta, ejecutar `EXPLAIN ANALYZE` para obtener la traza de cada paso de la consulta y los tiempos de respuesta por cada tabla relacionada.

### Ampliación de Recursos

Si la consulta ha mejorado pero aún necesita optimización, se puede considerar ampliar la capacidad del clúster asignando recursos verticales a la instancia:
- `work_mem`: memoria asignada a cada operación de ordenamiento.
- `shared_buffers`: cantidad de memoria RAM utilizada para bloques de datos leídos y escritos recientemente.
- `maintenance_work_mem`: optimiza tareas de mantenimiento.

**Nota**: Esta última configuración no se recomienda utilizar de manera indiscriminada, ya que puede incurrir en sobrecostos. Se debe evaluar el impacto que tendría en la organización un aumento en los recursos.
