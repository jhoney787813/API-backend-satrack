Pregunta 1

Diseñe un sistema de mensajería en tiempo real para una
aplicación de chat. El sistema debe soportar la entrega de
mensajes a millones de usuarios simultáneamente. Describa
la arquitectura, los componentes clave (como servidores de
mensajería, bases de datos, etc.), y cómo manejaría la
escalabilidad y la tolerancia a fallos.

R/=



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

te niendo las nuevas versiones funcionales y las actuales operativas, se puede generar  un comunicado a nivel interno de la organización informando la deprecación de los enpoint actuales y pasar el listado con los cambios y la forma de consumir los nuevos endpoints.

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
