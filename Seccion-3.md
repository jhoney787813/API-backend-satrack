# Pregunta 1

# Diseño de un Sistema de Mensajería en Tiempo Real para una Aplicación de Chat

## Respuesta

Propongo un diseño de un sistema de mensajería en tiempo real para una aplicación de chat, aplicando parte de los conceptos de la metodología **WHY DRIVEN DESIGN** para abordar los requisitos y tomar decisiones informadas en cada paso. Esta metodología se centra en entender el "por qué" detrás de cada decisión para garantizar que el diseño satisfaga las necesidades del negocio y de los usuarios.

### ¿Por qué necesitamos un sistema de mensajería en tiempo real para una aplicación de chat?

Porque permitir una comunicación instantánea entre usuarios mejora la experiencia, aumenta la interactividad y es fundamental para cualquier aplicación moderna de chat que busque mantenerse competitiva y relevante.

### ¿Qué componentes necesitamos para un sistema de mensajería en tiempo real?

- **Servidores de mensajería en tiempo real (SignalR)**: 
  - Para manejar la comunicación bidireccional y en tiempo real entre clientes y servidores.

- **Microservicios**: 
  - Para gestionar la lógica de negocio, como el manejo de usuarios, autenticación y la entrega de mensajes.
  
- **Message Broker (RabbitMQ o Kafka)**: 
  - Para desacoplar la producción y consumo de mensajes y garantizar la entrega confiable.

- **Base de Datos (NoSQL y SQL)**: 
  - Para almacenar la información estructurada (usuarios, contactos) y no estructurada (mensajes).

- **Cache (Redis)**: 
  - Para acelerar el acceso a datos frecuentemente solicitados, como sesiones y mensajes recientes.

- **Balanceadores de carga**: 
  - Para distribuir la carga entre las instancias del sistema.

- **Monitoreo y alertas**: 
  - Para asegurar la disponibilidad y el rendimiento del sistema.

### ¿Qué opciones tenemos para los servidores de mensajería en tiempo real y cuál es la más adecuada?

- **SignalR**:
  - Proporciona una capa de abstracción sobre WebSockets, Long Polling y Server-Sent Events.
  - Integración nativa con .NET, ideal para aplicaciones basadas en ASP.NET Core.
  - Escalabilidad mediante Redis para gestionar conexiones distribuidas.

- **WebSockets Puro**:
  - Menor sobrecarga en comparación con SignalR pero requiere más desarrollo personalizado.
  - Mayor control sobre la implementación y rendimiento.

- **Servicios de Terceros (Pusher, PubNub)**:
  - Simplifican la implementación con SDKs y servicios administrados, pero pueden ser costosos y limitar el control.

**¿Cuál es la más adecuada?**

SignalR es la elección ideal por su integración nativa con ASP.NET Core, soporte para escalabilidad y manejo sencillo de múltiples transportes en caso de que WebSockets no esté disponible.

### ¿Qué opciones existen para gestionar los mensajes y cuál es la más adecuada?

- **RabbitMQ**:
  - Fácil de configurar y excelente para sistemas con baja latencia y volumen moderado de mensajes.
  - Soporta diversas estrategias de reintento y confirmación de mensajes.

- **Kafka**:
  - Altamente escalable y diseñado para manejar millones de mensajes por segundo.
  - Ideal para aplicaciones con un alto volumen de tráfico y la necesidad de procesamiento de eventos en tiempo real.

**¿Cuál es la más adecuada?**

Kafka es más adecuado para una aplicación de mensajería en tiempo real que requiere alta escalabilidad y capacidad para manejar grandes volúmenes de mensajes simultáneamente, debido a su costo de implementación; al ser open-source, se puede tener un servicio propio y administrable en una red interna y externa.

### ¿Qué opciones de almacenamiento existen para mensajes y cuál es la más adecuada?

- **Bases de Datos NoSQL (MongoDB, CosmosDB)**:
  - Escalabilidad horizontal y flexibilidad en el manejo de grandes volúmenes de mensajes.
  - No requieren esquemas rígidos, lo que facilita el manejo de datos no estructurados como los mensajes.

- **SQL (PostgreSQL, SQL Server, MySQL)**:
  - Implementan principios ACID que aseguran transacciones seguras y datos estructurados.
  - Mayor integridad referencial, pero con menos flexibilidad y escalabilidad para datos no estructurados.

**¿Cuál es la más adecuada?**

Para nuestro caso, debido a la alta concurrencia y velocidad con la que se debe proveer la información, la alternativa más eficiente sería NoSQL, debido a su capacidad para manejar grandes volúmenes de mensajes y flexibilidad en la estructura de datos.

### ¿Cómo manejar la escalabilidad y tolerancia a fallos?

- **Escalabilidad**:
  - Implementar múltiples instancias de microservicios y SignalR, balanceadas mediante un balanceador de carga.
  - Redis utilizado como backplane para SignalR facilita la sincronización entre servidores distribuidos.

- **Tolerancia a fallos**:
  - Usar Message Brokers como Kafka para asegurar la entrega y retransmisión de mensajes.
  - Replicación y backup en bases de datos y Redis Cache para asegurar la disponibilidad y evitar pérdida de datos.

### ¿Por qué Redis es la seleccionada en esta arquitectura?

Porque el principal requerimiento es entregar a los usuarios una experiencia de chat fluida y rápida. Considero que es más rápido consultar una caché en memoria que ir a la base de datos para cargar los últimos mensajes enviados por los usuarios.



ATRIBUTOS PRIORIZADOS DEL SISTEMA

TECNICOS

![consistencia_total](https://github.com/user-attachments/assets/a014866a-2532-40c3-bd82-d61cc481a147)
![observabiliad](https://github.com/user-attachments/assets/bc594e56-4a94-40ae-ac80-77b753451b2d)


NEGOCIO

![escalabilidad](https://github.com/user-attachments/assets/38ee3251-e2ee-49d1-abd2-dc8b05ec3975)
![disponibilidad](https://github.com/user-attachments/assets/6dd02dd1-2c67-42d1-8758-e3457f57eeaa)  
![seguridad](https://github.com/user-attachments/assets/be208d67-4052-4f10-8dd0-078ecb313268)
![desempeño](https://github.com/user-attachments/assets/ccb727fd-0a2e-4dcb-ad7a-386142d74a97)

DIAGRAMA DE DISEÑO ARQUITECTÓNICO

Componentes 

1) Client Applications (Aplicaciones Cliente)
2) SignalR Service (SignalR)
3) API Gateway / Load Balancer (APIXIS SATRACK)
5) API Backend Mensajería Service
6) API Backend Autenticación y Autorización
7) API Backend Almacenamiento de Mensajes
8) Redis Cache Mensajes (Azure Redis Cache)
9) Base de Datos usuarios (PostgreSQL)
10) Base de Datos contactos (PostgreSQL)
11) Base de Datos Mensajes (CosmosDB)


FLUJO DE COMUNICACIÓN

 1. Los clientes se conectan a través de WebSocket o HTTP utilizando SignalR para establecer la comunicación en tiempo real.                                                                     
 2. SignalR gestiona la conexión en tiempo real y distribuye los mensajes entre los clientes conectados.
 3. Los mensajes y solicitudes pasan por el API Gateway, que distribuye la carga de manera uniforme.                                       
 4. Los servicios backend manejan la lógica de negocio como enviar, almacenar y autenticar los mensajes.
 5. Redis se utiliza para la caché y la distribución eficiente de mensajes entre los servicios que SignalR lee y notifica a la UI.
           
![DiagramaContenedoresMensajesChat](https://github.com/user-attachments/assets/11d1554d-2f52-44d9-a169-b15d8bf18e49)


-----------------------------------------------------------------------

# Pregunta 2

# Implementación de un Sistema de Control de Versiones de API

## Respuesta

Como no se me pide implementar esta solución en una tecnología específica, quiero proponer una alternativa que hemos utilizado en SatRack para este propósito, normalmente implementada con .NET.

Supongamos que la aplicación está en producción y cuenta con unos endpoints actuales que no pueden ser modificados para no afectar a los clientes que consumen nuestras APIs en sus contratos. Lo que hacemos es configurar una ruta alternativa en nuestro Swagger para controlar el ruteo a nuestros nuevos endpoints.

### Estrategia de Control de Versiones

Normalmente, en nuestros desarrollos tratamos de depender de abstracciones e implementaciones mediante interfaces. Esto es un punto favorable y a tener en cuenta. Una táctica que podemos utilizar es pasar nuestros controladores por versiones si lo que ha cambiado es el contrato de entrada. 

Si se requiere cambiar las reglas de negocio para un endpoint nuevo conservando las actuales, entonces podemos crear una distribución de nuestra capa de negocio (Rules, Core y/o Domain) de tal manera que se agreguen nuevas implementaciones por versión de las capacidades de negocio, y esto no afecte el flujo actual que utilizan los clientes que consumen la API.

### Manejo de la Estrategia de Deprecación

1. **Definición de la Fecha Límite**: Definir la fecha límite máxima que los clientes tendrán disponible el soporte de versiones ante errores.

2. **Comunicación Interna**: Teniendo las nuevas versiones funcionales y las actuales operativas, se puede generar un comunicado a nivel interno de la organización informando la deprecación de los endpoints actuales y pasando un listado con los cambios y la forma de consumir los nuevos endpoints.

3. **Redirección Temporal**: Si no es posible que los clientes se migren a la nueva versión debido al impacto que tendría implementar el cambio de DNS o rutas de las APIs, se podría considerar implementar en los endpoints a deprecar una redirección temporal de recursos hacia los nuevos endpoints. 

   - **Análisis de Contratos**: Se debe analizar si los contratos de entrada de las peticiones de los endpoints viejos son aplicables o soportados por las nuevas versiones para hacer esta redirección. De no ser así, se deberían rechazar las peticiones entrantes a los endpoints viejos e informar mediante un status response el código y mensaje apropiado para informar que el endpoint o API se ha deprecado.

### Propuesta Alterna

Actualmente, en la compañía se está implementando **APISIX**, lo cual ayuda a ser más proactivos en la gestión de los accesos, ya que permite orquestar y canalizar las peticiones HTTP sobre los diferentes recursos de la compañía, funcionando como nuestro principal Gateway.

Con APISIX, podemos también implementar la deprecación de versiones de una API:

- **Redirección de Peticiones**: Podemos definir la redirección de peticiones mediante los DNS para guiar a los usuarios de versiones antiguas hacia versiones nuevas o usar mensajes de deprecación para informar a los clientes sobre versiones obsoletas.

Hoy en SatRack hemos implementado este mecanismo de redirección sobre los recursos de múltiples APIs, de manera que cada vez que se cambie la implementación sobre el backend, los clientes no tengan que actualizar las rutas a los nuevos endpoints. Esto facilita la mantenibilidad, ya que los clientes siempre se conectan a un mismo DNS o URL para realizar las peticiones.

-----------------------------------------------------------------------
# Pregunta 3

# Solución de Almacenamiento de Datos para una Plataforma de Streaming de Video

## Respuesta

Propongo un diseño de plataforma de streaming de video, aplicando parte de los conceptos de la metodología **WHY DRIVEN DESIGN** para abordar los requisitos y tomar decisiones informadas en cada paso. Esta metodología se centra en entender el "por qué" detrás de cada decisión para garantizar que el diseño satisfaga las necesidades del negocio y de los usuarios.

### ¿Por qué necesitamos una solución de almacenamiento para una plataforma de streaming de video?

Porque tener la capacidad de no solo almacenar, sino gestionar la estructura de datos de manera eficiente proporciona una experiencia de streaming fluida y de alta calidad para el usuario.

### ¿Qué tipos de datos nos piden almacenar?

- Archivos de video que los usuarios generan durante la visualización de streamings.

### ¿Qué opciones de almacenamiento existen y cuál es la más adecuada?

1. **Almacenamiento SQL vs NoSQL**
   
   - **NoSQL**:
     - Proveedores: Document Store (MongoDB, CosmosDB) o Blob Storage (Azure, Amazon S3).
     - **Ventajas**:
       - Permite manejar grandes volúmenes de datos (archivos).
       - Estructuras flexibles no condicionadas a integridades referenciales estrictas.
       - Proporciona adaptabilidad en los tipos de datos.
       - El costo puede ser alto dependiendo de la cantidad de inserciones de los archivos.
   
   - **SQL**:
     - Motores: PostgreSQL, MySQL o SQL Server.
     - **Ventajas**:
       - Implementa principios ACID, permitiendo aislar transacciones y tener datos estructurados.
       - Soporte de almacenamiento a grandes volúmenes de datos.
       - Permite configuración de clúster con manejo parametrizable de recursos verticales.

   **¿Cuál es la más adecuada?**
   
   Para nuestro caso se elige NoSQL por su alta escalabilidad y facilidad de administración de grandes cantidades de archivos.

2. **Gestión del Almacenamiento de Archivos (Local vs Cloud)**
   
   - **Ventajas Cloud**:
     - Alta disponibilidad y simplificación en la gestión del almacenamiento.
     - Los servicios dedicados reducen problemas debido a la mantenibilidad de hardware propio.
   
   - **Ventajas Local**:
     - Los datos quedan en dominios de administración propia de las organizaciones.
     - Se puede adaptar la capacidad de recursos horizontales y verticales de manera controlada para controlar costos.

   **¿Cuál es el más adecuado?**
   
   Almacenamiento en la nube, debido a que el principal requerimiento de la arquitectura es que sea altamente disponible y maneje recursos CDN.

### ¿Cómo manejar la entrega de contenido a usuarios a nivel global?

Se pueden usar servicios como Cloudflare, AWS CloudFront, Akamai, Cloud CDN y Media CDN (Google), ya que esto nos permitiría distribuir el contenido de video reduciendo los tiempos de carga de los archivos debido a su manejo de caché y velocidad de descarga para los usuarios de manera nativa en los navegadores o clientes web.

### ¿Cómo asegurar la alta disponibilidad del sistema?

Con servicios cloud, este apartado está cubierto. Para nuestro caso, se utilizará Blob Storage (Azure, Amazon S3) y se pueden utilizar mecanismos de replicación (backup) para asegurar que el contenido esté accesible desde diferentes zonas horarias, evitando depender del hardware ante desastres o eventos. Estos proveedores implementan mecanismos de resiliencia en sus propuestas de servicio.

## Atributos Priorizados del Sistema

Estos atributos consideran que satisfacen nuestro diseño del sistema, ya que buscamos garantizar la disponibilidad de un servicio de streaming y el almacenamiento de archivos con alta disponibilidad.


TECNICOS

  ![facilidad_administracion](https://github.com/user-attachments/assets/1d8ca100-3796-4b08-95f7-6fcc636ba1ff)
  ![facilidad_despliegue](https://github.com/user-attachments/assets/f0220fff-1aac-4718-a27a-f6496f187124)

NEGOCIO

  ![disponibilidad](https://github.com/user-attachments/assets/8a3c4ff8-2c2b-403e-a488-4bf3a5d6628c)
  ![escalabilidad](https://github.com/user-attachments/assets/81408c5c-26c5-4d58-b577-52836b1ceb98)
  ![costo eficiente](https://github.com/user-attachments/assets/b36b3976-06d6-49b6-a1d3-e6873740902d)
  ![flexibilidad](https://github.com/user-attachments/assets/45d53d24-861c-49a7-893e-7f3361e8b1e3)


DIAGRAMA DE DISEÑO ARQUITECTÓNICO

Componentes 

  1) Api BFF streaming
  2) Almacenamiento de Videos  (Azure Storage)
  3) Micro servicio almacenamiento de Videos y Metadatos
  5) Almacenamiento de Datos de Usuarios y Transacciones (MySQL)
  6) Micro servicio Almacenamiento de Datos de Usuarios y Transacciones 
  7) Contenedores CDN (Akamai )
  8) Almacenamiento  Metadatos de Videos  (MongoDB Atlas)
  9) Replicador de datos
  10) Servidor RMTP
  11) Clientes Web/Mobil

![DiagramaContenedoresStreamingCDN](https://github.com/user-attachments/assets/d9bb5483-9eaa-4d2f-b5cd-9d858396060f)

        



