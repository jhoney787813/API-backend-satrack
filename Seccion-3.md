Pregunta 1

Diseñe un sistema de mensajería en tiempo real para una
aplicación de chat. El sistema debe soportar la entrega de
mensajes a millones de usuarios simultáneamente. Describa
la arquitectura, los componentes clave (como servidores de
mensajería, bases de datos, etc.), y cómo manejaría la
escalabilidad y la tolerancia a fallos.

R/=Propongo un diseño de un sistema de mensajería en tiempo real para una aplicación de chat, aplicando parte de los conceptos de la metodología WHY DRIVEN DESIGN para abordar los requisitos y tomar decisiones informadas en cada paso. Esta metodología se centra en entender el "por qué" detrás de cada decisión para garantizar que el diseño satisfaga las necesidades del negocio y de los usuarios.

¿Por qué necesitamos un sistema de mensajería en tiempo real para una aplicación de chat?

Porque permitir una comunicación instantánea entre usuarios mejora la experiencia, aumenta la interactividad y es fundamental para cualquier aplicación moderna de chat que busque mantenerse competitiva y relevante.

¿Qué componentes necesitamos para un sistema de mensajería en tiempo real?

Servidores de mensajería en tiempo real (SignalR): 

    Para manejar la comunicación bidireccional y en tiempo real entre clientes y servidores.

Microservicios: 

    Para gestionar la lógica de negocio como el manejo de usuarios, autenticación, y la entrega de mensajes.
  
Message Broker (RabbitMQ o Kafka): 

    Para desacoplar la producción y consumo de mensajes y garantizar la entrega confiable.

Base de Datos (NoSQL y SQL): 

    Para almacenar la información estructurada (usuarios, contactos) y no estructurada (mensajes).

Cache (Redis): 

    Para acelerar el acceso a datos frecuentemente solicitados, como sesiones y mensajes recientes.

Balanceadores de carga: 

    Para distribuir la carga entre las instancias del sistema.

Monitoreo y alertas: 

    Para asegurar la disponibilidad y el rendimiento del sistema.


¿Qué opciones tenemos para los servidores de mensajería en tiempo real y cuál es la más adecuada?

SignalR vs WebSockets Puro vs Servicios de Terceros (Pusher, PubNub)

SignalR:

Proporciona una capa de abstracción sobre WebSockets, Long Polling y Server-Sent Events.
Integración nativa con .NET, ideal para aplicaciones basadas en ASP.NET Core.
Escalabilidad mediante Redis para gestionar conexiones distribuidas.

WebSockets Puro:

Menor sobrecarga en comparación con SignalR pero requiere más desarrollo personalizado.
Mayor control sobre la implementación y rendimiento.

Servicios de Terceros (Pusher, PubNub):

Simplifican la implementación con SDKs y servicios administrados, pero pueden ser costosos y limitar el control.

¿Cuál es la más adecuada?

SignalR es la elección ideal por su integración nativa con ASP.NET Core, soporte para escalabilidad y manejo sencillo de múltiples transportes en caso de que WebSockets no esté disponible.






-----------------------------------------------------------------------

Pregunta 2

Explique cómo implementaría un sistema de control de
versiones de API para una aplicación que está en producción
con múltiples clientes. Incluya detalles sobre la gestión de la
depreciación de versiones antiguas y la migración de los
clientes a nuevas versiones de la API

R/= Como no se me pide implementar esta solución en una tecnologia especifica, para dar cumplimiento a este requemiento quiero proponer una altertaiva que hemos utilizado en satrack para este proposito, normalmente la he implementando con .NET

Supogamos que la aplicación esta en producción y cuenta con unos endpoints actuales que no puede ser modificados para no afectar los clientes que consumen nuestras apis en sus contratos. lo que hacemos en configurar nos una ruta alternativa  en nuestro swagger para controlar el ruteo a nuestros endpoints nuevos.

Ahora, como normalmente en nuestras desarrollos tratamos de depender de abstracciones e implementaciones me diante interfaces. esto es un punto favorable y a tener encuenta pues una tactica que podemos utilizar es se pasarar nuestros controladores por versiones 
si lo que ha cambiado es el contrado de entrada, pero si se requiere cambiar las reglas de negocio para un endpoint nuevo conservando las actuales, entonces  podemos crear una distribución de nuestra capa de negocio (Rules,Core y/O Domain) de tal manera que se agregen nuevas implentaciones por version de las capacidades de negocio y esto no afecta el flujo actual que se usan en los clientes que consumen el api.

ahora  ¿como podemos manejar la estrategia de deprecación?

definir la fecha limite maximo que los clientes tendran disponibles el soporte de versiones ante errores. 

teniendo las nuevas versiones funcionales y las actuales operativas, se puede generar  un comunicado a nivel interno de la organización informando la deprecación de los enpoint actuales y pasar el listado con los cambios y la forma de consumir los nuevos endpoints.

ahora, si por el contrario no es posible que los clientes se migren a la nueva versión debido a el impacto que tendria en implementar el cambio del DNS o rutas de las apis, se podria considerar implementar en los endpoints a deprecar una redirección temporal de recursos hacia los nuevos endpoint, pero se debe analizar si los contratos de entrada de las peticiones de los endpoints viejos son aplicables o soportados por las nuevas versiones para hacer esta redirección. de no ser asi se deberia de rechazar las peticiones entrantes a los endpoints viejos e informar mediante status responce el codigo y mensaje apropiado para informar que el endpoint o api se ha deprecado.


PROPUESTA ALTERNA

Actualmente en la compañia se esta implementando APISIX , esto que ayuda precisamente a ser mas proactivos en la gestión de los accesos ya que este permite orquestar y canalizar las peticiones HTTP sobre los diferentes recursos de la compañia pues es nuestro principal Gateway.

con APISIX podemos tambien implementar la deprecación de versiónes de un api.

podemos definir la redirección de peticiones, me diante los dns para guiar a los usuarios de versiones antiguas hacia versiones nuevas o usa mensajes de depreciación para informar a los clientes sobre versiones obsoletas.

Hoy en satrack hemos implementado este mecanisco de redirección sobre los recursos de múltiples APIs para que se reduzca que cada que se cambie la implementación sobre el back, los clientes tengan que actualizar las rutas a los nuevos endpoint, esto facilita la mantenibilidad ya que los clientes siempre se conectan a un mismo DNS o url para realizar las peticiones.



-----------------------------------------------------------------------
Pregunta 3

Diseñe una solución de almacenamiento de datos para una
plataforma de streaming de video. Discuta las opciones de
almacenamiento (SQL vs NoSQL), la gestión de
almacenamiento de archivos (local vs cloud), y cómo
manejaría la entrega de contenido a usuarios a nivel global.
Incluya consideraciones sobre CDN (Content Delivery
Network) y alta disponibilidad.



R/= propongo un diseño de plataforma de streaming de video, aplicando parte de los conceptos de la metodologia WHY DRIVEN DESIGN para abordar los requisitos y tomar decisiones informadas en cada paso. Esta metodología se centra en entender el "por qué" detrás de cada decisión para garantizar que el diseño satisfaga las necesidades del negocio y los usuarios.

¿Por qué necesitamos una solución de almacenamiento para una plataforma de streaming de video?
  por que tener la capacidad de no solo almancenar si no gestionar la estructura de datos de manera eficiente proporciona una experiencia de streaming fluida y de alta calidad para el usuario.

¿Qué tipos de datos nos piden almacenar?

  archivos de video que los usuarios generan durante la visualización de streamings.

¿Qué opciones de almacenamiento existen y cuál es la más adecuada?

   1. Almacenamiento SQL vs NoSQL
      
     Entre las bases de datos NoSQL tenemos los siguientes proveedores de servicios (Document Store (MongoDB, CosmosDB) o Blob Storage ( Azure, Amazon S3 )
   
     Entre las bases de datos  SQL  tenemos los siguientes motores ( PostgreSQL, MySQL o SQL SERVER)
   
      Ventajas de NoSQL
    
      Permite manejar grandes volumes de datos (archivos), pero puede complejizar la estructuración de los datos, ya que no se tiene una interidad referencial tan rigurosa en comparación de los datos que estan en BD SQL.
      
      Estructuras flexibles no condicionadas a integridad referenciales estrictas.
      
      Proporciona adaptabilidad en los tipos de datos.
      
      El costo puede ser alto dependiendo de la cantidad de inserciones de los archivos.
  
    
    Ventajas de SQL
    
      Al poder implementar los principios ACID, estas nos nos permite aislar las transacciones y tener unos datos estructurados, lo que nos permite tener integridad referencial. 
      
      Soporte de almacenamiento a grandes volumenes de datos.
    
      permite configuración de cluster con manejo parametrimetrizables de recursos verticales.
  
  ¿cuál es la más adecuada?
  
    Para nuestro caso se elije las NoSQL por su alta escalabilidad y falicidad de administración de grandes cantidades de archivos.
  
      
   2. Gestión del Almacenamiento de Archivos (Local vs Cloud)
  
  Ventajas Cloud 
  
    se considera que una ventaja la alta disponibilidad, y simplificación en la gestión del almacenamiento.
  
    los servicios dedicados reduncen problemas debido a la mantenibilidad de hardware propio.
  
  Ventajas Local 
  
    Los datos quedan en dominos de adminitración propia de las organizaciones.
  
    se puede adaptar la capacidad de recursos  horizontales y verticales de manera controlada, para controlas los costos.
  
  ¿cuál es el más adecuada?
  
   Almacenamiento en la nube, debido a que el principal requerimiento de la arquitectura es que sea altamente disponible y maneje recursos CDN.

¿Cómo manejar la entrega de contenido a usuarios a nivel global?

  se puden usar servicios como (Cloudflare, AWS CloudFront, Akamai, Cloud CDN and Media CDN (Google) ), ya que esto nos permitiria distribuir el contenido de video reduciendo los tiempos de carga de los archivos debio a su manejo de cache y velocidad de descarga para los usuarios de manera nativa en los navegadores o clientes web.

¿Cómo asegurar la alta disponibilidad del sistema?

  con servicios CLOUD este apartado esta cubierto ya que para nuestro caso se utilizara Blob Storage ( Azure, Amazon S3) y se pueden utilizar mecanismos de replicación(backup) ya que el contenido puede estar accesible desde diferentes zonas horarias y se evita tener que estar pendiente del hardware ante desastres o eventos. Ya que estos proveedores de servicios implementan dischos mecanismos en sus propuestas de servicio.

ATRIBUTOS PRIORIZADOS DEL SISTEMA

Estos atributos considero que satisfacen nuestro diseño del sistema ya que pretendemos satisfacer la necesidad de disponibiliar un servicio de streaming y el almacenamiento de archivos con una alta disponibilidad.

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


