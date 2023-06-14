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
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    

    // Überprüfe, ob Gesichter erkannt wurden
    if (resizedDetections.length > 0) {
      // Extrahiere den ersten erkannten Gesichtsausdruck
      const expressions = resizedDetections[0].expressions;

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

  if(next == true) {
    num = getRandomNumber(1, 5);
    next = false;
  }

  switch(num) {

    case 1:

      textContainer.innerText = "Show me your happy Face";
      if (emotion == 'happy') {
        GotRightEmotion(textContainer);
      }
      break;

    case 2:

      textContainer.innerText = "Show me your sad Face";
      if (emotion == 'sad') {
        GotRightEmotion(textContainer);
      }
      break;
    case 3:

      textContainer.innerText = "Show me your neutral Face";
      if (emotion == 'neutral') {
        GotRightEmotion(textContainer);
      }
      break;
    case 4:

      textContainer.innerText = "Show me your surprised Face";
      if (emotion == 'surprised') {
        GotRightEmotion(textContainer);
      }
      break;
    case 5:

      textContainer.innerText = "Show me your angry Face";
      if (emotion == 'angry') {
        GotRightEmotion(textContainer);
      }
      break;
    case 6:

      textContainer.innerText = "Show me your disgusted Face";
      if (emotion == 'disgusted') {
        GotRightEmotion(textContainer);
      }
      break;

      default:
        console.log("geht nicht");
  }
}

function GotRightEmotion(textContainer) {

  next = true;
  textContainer.innerText = "Well done";
  pausecomp(4000);
  startWellDoneTimer(textContainer);
}

async function startWellDoneTimer(textContainer) {
  clearTimeout(wellDoneTimer);
  wellDoneTimer = setTimeout(function () {
    textContainer.innerText = "";
  }, 5000);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}