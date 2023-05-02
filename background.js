// variables para el cronómetro de pausas activas
var pauseInterval = 20; // intervalo en minutos entre pausas activas
var pauseDuration = 20; // duración en segundos de cada pausa activa
var timerID = null; // identificador del temporizador

// función para mostrar una notificación
function showNotification() {
  var options = {
    type: "basic",
    title: "Pausa activa",
    message: "Es hora de tomar una pausa activa.",
    iconUrl: "icon.png"
  }
  chrome.notifications.create(options);
}

// función para actualizar el tiempo restante para la próxima pausa activa
function updateTimer() {
  var currentTime = new Date().getTime();
  var timeSinceLastPause = (currentTime - lastPauseTime) / 1000;
  var timeRemaining = pauseInterval * 60 - timeSinceLastPause;
  if (timeRemaining <= 0) {
    showNotification();
    lastPauseTime = new Date().getTime();
    timeRemaining = pauseInterval * 60;
  }
  chrome.storage.sync.set({timeRemaining: timeRemaining});
}

// función para iniciar el cronómetro de la pausa activa
function startTimer() {
  if (!timerID) {
    timerID = setInterval(updateTimer, 1000);
    updateTimer();
  }
}

// evento para la primera instalación de la extensión
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install") {
    startTimer();
  }
});

// evento para actualizaciones de la extensión
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "update") {
    chrome.storage.sync.clear();
    startTimer();
  }
});

// evento para el botón de la extensión
chrome.browserAction.onClicked.addListener(function(tab) {
  startTimer();
});

// inicializar la extensión
var lastPauseTime = new Date().getTime();
startTimer();
