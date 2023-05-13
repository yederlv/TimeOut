let timerInterval;

function startTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  const totalTime = hours * 60 * 60 + minutes * 60 + seconds;
  let remainingTime = totalTime;
  timerInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(timerInterval);
      document.getElementById('timer').innerHTML = 'Tiempo finalizado';
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Temporizador Finalizado',
        message: 'El temporizador ha finalizado.'
      });
      return;
    }
    const hoursLeft = Math.floor(remainingTime / 3600);
    const minutesLeft = Math.floor((remainingTime % 3600) / 60);
    const secondsLeft = remainingTime % 60;
    document.getElementById('timer').innerHTML = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
  document.getElementById('timer').innerHTML = '';
}

function stopTimer() {
  clearInterval(timerInterval);
  const hoursLeft = parseInt(document.getElementById('timer').innerHTML.substring(0, 2)) || 0;
  const minutesLeft = parseInt(document.getElementById('timer').innerHTML.substring(3, 5)) || 0;
  const secondsLeft = parseInt(document.getElementById('timer').innerHTML.substring(6, 8)) || 0;
  const totalTime = hoursLeft * 60 * 60 + minutesLeft * 60 + secondsLeft;
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;
  document.getElementById('hours').value = hours.toString().padStart(2, '0');
  document.getElementById('minutes').value = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').value = seconds.toString().padStart(2, '0');
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('stop').addEventListener('click', stopTimer);

