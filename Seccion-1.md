Pregunta 1

Explique el principio de consistencia eventual en bases de
datos distribuidas. Compare este enfoque con el de
consistencia fuerte y discuta sus ventajas y desventajas en el
contexto de aplicaciones de gran escala.

R/= Empiezo por decir que la cosistencia fuerte  es diferente a la != Consistencia total. 

Para dar respuesta quiero tomar como ejemplo un entorno real basado en el motociclismo de competencia.

Consistencia Eventual:

la consistencia eventual sería como permitir que cada parte de la moto reporte a su propio ritmo, lo cual es útil para análisis de datos a gran escala en tiempos diferentes de inserción de datos. 

Con  lo anterior podemos complementar que cada equipo de motociclismo tiene sensores en sus motos para monitorear datos como la velocidad,la temperatura del motor y el nivel de combustible.
Estos datos se envían a una base de datos, pero no todos los sensores están sincronizados al instante. Por ejemplo, el sensor del motor podría enviar datos un segundo después que el sensor de la rueda.

Conclusión: se consolidan todos los datos por cada sensor en la base de datos, pero no en un mismo tiempo ni en una misma transacción.puede no estar completamente sincronizada. A pesar de esta inconsistencia temporal (eventualmente),
todos los datos son almacenados y al final pueden ser consultados en conjunto.



Consistencia Fuerte:
La consistencia fuerte, en cambio, es esencial en situaciones de alta presión donde la exactitud y sincronización inmediata de la información son cruciales, como en decisiones tácticas durante la carrera

Con lo anterior podemos complementar que todos los sensores en la moto envían datos en tiempo real que deben estar sincronizados y ser consistentes al momento de llegar al equipo técnico. Esto es crucial en situaciones donde cada segundo cuenta, como ajustar la estrategia de la carrera basándose en la temperatura exacta del motor en tiempo real. 
cada dato debe ser confirmado y sincronizado antes de ser utilizado, asegurando que cualquier información que vea el equipo sea la versión más actualizada y precisa.

Ventajas y desventajas de ambas:

Consistencia eventual: es más flexible y eficiente en situaciones donde los datos pueden tolerar pequeñas inconsistencias temporales, ideal para análisis  despues de terminada una carrera para toma de desiciones con datos consolidadas.

Consistencia fuerte: es la mejor opción cuando se necesita precisión absoluta y sincronización en tiempo real, aunque implique un sacrificio en velocidad y escalabilidad.



-----------------------------------------------------------------------

Pregunta 2

Describa el protocolo de consenso Raft. ¿Cómo garantiza Raft
la seguridad y la disponibilidad en un sistema distribuido?
Compare Raft con Paxos en términos de complejidad y casos
de uso.


R/= El diseño de sistemas distribuidos el consenso es una característica que prevalece en la implementación de algorirmos que permitan la obtención de respuestas agiles sobre algun servicio.

Quisiera proponer en un entorno de la vida cotidiana como lo es el mundo de los videjuegos la explicación en este contexto.

tenemos un juego en línea multijugador donde los jugadores deben colaborar y tomar decisiones conjuntas, como en un juego de estrategia (Construye tu imperio) en tiempo real.
 ¿que necesita para hacer esta toma de disiciones posible?, se necesita implementar un metodo capaz de orqueztar las decisicones de todos los jugadores es aqui donde el protocolo Raft busca asignar papapel como el lider del equipo (Capitan)
a todos los jugagores conectados denominados (Nodos del sistema), cuando Raft ha elegido el "capitan"  pone a disposición las votaciones de los otros jugadores(Nodos del sistema) pero asegura que el "capitan" tenga la ultima palabra en la toma de desiciones y sincroniza la decición con todos los jugadores.

¿Cómo Raft Garantiza Seguridad y Disponibilidad?

Raft empieza eligiendo un líder entre los nodos (los jugadores). asigna el rol de "capitan" quien es el que toma las decisiones.

Cada vez que se toma una decisión (como mover tropas o recolectar recursos), por el  "Capitan" (nodo central)   Raft  sincroniza la comunica a los demás, quienes registran esta decisión para que todos tengan el mismo plan de juego.

Ahora si el "capitan" pierde conexión entonces el algorirmo de "consenso" que implementa Raft, busca entre los otros jugadores de la partida (Nodos del sistema) quien asumira el rol de "capitan" y le cargara las configuraciones y desciones previas tomadas, no acepta  jugadores (Nodos del sistema) que no han sido validados inicial mente.

la disponibilidad se garantiza ya que esta validando los recustos y la cantidad de jugadores conectados para sincronizar las deciciones y en caso de desconexión de algun jugador(Nodo del sistema)  se asigna un nuevo "capitan".

![image](https://github.com/user-attachments/assets/acbd183f-df2c-48ca-bfc4-5f2b988bbf6a)
Paxos VS Raft

para el caso particular del juego de estrategia que hemos denominado (Construye tu imperio), paxos no seria lo mas adecuado y te voy a explicar por que apesar de ser tambien un protocolo de consenso utilizado en sistemas distribuidos tambien tiene sus escenarios propios de apliación.

Complejidad Alta: Paxos es más complejo que Raft y requiere múltiples rondas de consenso para tomar decisiones. En un juego en tiempo real, esta complejidad puede introducir latencias ya que esta son deando mas veces los (nodos del sistema) para obtener respuestas, retrasando las acciones de los jugadores y afectando la fluidez del juego.

Menor Agilidad en Decisiones: A diferencia de Raft, donde un "Capitán"( nodo principal)  toma decisiones rápidamente, en Paxos cada nodo (jugador) puede proponer una acción, y todos deben ponerse de acuerdo. Esto podría resultar en decisiones más lentas y descoordinadas, lo que no es ideal en un juego de estrategia rápida.

Dificultad de Implementación: Implementar Paxos en un entorno de videojuegos es más complicado debido a la necesidad de gestionar múltiples propuestas simultáneas, lo que aumenta el riesgo de errores y complicaciones técnicas.

-----------------------------------------------------------------------
Pregunta 3

Discuta las diferencias entre el escalado vertical y el escalado
horizontal en sistemas backend. Proporcione ejemplos
específicos de cuándo utilizaría cada enfoque y cómo afectaría
esto la arquitectura del sistema.

R/= Su pongamos que tenemos un restaurante con renombre y muy visitado con (Alta concurrencia), el espacio donde se sientan los clientes es amplio y con una capacidad para "100" personoas a la vez, sin emgargo la cocina solo tiene capacidad para
personal suficiente como para preparar 25 platos a la vez.







