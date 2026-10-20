# La Señal de Sierra del Cuervo

Campaña original de misterio sobrenatural retro basada en la arquitectura de
`Escape-Room-Template`. La configuración vive en `js/config.js`; los motores
`js/engine.js` y `js/minigames.js` se mantienen idénticos a la plantilla.

## Pruebas y códigos QR

Publica la carpeta en HTTPS y genera un QR por prueba usando su identificador:

1. `?pista=luces-observatorio`
2. `?pista=codigo-transmision`
3. `?pista=frecuencia-sierra`
4. `?pista=patron-sombras`
5. `?pista=cancion-regreso`
6. `?pista=estabilizar-grieta`

El avance se guarda con la clave `escape-room-senal-sierra-1986-v1`. Los QR de
pruebas futuras solo se abren cuando el jugador haya desbloqueado esa fase.

## Preparación antes de jugar

- El contenido es un prototipo: sustituye las ubicaciones y coordenadas de
  ejemplo por los puntos reales de tu recorrido.
- Respuestas de referencia para quien organiza: `AURORA`; secuencia
  `● → ▲ → ✦ → ■`; coordenadas `40°41'25"N 73°58'10"W`; respuesta del quiz `B`.
- El texto plantea un límite narrativo de 90 minutos, pero esta versión no
  implementa un temporizador.
- La pista `assets/audio/stranger_things_intro.mp3` se activa manualmente con
  el botón de ambiente de la parte superior. Los navegadores requieren pulsar
  el botón antes de permitir la reproducción.
- Los recursos copiados restantes de la plantilla no se usan en las pruebas
  configuradas; reemplázalos por material propio antes de publicar.

El progreso se guarda en el navegador. `localStorage` y el código JavaScript
pueden manipularse, por lo que el control de QR evita saltos accidentales, pero
no ofrece validación antifraude ni sincronización entre dispositivos.
