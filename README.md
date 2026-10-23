# La Señal de Sierra del Cuervo

Campaña original de misterio sobrenatural retro. Cada etapa sigue el flujo:
QR oculto → prueba digital → acertijo para hallar el sobre físico del lugar.
El sobre contiene un artefacto y la pista en papel para encontrar la siguiente
localización. La configuración está en `js/config.js`; el motor de juego está
separado de la validación de acceso compartida con Firebase.

## QR de las seis localizaciones

Publica la campaña en HTTPS y crea un código QR por identificador:

1. `?pista=laboratorio`
2. `?pista=estacion-radio`
3. `?pista=cine-aurora`
4. `?pista=bosque-refugio`
5. `?pista=casa-senales`
6. `?pista=el-portal`

El progreso utiliza la clave `escape-room-senal-sierra-1986-v2`, separada de la
versión anterior para evitar que un avance guardado salte etapas en esta nueva
ruta.

## Preparación física

Cada objeto `envelope` de una etapa contiene:

- `label`: identificador para preparar y ordenar el sobre.
- `artifact`: objeto físico que va dentro.
- `nextLocationClue`: pista en papel que dirige al siguiente QR.
- `ending`: cierre final opcional.

El motor no imprime ni muestra esos campos `envelope`: son instrucciones para
la persona organizadora. Imprime `nextLocationClue` y colócalo dentro del sobre
junto al artefacto. Los mensajes de éxito de la prueba digital dan un acertijo
para localizar el sobre en la misma etapa.

Los acertijos de escondite son ejemplos basados en bancos, ventanas, butacas,
árboles y peldaños. Comprueba que esos elementos existan y que sea seguro y
permitido esconder objetos en cada espacio. Cambia las coordenadas y pistas por
las de tu recorrido real antes de jugar.

La historia menciona 90 minutos, pero esta versión no implementa temporizador.
El progreso reside en `localStorage` y puede manipularse desde el navegador;
no es un mecanismo antifraude ni sincroniza entre dispositivos.

## Acceso compartido con códigos

El acceso se valida en el proyecto Firebase compartido con
`Template`. Al abrir un QR sin una sesión activa, esta aplicación
redirige al portal, conservando la etapa del QR y seleccionando Stranger
Things. El jugador introduce un código de un solo uso en el portal; el código
queda asociado a la aventura seleccionada y el portal vuelve a esta aplicación
con una sesión verificada.

Configura `publicPortalUrl` en `js/config.js` con la URL pública del portal y
configura la URL de esta experiencia en
`Template/js/config.js`, dentro de
`publicPortal.experiences`. Las rutas relativas de ejemplo solo funcionan si
ambos proyectos se publican bajo el mismo dominio y estructura. Para
publicaciones independientes, utiliza las URL HTTPS reales.

La sesión se registra en
`experiencias/stranger-things/accesos/{sessionId}` y el código queda marcado
con `experiencia: "stranger-things"`. Las reglas combinadas de Firestore están
en `Template/firestore.rules` y `Quiz/firestore.rules`; hay que
mantenerlas sincronizadas y publicarlas desde el proyecto compartido para que
el canje funcione.
