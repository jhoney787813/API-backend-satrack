# Pregunta 1

**Explique el principio de consistencia eventual en bases de datos distribuidas. Compare este enfoque con el de consistencia fuerte y discuta sus ventajas y desventajas en el contexto de aplicaciones de gran escala.**

**R/** Empiezo por decir que la consistencia fuerte es diferente a la consistencia total.

Para dar respuesta, quiero tomar como ejemplo un entorno real basado en el motociclismo de competencia.

## Consistencia Eventual

La consistencia eventual se puede comparar con permitir que cada parte de la moto reporte a su propio ritmo. Esto es útil para el análisis de datos a gran escala en diferentes momentos de inserción de datos.

Cada equipo de motociclismo tiene sensores en sus motos que monitorean datos como la velocidad, la temperatura del motor y el nivel de combustible. Estos datos se envían a una base de datos, pero no todos los sensores están sincronizados al instante. Por ejemplo, el sensor del motor podría enviar datos un segundo después que el sensor de la rueda.

**Conclusión:** Se consolidan todos los datos de cada sensor en la base de datos, pero no en el mismo momento ni en la misma transacción. Puede que no estén completamente sincronizados. A pesar de esta inconsistencia temporal (eventualmente), todos los datos son almacenados y, al final, pueden ser consultados en conjunto.

## Consistencia Fuerte

La consistencia fuerte, en cambio, es esencial en situaciones de alta presión donde la exactitud y la sincronización inmediata de la información son cruciales, como en decisiones tácticas durante la carrera.

En este caso, todos los sensores de la moto envían datos en tiempo real que deben estar sincronizados y ser consistentes al momento de llegar al equipo técnico. Esto es crucial en situaciones donde cada segundo cuenta, como ajustar la estrategia de la carrera basándose en la temperatura exacta del motor en tiempo real. Cada dato debe ser confirmado y sincronizado antes de ser utilizado, asegurando que cualquier información que vea el equipo sea la versión más actualizada y precisa.

## Ventajas y Desventajas

### Consistencia Eventual
- **Ventajas:**
  - Más flexible y eficiente.
  - Ideal para análisis posteriores a la carrera, permitiendo la toma de decisiones con datos consolidados.

- **Desventajas:**
  - Puede haber inconsistencias temporales en los datos.

### Consistencia Fuerte
- **Ventajas:**
  - Ofrece precisión absoluta y sincronización en tiempo real.
  - Crucial en situaciones donde la inmediatez de la información es vital.

- **Desventajas:**
  - Sacrifica velocidad y escalabilidad.


-----------------------------------------------------------------------

# Pregunta 2

**Describa el protocolo de consenso Raft. ¿Cómo garantiza Raft la seguridad y la disponibilidad en un sistema distribuido? Compare Raft con Paxos en términos de complejidad y casos de uso.**

**R/** En el diseño de sistemas distribuidos, el consenso es una característica clave que permite la obtención de respuestas ágiles sobre algún servicio.

Para explicar el protocolo Raft, propongo un entorno cotidiano como el mundo de los videojuegos.

Imaginemos un juego en línea multijugador donde los jugadores deben colaborar y tomar decisiones conjuntas, como en un juego de estrategia en tiempo real (por ejemplo, "Construye tu imperio"). 

## Protocolo Raft

### Funcionamiento

Para que la toma de decisiones sea posible, se necesita un método que organice las decisiones de todos los jugadores. Aquí es donde el protocolo Raft asigna un papel de líder (o "capitán") a uno de los jugadores conectados, denominados nodos del sistema. 

Cuando Raft elige al "capitán", pone a disposición las votaciones de los otros jugadores, asegurando que el "capitán" tenga la última palabra en la toma de decisiones y sincronizando esa decisión con todos los jugadores.

### ¿Cómo garantiza Raft la seguridad y la disponibilidad?

1. **Elección de Líder:**
   - Raft comienza eligiendo un líder entre los nodos (los jugadores). Este líder asume el rol de "capitán", encargado de tomar decisiones.

2. **Sincronización de Decisiones:**
   - Cada vez que el "capitán" toma una decisión (como mover tropas o recolectar recursos), Raft sincroniza esta decisión con los demás nodos, quienes la registran para mantener un plan de juego coherente.

3. **Manejo de Desconexiones:**
   - Si el "capitán" pierde conexión, el algoritmo de consenso de Raft busca entre los otros jugadores para elegir un nuevo "capitán", quien recuperará las configuraciones y decisiones previas. No se aceptan nodos que no hayan sido validados inicialmente.

4. **Disponibilidad:**
   - La disponibilidad se garantiza validando los recursos y la cantidad de jugadores conectados para sincronizar las decisiones. En caso de desconexión de algún jugador, se asigna un nuevo "capitán".

## Comparación con Paxos

- **Complejidad:**
  - **Raft:** Se considera más fácil de entender y de implementar, ya que descompone el problema del consenso en etapas claras (elección de líder, replicación de log, etc.).
  - **Paxos:** Es más complejo y menos intuitivo, lo que puede dificultar su implementación y comprensión.

- **Casos de Uso:**
  - **Raft:** Ideal para aplicaciones donde la facilidad de implementación y comprensión es crucial, como en sistemas de bases de datos y servicios distribuidos que requieren consenso claro.
  - **Paxos:** Se utiliza en sistemas que requieren un alto grado de robustez y pueden tolerar la complejidad, como en sistemas de almacenamiento distribuido en empresas grandes.


![image](https://github.com/user-attachments/assets/acbd183f-df2c-48ca-bfc4-5f2b988bbf6a)
# Paxos vs Raft

En el caso particular del juego de estrategia que hemos denominado **"Construye tu imperio,"** Paxos no sería lo más adecuado. A continuación, explico por qué, a pesar de ser también un protocolo de consenso utilizado en sistemas distribuidos, tiene sus propios escenarios de aplicación.

## Desventajas de Paxos en un Juego de Estrategia

### 1. Complejidad Alta
Paxos es más complejo que Raft y requiere múltiples rondas de consenso para tomar decisiones. En un juego en tiempo real, esta complejidad puede introducir latencias, ya que los nodos del sistema deben enviar y recibir múltiples mensajes para obtener respuestas, retrasando así las acciones de los jugadores y afectando la fluidez del juego.

### 2. Menor Agilidad en Decisiones
A diferencia de Raft, donde un "Capitán" (nodo principal) toma decisiones rápidamente, en Paxos cada nodo (jugador) puede proponer una acción, y todos deben ponerse de acuerdo. Esto podría resultar en decisiones más lentas y descoordinadas, lo que no es ideal en un juego de estrategia rápida.

### 3. Dificultad de Implementación
Implementar Paxos en un entorno de videojuegos es más complicado debido a la necesidad de gestionar múltiples propuestas simultáneas, lo que aumenta el riesgo de errores y complicaciones técnicas.

## Conclusión
Por estas razones, Paxos no es la mejor opción para un juego de estrategia en tiempo real como **"Construye tu imperio."** En su lugar, un protocolo como Raft, que ofrece mayor agilidad y simplicidad, sería más adecuado para mantener la fluidez y coordinación del juego.


-----------------------------------------------------------------------
# Pregunta 3

**Discuta las diferencias entre el escalado vertical y el escalado horizontal en sistemas backend. Proporcione ejemplos específicos de cuándo utilizaría cada enfoque y cómo afectaría esto la arquitectura del sistema.**

**R/** Imaginemos un restaurante de renombre y muy visitado, con alta concurrencia. El espacio para sentar a los clientes es amplio y tiene una capacidad para 100 personas a la vez, pero la cocina solo puede preparar 25 platos a la vez debido a limitaciones de personal y recursos.

## Escalado Vertical

Para poder preparar 100 platos a la vez, podemos aplicar el **escalado vertical**, que implica remodelar la cocina para ampliar su espacio, añadiendo más herramientas, enseres y/o personal. Esto permite aprovechar al máximo la capacidad de la cocina sin necesidad de cambiar de local. 

### Ventajas:
- No requiere cambiar de ubicación.
- Mejora la capacidad de producción.

### Desventajas:
- Existe un límite en cuanto a cuántas mejoras se pueden hacer antes de que la cocina se vuelva caótica, ya que los cocineros podrían estorbarse entre sí.
- Los costos aumentan con cada mejora.

## Escalado Horizontal

Si el dueño del restaurante desea atender a 400 personas simultáneamente debido a un aumento exponencial en la clientela, podría aplicar el **escalado horizontal**. Esto implicaría tomar el local de al lado y remodelarlo para crear una nueva cocina con más herramientas, enseres y personal.

### Ejemplo:
- El primer local sigue atendiendo a 100 personas, mientras que el segundo local se encarga de 300 personas. Cada cocina puede gestionar una parte de los pedidos, distribuyendo mejor el trabajo.

## Enfoques en el Desarrollo de Software

### Escalado Vertical
- **Cuándo utilizar:** Cuando necesitas una solución inmediata para mejorar el rendimiento sin reconfigurar todo el sistema. Implica mejorar la capacidad del servidor donde se ejecuta tu aplicación (más RAM, CPU, mejor almacenamiento).
- **Límites:** Dependes de la capacidad máxima del servidor (dedicado, virtualizado o físico).

### Escalado Horizontal
- **Cuándo utilizar:** Cuando necesitas que tu sistema esté siempre disponible, incluso si uno de los servidores falla. Implica agregar más servidores y distribuir el trabajo entre ellos.
- **Ventajas:** Varias réplicas de tu aplicación funcionan de manera independiente, permitiendo compartir y distribuir la carga de trabajo.

## Impacto en la Arquitectura del Sistema

### Escalado Vertical
- **Ideal para:** Aplicaciones más simples y con tráfico controlado.
- **Arquitectura:** No necesita cambios drásticos, pero tiene un límite en el crecimiento.

### Escalado Horizontal
- **Mejor para:** Aplicaciones grandes y de rápido crecimiento.
- **Arquitectura:** Más compleja, pero ofrece escalabilidad y resiliencia a largo plazo.




