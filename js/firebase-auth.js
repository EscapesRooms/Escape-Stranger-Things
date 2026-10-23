import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { doc, getDoc, getFirestore } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBonaZQAH_5whKokDV8lnl2eP70WINPRTw",
  authDomain: "quiz-teams-414d7.firebaseapp.com",
  projectId: "quiz-teams-414d7",
  storageBucket: "quiz-teams-414d7.firebasestorage.app",
  messagingSenderId: "834996635016",
  appId: "1:834996635016:web:c48a60c6643d27bb6c263d"
};
const config = window.ESCAPE_CONFIG;
const experienceId = config.experienceId;
const sessionStorageKey = "escape-room-session:" + firebaseConfig.projectId + ":" + experienceId;
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
let expirationTimer = null;

function showAccessError(title, message) {
  if (expirationTimer !== null) window.clearTimeout(expirationTimer);
  document.getElementById("game-content").hidden = true;
  document.getElementById("access-error-title").textContent = title;
  document.getElementById("access-error-message").textContent = message;
  document.getElementById("access-error-view").hidden = false;
  const portalLink = document.getElementById("portal-link");
  if (config.publicPortalUrl) portalLink.href = config.publicPortalUrl;
  document.title = title;
}

function scheduleExpiration(deadline) {
  const remaining = deadline - Date.now();
  if (remaining <= 0) {
    showAccessError("Acceso expirado", "El tiempo de acceso ha terminado. Vuelve al portal y solicita un nuevo código para seguir jugando.");
    return;
  }
  expirationTimer = window.setTimeout(function () {
    scheduleExpiration(deadline);
  }, Math.min(remaining, 2147483647));
}

function openPortal() {
  if (!config.publicPortalUrl) {
    showAccessError("Falta configurar el portal", "Configura publicPortalUrl en js/config.js para que los jugadores puedan validar su código.");
    return;
  }
  const portalUrl = new URL(config.publicPortalUrl, window.location.href);
  portalUrl.searchParams.set("aventura", experienceId);
  const currentParams = new URLSearchParams(window.location.search);
  const stage = currentParams.get("pista");
  if (stage) portalUrl.searchParams.set("pista", stage);
  window.location.replace(portalUrl.href);
}

function loadScript(source) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script");
    script.src = source;
    script.onload = resolve;
    script.onerror = function () {
      reject(new Error("No se pudo cargar " + source + "."));
    };
    document.body.appendChild(script);
  });
}

async function startGame() {
  await loadScript("js/minigames.js");
  await loadScript("js/engine.js");
  document.getElementById("game-content").hidden = false;
}

async function validateSession() {
  const params = new URLSearchParams(window.location.search);
  const sessionFromUrl = params.get("session");
  let savedSession;
  try {
    savedSession = sessionFromUrl
      ? { id: sessionFromUrl }
      : JSON.parse(window.localStorage.getItem(sessionStorageKey) || "null");
  } catch (error) {
    console.error("No se pudo leer la sesión guardada de Stranger Things.", error);
    showAccessError("Almacenamiento no disponible", "Activa el almacenamiento local del navegador y vuelve a escanear el QR.");
    return;
  }

  if (!savedSession || typeof savedSession.id !== "string") {
    openPortal();
    return;
  }

  try {
    const snapshot = await getDoc(doc(db, "sesiones_juego", savedSession.id));
    if (!snapshot.exists()) {
      if (sessionFromUrl) {
        showAccessError("Sesión no encontrada", "El acceso no se ha podido validar. Vuelve al portal e introduce un código válido.");
      } else {
        window.localStorage.removeItem(sessionStorageKey);
        openPortal();
      }
      return;
    }

    const data = snapshot.data();
    const expiresAt = data.expiresAt && typeof data.expiresAt.toMillis === "function"
      ? data.expiresAt.toMillis()
      : NaN;
    if (data.activa !== true || data.experiencia !== experienceId || !Number.isFinite(expiresAt) || Date.now() >= expiresAt) {
      if (!sessionFromUrl) window.localStorage.removeItem(sessionStorageKey);
      if (data.experiencia && data.experiencia !== experienceId) {
        showAccessError("Este código corresponde a otra aventura", "Cada código se puede utilizar para una sola aventura. Vuelve al portal para continuar con la aventura elegida.");
      } else {
        openPortal();
      }
      return;
    }

    window.localStorage.setItem(sessionStorageKey, JSON.stringify({
      id: savedSession.id,
      expiresAt: expiresAt,
      experienceId: experienceId
    }));

    if (sessionFromUrl) {
      params.delete("session");
      window.history.replaceState({}, "", window.location.pathname + (params.toString() ? "?" + params.toString() : "") + window.location.hash);
    }
    scheduleExpiration(expiresAt);
    await startGame();
  } catch (error) {
    console.error("No se pudo validar la sesión de Stranger Things en Firestore.", error);
    showAccessError("No se pudo comprobar el acceso", "No se ha podido conectar con Firebase. Comprueba la conexión y vuelve a intentarlo.");
  }
}

validateSession().catch(function (error) {
  console.error("Error inesperado al validar el acceso de Stranger Things.", error);
  showAccessError("No se pudo validar el acceso", "Ocurrió un error inesperado. Vuelve al portal y solicita ayuda a la organización.");
});
