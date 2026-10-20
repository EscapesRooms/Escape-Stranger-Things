window.ESCAPE_CONFIG = {
  storageKey: "escape-room-senal-sierra-1986-v2",
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
      id: "laboratorio",
      qr: 1,
      kind: "quiz",
      title: "El Laboratorio de la Sierra",
      location: "Laboratorio de investigación",
      prompt: "El registro del turno de noche pregunta: ¿qué instrumento permite observar objetos demasiado lejanos para distinguirlos a simple vista?",
      options: [
        { id: "A", text: "Un barómetro" },
        { id: "B", text: "Un telescopio" },
        { id: "C", text: "Un sismógrafo" },
        { id: "D", text: "Un cronómetro" }
      ],
      answer: "B",
      attempts: 2,
      success: "¡Lectura correcta! La siguiente señal está en el sobre de papel que espera donde tres tubos de cobre proyectan su sombra sobre el banco de trabajo.",
      reveal: "¡Lectura correcta! La siguiente señal está en el sobre de papel que espera donde tres tubos de cobre proyectan su sombra sobre el banco de trabajo.",
      envelope: {
        label: "Sobre físico 1",
        artifact: "Fragmento de una fotografía con una frecuencia anotada al dorso.",
        nextLocationClue: "Cuando la voz viaja por el aire, alguien debe escucharla: busca el edificio coronado por una antena y una luz roja."
      }
    },
    {
      id: "estacion-radio",
      qr: 2,
      kind: "minigame",
      title: "La Estación de Radio",
      location: "Cabina de emisión",
      prompt: "La transmisión llega entrecortada. Memorizad los símbolos que aparecen en el monitor y repetidlos en el mismo orden.",
      success: "¡Frecuencia descifrada! La siguiente cinta no está en el dial: buscadla donde el cable enrollado duerme junto a la ventana que mira a las antenas.",
      envelope: {
        label: "Sobre físico 2",
        artifact: "Una cinta magnética con una nota de voz grabada.",
        nextLocationClue: "Las voces se apagan cuando comienza la sesión. Seguid la marquesina luminosa hasta el lugar donde las historias se proyectan a oscuras."
      },
      game: {
        type: "runas",
        symbols: ["▲", "●", "■", "✦"],
        sequence: ["●", "▲", "✦", "■"],
        symbolAriaLabel: "Símbolo {symbol}",
        promptText: "Repetid la secuencia interceptada en el orden correcto.",
        successText: "¡Frecuencia descifrada! La siguiente cinta no está en el dial: buscadla donde el cable enrollado duerme junto a la ventana que mira a las antenas.",
        retryText: "Código incorrecto. La secuencia se ha reiniciado."
      }
    },
    {
      id: "cine-aurora",
      qr: 3,
      kind: "minigame",
      title: "El Cine Aurora",
      location: "Sala de proyección",
      prompt: "La pantalla muestra por unos segundos una ruta de butacas. Memorizadla y repetidla antes de que se funda a negro.",
      success: "¡Ruta encontrada! La cinta que buscáis se oculta entre filas: una butaca vacía, dos detrás de la última luz de pasillo.",
      envelope: {
        label: "Sobre físico 3",
        artifact: "Un fotograma perforado con un símbolo dibujado a mano.",
        nextLocationClue: "Dejad atrás la pantalla y seguid el sendero donde dos árboles de tronco claro parecen vigilar una pequeña construcción de madera."
      },
      game: {
        type: "anden",
        nodes: ["2", "5", "8", "3"],
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        separator: " → ",
        hiddenLabel: "?",
        memoryMs: 2400,
        hideText: "?",
        successText: "¡Ruta encontrada! La cinta que buscáis se oculta entre filas: una butaca vacía, dos detrás de la última luz de pasillo.",
        memorizeText: "Memorizad el recorrido de las butacas...",
        playText: "Repetid la ruta tocando las butacas.",
        retryText: "La ruta se ha perdido. Volved a observarla."
      }
    },
    {
      id: "bosque-refugio",
      qr: 4,
      kind: "minigame",
      title: "El Bosque y el Refugio",
      location: "Claro entre los árboles",
      prompt: "Las marcas aparecen sobre la corteza y se desvanecen. Memorizad dónde estaban y encontradlas en orden.",
      success: "¡Patrón reconstruido! El sobre físico duerme donde las raíces de los dos árboles gemelos se rozan bajo una piedra plana.",
      envelope: {
        label: "Sobre físico 4",
        artifact: "Una brújula con la aguja inmóvil y una inicial grabada.",
        nextLocationClue: "La brújula no señala el norte; apunta a una ventana donde la luz parpadea incluso cuando nadie está en casa."
      },
      game: {
        type: "guardianes",
        count: 9,
        memoryMs: 2400,
        hiddenLabel: "?",
        successText: "¡Patrón reconstruido! El sobre físico duerme donde las raíces de los dos árboles gemelos se rozan bajo una piedra plana.",
        memorizeText: "Memorizad la posición de las marcas...",
        playText: "Encontrad las marcas en orden, del {first} al {last}.",
        nextText: "Siguiente marca: {next}",
        retryText: "El patrón se ha roto. Empezad de nuevo."
      }
    },
    {
      id: "casa-senales",
      qr: 5,
      kind: "quiz",
      title: "La Casa de las Señales",
      location: "Porche de la casa",
      prompt: "En la libreta de campo hay una pregunta: ¿qué aparato transforma una señal eléctrica en sonido para que todos en una habitación puedan oírla?",
      options: [
        { id: "A", text: "Un altavoz" },
        { id: "B", text: "Una brújula" },
        { id: "C", text: "Un termómetro" },
        { id: "D", text: "Una linterna" }
      ],
      answer: "A",
      attempts: 2,
      success: "¡La señal vuelve a sonar! Buscad la cinta donde el porche guarda su sombra: junto al tercer peldaño, bajo la maceta que nunca tiene flores.",
      reveal: "¡La señal vuelve a sonar! Buscad la cinta donde el porche guarda su sombra: junto al tercer peldaño, bajo la maceta que nunca tiene flores.",
      envelope: {
        label: "Sobre físico 5",
        artifact: "La última página del cuaderno, con el dibujo de una grieta luminosa.",
        nextLocationClue: "La última marca no está en una puerta ni en una pared: aparece donde el suelo parece abierto y tres luces rojas señalan el borde."
      }
    },
    {
      id: "el-portal",
      qr: 6,
      kind: "minigame",
      title: "El Portal",
      location: "Borde de la grieta",
      prompt: "La anomalía responde a patrones de luz. Memorizad cada secuencia y repetidla para cerrar la grieta.",
      success: "¡La señal se ha apagado! La última cinta espera donde convergen tres haces rojos, al abrigo de la piedra más oscura.",
      envelope: {
        label: "Sobre físico 6 · Cinta final",
        artifact: "La cinta VHS final con la grabación que explica el origen de la señal.",
        nextLocationClue: null,
        ending: "La grabación revela que el equipo ha estabilizado la grieta y completado la misión."
      },
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
        successText: "¡La señal se ha apagado! La última cinta espera donde convergen tres haces rojos, al abrigo de la piedra más oscura."
      }
    }
  ]
};
