const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    

    // Überprüfe, ob Gesichter erkannt wurden
    if (resizedDetections.length > 0) {
      // Extrahiere den ersten erkannten Gesichtsausdruck
      const expressions = resizedDetections[0].expressions;

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // Erstelle einen String, der den Gesichtsausdruck repräsentiert
      let emotion = ""; 
      for (const [expression, probability] of Object.entries(expressions)) {
        if (probability > 0.1) {
          emotion = expression;
          AskEmotion(emotion);
          break;
        }
      }

      // Verwende den 'emotion'-String für weitere Verarbeitung
      console.log("Erkannte Emotion: " + emotion);
    }
  }, 100);
});

let next = true;
let num = 0;
let wellDoneTimer = null;

async function AskEmotion(emotion) {
  const textContainer = document.getElementById("TextForEmotion");

  if (next == true) {
    num = getRandomNumber(1, 4);
    next = false;
  }

  if (next == false && num == 1) {
    textContainer.innerText = "Show me your happy Face";
    if (emotion == 'happy') {
      next = true;
      textContainer.innerText = "Well done :D";
      startWellDoneTimer(textContainer);
    }
  }
  else if (next == false && num == 2) {
    textContainer.innerText = "Show me your sad Face";
    if (emotion == 'sad') {
      next = true;
      textContainer.innerText = "Well done :D";
      startWellDoneTimer(textContainer);
    }
  }
  else if (next == false && num == 3) {
    textContainer.innerText = "Show me your neutral Face";
    if (emotion == 'neutral') {
      next = true;
      textContainer.innerText = "Well done";
      startWellDoneTimer(textContainer);
    }
  }
  else if (next == false && num == 4) {
    textContainer.innerText = "Show me your surprised Face";
    if (emotion == 'surprised') {
      next = true;
      textContainer.innerText = "Well done";
      startWellDoneTimer(textContainer);
    }
  }
  else if (next == false && num == 5) {
    textContainer.innerText = "Show me your angry Face";
    if (emotion == 'angry') {
      next = true;
      textContainer.innerText = "Well done";
      startWellDoneTimer(textContainer);
    }
  }
  else if (next == false && num == 6) {
    textContainer.innerText = "Show me your disgusted Face";
    if (emotion == 'disgusted') {
      next = true;
      textContainer.innerText = "Well done";
      startWellDoneTimer(textContainer);
    }
  }
}

async function startWellDoneTimer(textContainer) {
  clearTimeout(wellDoneTimer); // Zurücksetzen des vorherigen Timers, falls vorhanden
  wellDoneTimer = setTimeout(function () {
    textContainer.innerText = ""; // Leere den TextContainer nach 5 Sekunden
  }, 5000); // Anzeigezeit von 5 Sekunden
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}