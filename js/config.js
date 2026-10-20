window.ESCAPE_CONFIG = {
  storageKey: "escape-room-senal-sierra-1986-v1",
  theme: {
    colors: {
      page: "#030305",
      panel: "rgba(10, 5, 12, 0.92)",
      accent: "#ff003c",
      highlight: "#ff3b00",
      text: "#e0e0e0",
      success: "#00ffcc",
      error: "#ff0055"
    }
  },
  branding: {
    title: "La Señal de Sierra del Cuervo",
    intro: "Sierra del Cuervo, 1986. El observatorio ha recibido una transmisión que no procede de ninguna estación conocida. Tenéis 90 minutos para seguir sus pistas, descifrar los patrones y estabilizar la grieta antes de que la anomalía alcance el pueblo.",
    footer: "Observatorio de Sierra del Cuervo · Unidad de Fenómenos Atmosféricos",
    logo: "assets/img/sierra-observatorio.svg",
    music: "assets/audio/stranger_things_intro.mp3"
  },
  ui: {
    musicOn: "Activar ambiente",
    musicOff: "Silenciar ambiente",
    check: "Enviar respuesta",
    checkCoordinates: "Sintonizar coordenadas",
    showHint: "Solicitar pista",
    continue: "Continuar",
    restart: "Reiniciar progreso",
    answerPlaceholder: "Introduce el código...",
    answerAriaLabel: "Código de respuesta",
    coordinateAriaLabel: "Dígito de frecuencia",
    progress: "Prueba {current} de {total}",
    correct: "Señal confirmada.",
    incorrect: "La señal no coincide. Volved a intentarlo.",
    complete: "La grieta se ha estabilizado. El pueblo está a salvo.",
    hintShown: "Pista",
    noStages: "No hay pruebas configuradas.",
    storageUnavailable: "No se pudo acceder a localStorage. El progreso solo se conservará mientras esta página permanezca abierta.",
    storageSaveError: "No se pudo guardar el progreso en este dispositivo.",
    invalidConfig: "La configuración de la misión no es válida.",
    tryAgainWithRemaining: "Respuesta incorrecta. Queda otro intento.",
    attemptsExhausted: "Intentos agotados. La respuesta era: {answer}",
    coordinatesIncomplete: "Completa todos los dígitos para sintonizar la frecuencia.",
    coordinatesPartial: "Señal parcialmente sintonizada: {count} dígito(s) correcto(s).",
    coordinatesAllWrong: "La frecuencia no coincide. Volved a intentarlo.",
    coordinatesSolved: "Frecuencia localizada.",
    openMap: "Abrir coordenadas",
    resetConfirm: "¿Quieres reiniciar todo el progreso de la misión?",
    reset: "Progreso reiniciado."
  },
  stages: [
    {
      id: "luces-observatorio",
      qr: 1,
      kind: "clue",
      title: "Las Luces del Observatorio",
      location: "Puesto de control de la sierra",
      prompt: "Las lámparas del observatorio parpadean en código Morse: .- / ..- / .-. / --- / .-. / .- Descifra la palabra para encontrar el primer punto de control.",
      hint: "Es un fenómeno luminoso que aparece en el cielo nocturno.",
      acceptedAnswers: ["AURORA"],
      reveal: "La siguiente pista está oculta en una secuencia de transmisión."
    },
    {
      id: "codigo-transmision",
      qr: 2,
      kind: "minigame",
      title: "El Código de Transmisión",
      location: "Sala de radio",
      prompt: "La emisión muestra: ● → ▲ → ✦ → ■. Repetid la secuencia para descifrar el mensaje.",
      success: "Transmisión descifrada. La señal apunta hacia la sierra.",
      game: {
        type: "runas",
        symbols: ["▲", "●", "■", "✦"],
        sequence: ["●", "▲", "✦", "■"],
        symbolAriaLabel: "Símbolo {symbol}",
        promptText: "Repetid la secuencia interceptada en el orden correcto.",
        successText: "Habéis descifrado el código de transmisión.",
        retryText: "Código incorrecto. La secuencia se ha reiniciado."
      }
    },
    {
      id: "frecuencia-sierra",
      qr: 3,
      kind: "coordinates",
      title: "Frecuencia de la Sierra",
      location: "Señal entrante en el transmisor portátil",
      prompt: "La transmisión estática oculta tres cifras de las coordenadas del siguiente punto. Completa los dígitos para sintonizar la señal.",
      hint: "Las coordenadas de este prototipo son de ejemplo; adapta los fragmentos a la ubicación de tu recorrido.",
      fragments: [
        { text: "40°4" },
        { answer: "1" },
        { text: "'2" },
        { answer: "5" },
        { text: "\"N 73°5" },
        { answer: "8" },
        { text: "'10\"W" }
      ],
      reveal: "La señal lleva a una zona donde las sombras se mueven siguiendo un patrón."
    },
    {
      id: "patron-sombras",
      qr: 4,
      kind: "minigame",
      title: "El Patrón de las Sombras",
      location: "Sendero del bosque",
      prompt: "Memorizad la posición de las marcas luminosas y encontradlas en orden antes de que desaparezcan.",
      success: "Habéis reconstruido el patrón y localizado el origen de la anomalía.",
      game: {
        type: "guardianes",
        count: 9,
        memoryMs: 2400,
        hiddenLabel: "?",
        successText: "Patrón reconstruido. La señal se dirige al transmisor central.",
        memorizeText: "Memorizad la posición de las marcas...",
        playText: "Encontrad las marcas en orden, del {first} al {last}.",
        nextText: "Siguiente marca: {next}",
        retryText: "El patrón se ha roto. Empezad de nuevo."
      }
    },
    {
      id: "cancion-regreso",
      qr: 5,
      kind: "quiz",
      title: "La Canción de Regreso",
      location: "Refugio de la estación meteorológica",
      prompt: "Una persona del equipo se ha desorientado cerca del transmisor. ¿Qué señal sonora acordasteis usar para guiarla de vuelta?",
      options: [
        { id: "A", text: "Un tono largo y continuo" },
        { id: "B", text: "Tres pulsos cortos y dos largos" },
        { id: "C", text: "Dos pulsos largos y uno corto" },
        { id: "D", text: "Una alarma que se repite sin pausa" }
      ],
      answer: "B",
      attempts: 2,
      reveal: "La señal de regreso funciona. Ya podéis estabilizar la grieta."
    },
    {
      id: "estabilizar-grieta",
      qr: 6,
      kind: "minigame",
      title: "Estabilizar la Grieta",
      location: "Cámara del observatorio",
      prompt: "Recordad y repetid las secuencias de energía para estabilizar la anomalía.",
      success: "La grieta se ha estabilizado. El pueblo está a salvo.",
      game: {
        type: "hechizo",
        symbols: ["⚡", "✦", "◉", "▲", "✹", "☄"],
        roundLengths: [3, 4, 5],
        memoryMs: 2200,
        nextRoundMs: 700,
        separator: "  ",
        hiddenLabel: "?",
        roundText: "Secuencia {current} de {total}",
        memorizeText: "Memorizad la secuencia de energía...",
        playText: "Repetid la secuencia para estabilizar la grieta.",
        roundPassedText: "Energía estabilizada. Preparando la siguiente secuencia.",
        retryText: "La secuencia falló. Observadla otra vez.",
        successText: "Grieta estabilizada. La señal ha desaparecido."
      }
    }
  ]
};
